<script setup lang="ts">
const { selectedCity, openCityModal } = useCitySelection()
</script>

<template>
  <header
    class="fixed left-0 right-0 top-0 z-40 mx-auto w-full max-w-md border-b border-white/10 bg-neutral-950/90 backdrop-blur-xl"
  >
    <div class="flex items-center justify-between px-4 py-4">
      <div>
        <h1 class="mt-1 text-lg font-semibold text-white">App Name</h1>
      </div>

      <button
        type="button"
        class="flex min-w-39 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-left transition hover:bg-white/10"
        @click="openCityModal"
      >
        <p class="text-sm font-medium text-white">
          {{ selectedCity || 'Выберите город' }}
        </p>

        <svg
          class="h-4 w-4 shrink-0 text-neutral-400"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m5 7.5 5 5 5-5" />
        </svg>
      </button>
    </div>
  </header>
</template>
