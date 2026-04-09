/**
 * TORRË — Café de Origen
 * Datos tipados de productos destacados
 */

export interface ProductPrice {
  weight: '250g' | '500g'
  amount: number
  formatted: string
}

export interface Product {
  id: string
  name: string
  origin: {
    country: string
    region: string
  }
  flavorNotes: string[]
  intensity: 1 | 2 | 3 | 4 | 5
  prices: [ProductPrice, ProductPrice]
  badge?: string
  badgeVariant?: 'copper' | 'gold'
  image: string
  gradientFrom: string
  gradientTo: string
}

export const products: Product[] = [
  {
    id: 'huila-supremo',
    name: 'Huila Supremo',
    origin: {
      country: 'Colombia',
      region: 'Huila',
    },
    flavorNotes: ['chocolate negro', 'frutos rojos', 'cítrico suave'],
    intensity: 4,
    prices: [
      { weight: '250g', amount: 4500, formatted: '$4.500' },
      { weight: '500g', amount: 8200, formatted: '$8.200' },
    ],
    badge: 'Bestseller',
    badgeVariant: 'copper',
    image: '/images/product-huila.png',
    gradientFrom: '#3D1C0A',
    gradientTo: '#1A0A03',
  },
  {
    id: 'etiopia-yirgacheffe',
    name: 'Etiopía Yirgacheffe',
    origin: {
      country: 'Etiopía',
      region: 'Sidamo',
    },
    flavorNotes: ['jazmín', 'durazno', 'bergamota'],
    intensity: 3,
    prices: [
      { weight: '250g', amount: 5200, formatted: '$5.200' },
      { weight: '500g', amount: 9800, formatted: '$9.800' },
    ],
    badge: 'Origen único',
    badgeVariant: 'gold',
    image: '/images/product-etiopia.png',
    gradientFrom: '#2C1A0E',
    gradientTo: '#140C06',
  },
  {
    id: 'blend-de-la-casa',
    name: 'Blend de la Casa',
    origin: {
      country: 'Colombia + Brasil',
      region: 'Blend',
    },
    flavorNotes: ['nuez', 'caramelo', 'cacao'],
    intensity: 3,
    prices: [
      { weight: '250g', amount: 3800, formatted: '$3.800' },
      { weight: '500g', amount: 7200, formatted: '$7.200' },
    ],
    image: '/images/product-blend.png',
    gradientFrom: '#2A1508',
    gradientTo: '#120903',
  },
  {
    id: 'guatemala-antigua',
    name: 'Guatemala Antigua',
    origin: {
      country: 'Guatemala',
      region: 'Antigua',
    },
    flavorNotes: ['miel', 'almendra', 'naranja'],
    intensity: 4,
    prices: [
      { weight: '250g', amount: 4800, formatted: '$4.800' },
      { weight: '500g', amount: 9000, formatted: '$9.000' },
    ],
    badge: 'Nuevo',
    badgeVariant: 'copper',
    image: '/images/product-guatemala.png',
    gradientFrom: '#311405',
    gradientTo: '#180A02',
  },
]
