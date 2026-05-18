/**
 * productImages.js
 * Mapa estático de imágenes por producto.
 * Asocia el nombre del producto (como viene del backend) con una imagen
 * almacenada localmente en /public/products/.
 *
 * Estrategia: Si el backend envía imagen → se usa esa.
 * Si imagen es null → se busca aquí por nombre exacto, luego por keyword.
 */

/** @type {Record<string, string>} Nombre del producto → ruta pública */
const EXACT_MAP = {
  // Especialidades del Mar
  'Cocteles':               '/products/coctel.png',
  'Mariscada TAWA':         '/products/mariscada.png',
  'Pulpos a la Gallega':    '/products/pulpos.png',
  'Camarones Empanizados':  '/products/camarones.png',
  'Tawinas':                '/products/tawinas.png',
  'Mojarras':               '/products/mojarras.png',

  // Caldos y Sopas
  'Caldo de Camarón':       '/products/caldo.png',
  'Sopa de Mariscos':       '/products/sopa.png',

  // Bebidas (todas usan la misma imagen genérica de bebidas)
  'Coca Cola':              '/products/bebidas.png',
  'Cerveza Corona':         '/products/bebidas.png',
  'Clamato':                '/products/bebidas.png',
  'Jumex':                  '/products/bebidas.png',
  'Agua Embotellada':       '/products/bebidas.png',
}

/** Mapa de palabras clave para productos que no están en EXACT_MAP */
const KEYWORD_MAP = [
  { keywords: ['coctel', 'camarón', 'cámaron', 'shrimp'],       image: '/products/coctel.png' },
  { keywords: ['mariscada', 'tawa'],                             image: '/products/mariscada.png' },
  { keywords: ['pulpo', 'gallega'],                              image: '/products/pulpos.png' },
  { keywords: ['empanizad', 'crujient'],                         image: '/products/camarones.png' },
  { keywords: ['tawina', 'cangrejo'],                            image: '/products/tawinas.png' },
  { keywords: ['mojarra', 'pescado', 'filete'],                  image: '/products/mojarras.png' },
  { keywords: ['caldo'],                                         image: '/products/caldo.png' },
  { keywords: ['sopa'],                                          image: '/products/sopa.png' },
  { keywords: ['coca', 'corona', 'clamato', 'jumex', 'agua', 'bebida', 'cerveza', 'refresco'], image: '/products/bebidas.png' },
]

/**
 * Resuelve la imagen de un producto.
 * @param {string|null} backendImage - URL de imagen del backend (puede ser null)
 * @param {string} productName - Nombre del producto
 * @returns {string|null} URL de imagen a usar, o null si no se encontró
 */
export function resolveProductImage(backendImage, productName) {
  // 1. Prioridad: imagen del backend
  if (backendImage) return backendImage

  // 2. Match exacto por nombre
  if (EXACT_MAP[productName]) return EXACT_MAP[productName]

  // 3. Match por palabras clave (nombre en minúsculas)
  const nameLower = productName.toLowerCase()
  for (const entry of KEYWORD_MAP) {
    if (entry.keywords.some(kw => nameLower.includes(kw))) {
      return entry.image
    }
  }

  return null
}
