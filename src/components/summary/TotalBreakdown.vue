<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useCurrency } from '@/composables/useCurrency'

const router = useRouter()
const cart = useCartStore()
const { mxn } = useCurrency()

const hasItems = computed(() => cart.items.length > 0)

function goMenu() {
  router.push('/menu')
}

function goPayment() {
  router.push('/payment')
}
</script>

<template>
  <div
      class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm
             dark:border-slate-800 dark:bg-slate-900/60"
  >
    <h2 class="text-lg font-extrabold text-slate-900 dark:text-slate-100">
      Total a Pagar
    </h2>

    <!-- Desglose -->
    <div class="mt-5 space-y-3 text-sm">
      <div class="flex items-center justify-between">
        <span class="text-slate-500 dark:text-slate-400">Productos ({{ cart.countItems }})</span>
        <span class="font-bold text-slate-800 dark:text-slate-200">{{ mxn(cart.subtotal) }}</span>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-slate-500 dark:text-slate-400">IVA (16%)</span>
        <span class="font-bold text-slate-800 dark:text-slate-200">{{ mxn(cart.iva) }}</span>
      </div>

      <div
          class="flex items-center justify-between border-t border-slate-200 pt-3
                 dark:border-slate-700"
      >
        <span class="text-base font-extrabold text-slate-900 dark:text-slate-100">Total</span>
        <span class="text-base font-extrabold text-red-600 dark:text-red-400">{{ mxn(cart.total) }}</span>
      </div>
    </div>

    <!-- Acciones -->
    <div class="mt-6 space-y-3">
      <button
          type="button"
          class="w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm
                 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="!hasItems"
          @click="goPayment"
      >
        Seleccionar método de pago →
      </button>

      <button
          type="button"
          class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold
                 text-slate-700 transition hover:bg-slate-50
                 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-800"
          @click="goMenu"
      >
        ← Volver al Menú
      </button>
    </div>
  </div>
</template>