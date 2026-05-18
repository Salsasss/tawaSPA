<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  order: { type: Object, required: true },
  status: { type: String, required: true }, // 'new' | 'preparing' | 'completed'
});

const emit = defineEmits(["action", "undo", "dragstart", "toggleItem"]);

/* ── Timer ── */
const now = ref(Date.now());
let timer = null;

onMounted(() => {
  timer = setInterval(() => (now.value = Date.now()), 1000);
});
onUnmounted(() => clearInterval(timer));

const elapsedLabel = computed(() => {
  const base =
    props.order.status === "completed"
      ? props.order.completedAt
      : props.order.startedAt ?? props.order.createdAt;

  if (props.order.status === "completed" && props.order.completedAt) {
    // Show total time from creation to completion
    const diff = props.order.completedAt - props.order.createdAt;
    const mins = Math.floor(diff / 60_000);
    return `${mins}m`;
  }

  const diff = now.value - base;
  const mins = Math.floor(diff / 60_000);
  const secs = Math.floor((diff % 60_000) / 1000);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
});

const isUrgent = computed(() => {
  if (props.order.status === "completed") return false;
  const base = props.order.startedAt ?? props.order.createdAt;
  return now.value - base > 5 * 60_000; // >5 min
});

/* ── Order type badge ── */
const isDineIn = computed(() => props.order.orderType === "dine_in");
const typeLabel = computed(() => (isDineIn.value ? "Comer aquí" : "Para llevar"));
const typeIcon = computed(() => (isDineIn.value ? "🍽" : "📦"));

/* ── Action button config ── */
const actionConfig = computed(() => {
  if (props.status === "new") {
    return {
      label: "Iniciar Preparación",
      icon: "▶",
      classes: "bg-primary text-white hover:brightness-110",
    };
  }
  if (props.status === "preparing") {
    return {
      label: "Completar Orden",
      icon: "✅",
      classes: "bg-emerald-500 text-white hover:bg-emerald-600",
    };
  }
  return null;
});

/* ── Border color ── */
const borderColor = computed(() => {
  if (props.status === "new") return "border-l-red-500";
  if (props.status === "preparing") return "border-l-amber-400";
  return "border-l-emerald-500";
});

/* ── Drag ── */
const canComplete = computed(() => {
  if (props.status !== 'preparing') return true;
  return props.order.items.every(item => item.completed);
});

function onDragStart(e) {
  if (props.status === 'preparing' && !canComplete.value) {
    e.preventDefault();
    return;
  }
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", props.order.id);
  emit("dragstart", props.order.id);
}
</script>

<template>
  <div
    class="kitchen-order-card group relative border border-border bg-surface
           transition-all duration-200 hover:shadow-lg cursor-grab active:cursor-grabbing
           border-l-4"
    :class="[borderColor]"
    draggable="true"
    @dragstart="onDragStart"
  >
    <!-- ── Completed state (compact) ── -->
    <template v-if="status === 'completed'">
      <div class="px-4 py-3">
        <div class="flex items-start justify-between">
          <span class="font-bold text-sm text-text">{{ order.location }}</span>
          <span class="text-xs text-text-muted">{{ elapsedLabel }}</span>
        </div>
        <div class="mt-1.5 space-y-0.5">
          <div
            v-for="(item, i) in order.items"
            :key="i"
            class="text-xs text-text-muted"
          >
            {{ item.qty }}× {{ item.name }}
          </div>
        </div>
        <div class="mt-2 flex justify-end">
          <button
            class="text-xs text-text-muted hover:text-primary transition flex items-center gap-1"
            @click="emit('undo', order.id)"
          >
            <span>↩</span> Deshacer
          </button>
        </div>
      </div>
    </template>

    <!-- ── New / Preparing (full card) ── -->
    <template v-else>
      <div class="px-4 pt-4 pb-3">
        <!-- Header -->
        <div class="flex items-start justify-between">
          <div>
            <span class="font-bold text-base text-text">{{ order.location }}</span>
            <div class="mt-1 flex items-center gap-1.5">
              <span
                class="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold"
                :class="
                  isDineIn
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                "
              >
                <span>{{ typeIcon }}</span> {{ typeLabel }}
              </span>
            </div>
          </div>
          <div class="text-right">
            <span class="text-lg font-extrabold text-primary">#{{ order.orderNumber }}</span>
            <div
              class="text-xs font-mono mt-0.5"
              :class="isUrgent ? 'text-red-500 font-bold animate-pulse' : 'text-text-muted'"
            >
              {{ elapsedLabel }}
            </div>
          </div>
        </div>

        <!-- Items list -->
        <div class="mt-3 space-y-1.5">
          <div
            v-for="(item, i) in order.items"
            :key="i"
            class="flex items-start gap-2 text-sm transition-colors rounded-lg"
            :class="{
              'cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 p-2 -mx-2': status === 'preparing'
            }"
            @click.stop="status === 'preparing' && emit('toggleItem', i)"
            @mousedown.stop
          >
            <!-- Completion indicator for preparing -->
            <span
              v-if="status === 'preparing'"
              class="mt-0.5 h-4 w-4 rounded-full border-2 flex-shrink-0 grid place-items-center text-[10px]"
              :class="
                item.completed
                  ? 'border-emerald-500 bg-emerald-500 text-white'
                  : 'border-border bg-transparent'
              "
            >
              <span v-if="item.completed">✓</span>
            </span>

            <div>
              <span class="font-medium text-text">{{ item.qty }}× {{ item.name }}</span>
              <div v-if="item.notes" class="text-xs text-primary italic mt-0.5">
                {{ item.notes }}
              </div>
            </div>
          </div>
        </div>

        <!-- Action button -->
        <button
          v-if="actionConfig"
          :disabled="status === 'preparing' && !canComplete"
          class="mt-4 w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3
                 text-sm font-bold transition-all duration-200"
          :class="[
            status === 'preparing' && !canComplete
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500'
              : status === 'new'
                ? 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white active:scale-[0.98] dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-primary dark:hover:text-white'
                : actionConfig.classes + ' active:scale-[0.98]'
          ]"
          @click="emit('action', order.id)"
        >
          <span>{{ actionConfig.icon }}</span>
          {{ actionConfig.label }}
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.kitchen-order-card {
  user-select: none;
}
.kitchen-order-card:active {
  opacity: 0.8;
  transform: rotate(1deg) scale(1.02);
}
</style>
