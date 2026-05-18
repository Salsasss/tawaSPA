<script setup>
const props = defineProps({
  modelValue: { type: String, required: true },
  categories: { type: Array, default: () => [] }, // [{ id, label, icon? }]
})
const emit = defineEmits(['update:modelValue'])

function select(id) {
  emit('update:modelValue', id)
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <button
        v-for="c in categories"
        :key="c.id"
        type="button"
        @click="select(c.id)"
        class="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition"
        :class="c.id === modelValue
        ? 'border-transparent bg-red-600 text-white shadow-sm'
        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:bg-slate-800/60'"

    >
      <span v-if="c.icon" class="text-base leading-none">{{ c.icon }}</span>
      <span>{{ c.label }}</span>
    </button>
  </div>
</template>
