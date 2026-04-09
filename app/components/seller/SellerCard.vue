<script setup lang="ts">
import type { Seller } from '~/types/marketplace'

defineProps<{
  seller: Seller
}>()
</script>

<template>
  <NuxtLink
    :to="`/seller/${seller.slug}`"
    class="block rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
  >
    <div class="flex items-start gap-3">
      <img :src="seller.avatar" :alt="seller.name" class="h-14 w-14 rounded-2xl object-cover" />

      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="truncate text-base font-semibold text-white">
              {{ seller.name }}
            </h3>
            <p class="mt-1 line-clamp-2 text-sm text-neutral-400">
              {{ seller.description }}
            </p>
          </div>

          <div class="rounded-full shrink-0 bg-emerald-500/15 px-2 py-1 text-xs text-emerald-300">
            ★ {{ seller.rating }}
          </div>
        </div>

        <div class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="category in seller.categories"
            :key="category"
            class="rounded-full bg-white/6 px-2.5 py-1 text-xs text-neutral-300"
          >
            {{ category }}
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
