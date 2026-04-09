<script setup lang="ts">
import ProductCard from '~/components/seller/ProductCard.vue'

interface SellerReview {
  id: string
  author: string
  rating: number
  text: string
  createdAt: string
}

const route = useRoute()
const { getSellerBySlug } = useMarketplace()

const DEFAULT_REVIEWS: Record<string, SellerReview[]> = {
  'tech-store': [
    {
      id: 'tech-1',
      author: 'Алия',
      rating: 5,
      text: 'Очень быстро ответили и отправили заказ. Магазин оставил отличное впечатление.',
      createdAt: '2026-04-05',
    },
    {
      id: 'tech-2',
      author: 'Дамир',
      rating: 4,
      text: 'Товар качественный, описание совпало. Хотелось бы чуть быстрее доставку.',
      createdAt: '2026-04-03',
    },
  ],
  'urban-wear': [
    {
      id: 'urban-1',
      author: 'Мадина',
      rating: 5,
      text: 'Размер подошёл идеально, качество ткани очень хорошее.',
      createdAt: '2026-04-06',
    },
  ],
}

const socialItems = [
  {
    key: 'telegram',
    label: 'Telegram',
    shortLabel: 'TG',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    shortLabel: 'IG',
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    shortLabel: 'WA',
  },
  {
    key: 'website',
    label: 'Сайт',
    shortLabel: 'WEB',
  },
] as const

const seller = computed(() => getSellerBySlug(route.params.slug as string))
const localReviews = ref<SellerReview[]>([])
const reviewAuthor = ref('')
const reviewText = ref('')
const reviewRating = ref(5)

const storageKey = computed(() => `tg-marketplace-reviews-${route.params.slug}`)

const baseReviews = computed(() => DEFAULT_REVIEWS[route.params.slug as string] ?? [])

const reviews = computed(() => [...localReviews.value, ...baseReviews.value])

const averageRating = computed(() => {
  const ratingSum = reviews.value.reduce((sum, review) => sum + review.rating, seller.value?.rating ?? 0)
  const ratingCount = reviews.value.length + 1

  return Number((ratingSum / ratingCount).toFixed(1))
})

const ratingStars = computed(() =>
  Array.from({ length: 5 }, (_, index) => index < Math.round(averageRating.value)),
)

const submitReview = () => {
  if (!reviewAuthor.value.trim() || !reviewText.value.trim()) {
    return
  }

  const nextReview: SellerReview = {
    id: `${route.params.slug}-${Date.now()}`,
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
    localReviews.value = JSON.parse(savedReviews) as SellerReview[]
  } catch {
    localReviews.value = []
  }
})

if (!seller.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Продавец не найден',
  })
}
</script>

<template>
  <main class="mx-auto min-h-screen max-w-md bg-neutral-950 px-4 pb-8 pt-24 text-white">
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

    <section class="mt-4">
      <p class="mb-3 text-sm text-neutral-500">Соцсети продавца</p>

      <div class="grid grid-cols-2 gap-3">
        <a
          v-for="item in socialItems"
          :key="item.key"
          :href="seller?.socials[item.key]"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
        >
          <span
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xs font-semibold text-black"
          >
            {{ item.shortLabel }}
          </span>

          <span class="text-sm font-medium text-white">
            {{ item.label }}
          </span>
        </a>
      </div>
    </section>

    <section class="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
      <p class="text-sm text-neutral-500">Репутация магазина</p>

      <div class="mt-2 flex items-end justify-between gap-4">
        <div>
          <div class="flex items-center gap-1">
            <span
              v-for="(isFilled, index) in ratingStars"
              :key="index"
              class="text-xl"
              :class="isFilled ? 'text-amber-300' : 'text-white/20'"
            >
              ★
            </span>
          </div>

          <div class="mt-2 flex items-center gap-2">
            <span class="text-3xl font-semibold text-white">{{ averageRating }}</span>
            <span class="text-sm text-neutral-400">из 5</span>
          </div>
        </div>

        <div class="rounded-2xl bg-white/6 px-4 py-3 text-right">
          <p class="text-xs uppercase tracking-[0.16em] text-neutral-500">Отзывы</p>
          <p class="mt-1 text-lg font-semibold text-white">{{ reviews.length }}</p>
        </div>
      </div>
    </section>

    <section class="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
      <div class="mb-4">
        <p class="text-sm text-neutral-500">Отзывы покупателей</p>
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
          placeholder="Поделитесь впечатлением о магазине"
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
