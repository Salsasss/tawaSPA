<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'
import OrderSummaryList from '@/components/summary/OrderSummaryList.vue'
import TotalBreakdown from '@/components/summary/TotalBreakdown.vue'

const router = useRouter()
const cart = useCartStore()
const order = useOrderStore()

const hasItems = computed(() => cart.items.length > 0)

const orderTypeLabel = computed(() => {
  if (order.isDineIn) return '🍽️ Comer Aquí'
  if (order.isTakeaway) return '🛍️ Para Llevar'
  return ''
})
</script>

<template>
  <section class="min-h-[calc(100vh-200px)]">
    <!-- Encabezado -->
    <div class="mb-6">
      <h1 class="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
        Resumen del Pedido
      </h1>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Revisa tu orden antes de continuar al pago.
      </p>

      <!-- Tipo de orden -->
      <div
          v-if="orderTypeLabel"
          class="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50
                 px-4 py-1.5 text-xs font-semibold text-slate-700
                 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300"
      >
        {{ orderTypeLabel }}
      </div>
    </div>

    <!-- Layout principal -->
    <div class="grid gap-6 lg:grid-cols-[1fr_340px]">
      <!-- Lista de productos -->
      <div>
        <div
            class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm
                   dark:border-slate-800 dark:bg-slate-900/60"
        >
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-base font-bold text-slate-900 dark:text-slate-100">
              Productos
            </h2>
            <span
                v-if="hasItems"
                class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600
                       dark:bg-slate-800 dark:text-slate-300"
            >
              {{ cart.countItems }} artículos
            </span>
          </div>

          <OrderSummaryList />
        </div>

        <!-- Botón volver al menú (mobile) — solo se muestra en mobile debajo de la lista -->
        <button
            type="button"
            class="mt-4 text-sm font-semibold text-slate-500 underline underline-offset-2
                   hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 lg:hidden"
            @click="router.push('/menu')"
        >
          ← Agregar más productos
        </button>
      </div>

      <!-- Panel lateral de totales -->
      <div class="lg:sticky lg:top-6 lg:self-start">
        <TotalBreakdown />
      </div>
    </div>
  </section>
</template>
