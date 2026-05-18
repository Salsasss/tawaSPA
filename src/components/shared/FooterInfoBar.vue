<script setup>
defineProps({
  leftText: { type: String, default: "Horario: 9:00 am - 6:00 pm" },
  rightText: { type: String, default: "Aceptamos efectivo, tarjeta y transferencia" },
});
</script>

<template>
  <footer class="mt-10">
    <div class="flex items-center justify-between gap-4 text-xs text-text-muted">
      <div class="flex items-center gap-2">
        <span aria-hidden="true">🕘</span>
        <span>{{ leftText }}</span>
      </div>

      <div class="flex items-center gap-2">
        <span aria-hidden="true">💵</span>
        <span>{{ rightText }}</span>
      </div>
    </div>
  </footer>
</template>
