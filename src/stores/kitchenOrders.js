import { defineStore } from "pinia";
import { getOrdenes, patchOrden } from "@/services/ordenes.service";
import { patchDetalleOrden } from "@/services/detalles-orden.service";

/**
 * Kitchen Orders Store
 * Manages the 3 queues: new → preparing → completed (FIFO).
 * Connects to the real backend API using authenticated requests.
 *
 * Backend status mapping:
 *   NUEVA     → "new"
 *   PROCESO   → "preparing"
 *   TERMINADA → "completed"
 *   CANCELADA → (filtered out)
 */

// ── Helpers de mapeo ──────────────────────────────────────────────────────────

const STATUS_MAP = {
  NUEVA:     "new",
  PROCESO:   "preparing",
  TERMINADA: "completed",
};

const STATUS_REVERSE = {
  new:       "NUEVA",
  preparing: "PROCESO",
  completed: "TERMINADA",
};

/**
 * Mapea una orden del backend al formato que espera KitchenOrderCard.
 */
function mapOrder(o) {
  return {
    id: String(o.id),
    orderNumber: o.id,
    location: o.mesa ? `Mesa ${o.mesa}` : "Para Llevar",
    orderType: o.es_para_llevar ? "takeaway" : "dine_in",
    status: STATUS_MAP[o.estado] ?? "new",
    createdAt: new Date(o.created_at).getTime(),
    startedAt: o.estado === "PROCESO" || o.estado === "TERMINADA"
      ? new Date(o.created_at).getTime()  // El backend no expone startedAt, usamos createdAt
      : null,
    completedAt: o.estado === "TERMINADA"
      ? Date.now()  // Estimado; el backend no expone completedAt aún
      : null,
    items: (o.detalles ?? []).map(d => ({
      id: d.id,
      qty: d.cantidad,
      name: d.producto_detalle?.nombre ?? `Producto #${d.producto}`,
      notes: d.notas ?? "",
      completed: d.preparado ?? false,
    })),
  };
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useKitchenOrdersStore = defineStore("kitchenOrders", {
  state: () => ({
    orders: [],
    loading: false,
    error: null,
    _pollTimer: null,
  }),

  getters: {
    /** FIFO: oldest first */
    newOrders: (state) =>
      state.orders
        .filter((o) => o.status === "new")
        .sort((a, b) => a.createdAt - b.createdAt),

    preparingOrders: (state) =>
      state.orders
        .filter((o) => o.status === "preparing")
        .sort((a, b) => (a.startedAt ?? a.createdAt) - (b.startedAt ?? b.createdAt)),

    completedOrders: (state) =>
      state.orders
        .filter((o) => o.status === "completed")
        .sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0)),

    countByStatus: (state) => {
      const counts = { new: 0, preparing: 0, completed: 0 };
      state.orders.forEach((o) => counts[o.status]++);
      return counts;
    },
  },

  actions: {
    _findOrder(orderId) {
      return this.orders.find((o) => o.id === String(orderId));
    },

    /**
     * Carga las órdenes desde la API.
     * Trae NUEVA, PROCESO y TERMINADA (últimas 50).
     */
    async fetchOrders() {
      this.loading = true;
      this.error = null;
      try {
        const [nuevas, proceso, terminadas] = await Promise.all([
          getOrdenes({ estado: "NUEVA" }),
          getOrdenes({ estado: "PROCESO" }),
          getOrdenes({ estado: "TERMINADA" }),
        ]);

        const all = [...nuevas, ...proceso, ...terminadas];
        // Tomar solo las últimas 50 terminadas para no saturar el KDS
        const terminadasLimitadas = terminadas.slice(0, 50);
        this.orders = [...nuevas, ...proceso, ...terminadasLimitadas].map(mapOrder);
      } catch (err) {
        console.error("[kitchenOrders] Error al cargar órdenes:", err);
        this.error = err.response?.status === 401
          ? "Sin autorización. Inicia sesión nuevamente."
          : "Error al cargar órdenes del servidor.";
      } finally {
        this.loading = false;
      }
    },

    /**
     * Inicia polling automático cada N segundos.
     */
    startPolling(intervalMs = 15_000) {
      this.fetchOrders(); // Carga inicial
      this._pollTimer = setInterval(() => this.fetchOrders(), intervalMs);
    },

    /**
     * Detiene el polling.
     */
    stopPolling() {
      if (this._pollTimer) {
        clearInterval(this._pollTimer);
        this._pollTimer = null;
      }
    },

    /**
     * Mueve la orden al siguiente estado: new → preparing → completed
     */
    async moveToNext(orderId) {
      const order = this._findOrder(orderId);
      if (!order) return;

      const nextStatus = order.status === "new" ? "preparing" : "completed";
      const backendStatus = STATUS_REVERSE[nextStatus];

      try {
        await patchOrden(Number(orderId), { estado: backendStatus });
        // Actualizar localmente mientras llega el siguiente polling
        if (order.status === "new") {
          order.status = "preparing";
          order.startedAt = Date.now();
        } else if (order.status === "preparing") {
          order.status = "completed";
          order.completedAt = Date.now();
        }
      } catch (err) {
        console.error("[kitchenOrders] Error al actualizar orden:", err);
      }
    },

    /**
     * Mueve la orden al estado anterior: completed → preparing → new
     */
    async moveToPrev(orderId) {
      const order = this._findOrder(orderId);
      if (!order) return;

      const prevStatus = order.status === "completed" ? "preparing" : "new";
      const backendStatus = STATUS_REVERSE[prevStatus];

      try {
        await patchOrden(Number(orderId), { estado: backendStatus });
        if (order.status === "completed") {
          order.status = "preparing";
          order.completedAt = null;
        } else if (order.status === "preparing") {
          order.status = "new";
          order.startedAt = null;
        }
      } catch (err) {
        console.error("[kitchenOrders] Error al revertir orden:", err);
      }
    },

    /**
     * Asigna directamente un estado (usado por drag-and-drop).
     */
    async moveToStatus(orderId, newStatus) {
      const order = this._findOrder(orderId);
      if (!order || !STATUS_REVERSE[newStatus]) return;

      try {
        await patchOrden(Number(orderId), { estado: STATUS_REVERSE[newStatus] });
        if (newStatus === "new") {
          order.startedAt = null;
          order.completedAt = null;
        } else if (newStatus === "preparing") {
          if (!order.startedAt) order.startedAt = Date.now();
          order.completedAt = null;
        } else if (newStatus === "completed") {
          if (!order.startedAt) order.startedAt = Date.now();
          order.completedAt = Date.now();
        }
        order.status = newStatus;
      } catch (err) {
        console.error("[kitchenOrders] Error al cambiar estado:", err);
      }
    },

    /**
     * Toggle local del ítem y persistencia en el backend.
     */
    async toggleItemCompleted(orderId, itemIndex) {
      const order = this._findOrder(orderId);
      if (!order || !order.items[itemIndex]) return;
      
      const item = order.items[itemIndex];
      const newStatus = !item.completed;
      
      // Actualización visual inmediata en la UI (Optimistic UI)
      item.completed = newStatus;
      
      try {
        if (item.id) {
          await patchDetalleOrden(Number(item.id), { preparado: newStatus });
        } else {
          console.warn("[kitchenOrders] El ítem no tiene un ID de detalle válido para persistir.");
        }
      } catch (err) {
        console.error("[kitchenOrders] Error al actualizar estado preparado del platillo:", err);
        // Revertir el estado en caso de error
        item.completed = !newStatus;
      }
    },
  },
});

