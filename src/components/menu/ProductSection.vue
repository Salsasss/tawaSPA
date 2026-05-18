<script setup>
import ProductGrid from './ProductGrid.vue'
import ProductCard from './ProductCard.vue'

defineProps({
  title: { type: String, required: true },
  products: { type: Array, default: () => [] },
})
</script>

<template>
  <section class="mt-6">
    <h2 class="text-xl font-extrabold text-text">
      {{ title }}
    </h2>

    <div class="mt-4">
      <ProductGrid>
        <ProductCard v-for="p in products" :key="p.id" :product="p" />
      </ProductGrid>
    </div>
  </section>
</template>
