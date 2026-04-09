<script setup lang="ts">
import Navbar from '~/components/navigation/Navbar.vue'
import SellerCard from '~/components/seller/SellerCard.vue'

const { sellers, categories } = useMarketplace()

const search = ref('')
const selectedCategory = ref<string>('Все')

const filteredSellers = computed(() => {
  return sellers.value.filter((seller) => {
    const matchesSearch =
      seller.name.toLowerCase().includes(search.value.toLowerCase()) ||
      seller.description.toLowerCase().includes(search.value.toLowerCase())

    const matchesCategory =
      selectedCategory.value === 'Все' ||
      seller.categories.includes(selectedCategory.value as never)

    return matchesSearch && matchesCategory
  })
})

const allCategories = computed(() => ['Все', ...categories.value])
</script>

<template>
  <main class="mx-auto min-h-screen max-w-md bg-neutral-950 px-4 pb-24 pt-6 text-white">
    <section>
      <p class="text-sm text-neutral-500">Каталог</p>
      <h1 class="mt-1 text-2xl font-semibold">Поиск продавцов</h1>

      <div class="mt-4">
        <input
          v-model="search"
          type="text"
          placeholder="Поиск продавца..."
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

      <div class="mt-6 space-y-3">
        <SellerCard v-for="seller in filteredSellers" :key="seller.id" :seller="seller" />
      </div>
    </section>

    <Navbar />
  </main>
</template>
