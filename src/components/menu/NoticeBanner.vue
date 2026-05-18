<script setup>
defineProps({
  text: { type: String, default: 'Nota: Los alimentos se preparan al momento. Agradecemos su paciencia.' },
})
</script>

<template>
  <div class="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900
              dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
    <div class="mt-0.5 h-6 w-1 shrink-0 rounded-full bg-amber-400 dark:bg-amber-500"></div>
    <p class="text-sm leading-relaxed">
      <span class="font-semibold">Nota:</span>
      <span class="ml-1">{{ text.replace(/^Nota:\s*/i, '') }}</span>
    </p>
  </div>
</template>
