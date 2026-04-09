export type Category = 'Электроника' | 'Одежда' | 'Дом' | 'Красота' | 'Спорт' | 'Аксессуары'

export interface Product {
  id: number
  title: string
  price: number
  image: string
  category: Category
  description: string
}

export interface Seller {
  id: number
  name: string
  slug: string
  avatar: string
  rating: number
  sales: number
  categories: Category[]
  description: string
  products: Product[]
  featured?: boolean
}
