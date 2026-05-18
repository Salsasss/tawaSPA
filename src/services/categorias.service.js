/**
 * categorias.service.js
 * Servicio para el catálogo de categorías de productos.
 *
 * Endpoint base: /api/categorias/
 * Acceso: Público (solo lectura)
 *
 * Esquema de respuesta:
 * { id: number, nombre: string }
 */
import http from './http'

/**
 * Lista todas las categorías.
 * @returns {Promise<Array<{ id: number, nombre: string }>>}
 */
export async function getCategorias() {
    const { data } = await http.get('/api/categorias/')
    return data
}

/**
 * Obtiene el detalle de una categoría específica.
 * @param {number} id
 * @returns {Promise<{ id: number, nombre: string }>}
 */
export async function getCategoria(id) {
    const { data } = await http.get(`/api/categorias/${id}/`)
    return data
}
