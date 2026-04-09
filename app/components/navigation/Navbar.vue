<script setup lang="ts">
const route = useRoute()

const items = [
  {
    label: 'Главная',
    to: '/',
    icon: 'home',
  },
  {
    label: 'Поиск',
    to: '/search',
    icon: 'search',
  },
]

const isActive = (to: string) => route.path === to
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 mx-auto flex w-full max-w-md border-t border-white/10 bg-neutral-950/90 backdrop-blur-xl"
  >
    <NuxtLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="flex flex-1 flex-col items-center justify-center gap-1 px-4 py-3 text-xs transition"
      :class="isActive(item.to) ? 'text-white' : 'text-neutral-500'"
    >
      <svg
        v-if="item.icon === 'home'"
        class="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 10.5 12 3l9 7.5M5.25 9.75V20.25H18.75V9.75"
        />
      </svg>

      <svg
        v-else
        class="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
      >
        <circle cx="11" cy="11" r="6.5" />
        <path stroke-linecap="round" d="M16 16l4.5 4.5" />
      </svg>

      <span>{{ item.label }}</span>
    </NuxtLink>
  </nav>
</template>
