/**
 * ingredientes.service.js
 * Servicio para el catálogo de ingredientes.
 *
 * Endpoint base: /api/ingredientes/
 * Acceso: Público (solo lectura)
 *
 * Esquema de respuesta:
 * { id: number, nombre: string }
 */
import http from './http'

/**
 * Lista todos los ingredientes del sistema.
 * @returns {Promise<Array<{ id: number, nombre: string }>>}
 */
export async function getIngredientes() {
    const { data } = await http.get('/api/ingredientes/')
    return data
}

/**
 * Obtiene el detalle de un ingrediente específico.
 * @param {number} id
 * @returns {Promise<{ id: number, nombre: string }>}
 */
export async function getIngrediente(id) {
    const { data } = await http.get(`/api/ingredientes/${id}/`)
    return data
}
