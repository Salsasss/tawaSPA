<script setup>
import logoUrl from "@/assets/logo.png";

defineProps({
  title: { type: String, default: 'MARISCOS "TAWA"' },
  subtitle: { type: String, default: "FRESCURA Y SABOR AL MOMENTO" },
})
</script>

<template>
  <div class="flex items-center gap-3">
    <div class="h-10 w-10 rounded-xl overflow-hidden bg-muted border border-border grid place-items-center shadow-sm">
      <img :src="logoUrl" alt="Logo" class="h-full w-full object-contain p-1" />
    </div>

    <div class="leading-tight">
      <div class="text-base font-extrabold tracking-wide">
        {{ title }}
      </div>
      <div class="text-xs text-text-muted tracking-[0.2em] uppercase">
        {{ subtitle }}
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>