<script setup>
import QuantityStepper from '@/components/menu/QuantityStepper.vue'
import { useCurrency } from '@/composables/useCurrency'
import { resolveProductImage } from '@/utils/productImages'

const props = defineProps({
  item: { type: Object, required: true }, // { id, name, price, image, qty, notes, ingredients? }
})

const emit = defineEmits(['increment', 'decrement', 'remove'])

const { mxn } = useCurrency()

// Resolver imagen: usa la del item o busca localmente por nombre
const resolvedImage = (item) => resolveProductImage(item.image, item.name)
</script>

<template>
  <div
      class="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition
             dark:border-slate-800 dark:bg-slate-900/60"
  >
    <!-- Imagen -->
    <img
        v-if="resolvedImage(item)"
        :src="resolvedImage(item)"
        :alt="item.name"
        class="h-16 w-16 shrink-0 rounded-xl object-cover"
    />
    <div
        v-else
        class="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-slate-100 text-xs text-slate-400
               dark:bg-slate-800 dark:text-slate-500"
    >
      Img
    </div>

    <!-- Info -->
    <div class="min-w-0 flex-1">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0">
          <p class="truncate text-sm font-extrabold text-slate-900 dark:text-slate-100">
            {{ item.name }}
          </p>
          <p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {{ mxn(item.price) }} c/u
          </p>

          <!-- Lista de ingredientes -->
          <div
              v-if="item.ingredients && item.ingredients.length"
              class="mt-1.5 flex flex-wrap gap-1"
          >
            <span
                v-for="ing in item.ingredients"
                :key="ing.id"
                class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50
                       px-2 py-0.5 text-[10px] font-medium text-slate-500
                       dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400"
            >
              {{ ing.nombre }}
            </span>
          </div>
        </div>

        <button
            type="button"
            class="shrink-0 rounded-lg px-2 py-1 text-xs font-bold text-red-500 hover:bg-red-50
                   dark:text-red-400 dark:hover:bg-red-500/10"
            @click="emit('remove')"
        >
          Quitar
        </button>
      </div>

      <div class="mt-3 flex items-center justify-between gap-4">
        <!-- Stepper -->
        <div class="w-36">
          <QuantityStepper
              :value="item.qty"
              @increment="emit('increment')"
              @decrement="emit('decrement')"
          />
        </div>

        <!-- Subtotal del producto -->
        <p class="whitespace-nowrap text-sm font-extrabold text-slate-900 dark:text-slate-100">
          {{ mxn(item.price * item.qty) }}
        </p>
      </div>
    </div>
  </div>
</template>