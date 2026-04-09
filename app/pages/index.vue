<script setup lang="ts">
import SellerCard from '~/components/seller/SellerCard.vue'
import ProductCard from '~/components/seller/ProductCard.vue'
import Navbar from '~/components/navigation/Navbar.vue'

const { topSellers, recommendedProducts } = useMarketplace()
</script>

<template>
  <main class="mx-auto min-h-screen max-w-md bg-neutral-950 px-4 pb-24 pt-24 text-white">
    <section class="mb-8">
      <div class="mb-4">
        <h1 class="mt-1 text-2xl font-semibold">Главная</h1>
      </div>

      <div class="rounded-3xl border border-white/10 bg-white/5 p-4">
        <p class="text-sm text-neutral-400">Лучшие продавцы</p>
        <h2 class="mt-1 text-xl font-semibold">Топ 3 продавца</h2>

        <div class="mt-4 space-y-3">
          <SellerCard v-for="seller in topSellers" :key="seller.id" :seller="seller" />
        </div>
      </div>
    </section>

    <section>
      <div class="mb-4">
        <p class="text-sm text-neutral-500">Подборка</p>
        <h2 class="mt-1 text-xl font-semibold">Рекомендации</h2>
      </div>

      <div class="space-y-4">
        <ProductCard v-for="product in recommendedProducts" :key="product.id" :product="product" />
      </div>
    </section>

    <Navbar />
  </main>
</template>
