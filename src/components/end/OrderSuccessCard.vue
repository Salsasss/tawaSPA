<script setup>
import { computed } from 'vue'
import { useOrderStore } from '@/stores/order'
import { useCurrency } from '@/composables/useCurrency'

const props = defineProps({
  total: { type: Number, default: 0 },
})

const order = useOrderStore()
const { mxn } = useCurrency()

const orderTypeLabel = computed(() => {
  if (order.isDineIn) return '🍽️ Comer Aquí'
  if (order.isTakeaway) return '🛍️ Para Llevar'
  return ''
})

const emit = defineEmits(['finish'])
</script>

<template>
  <div class="mx-auto max-w-lg">
    <div
        class="relative rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm
               dark:border-slate-800 dark:bg-slate-900/60"
    >
      <!-- Ícono de éxito -->
      <div
          class="mx-auto grid h-16 w-16 place-items-center rounded-full
                 bg-green-100 dark:bg-green-500/20"
      >
        <span class="text-3xl">✅</span>
      </div>

      <!-- Título -->
      <h1 class="mt-5 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
        ¡Orden Recibida!
      </h1>
      <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Gracias por su preferencia. Su orden está siendo preparada.
      </p>

      <!-- Número de orden -->
      <div
          class="mx-auto mt-6 max-w-xs rounded-2xl border-2 border-dashed border-slate-300
                 py-6 dark:border-slate-600"
      >
        <div class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Número de orden
        </div>
        <div class="mt-2 text-5xl font-extrabold text-red-600 dark:text-red-400">
          #{{ order.orderNumber ?? '---' }}
        </div>
      </div>

      <!-- Detalles de la orden -->
      <div
          class="mx-auto mt-5 flex max-w-xs flex-wrap items-center justify-center gap-3 text-xs"
      >

      <!-- Tipo de orden -->
      <span
          v-if="orderTypeLabel"
          class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50
                   px-3 py-1.5 font-semibold text-slate-600
                   dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300"
      >
        {{ orderTypeLabel }}
      </span>

        <!-- Método de pago -->
        <span
            v-if="order.paymentLabel"
            class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50
                   px-3 py-1.5 font-semibold text-slate-600
                   dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300"
        >
          {{ order.paymentMethod === 'cash' ? '💵' : order.paymentMethod === 'card' ? '💳' : '🏪' }}
          {{ order.paymentLabel }}
        </span>

        <!-- Total -->
        <span
            v-if="total > 0"
            class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50
                   px-3 py-1.5 font-semibold text-slate-600
                   dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300"
        >
          💰 {{ mxn(total) }}
        </span>
      </div>

      <!-- Botón finalizar -->
      <button
          type="button"
          class="mt-7 w-full rounded-xl bg-red-600 px-4 py-3.5 text-sm font-extrabold text-white
                 shadow-sm transition hover:bg-red-700"
          @click="emit('finish')"
      >
        Finalizar →
      </button>

      <p class="mt-3 text-xs text-slate-400 dark:text-slate-500">
        Al finalizar, el kiosco regresará a la pantalla de inicio.
      </p>
    </div>
  </div>
</template>