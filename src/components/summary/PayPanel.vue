<script setup>
import { computed } from 'vue'
import { useOrderStore } from '@/stores/order'
import { useCartStore } from '@/stores/cart'
import { useCurrency } from '@/composables/useCurrency'
import PayMethodButton from './PayMethodButton.vue'
import TipSelector from './TipSelector.vue'

const order = useOrderStore()
const cart = useCartStore()
const { mxn } = useCurrency()

const props = defineProps({
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['confirm'])

const methods = [
  { id: 'cash', icon: '💵', label: 'Efectivo', subtitle: 'Pago al recibir su orden' },
  { id: 'card', icon: '💳', label: 'Tarjeta', subtitle: 'Débito o crédito' },
  { id: 'counter', icon: '🏪', label: 'Transferencia', subtitle: 'Pago con transferencia' },
]

const tipAmount = computed(() => Math.round(cart.subtotal * (order.tipPercent / 100) * 100) / 100)
const grandTotal = computed(() => Math.round((cart.subtotal + cart.iva + tipAmount.value) * 100) / 100)

const canConfirm = computed(() => order.hasPaymentMethod && cart.items.length > 0)

function selectMethod(id) {
  order.setPaymentMethod(id)
}

function handleConfirm() {
  if (!canConfirm.value) return
  emit('confirm')
}
</script>

<template>
  <div
      class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm
             dark:border-slate-800 dark:bg-slate-900/60"
  >
    <!-- Título -->
    <h2 class="text-lg font-extrabold text-slate-900 dark:text-slate-100">
      Método de Pago
    </h2>
    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
      Selecciona cómo deseas pagar tu orden.
    </p>

    <!-- Opciones de pago -->
    <div class="mt-5 space-y-3">
      <PayMethodButton
          v-for="m in methods"
          :key="m.id"
          :icon="m.icon"
          :label="m.label"
          :subtitle="m.subtitle"
          :selected="order.paymentMethod === m.id"
          @select="selectMethod(m.id)"
      />
    </div>

    <!-- Separador -->
    <div class="mt-6 border-t border-slate-200 dark:border-slate-700" />

    <!-- Selector de propina -->
    <TipSelector />

    <!-- Separador -->
    <div class="mt-6 border-t border-slate-200 dark:border-slate-700" />

    <!-- Resumen compacto del total -->
    <div class="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4
                dark:border-slate-700 dark:bg-slate-800/50">
      <!-- Subtotal + IVA -->
      <div class="space-y-1.5 text-sm">
        <div class="flex items-center justify-between">
          <span class="text-slate-500 dark:text-slate-400">Subtotal</span>
          <span class="font-semibold text-slate-700 dark:text-slate-300">{{ mxn(cart.subtotal) }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-slate-500 dark:text-slate-400">IVA (16%)</span>
          <span class="font-semibold text-slate-700 dark:text-slate-300">{{ mxn(cart.iva) }}</span>
        </div>
        <div v-if="tipAmount > 0" class="flex items-center justify-between">
          <span class="text-slate-500 dark:text-slate-400">Propina ({{ order.tipPercent }}%)</span>
          <span class="font-semibold text-slate-700 dark:text-slate-300">{{ mxn(tipAmount) }}</span>
        </div>
      </div>
      <!-- Total final -->
      <div class="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-600">
        <span class="text-sm text-slate-500 dark:text-slate-400">Total a pagar</span>
        <span class="text-lg font-extrabold text-red-600 dark:text-red-400">{{ mxn(grandTotal) }}</span>
      </div>
    </div>

    <!-- Botón confirmar -->
    <button
        type="button"
        class="mt-5 w-full rounded-xl bg-red-600 px-4 py-3.5 text-sm font-extrabold text-white shadow-sm
               transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="!canConfirm || props.loading"
        @click="handleConfirm"
    >
      <span v-if="props.loading">Procesando...</span>
      <span v-else>Confirmar Orden →</span>
    </button>

    <p v-if="!order.hasPaymentMethod" class="mt-3 text-center text-xs text-slate-400 dark:text-slate-500">
      Selecciona un método de pago para continuar
    </p>
  </div>
</template>
