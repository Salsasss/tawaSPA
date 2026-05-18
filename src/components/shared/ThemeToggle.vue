<script setup>
import { useTheme } from "@/composables/useTheme.js"
const { isDark, toggleTheme} = useTheme();
</script>

<template>
  <button
      type="button"
      class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface shadow-sm hover:brightness-95 active:scale-[0.98] transition"
      :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
      @click="toggleTheme"
  >
    <span class="text-lg leading-none">
      {{ isDark ? "☀️" : "🌙" }}
    </span>
  </button>
</template>

<style scoped>

</style>