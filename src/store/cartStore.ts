import { create } from 'zustand'
import type { Product } from '../data/products'

export interface CartItem {
  product: Product
  weight: '250g' | '500g'
  quantity: number
}

/** Unique key for a cart item (product id + weight) */
function itemKey(productId: string, weight: string): string {
  return `${productId}::${weight}`
}

interface CartState {
  items: CartItem[]
  /** Add a product with specific weight. If already exists, increment quantity. */
  addItem: (product: Product, weight: '250g' | '500g') => void
  /** Remove a specific item by product id + weight */
  removeItem: (productId: string, weight: '250g' | '500g') => void
  /** Set exact quantity for an item. If 0, removes it. */
  updateQuantity: (productId: string, weight: '250g' | '500g', quantity: number) => void
  /** Clear entire cart */
  clearCart: () => void
}

/** Derived selectors — compute from items, trigger re-renders properly */
export function selectTotalItems(state: CartState): number {
  return state.items.reduce((sum, i) => sum + i.quantity, 0)
}

export function selectSubtotal(state: CartState): number {
  return state.items.reduce((sum, i) => {
    const price = i.product.prices.find((p) => p.weight === i.weight)
    return sum + (price?.amount ?? 0) * i.quantity
  }, 0)
}

export function selectFormattedSubtotal(state: CartState): string {
  const raw = selectSubtotal(state)
  return `$${raw.toLocaleString('es-CL')}`
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (product, weight) =>
    set((state) => {
      const key = itemKey(product.id, weight)
      const existing = state.items.find(
        (i) => itemKey(i.product.id, i.weight) === key
      )
      if (existing) {
        return {
          items: state.items.map((i) =>
            itemKey(i.product.id, i.weight) === key
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      return { items: [...state.items, { product, weight, quantity: 1 }] }
    }),

  removeItem: (productId, weight) =>
    set((state) => ({
      items: state.items.filter(
        (i) => itemKey(i.product.id, i.weight) !== itemKey(productId, weight)
      ),
    })),

  updateQuantity: (productId, weight, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter(
            (i) => itemKey(i.product.id, i.weight) !== itemKey(productId, weight)
          ),
        }
      }
      return {
        items: state.items.map((i) =>
          itemKey(i.product.id, i.weight) === itemKey(productId, weight)
            ? { ...i, quantity }
            : i
        ),
      }
    }),

  clearCart: () => set({ items: [] }),
}))
