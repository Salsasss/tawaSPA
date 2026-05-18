<script setup>
defineProps({
  title: { type: String, default: 'MARISCOS "TAWA"' },
  subtitle: { type: String, default: "FRESCURA Y SABOR AL MOMENTO" },
})
</script>

<template>
  <div class="flex items-center gap-3">
    <div class="h-10 w-10 rounded-xl bg-muted border border-border grid place-items-center">
      <span class="text-sm font-bold">🦐</span>
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