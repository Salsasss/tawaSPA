<script setup>
import { onMounted, onUnmounted } from "vue";
import { useKitchenOrdersStore } from "@/stores/kitchenOrders.js";
import KitchenColumn from "@/components/kitchen/KitchenColumn.vue";
import AppShellKitchen from "@/layouts/AppShellKitchen.vue";

const ordersStore = useKitchenOrdersStore();

/* ── Auto-refresh ── */
onMounted(() => ordersStore.startPolling(15_000));
onUnmounted(() => ordersStore.stopPolling());

/* ── Column definitions ── */
const columns = [
  {
    key: "new",
    title: "NUEVAS",
    icon: "🆕",
    badgeColor: "bg-red-500",
  },
  {
    key: "preparing",
    title: "EN PREPARACIÓN",
    icon: "🔥",
    badgeColor: "bg-amber-500",
  },
  {
    key: "completed",
    title: "COMPLETADO",
    icon: "✅",
    badgeColor: "bg-emerald-500",
  },
];

function getOrders(status) {
  if (status === "new") return ordersStore.newOrders;
  if (status === "preparing") return ordersStore.preparingOrders;
  if (status === "completed") return ordersStore.completedOrders;
  return [];
}

/* ── Actions ── */
function handleAction(orderId) {
  ordersStore.moveToNext(orderId);
}

function handleUndo(orderId) {
  ordersStore.moveToPrev(orderId);
}

function handleDrop({ orderId, targetStatus }) {
  ordersStore.moveToStatus(orderId, targetStatus);
}

function handleToggleItem(orderId, itemIndex) {
  ordersStore.toggleItemCompleted(orderId, itemIndex);
}
</script>

<template>
  <AppShellKitchen>
    <div class="h-full grid grid-cols-1 md:grid-cols-3 gap-4" style="height: calc(100vh - 130px)">
      <KitchenColumn
        v-for="col in columns"
        :key="col.key"
        :title="col.title"
        :icon="col.icon"
        :status="col.key"
        :orders="getOrders(col.key)"
        :badge-color="col.badgeColor"
        @action="handleAction"
        @undo="handleUndo"
        @drop="handleDrop"
        @toggleItem="handleToggleItem"
      />
    </div>
  </AppShellKitchen>
</template>
