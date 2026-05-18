<script setup>
import QuantityStepper from '@/components/menu/QuantityStepper.vue'
import { useCurrency } from '@/composables/useCurrency'

const props = defineProps({
  item: { type: Object, required: true }, // { id, name, price, image, qty, notes }
})

const emit = defineEmits(['increment', 'decrement', 'remove', 'updateNotes'])

const { mxn } = useCurrency()
</script>

<template>
  <div class="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950/40">
  <img
        v-if="item.image"
        :src="item.image"
        :alt="item.name"
        class="h-14 w-14 rounded-lg object-cover"
    />
    <div v-else class="grid h-14 w-14 place-items-center rounded-lg bg-slate-100 text-slate-400 text-xs">
      Img
    </div>

    <div class="min-w-0 flex-1">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0">
          <p class="truncate text-sm font-extrabold text-slate-900 dark:text-slate-100">{{ item.name }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ mxn(item.price) }}</p>
        </div>

        <button
            type="button"
            class="rounded-lg px-2 py-1 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60"
            @click="emit('remove')"
        >
          Quitar
        </button>
      </div>

      <div class="mt-2">
        <QuantityStepper
            :value="item.qty"
            @increment="emit('increment')"
            @decrement="emit('decrement')"
        />
        <input
            type="text"
            :value="item.notes"
            @input="emit('updateNotes', $event.target.value)"
            placeholder="Notas: ej. sin cebolla, bien frito..."
            class="mt-2 w-full rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:placeholder-slate-500"
        />
      </div>
    </div>
  </div>
</template>
