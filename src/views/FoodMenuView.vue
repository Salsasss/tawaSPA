<script setup>
import { computed, ref, onMounted } from 'vue'
import CategoryTabs from '@/components/menu/CategoryTabs.vue'
import NoticeBanner from '@/components/menu/NoticeBanner.vue'
import ProductSection from '@/components/menu/ProductSection.vue'
import CartSideBar from '@/components/cart/CartSideBar.vue'
import { getCategorias, getProductos } from '@/services'
import { resolveProductImage } from '@/utils/productImages'

// ── Iconos por nombre de categoría del backend ─────────────────────────────
const CATEGORY_ICONS = {
  'Especialidades del Mar': '🍤',
  'Caldos y Sopas': '🍲',
  'Bebidas': '🥤',
}

// ── Estado reactivo ───────────────────────────────────────────────────────
const categories = ref([])
const products = ref([])
const active = ref(null)       // Se inicializa con el id de la 1ª categoría
const loading = ref(true)
const error = ref(null)

// ── Carga de datos reales desde la API ───────────────────────────────────
onMounted(async () => {
  try {
    const [cats, prods] = await Promise.all([
      getCategorias(),
      getProductos({ is_active: true }),
    ])

    // Mapear categorías: { id (number), nombre } → { id, label, icon }
    categories.value = cats.map(c => ({
      id: c.id,
      label: c.nombre,
      icon: CATEGORY_ICONS[c.nombre] ?? '🍽️',
    }))

    // Inicializar la pestaña activa con la primera categoría
    if (categories.value.length > 0) {
      active.value = categories.value[0].id
    }

    // Mapear productos: schema backend → schema frontend
    products.value = prods.map(p => ({
      id: p.id,
      category: p.categoria,                       // ID numérico
      name: p.nombre,
      description: p.descripcion ?? '',
      price: parseFloat(p.precio),
      image: resolveProductImage(p.imagen, p.nombre), // Imagen local si backend es null
      badge: null,
      ingredients: p.ingredientes_detalle ?? [],   // [{ id, nombre }] — viene del back
    }))
  } catch (err) {
    console.error('[FoodMenuView] Error cargando menú:', err)
    error.value = 'No se pudo cargar el menú. Verifica la conexión con el servidor.'
  } finally {
    loading.value = false
  }
})

// ── Secciones filtradas por categoría activa (ID numérico) ───────────────
const activeCategory = computed(() => categories.value.find(c => c.id === active.value))

const sections = computed(() => {
  if (!active.value || products.value.length === 0) return []
  const filtered = products.value.filter(p => p.category === active.value)
  return [{ title: activeCategory.value?.label ?? '', items: filtered }]
})
</script>

<template>
  <div class="card min-h-[calc(100vh-120px)] bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <div class="mx-auto w-full max-w-7xl px-4 py-6">
      <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <!-- Main -->
        <main class="min-w-0">
          <div class="flex flex-col gap-4">
            <CategoryTabs v-model="active" :categories="categories" />
            <NoticeBanner />
          </div>

          <!-- Loading skeleton -->
          <div v-if="loading" class="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            <div
                v-for="n in 6"
                :key="n"
                class="h-64 animate-pulse rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60"
            />
          </div>

          <!-- Error state -->
          <div
              v-else-if="error"
              class="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed
                     border-red-300 bg-red-50 px-6 py-14 text-center dark:border-red-800 dark:bg-red-900/20"
          >
            <span class="text-4xl">⚠️</span>
            <p class="mt-3 text-base font-bold text-red-700 dark:text-red-400">Error al cargar el menú</p>
            <p class="mt-1 text-sm text-red-500 dark:text-red-500/80">{{ error }}</p>
          </div>

          <!-- Product sections -->
          <div v-else class="mt-5 space-y-10">
            <ProductSection
                v-for="s in sections"
                :key="s.title"
                :title="s.title"
                :products="s.items"
            />
            <!-- Empty state si la categoría no tiene productos -->
            <div
                v-if="sections.length > 0 && sections[0].items.length === 0"
                class="flex flex-col items-center justify-center rounded-2xl border border-dashed
                       border-slate-300 bg-slate-50 px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900/40"
            >
              <span class="text-4xl">🍽️</span>
              <p class="mt-3 text-sm text-slate-500 dark:text-slate-400">No hay productos en esta categoría.</p>
            </div>
          </div>
        </main>

        <!-- Cart -->
        <CartSideBar table-label="Mesa #4" />
      </div>
    </div>
  </div>
</template>
