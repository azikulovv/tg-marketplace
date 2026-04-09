const AVAILABLE_CITIES = [
  'Алматы',
  'Астана',
  'Шымкент',
  'Караганда',
  'Актобе',
  'Тараз',
] as const

const STORAGE_KEY = 'tg-marketplace-city'

export const useCitySelection = () => {
  const selectedCity = useState<string>('selected-city', () => '')
  const isCityModalOpen = useState<boolean>('city-modal-open', () => false)
  const hasCityInitialized = useState<boolean>('city-initialized', () => false)

  const saveCity = (city: string) => {
    selectedCity.value = city

    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, city)
    }
  }

  const openCityModal = () => {
    isCityModalOpen.value = true
  }

  const closeCityModal = () => {
    isCityModalOpen.value = false
  }

  const initializeCity = () => {
    if (!import.meta.client || hasCityInitialized.value) {
      return
    }

    const savedCity = localStorage.getItem(STORAGE_KEY)

    if (savedCity && AVAILABLE_CITIES.includes(savedCity as (typeof AVAILABLE_CITIES)[number])) {
      selectedCity.value = savedCity
    }

    hasCityInitialized.value = true
    isCityModalOpen.value = true
  }

  return {
    availableCities: AVAILABLE_CITIES,
    selectedCity,
    isCityModalOpen,
    saveCity,
    openCityModal,
    closeCityModal,
    initializeCity,
  }
}
