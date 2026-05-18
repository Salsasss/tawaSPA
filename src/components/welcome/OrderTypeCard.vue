<script setup>
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  value: { type: String, required: true }, // 'dine_in' | 'takeaway'
  icon: { type: String, required: true },  // emoji o string
  iconClass: { type: String, default: "" }, // clases tailwind para el círculo
});

const emit = defineEmits(["select"]);

function handleClick() {
  emit("select", props.value);
}
</script>

<template>
  <button
      type="button"
      class="card p-8 text-left hover:brightness-95 active:scale-[0.99] transition"
      @click="handleClick"
  >
    <span
        class="h-14 w-14 rounded-full grid place-items-center mb-4"
        :class="iconClass"
    >
      <span class="text-2xl">{{ icon }}</span>
    </span>

    <span class="text-xl font-bold">{{ title }}</span>
    <br />
    <span class="text-sm text-text-muted mt-1">{{ subtitle }}</span>
  </button>
</template>
