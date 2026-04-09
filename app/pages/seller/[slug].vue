<script setup lang="ts">
import ProductCard from '~/components/seller/ProductCard.vue'

const route = useRoute()
const { getSellerBySlug } = useMarketplace()

const seller = computed(() => getSellerBySlug(route.params.slug as string))

if (!seller.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Продавец не найден',
  })
}
</script>

<template>
  <main class="mx-auto min-h-screen max-w-md bg-neutral-950 px-4 pb-8 pt-6 text-white">
    <NuxtLink to="/search" class="mb-4 inline-flex items-center gap-2 text-sm text-neutral-400">
      ← Назад
    </NuxtLink>

    <section class="rounded-3xl border border-white/10 bg-white/5 p-4">
      <div class="flex items-start gap-4">
        <img :src="seller?.avatar" :alt="seller?.name" class="h-16 w-16 rounded-2xl object-cover" />

        <div class="min-w-0 flex-1">
          <h1 class="text-xl font-semibold">
            {{ seller?.name }}
          </h1>
          <p class="mt-1 text-sm text-neutral-400">
            {{ seller?.description }}
          </p>

          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="category in seller?.categories"
              :key="category"
              class="rounded-full bg-white/6 px-2.5 py-1 text-xs text-neutral-300"
            >
              {{ category }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-6">
      <div class="mb-4">
        <p class="text-sm text-neutral-500">Ассортимент</p>
        <h2 class="mt-1 text-xl font-semibold">Товары</h2>
      </div>

      <div class="space-y-4">
        <ProductCard v-for="product in seller?.products" :key="product.id" :product="product" />
      </div>
    </section>
  </main>
</template>
