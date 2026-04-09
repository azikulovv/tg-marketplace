<script setup lang="ts">
defineProps<{
  product: {
    id: number
    title: string
    price: number
    rating: number
    reviewCount: number
    image: string
    category: string
    description: string
    sellerName?: string
    sellerSlug?: string
  }
}>()

const formatPrice = (value: number) => new Intl.NumberFormat('ru-RU').format(value) + ' ₸'

const buyProduct = (title: string) => {
  if (import.meta.client) {
    alert(`Покупка товара: ${title}`)
  }
}
</script>

<template>
  <NuxtLink
    :to="`/product/${product.id}`"
    class="block overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:bg-white/10"
  >
    <div class="aspect-video w-full overflow-hidden">
      <img :src="product.image" :alt="product.title" class="h-full w-full object-cover" />
    </div>

    <div class="p-4">
      <div class="mb-2 flex items-start justify-between gap-3">
        <div>
          <h3 class="text-base font-semibold text-white">
            {{ product.title }}
          </h3>
          <p v-if="product.sellerName" class="mt-1 text-sm text-neutral-400">
            {{ product.sellerName }}
          </p>
        </div>

        <div class="flex flex-col items-end gap-2">
          <span class="rounded-full bg-white/8 px-2.5 py-1 text-xs text-neutral-300">
            {{ product.category }}
          </span>
          <span class="rounded-full bg-amber-500/15 px-2.5 py-1 text-xs text-amber-300">
            ★ {{ product.rating }}
          </span>
        </div>
      </div>

      <p class="line-clamp-2 text-sm text-neutral-400">
        {{ product.description }}
      </p>

      <div class="mt-4 flex items-center justify-between gap-3">
        <div>
          <span class="text-lg font-semibold text-white">
            {{ formatPrice(product.price) }}
          </span>
          <p class="mt-1 text-xs text-neutral-500">{{ product.reviewCount }} отзывов</p>
        </div>

        <button
          class="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
          @click.prevent="buyProduct(product.title)"
        >
          Купить
        </button>
      </div>
    </div>
  </NuxtLink>
</template>
