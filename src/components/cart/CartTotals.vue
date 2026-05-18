<script setup>
import { useCartStore } from '@/stores/cart'
import { useCurrency } from '@/composables/useCurrency'

const cart = useCartStore()
const { mxn } = useCurrency()
</script>

<template>
  <div class="rounded-xl border border-slate-200 bg-slate-50 p-4
              dark:border-slate-700 dark:bg-slate-800/50">

    <div class="flex items-center justify-between text-sm">
      <span class="text-slate-500 dark:text-slate-400">Subtotal</span>
      <span class="font-bold text-slate-800 dark:text-slate-200">{{ mxn(cart.subtotal) }}</span>
    </div>

    <div class="mt-2 flex items-center justify-between text-sm">
      <span class="text-slate-500 dark:text-slate-400">IVA (16%)</span>
      <span class="font-bold text-slate-800 dark:text-slate-200">{{ mxn(cart.iva) }}</span>
    </div>

    <div class="mt-3 flex items-center justify-between border-t border-slate-200 pt-3
                dark:border-slate-700">
      <span class="font-extrabold text-slate-900 dark:text-slate-100">Total</span>
      <span class="font-extrabold text-red-600 dark:text-red-400">{{ mxn(cart.total) }}</span>
    </div>
  </div>
</template>
