<script setup lang="ts">
interface ProductReview {
  id: string
  author: string
  rating: number
  text: string
  createdAt: string
}

const route = useRoute()
const { getProductById } = useMarketplace()

const DEFAULT_PRODUCT_REVIEWS: Record<number, ProductReview[]> = {
  101: [
    {
      id: 'product-101-1',
      author: 'Арман',
      rating: 5,
      text: 'Звук отличный, заряд держат долго. Полностью доволен покупкой.',
      createdAt: '2026-04-06',
    },
    {
      id: 'product-101-2',
      author: 'Сабина',
      rating: 4,
      text: 'Хорошие наушники, удобно сидят. Иногда не хватает громкости.',
      createdAt: '2026-04-02',
    },
  ],
  201: [
    {
      id: 'product-201-1',
      author: 'Ерасыл',
      rating: 5,
      text: 'Очень комфортное худи, ткань приятная и размер подошёл.',
      createdAt: '2026-04-07',
    },
  ],
}

const product = computed(() => getProductById(Number(route.params.id)))
const localReviews = ref<ProductReview[]>([])
const reviewAuthor = ref('')
const reviewText = ref('')
const reviewRating = ref(5)

const storageKey = computed(() => `tg-marketplace-product-reviews-${route.params.id}`)
const baseReviews = computed(() => DEFAULT_PRODUCT_REVIEWS[Number(route.params.id)] ?? [])
const reviews = computed(() => [...localReviews.value, ...baseReviews.value])

const formatPrice = (value: number) => new Intl.NumberFormat('ru-RU').format(value) + ' ₸'

const productStars = computed(() => {
  const rating = averageRating.value
  return Array.from({ length: 5 }, (_, index) => index < Math.round(rating))
})

const averageRating = computed(() => {
  const ratingSum = reviews.value.reduce(
    (sum, review) => sum + review.rating,
    product.value?.rating ?? 0,
  )
  const ratingCount = reviews.value.length + 1

  return Number((ratingSum / ratingCount).toFixed(1))
})

const totalReviewCount = computed(() => (product.value?.reviewCount ?? 0) + reviews.value.length)

const buyProduct = () => {
  if (import.meta.client && product.value) {
    alert(`Покупка товара: ${product.value.title}`)
  }
}

const submitReview = () => {
  if (!reviewAuthor.value.trim() || !reviewText.value.trim()) {
    return
  }

  const nextReview: ProductReview = {
    id: `product-${route.params.id}-${Date.now()}`,
    author: reviewAuthor.value.trim(),
    rating: reviewRating.value,
    text: reviewText.value.trim(),
    createdAt: new Date().toISOString().slice(0, 10),
  }

  localReviews.value = [nextReview, ...localReviews.value]

  if (import.meta.client) {
    localStorage.setItem(storageKey.value, JSON.stringify(localReviews.value))
  }

  reviewAuthor.value = ''
  reviewText.value = ''
  reviewRating.value = 5
}

onMounted(() => {
  if (!import.meta.client) {
    return
  }

  const savedReviews = localStorage.getItem(storageKey.value)

  if (!savedReviews) {
    return
  }

  try {
    localReviews.value = JSON.parse(savedReviews) as ProductReview[]
  } catch {
    localReviews.value = []
  }
})

if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Товар не найден',
  })
}
</script>

<template>
  <main class="mx-auto min-h-screen max-w-md bg-neutral-950 px-4 pb-8 pt-24 text-white">
    <NuxtLink to="/search" class="mb-4 inline-flex items-center gap-2 text-sm text-neutral-400">
      ← Назад
    </NuxtLink>

    <section class="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div class="aspect-video w-full overflow-hidden">
        <img :src="product?.image" :alt="product?.title" class="h-full w-full object-cover" />
      </div>

      <div class="p-5">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-sm text-neutral-500">Карточка товара</p>
            <h1 class="mt-1 text-2xl font-semibold">{{ product?.title }}</h1>
          </div>

          <span class="rounded-full bg-white/8 px-3 py-1 text-xs text-neutral-300">
            {{ product?.category }}
          </span>
        </div>

        <NuxtLink
          v-if="product?.sellerSlug"
          :to="`/seller/${product.sellerSlug}`"
          class="mt-3 inline-flex items-center gap-2 text-sm text-neutral-400 transition hover:text-white"
        >
          Продавец: {{ product?.sellerName }}
        </NuxtLink>

        <div class="mt-5">
          <p class="text-sm text-neutral-500">Описание</p>
          <p class="mt-2 text-sm leading-6 text-neutral-300">
            {{ product?.description }}
          </p>
        </div>

        <div
          class="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-4 text-black"
        >
          <div>
            <p class="text-xs uppercase tracking-[0.18em] text-black/60">Цена</p>
            <p class="mt-1 text-2xl font-semibold">{{ formatPrice(product?.price ?? 0) }}</p>
          </div>

          <button
            type="button"
            class="rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
            @click="buyProduct"
          >
            Купить товар
          </button>
        </div>
      </div>
    </section>

    <div class="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
      <p class="text-sm text-neutral-500">Рейтинг товара</p>

      <div class="mt-2 flex items-center gap-1">
        <span
          v-for="(isFilled, index) in productStars"
          :key="index"
          class="text-xl"
          :class="isFilled ? 'text-amber-300' : 'text-white/20'"
        >
          ★
        </span>
      </div>

      <div class="mt-2 flex items-end justify-between gap-4">
        <div class="flex items-center gap-2">
          <span class="text-3xl font-semibold text-white">{{ averageRating }}</span>
          <span class="text-sm text-neutral-400">из 5</span>
        </div>

        <span class="rounded-full bg-white/6 px-3 py-1 text-sm text-neutral-300">
          {{ totalReviewCount }} отзывов
        </span>
      </div>
    </div>

    <section class="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
      <div class="mb-4">
        <p class="text-sm text-neutral-500">Отзывы о товаре</p>
        <h2 class="mt-1 text-xl font-semibold">Оставить отзыв</h2>
      </div>

      <div class="space-y-3">
        <input
          v-model="reviewAuthor"
          type="text"
          placeholder="Ваше имя"
          class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500"
        />

        <div>
          <p class="mb-2 text-sm text-neutral-400">Оценка</p>
          <div class="flex gap-2">
            <button
              v-for="rating in 5"
              :key="rating"
              type="button"
              class="flex h-11 w-11 items-center justify-center rounded-2xl border text-lg transition"
              :class="
                reviewRating === rating
                  ? 'border-white bg-white text-black'
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              "
              @click="reviewRating = rating"
            >
              {{ rating }}
            </button>
          </div>
        </div>

        <textarea
          v-model="reviewText"
          rows="4"
          placeholder="Поделитесь впечатлением о товаре"
          class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500"
        />

        <button
          type="button"
          class="w-full rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
          @click="submitReview"
        >
          Отправить отзыв
        </button>
      </div>

      <div class="mt-6 space-y-3">
        <article
          v-for="review in reviews"
          :key="review.id"
          class="rounded-2xl border border-white/10 bg-black/20 p-4"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 class="text-sm font-semibold text-white">{{ review.author }}</h3>
              <p class="mt-1 text-xs text-neutral-500">{{ review.createdAt }}</p>
            </div>

            <div class="rounded-full bg-amber-500/15 px-2.5 py-1 text-xs text-amber-300">
              ★ {{ review.rating }}/5
            </div>
          </div>

          <p class="mt-3 text-sm leading-6 text-neutral-300">
            {{ review.text }}
          </p>
        </article>
      </div>
    </section>
  </main>
</template>
