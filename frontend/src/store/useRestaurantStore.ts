import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, MenuItem } from '../types'

interface RestaurantState {
  cart: CartItem[]
  cartOpen: boolean
  addToCart: (item: MenuItem) => void
  updateQuantity: (id: number, quantity: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  setCartOpen: (open: boolean) => void
}

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set) => ({
      cart: [],
      cartOpen: false,
      addToCart: (item) => set((state) => {
        const existing = state.cart.find((cartItem) => cartItem.id === item.id)
        return {
          cart: existing
            ? state.cart.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
            : [...state.cart, { ...item, quantity: 1 }],
          cartOpen: true,
        }
      }),
      updateQuantity: (id, quantity) => set((state) => ({
        cart: quantity <= 0 ? state.cart.filter((item) => item.id !== id) : state.cart.map((item) => item.id === id ? { ...item, quantity } : item),
      })),
      removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
      clearCart: () => set({ cart: [] }),
      setCartOpen: (cartOpen) => set({ cartOpen }),
    }),
    { name: 'healthy-dishes-cart', partialize: (state) => ({ cart: state.cart }) },
  ),
)
