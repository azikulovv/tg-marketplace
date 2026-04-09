<script setup lang="ts">
import Navbar from '~/components/navigation/Navbar.vue'
import ProductCard from '~/components/seller/ProductCard.vue'
import SellerCard from '~/components/seller/SellerCard.vue'

const { sellers, categories, recommendedProducts } = useMarketplace()

const search = ref('')
const selectedCategory = ref<string>('Все')
const normalizedSearch = computed(() => search.value.trim().toLowerCase())

const filteredSellers = computed(() => {
  return sellers.value.filter((seller) => {
    const matchesSearch =
      !normalizedSearch.value ||
      seller.name.toLowerCase().includes(normalizedSearch.value) ||
      seller.description.toLowerCase().includes(normalizedSearch.value)

    const matchesCategory =
      selectedCategory.value === 'Все' ||
      seller.categories.includes(selectedCategory.value as never)

    return matchesSearch && matchesCategory
  })
})

const filteredProducts = computed(() => {
  return recommendedProducts.value.filter((product) => {
    const matchesSearch =
      !normalizedSearch.value ||
      product.title.toLowerCase().includes(normalizedSearch.value) ||
      product.description.toLowerCase().includes(normalizedSearch.value) ||
      product.sellerName?.toLowerCase().includes(normalizedSearch.value)

    const matchesCategory =
      selectedCategory.value === 'Все' || product.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})

const combinedResults = computed(() => [
  ...filteredSellers.value.map((seller) => ({
    type: 'seller' as const,
    id: `seller-${seller.id}`,
    seller,
  })),
  ...filteredProducts.value.map((product) => ({
    type: 'product' as const,
    id: `product-${product.id}`,
    product,
  })),
])

const allCategories = computed(() => ['Все', ...categories.value])
</script>

<template>
  <main class="mx-auto min-h-screen max-w-md bg-neutral-950 px-4 pb-24 pt-24 text-white">
    <section>
      <p class="text-sm text-neutral-500">Каталог</p>
      <h1 class="mt-1 text-2xl font-semibold">Поиск продавцов и товаров</h1>

      <div class="mt-4">
        <input
          v-model="search"
          type="text"
          placeholder="Поиск продавца или товара..."
          class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500"
        />
      </div>

      <div class="mt-4 flex gap-2 overflow-x-auto pb-2">
        <button
          v-for="category in allCategories"
          :key="category"
          class="shrink-0 rounded-full px-4 py-2 text-sm transition"
          :class="
            selectedCategory === category ? 'bg-white text-black' : 'bg-white/6 text-neutral-300'
          "
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <div class="mt-6">
        <div class="mb-4">
          <p class="text-sm text-neutral-500">Результаты</p>
          <h2 class="mt-1 text-xl font-semibold">Продавцы и товары вместе</h2>
        </div>

        <div class="space-y-4">
          <template v-for="item in combinedResults" :key="item.id">
            <SellerCard v-if="item.type === 'seller'" :seller="item.seller" />
            <ProductCard v-else :product="item.product" />
          </template>
        </div>

        <div
          v-if="!combinedResults.length"
          class="mt-4 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-neutral-400"
        >
          По вашему запросу ничего не найдено.
        </div>
      </div>
    </section>

    <Navbar />
  </main>
</template>
