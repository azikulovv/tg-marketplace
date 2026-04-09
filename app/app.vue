<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <AppHeader />
    <NuxtPage />
    <CitySelectionModal />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import AppHeader from '~/components/navigation/AppHeader.vue'
import CitySelectionModal from '~/components/city/CitySelectionModal.vue'

const { initializeCity } = useCitySelection()

useHead({
  meta: [
    {
      name: 'viewport',
      content:
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
    },
  ],
})

onMounted(() => {
  initializeCity()
})
</script>
