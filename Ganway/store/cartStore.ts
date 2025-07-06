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
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [], // Cart starts empty
      addItem: (itemToAdd) => {
        set((state) => {
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
    }),
    {
      name: "cart-storage", // unique name
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
