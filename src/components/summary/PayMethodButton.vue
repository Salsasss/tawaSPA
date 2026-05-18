<script setup>
const props = defineProps({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  subtitle: { type: String, default: '' },
  selected: { type: Boolean, default: false },
})

const emit = defineEmits(['select'])
</script>

<template>
  <button
      type="button"
      class="group flex w-full items-center gap-4 rounded-2xl border-2 p-5 text-left transition-all
             duration-200 hover:shadow-md active:scale-[0.98]"
      :class="selected
        ? 'border-red-500 bg-red-50 shadow-sm dark:border-red-500 dark:bg-red-500/10'
        : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900/60 dark:hover:border-slate-600'"
      @click="emit('select')"
  >
    <!-- Icono -->
    <span
        class="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-2xl transition-colors"
        :class="selected
          ? 'bg-red-100 dark:bg-red-500/20'
          : 'bg-slate-100 dark:bg-slate-800'"
    >
      {{ icon }}
    </span>

    <!-- Textos -->
    <div class="min-w-0 flex-1">
      <p
          class="text-base font-bold transition-colors"
          :class="selected
            ? 'text-red-700 dark:text-red-400'
            : 'text-slate-900 dark:text-slate-100'"
      >
        {{ label }}
      </p>
      <p
          v-if="subtitle"
          class="mt-0.5 text-xs"
          :class="selected
            ? 'text-red-500/70 dark:text-red-400/60'
            : 'text-slate-500 dark:text-slate-400'"
      >
        {{ subtitle }}
      </p>
    </div>

    <!-- Indicador de selección -->
    <span
        class="grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-all"
        :class="selected
          ? 'border-red-500 bg-red-500 dark:border-red-400 dark:bg-red-500'
          : 'border-slate-300 dark:border-slate-600'"
    >
      <span v-if="selected" class="text-xs text-white">✓</span>
    </span>
  </button>
</template>