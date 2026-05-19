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
  // Especialidades y Entradas (Imágenes generadas a la medida)
  'Tostada de Ceviche de Pescado': '/products/tostada_ceviche_pescado.png',
  'Empanadas de Camarón (3 pzas)': '/products/empanadas_camaron.png',
  'Chicharrón de Pescado': '/products/chicharron_pescado.png',
  'Toritos de Camarón (4 pzas)': '/products/toritos_camaron.png',
  'Guacamole Tradicional': '/products/guacamole_tradicional.png',
  'Ceviche Tawa Especial': '/products/ceviche_tawa_especial.png',

  // Otras Especialidades del Mar
  'Aguachile Verde de Camarón': '/products/coctel.png',
  'Aguachile Negro de Camarón': '/products/coctel.png',
  'Tostada de Ceviche de Pulpo': '/products/pulpos.png',
  'Coctel Campechana': '/products/coctel.png',
  'Mariscada TAWA (Familiar)': '/products/mariscada.png',
  'Pulpos a la Gallega': '/products/pulpos.png',
  'Camarones Empanizados': '/products/camarones.png',
  'Mojarra Frita al Mojo de Ajo': '/products/mojarras.png',
  'Filete de Pescado al Ajillo': '/products/filete_ajillo.png',
  'Taco Gobernador': '/products/taco_gobernador.png',
  'Taco Capeado Ensenada': '/products/taco_ensenada.png',
  'Quesadilla de Camarón': '/products/quesadilla_camaron.png',

  // Caldos y Sopas
  'Caldo de Camarón': '/products/caldo.png',
  'Sopa de Mariscos Especial': '/products/sopa.png',
  'Chilpachole de Jaiba': '/products/sopa.png',

  // Postres (Imágenes fotográficas personalizadas)
  'Flan Napolitano Casero': '/products/flan_napolitano.png',
  'Pay de Limón Helado': '/products/pay_limon.png',
  'Pastel de Tres Leches': '/products/pastel_tres_leches.png',

  // Bebidas (Mock / Productos reales)
  'Coca Cola Original': '/mock/coca.png',
  'Cerveza Corona Extra': '/mock/corona.png',
  'Clamato Prepared': '/mock/clamato.png',
  'Agua de Horchata Grande (1L)': '/products/agua_horchata.png',
  'Agua de Jamaica Grande (1L)': '/products/agua_jamaica.png',
  'Limonada Mineral': '/products/limonada_mineral.png',
  'Agua Embotellada': '/mock/agua.png',
}

/** Mapa de palabras clave para productos que no están en EXACT_MAP */
const KEYWORD_MAP = [
  { keywords: ['tostada', 'ceviche', 'pescado'], image: '/products/tostada_ceviche_pescado.png' },
  { keywords: ['empanada', 'camarón', 'cámaron', 'shrimp'], image: '/products/empanadas_camaron.png' },
  { keywords: ['chicharrón', 'chicharron', 'pescado'], image: '/products/chicharron_pescado.png' },
  { keywords: ['torito', 'camarón', 'cámaron'], image: '/products/toritos_camaron.png' },
  { keywords: ['guacamole', 'aguacate'], image: '/products/guacamole_tradicional.png' },
  { keywords: ['ceviche', 'tawa', 'especial'], image: '/products/ceviche_tawa_especial.png' },
  { keywords: ['aguachile', 'verde'], image: '/products/coctel.png' },
  { keywords: ['aguachile', 'negro'], image: '/products/coctel.png' },
  { keywords: ['tostada', 'pulpo'], image: '/products/pulpos.png' },
  { keywords: ['coctel', 'campechana'], image: '/products/coctel.png' },
  { keywords: ['mariscada', 'tawa', 'familiar'], image: '/products/mariscada.png' },
  { keywords: ['pulpo', 'gallega'], image: '/products/pulpos.png' },
  { keywords: ['empanizad', 'camarón', 'crujient'], image: '/products/camarones.png' },
  { keywords: ['mojarra', 'frita', 'ajo'], image: '/products/mojarras.png' },
  { keywords: ['filete', 'pescado', 'ajillo'], image: '/products/filete_ajillo.png' },
  { keywords: ['taco', 'gobernador'], image: '/products/taco_gobernador.png' },
  { keywords: ['taco', 'capeado', 'ensenada'], image: '/products/taco_ensenada.png' },
  { keywords: ['quesadilla', 'camarón'], image: '/products/quesadilla_camaron.png' },
  { keywords: ['caldo', 'camarón'], image: '/products/caldo.png' },
  { keywords: ['sopa', 'mariscos', 'especial'], image: '/products/sopa.png' },
  { keywords: ['chilpachole', 'jaiba'], image: '/products/sopa.png' },
  { keywords: ['flan', 'napolitano', 'casero'], image: '/products/flan_napolitano.png' },
  { keywords: ['pay', 'limón', 'limon', 'helado'], image: '/products/pay_limon.png' },
  { keywords: ['pastel', 'tres leches'], image: '/products/pastel_tres_leches.png' },
  { keywords: ['coca', 'refresco'], image: '/mock/coca.png' },
  { keywords: ['corona', 'cerveza'], image: '/mock/corona.png' },
  { keywords: ['clamato'], image: '/mock/clamato.png' },
  { keywords: ['horchata', 'agua'], image: '/products/agua_horchata.png' },
  { keywords: ['jamaica', 'agua'], image: '/products/agua_jamaica.png' },
  { keywords: ['limonada'], image: '/products/limonada_mineral.png' }
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
