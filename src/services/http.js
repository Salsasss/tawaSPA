/**
 * http.js
 * Instancia central de Axios para la API de Mariscos Tawa.
 *
 * - Base URL configurable vía variable de entorno VITE_API_BASE_URL
 * - Inyecta automáticamente el token de autenticación en cada petición si existe
 * - Interceptor de respuesta para manejo global de errores 401
 */
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const http = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 10_000, // 10 segundos
})

// ── Interceptor de petición: agrega token si existe en localStorage ──────────
http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('tawa_auth_token')
        if (token) {
            config.headers.Authorization = `Token ${token}`
        }
        return config
    },
    (error) => Promise.reject(error),
)

// ── Interceptor de respuesta: manejo global de 401 ───────────────────────────
http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token inválido o expirado: limpiar credenciales
            localStorage.removeItem('tawa_auth_token')
            // Redirige al login del KDS si está en una ruta protegida
            if (window.location.pathname.startsWith('/kitchen')) {
                window.location.href = '/kitchen/login'
            }
        }
        return Promise.reject(error)
    },
)

export default http
