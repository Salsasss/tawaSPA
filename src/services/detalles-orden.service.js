/**
 * detalles-orden.service.js
 * Servicio para gestión individual de platillos dentro de una orden.
 *
 * Endpoint base: /api/detalles-orden/
 * Acceso: Completamente Protegido (IsAuthenticated) — usado principalmente por el KDS.
 *
 * Esquema de respuesta:
 * {
 *   id, producto, producto_detalle, cantidad,
 *   precio_unitario, notas, preparado
 * }
 */
import http from './http'

/**
 * Lista todos los platillos ordenados. Requiere autenticación.
 * @returns {Promise<Object[]>}
 */
export async function getDetallesOrden() {
    const { data } = await http.get('/api/detalles-orden/')
    return data
}

/**
 * Obtiene el detalle individual de un platillo. Requiere autenticación.
 * @param {number} id
 * @returns {Promise<Object>}
 */
export async function getDetalleOrden(id) {
    const { data } = await http.get(`/api/detalles-orden/${id}/`)
    return data
}

/**
 * Actualiza parcialmente un detalle de orden (ej: marcar como preparado en cocina).
 * Requiere autenticación.
 *
 * @param {number} id
 * @param {Object} payload - { preparado?: boolean, cantidad?: number, notas?: string }
 * @returns {Promise<Object>}
 *
 * @example
 * // Marcar platillo como preparado en el KDS
 * await patchDetalleOrden(105, { preparado: true })
 */
export async function patchDetalleOrden(id, payload) {
    const { data } = await http.patch(`/api/detalles-orden/${id}/`, payload)
    return data
}

/**
 * Elimina un producto específico de una orden. Requiere autenticación.
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function deleteDetalleOrden(id) {
    await http.delete(`/api/detalles-orden/${id}/`)
}

/**
 * Marca un platillo como preparado. Shorthand para el KDS.
 * @param {number} id - ID del DetalleOrden
 * @returns {Promise<Object>}
 */
export async function marcarPreparado(id) {
    return patchDetalleOrden(id, { preparado: true })
}

/**
 * Marca un platillo como pendiente (deshace preparación).
 * @param {number} id - ID del DetalleOrden
 * @returns {Promise<Object>}
 */
export async function marcarPendiente(id) {
    return patchDetalleOrden(id, { preparado: false })
}
