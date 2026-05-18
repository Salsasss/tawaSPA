/**
 * auth.service.js
 * Servicio de autenticación para el personal de Mariscos Tawa.
 *
 * Endpoint base: /api/auth/
 * Acceso: Público
 */
import http from './http'

/**
 * Realiza el login y almacena el token en localStorage.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{ token: string }>}
 */
export async function login(username, password) {
    const { data } = await http.post('/api/auth/login/', { username, password })
    if (data.token) {
        localStorage.setItem('tawa_auth_token', data.token)
    }
    return data
}

/**
 * Elimina el token de autenticación (logout local).
 * El backend de DRF no requiere una llamada de invalidación en este caso.
 */
export function logout() {
    localStorage.removeItem('tawa_auth_token')
}

/**
 * Comprueba si hay un token activo guardado en localStorage.
 * @returns {boolean}
 */
export function isAuthenticated() {
    return !!localStorage.getItem('tawa_auth_token')
}

/**
 * Obtiene el token actual del localStorage.
 * @returns {string|null}
 */
export function getToken() {
    return localStorage.getItem('tawa_auth_token')
}
