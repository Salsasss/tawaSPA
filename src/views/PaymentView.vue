<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'
import { useCurrency } from '@/composables/useCurrency'
import PayPanel from '@/components/summary/PayPanel.vue'
import { createOrden, buildOrdenPayload } from '@/services'
import { ref } from 'vue'

const router = useRouter()
const cart = useCartStore()
const order = useOrderStore()
const { mxn } = useCurrency()

const orderTypeLabel = computed(() => {
  if (order.isDineIn) return '🍽️ Comer Aquí'
  if (order.isTakeaway) return '🛍️ Para Llevar'
  return ''
})

const isSubmitting = ref(false)

async function handleConfirm() {
  if (isSubmitting.value) return
  isSubmitting.value = true

  try {
    // Mesa está hardcodeada a 4 por ahora de acuerdo a FoodMenuView
    const payload = buildOrdenPayload(cart, order, 4)
    const newOrder = await createOrden(payload)
    
    // Guardar el id real que nos devolvió el backend
    order.setOrderNumber(newOrder.id)
    router.push('/end')
  } catch (error) {
    console.error('[PaymentView] Error al crear la orden:', error)
    alert('Ocurrió un error al procesar la orden. Por favor intenta de nuevo.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="min-h-[calc(100vh-200px)]">
    <!-- Botón Atrás -->
    <div class="mb-4">
      <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:scale-[1.02] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          @click="router.push('/summary')"
      >
        ← Volver al Resumen
      </button>
    </div>

    <!-- Encabezado -->
    <div class="mb-6">
      <h1 class="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
        Método de Pago
      </h1>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Selecciona cómo deseas pagar y confirma tu orden.
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
    <div class="grid gap-6 lg:grid-cols-[1fr_380px]">
      <!-- Resumen compacto de la orden -->
      <div
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm
                 dark:border-slate-800 dark:bg-slate-900/60"
      >
        <h2 class="text-base font-bold text-slate-900 dark:text-slate-100">
          Resumen de tu Orden
        </h2>

        <div class="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
          <div
              v-for="item in cart.items"
              :key="item.id"
              class="flex items-center justify-between gap-3 py-3"
          >
            <div class="flex items-center gap-3 min-w-0">
              <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.name"
                  class="h-10 w-10 shrink-0 rounded-lg object-cover"
              />
              <div
                  v-else
                  class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-100 text-xs text-slate-400
                         dark:bg-slate-800 dark:text-slate-500"
              >
                Img
              </div>
              <div class="min-w-0">
                <p class="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {{ item.name }}
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-400">
                  × {{ item.qty }}
                </p>
              </div>
            </div>

            <p class="shrink-0 text-sm font-bold text-slate-800 dark:text-slate-200">
              {{ mxn(item.price * item.qty) }}
            </p>
          </div>
        </div>

        <!-- Totales inline -->
        <div class="mt-4 space-y-2 border-t border-slate-200 pt-4 text-sm dark:border-slate-700">
          <div class="flex justify-between">
            <span class="text-slate-500 dark:text-slate-400">Subtotal</span>
            <span class="font-bold text-slate-800 dark:text-slate-200">{{ mxn(cart.subtotal) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500 dark:text-slate-400">IVA (16%)</span>
            <span class="font-bold text-slate-800 dark:text-slate-200">{{ mxn(cart.iva) }}</span>
          </div>
        </div>

        <!-- Enlace para regresar -->
        <button
            type="button"
            class="mt-5 text-sm font-semibold text-slate-500 underline underline-offset-2
                   hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            @click="router.push('/summary')"
        >
          ← Modificar pedido
        </button>
      </div>

      <!-- Panel de métodos de pago -->
      <div class="lg:sticky lg:top-6 lg:self-start">
        <PayPanel :loading="isSubmitting" @confirm="handleConfirm" />
      </div>
    </div>
  </section>
</template>
