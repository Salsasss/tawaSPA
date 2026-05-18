<script setup>
import { useOrderStore } from '@/stores/order'
import { useCartStore } from '@/stores/cart'
import { useCurrency } from '@/composables/useCurrency'

const order = useOrderStore()
const cart = useCartStore()
const { mxn } = useCurrency()

const tips = [
  { value: 10, label: '10%' },
  { value: 15, label: '15%' },
  { value: 20, label: '20%' },
]

function selectTip(value) {
  order.setTip(value)
}
</script>

<template>
  <div class="mt-6">
    <!-- Título sección propina -->
    <h3 class="text-sm font-bold text-slate-700 dark:text-slate-300">
      Propina (opcional)
    </h3>
    <p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
      ¿Deseas agregar una propina a tu orden?
    </p>

    <!-- Opciones radio-style -->
    <div class="mt-3 flex gap-2">
      <!-- Sin propina -->
      <button
          type="button"
          class="flex-1 rounded-xl border-2 px-3 py-2.5 text-center transition-all duration-200 active:scale-95"
          :class="order.tipPercent === 0
            ? 'border-red-500 bg-red-50 dark:border-red-500 dark:bg-red-500/10'
            : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900/60 dark:hover:border-slate-600'"
          @click="selectTip(0)"
      >
        <span
            class="block text-xs font-extrabold"
            :class="order.tipPercent === 0
              ? 'text-red-600 dark:text-red-400'
              : 'text-slate-700 dark:text-slate-300'"
        >Sin propina</span>
        <span
            class="mt-0.5 block text-xs"
            :class="order.tipPercent === 0
              ? 'text-red-400/70 dark:text-red-400/50'
              : 'text-slate-400 dark:text-slate-500'"
        >$0.00</span>
      </button>

      <!-- Opciones de porcentaje -->
      <button
          v-for="tip in tips"
          :key="tip.value"
          type="button"
          class="flex-1 rounded-xl border-2 px-3 py-2.5 text-center transition-all duration-200 active:scale-95"
          :class="order.tipPercent === tip.value
            ? 'border-red-500 bg-red-50 dark:border-red-500 dark:bg-red-500/10'
            : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900/60 dark:hover:border-slate-600'"
          @click="selectTip(tip.value)"
      >
        <span
            class="block text-sm font-extrabold"
            :class="order.tipPercent === tip.value
              ? 'text-red-600 dark:text-red-400'
              : 'text-slate-700 dark:text-slate-300'"
        >{{ tip.label }}</span>
        <span
            class="mt-0.5 block text-xs"
            :class="order.tipPercent === tip.value
              ? 'text-red-400/70 dark:text-red-400/50'
              : 'text-slate-400 dark:text-slate-500'"
        >{{ mxn(cart.subtotal * tip.value / 100) }}</span>
      </button>
    </div>

    <!-- Indicador radio visual (dot pills) -->
    <div class="mt-2 flex items-center gap-2 justify-center">
      <span
          v-for="(opt, idx) in [{ value: 0 }, ...tips]"
          :key="idx"
          class="inline-block h-1.5 rounded-full transition-all duration-300"
          :class="order.tipPercent === opt.value
            ? 'w-5 bg-red-500'
            : 'w-2 bg-slate-300 dark:bg-slate-600'"
      />
    </div>
  </div>
</template>