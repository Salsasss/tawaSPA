<script setup>
defineProps({
  leftText: { type: String, default: "Horario: 9:00am - 6:00pm" },
  rightText: { type: String, default: "Pago en efectivo y tarjeta" },
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
