/**
 * productos.service.js
 * Servicio para la gestión de productos del menú.
 *
 * Endpoint base: /api/productos/
 * Acceso para GET: Público (AllowAny)
 * Acceso para escritura: Autenticado (IsAuthenticatedOrReadOnly)
 *
 * Esquema de respuesta completo:
 * {
 *   id, nombre, descripcion, precio, imagen, categoria,
 *   categoria_detalle: { id, nombre },
 *   is_active,
 *   ingredientes: number[],
 *   ingredientes_detalle: { id, nombre }[]
 * }
 */
import http from './http'

/**
 * @typedef {Object} ProductoFiltros
 * @property {number} [categoria]   - Filtra por ID de categoría
 * @property {boolean} [is_active]  - Filtra por disponibilidad de stock
 */

/**
 * Lista todos los productos con filtros opcionales.
 * @param {ProductoFiltros} [filtros]
 * @returns {Promise<Object[]>}
 */
export async function getProductos(filtros = {}) {
    const { data } = await http.get('/api/productos/', { params: filtros })
    return data
}

/**
 * Obtiene el detalle de un producto específico.
 * @param {number} id
 * @returns {Promise<Object>}
 */
export async function getProducto(id) {
    const { data } = await http.get(`/api/productos/${id}/`)
    return data
}

/**
 * Crea un nuevo producto. Requiere autenticación.
 * @param {Object} payload - { nombre, descripcion, precio, imagen?, categoria, ingredientes: number[], is_active? }
 * @returns {Promise<Object>}
 */
export async function createProducto(payload) {
    const { data } = await http.post('/api/productos/', payload)
    return data
}

/**
 * Actualización completa de un producto. Requiere autenticación.
 * @param {number} id
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
export async function updateProducto(id, payload) {
    const { data } = await http.put(`/api/productos/${id}/`, payload)
    return data
}

/**
 * Actualización parcial de un producto. Requiere autenticación.
 * @param {number} id
 * @param {Object} payload - Solo los campos que se desean modificar
 * @returns {Promise<Object>}
 */
export async function patchProducto(id, payload) {
    const { data } = await http.patch(`/api/productos/${id}/`, payload)
    return data
}

/**
 * Elimina un producto. Requiere autenticación.
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function deleteProducto(id) {
    await http.delete(`/api/productos/${id}/`)
}
