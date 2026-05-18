<script setup>
defineProps({
  value: { type: Number, default: 0 },
})
const emit = defineEmits(['increment', 'decrement'])
</script>

<template>
  <div class="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2
            dark:border-slate-700 dark:bg-slate-800/60">

    <button
        type="button"
        class="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-sm font-bold text-slate-900
               transition hover:bg-slate-200 active:scale-95
               dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
        @click="emit('decrement')"
        aria-label="Disminuir"
    >
      −
    </button>

    <span class="min-w-[2rem] text-center text-sm font-extrabold text-slate-900 dark:text-slate-100">
      {{ value }}
    </span>

    <button
        type="button"
        class="grid h-9 w-9 place-items-center rounded-lg bg-red-600 text-sm font-bold text-white
               transition hover:bg-red-700 active:scale-95"
        @click="emit('increment')"
        aria-label="Aumentar"
    >
      +
    </button>
  </div>
</template>
