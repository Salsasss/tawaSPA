<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import CartItemRow from './CartItemRow.vue'
import CartTotals from './CartTotals.vue'

const props = defineProps({
  tableLabel: { type: String, default: 'Mesa #4' },
})

const router = useRouter()
const cart = useCartStore()
const hasItems = computed(() => cart.items.length > 0)

function goSummary() {
  router.push('/summary')
}
</script>

<template>
  <aside class="w-full lg:w-90 lg:sticky lg:top-6 lg:self-start">
    <div class="rounded-2xl border border-slate-200 bg-white shadow-sm
                dark:border-slate-800 dark:bg-slate-900/70">

      <!-- Header -->
      <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4
                  dark:border-slate-800">
        <div>
          <h3 class="text-lg font-extrabold text-slate-900 dark:text-slate-100">Tu Carrito</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ tableLabel }}</p>
        </div>

        <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700
                     dark:bg-slate-800 dark:text-slate-200">
          {{ cart.countItems }} items
        </span>
      </div>

      <!-- Items -->
      <div class="max-h-[46vh] overflow-auto px-4 py-4">
        <div v-if="!hasItems"
             class="rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500
                    dark:bg-slate-800/40 dark:text-slate-400">
          <span class="text-2xl">🛒</span>
          <p class="mt-2">Aún no hay productos en el carrito.</p>
        </div>

        <div v-else class="space-y-3">
          <CartItemRow
              v-for="it in cart.items"
              :key="it.id"
              :item="it"
              @increment="cart.increment(it.id)"
              @decrement="cart.decrement(it.id)"
              @remove="cart.remove(it.id)"
              @updateNotes="(val) => cart.setNotes(it.id, val)"
          />
        </div>
      </div>

      <!-- Totals + Action -->
      <div class="border-t border-slate-200 px-4 pb-4 pt-3 dark:border-slate-800">
        <CartTotals />

        <button
            type="button"
            class="mt-4 w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-extrabold text-white
                   shadow-sm transition hover:bg-red-700 active:scale-[0.98]
                   disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="!hasItems"
            @click="goSummary"
        >
          Ver Resumen →
        </button>
      </div>
    </div>
  </aside>
</template>
