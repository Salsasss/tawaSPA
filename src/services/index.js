/**
 * services/index.js
 * Barrel de exportaciones para todos los servicios de la API de Mariscos Tawa.
 *
 * Uso recomendado:
 *   import { getProductos, createOrden } from '@/services'
 *
 * O bien usando el servicio individual para mayor granularidad:
 *   import { getProductos } from '@/services/productos.service'
 */

// ── Configuración central HTTP ────────────────────────────────────────────────
export { default as http } from './http'

// ── Autenticación ─────────────────────────────────────────────────────────────
export { login, logout, isAuthenticated, getToken } from './auth.service'

// ── Catálogos (solo lectura, públicos) ───────────────────────────────────────
export { getCategorias, getCategoria } from './categorias.service'
export { getIngredientes, getIngrediente } from './ingredientes.service'

// ── Productos ────────────────────────────────────────────────────────────────
export {
    getProductos,
    getProducto,
    createProducto,
    updateProducto,
    patchProducto,
    deleteProducto,
} from './productos.service'

// ── Órdenes ───────────────────────────────────────────────────────────────────
export {
    getOrdenes,
    getOrden,
    createOrden,
    patchOrden,
    deleteOrden,
    mapMetodoPago,
    buildOrdenPayload,
} from './ordenes.service'

// ── Detalles de Orden (KDS) ───────────────────────────────────────────────────
export {
    getDetallesOrden,
    getDetalleOrden,
    patchDetalleOrden,
    deleteDetalleOrden,
    marcarPreparado,
    marcarPendiente,
} from './detalles-orden.service'
