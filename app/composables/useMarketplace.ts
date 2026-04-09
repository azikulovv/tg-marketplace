import type { Category, Seller } from '~/types/marketplace'

export const useMarketplace = () => {
  const sellers = computed<Seller[]>(() => [
    {
      id: 1,
      name: 'Tech Store',
      slug: 'tech-store',
      avatar:
        'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=300&q=80',
      rating: 4.9,
      sales: 1240,
      categories: ['Электроника', 'Аксессуары'],
      description: 'Гаджеты, аксессуары и полезная электроника для повседневной жизни.',
      featured: true,
      products: [
        {
          id: 101,
          title: 'Беспроводные наушники',
          price: 18990,
          image:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
          category: 'Электроника',
          description: 'Чистый звук, удобная посадка и отличная автономность.',
        },
        {
          id: 102,
          title: 'Смарт-часы',
          price: 24990,
          image:
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
          category: 'Электроника',
          description: 'Следите за активностью, уведомлениями и здоровьем.',
        },
      ],
    },
    {
      id: 2,
      name: 'Urban Wear',
      slug: 'urban-wear',
      avatar:
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80',
      rating: 4.8,
      sales: 980,
      categories: ['Одежда', 'Аксессуары'],
      description: 'Современная одежда и аксессуары в городском стиле.',
      featured: true,
      products: [
        {
          id: 201,
          title: 'Худи Oversize',
          price: 15990,
          image:
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
          category: 'Одежда',
          description: 'Мягкое худи для повседневных образов.',
        },
        {
          id: 202,
          title: 'Кепка Minimal',
          price: 6990,
          image:
            'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80',
          category: 'Аксессуары',
          description: 'Лаконичный дизайн и удобная посадка.',
        },
      ],
    },
    {
      id: 3,
      name: 'Home Space',
      slug: 'home-space',
      avatar:
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80',
      rating: 4.7,
      sales: 860,
      categories: ['Дом'],
      description: 'Товары для уюта, декора и организации пространства.',
      featured: true,
      products: [
        {
          id: 301,
          title: 'Арома-диффузор',
          price: 12990,
          image:
            'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=800&q=80',
          category: 'Дом',
          description: 'Стильный ароматизатор для дома.',
        },
        {
          id: 302,
          title: 'Настольная лампа',
          price: 17990,
          image:
            'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
          category: 'Дом',
          description: 'Мягкий свет и минималистичный дизайн.',
        },
      ],
    },
    {
      id: 4,
      name: 'Beauty Point',
      slug: 'beauty-point',
      avatar:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
      rating: 4.6,
      sales: 720,
      categories: ['Красота'],
      description: 'Уходовая косметика и beauty-продукты.',
      products: [
        {
          id: 401,
          title: 'Набор для ухода за кожей',
          price: 14990,
          image:
            'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
          category: 'Красота',
          description: 'Базовый набор для ежедневного ухода.',
        },
      ],
    },
    {
      id: 5,
      name: 'Sport Lab',
      slug: 'sport-lab',
      avatar:
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=300&q=80',
      rating: 4.8,
      sales: 540,
      categories: ['Спорт'],
      description: 'Инвентарь и аксессуары для тренировок.',
      products: [
        {
          id: 501,
          title: 'Фитнес-коврик',
          price: 9990,
          image:
            'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
          category: 'Спорт',
          description: 'Удобный коврик для дома и зала.',
        },
      ],
    },
  ])

  const topSellers = computed(() => sellers.value.slice(0, 3))

  const recommendedProducts = computed(() =>
    sellers.value.flatMap((seller) =>
      seller.products.map((product) => ({
        ...product,
        sellerName: seller.name,
        sellerSlug: seller.slug,
      })),
    ),
  )

  const categories = computed(() => {
    const unique = new Set<Category>()

    sellers.value.forEach((seller) => {
      seller.categories.forEach((category) => unique.add(category))
    })

    return Array.from(unique)
  })

  const getSellerBySlug = (slug: string) => sellers.value.find((seller) => seller.slug === slug)

  return {
    sellers,
    topSellers,
    recommendedProducts,
    categories,
    getSellerBySlug,
  }
}
