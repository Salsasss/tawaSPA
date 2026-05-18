<script setup>
import QuantityStepper from './QuantityStepper.vue'
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useCurrency } from '@/composables/useCurrency'
import { resolveProductImage } from '@/utils/productImages'

const props = defineProps({
  product: { type: Object, required: true }, // { id, name, description, price, image, badge? }
})

const cart = useCartStore()
const { mxn } = useCurrency()

const qty = computed(() => cart.getQtyById(props.product.id))
const productImage = computed(() => resolveProductImage(props.product.image, props.product.name))

function addOne() {
  cart.addItem(props.product)
}
function inc() {
  cart.increment(props.product.id)
}
function dec() {
  cart.decrement(props.product.id)
}
</script>

<template>
  <article
      class="group flex h-full flex-col overflow-hidden rounded-2xl
         border border-slate-200 bg-white shadow-sm
         transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5
         dark:border-slate-800 dark:bg-slate-900/60"
  >
    <!-- Imagen -->
    <div class="relative h-40 overflow-hidden">
      <img
          v-if="productImage"
          :src="productImage"
          :alt="product.name"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div
          v-else
          class="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-400
           dark:bg-slate-800 dark:text-slate-500"
      >
        🍽️
      </div>

      <!-- Overlay gradiente sutil sobre la imagen -->
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />

      <!-- Badge -->
      <span
          v-if="product.badge"
          class="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-sm"
      >
        {{ product.badge }}
      </span>

      <!-- Indicador de cantidad (cuando hay items en carrito) -->
      <span
          v-if="qty > 0"
          class="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-red-600
                 text-xs font-bold text-white shadow-sm"
      >
        {{ qty }}
      </span>
    </div>

    <!-- Contenido -->
    <div class="flex flex-1 flex-col p-4">
      <!-- Nombre y precio -->
      <div class="flex items-start justify-between gap-2">
        <h3 class="text-sm font-extrabold leading-snug text-slate-900 dark:text-slate-100">
          {{ product.name }}
        </h3>
        <span class="shrink-0 text-sm font-bold text-red-600 dark:text-red-400">
          {{ mxn(product.price) }}
        </span>
      </div>

      <!-- Descripción -->
      <p class="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        {{ product.description }}
      </p>

      <!-- Acción -->
      <div class="mt-3">
        <button
            v-if="qty === 0"
            type="button"
            class="w-full rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm
                   transition hover:bg-red-700 active:scale-[0.98]"
            @click="addOne"
        >
          + Agregar
        </button>

        <QuantityStepper v-else :value="qty" @increment="inc" @decrement="dec" />
      </div>
    </div>
  </article>
</template>
