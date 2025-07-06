import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: string
  name: string
  brand: string
  size: string
  price: number
  quantity: number
  image: string
}

interface CartState {
  items: CartItem[]
  purchases: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  addToCart: (product: Omit<CartItem, "quantity">) => void
  checkout: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [], // Cart starts empty
      purchases: [], // Mis compras
      addItem: (itemToAdd) => {
        set((state) => {
          if (state.items.length >= 20 && !state.items.find((item) => item.id === itemToAdd.id)) {
            // No agregar más de 20 items únicos
            return { items: state.items }
          }
          const existingItem = state.items.find((item) => item.id === itemToAdd.id)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            }
          } else {
            return { items: [...state.items, { ...itemToAdd, quantity: 1 }] }
          }
        })
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items
            .map((item) => (item.id === id ? { ...item, quantity: quantity } : item))
            .filter((item) => item.quantity > 0), // Remove if quantity becomes 0
        }))
      },
      clearCart: () => set({ items: [] }),
      addToCart: (product) => {
        try {
          set((state) => {
            const exists = state.items.find((item) => item.id === product.id)
            let newItems
            if (exists) {
              newItems = state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              )
            } else {
              newItems = [{ ...product, quantity: 1 }, ...state.items]
            }
            // Limitar a 10 productos en el carrito
            const limitedItems = newItems.slice(0, 10)
            return { items: limitedItems }
          })
        } catch (e) {
          const err = e as any;
          if (err.name === 'QuotaExceededError' || (err.message && err.message.includes('quota'))) {
            if (typeof window !== 'undefined') {
              window.alert('El almacenamiento local del carrito está lleno. Elimina productos para continuar.')
            }
          } else {
            throw e
          }
        }
      },
      checkout: () => {
        try {
          const currentItems = get().items
          if (currentItems.length === 0) return
          set((state) => ({
            purchases: [...state.purchases, ...state.items],
            items: [],
          }))
        } catch (e) {
          const err = e as any;
          if (err.name === 'QuotaExceededError' || (err.message && err.message.includes('quota'))) {
            if (typeof window !== 'undefined') {
              window.alert('El almacenamiento local está lleno. Elimina compras antiguas para continuar.')
            }
          } else {
            throw e
          }
        }
      },
    }),
    {
      name: "cart-storage", // unique name
      partialize: (state) => ({ items: state.items, purchases: state.purchases }),
    },
  ),
)
