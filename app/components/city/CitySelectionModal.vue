<script setup lang="ts">
const { availableCities, selectedCity, isCityModalOpen, saveCity, closeCityModal } =
  useCitySelection()

const draftCity = ref('')

watch(
  () => isCityModalOpen.value,
  (isOpen) => {
    if (!isOpen) {
      return
    }

    draftCity.value = selectedCity.value || availableCities[0]
  },
  { immediate: true },
)

const confirmCity = () => {
  if (!draftCity.value) {
    return
  }

  saveCity(draftCity.value)
  closeCityModal()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isCityModalOpen"
      class="fixed inset-0 z-100 flex items-end justify-center bg-black/70 px-4 pb-4 pt-8 backdrop-blur-sm"
    >
      <div
        class="w-full max-w-md rounded-[28px] border border-white/10 bg-neutral-900 p-5 text-white shadow-2xl"
      >
        <p class="text-sm text-neutral-400">Ваш регион</p>
        <h2 class="mt-1 text-2xl font-semibold">Выберите город</h2>
        <p class="mt-2 text-sm text-neutral-400">
          Город будет показан в шапке сайта, и его можно будет изменить в любой момент.
        </p>

        <div class="mt-5 grid grid-cols-2 gap-3">
          <button
            v-for="city in availableCities"
            :key="city"
            type="button"
            class="rounded-2xl border px-4 py-3 text-sm transition"
            :class="
              draftCity === city
                ? 'border-white bg-white text-black'
                : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
            "
            @click="draftCity = city"
          >
            {{ city }}
          </button>
        </div>

        <button
          type="button"
          class="mt-5 w-full rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
          @click="confirmCity"
        >
          Сохранить город
        </button>
      </div>
    </div>
  </Teleport>
</template>
