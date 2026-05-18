/**
 * ordenes.service.js
 * Servicio para la gestión de órdenes (flujo transaccional principal).
 *
 * Endpoint base: /api/ordenes/
 * Acceso POST: Público (AllowAny) — clientes/kioscos
 * Acceso GET, PUT, PATCH, DELETE: Protegido (IsAuthenticated) — personal/KDS
 *
 * Métodos de pago válidos (case-sensitive): "EFECTIVO" | "TARJETA" | "TRANSFERENCIA"
 * Estados válidos (case-sensitive): "NUEVA" | "PROCESO" | "TERMINADA" | "CANCELADA"
 */
import http from './http'

/**
 * @typedef {Object} DetalleOrdenPayload
 * @property {number} producto   - ID del producto
 * @property {number} cantidad   - Cantidad solicitada
 * @property {string} [notas]    - Instrucciones especiales
 */

/**
 * @typedef {Object} OrdenPayload
 * @property {number|null} mesa           - Número de mesa (null si es para llevar)
 * @property {boolean} es_para_llevar
 * @property {'EFECTIVO'|'TARJETA'|'TRANSFERENCIA'} metodo_pago
 * @property {number} [propina]           - Monto de propina en pesos
 * @property {DetalleOrdenPayload[]} detalles
 */

/**
 * @typedef {Object} OrdenesFiltros
 * @property {'NUEVA'|'PROCESO'|'TERMINADA'|'CANCELADA'} [estado]
 * @property {number} [mesa]
 * @property {boolean} [es_para_llevar]
 */

/**
 * Lista todas las órdenes. Requiere autenticación (personal/KDS).
 * @param {OrdenesFiltros} [filtros]
 * @returns {Promise<Object[]>}
 */
export async function getOrdenes(filtros = {}) {
    const { data } = await http.get('/api/ordenes/', { params: filtros })
    return data
}

/**
 * Obtiene el detalle completo de una orden específica. Requiere autenticación.
 * @param {number} id
 * @returns {Promise<Object>}
 */
export async function getOrden(id) {
    const { data } = await http.get(`/api/ordenes/${id}/`)
    return data
}

/**
 * Crea una nueva orden. Acceso público (clientes/kioscos).
 * El backend calcula subtotal, IVA y total automáticamente.
 *
 * @param {OrdenPayload} payload
 * @returns {Promise<Object>} Orden creada con id, totales y detalles completos
 *
 * @example
 * const orden = await createOrden({
 *   mesa: 3,
 *   es_para_llevar: false,
 *   metodo_pago: 'TARJETA',
 *   propina: 20.00,
 *   detalles: [
 *     { producto: 5, cantidad: 2, notas: 'Sin cebolla morada' },
 *     { producto: 8, cantidad: 1, notas: 'Con hielo' },
 *   ],
 * })
 */
export async function createOrden(payload) {
    const { data } = await http.post('/api/ordenes/', payload)
    return data
}

/**
 * Modifica parcialmente una orden. Requiere autenticación (ej: cambiar estado en KDS).
 * @param {number} id
 * @param {Partial<OrdenPayload> & { estado?: string }} payload
 * @returns {Promise<Object>}
 */
export async function patchOrden(id, payload) {
    const { data } = await http.patch(`/api/ordenes/${id}/`, payload)
    return data
}

/**
 * Elimina / cancela una orden. Requiere autenticación.
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function deleteOrden(id) {
    await http.delete(`/api/ordenes/${id}/`)
}

// ── Helpers de negocio ────────────────────────────────────────────────────────

/**
 * Mapea los valores del store local al formato que espera el backend.
 * Convierte: 'cash' → 'EFECTIVO', 'card' → 'TARJETA', 'counter' → 'TRANSFERENCIA'
 *
 * @param {string} localMethod - Valor interno del store ('cash'|'card'|'counter')
 * @returns {'EFECTIVO'|'TARJETA'|'TRANSFERENCIA'}
 */
export function mapMetodoPago(localMethod) {
    const map = {
        cash: 'EFECTIVO',
        card: 'TARJETA',
        counter: 'TRANSFERENCIA',
    }
    return map[localMethod] ?? 'EFECTIVO'
}

/**
 * Construye el payload completo de una orden a partir de los stores locales.
 *
 * @param {Object} cart    - Estado del cart store (items, subtotal, etc.)
 * @param {Object} order   - Estado del order store (orderType, paymentMethod, tipPercent, etc.)
 * @param {number|null} [mesa] - Número de mesa (solo si es para comer aquí)
 * @returns {OrdenPayload}
 */
export function buildOrdenPayload(cart, order, mesa = null) {
    const esDineIn = order.orderType === 'dine_in'
    const tipAmount = Math.round(cart.subtotal * (order.tipPercent / 100) * 100) / 100

    return {
        mesa: esDineIn ? mesa : null,
        es_para_llevar: !esDineIn,
        metodo_pago: mapMetodoPago(order.paymentMethod),
        propina: tipAmount,
        detalles: cart.items.map((item) => ({
            producto: item.id,
            cantidad: item.qty,
            notas: item.notes ?? '',
        })),
    }
}
