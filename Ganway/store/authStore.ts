import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "designer" | "client"
  avatar?: string
  createdAt: string
  isActive: boolean
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // Actions
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: Omit<User, "id" | "createdAt" | "isActive">) => Promise<boolean>
  logout: () => void
  clearError: () => void
  setLoading: (loading: boolean) => void
}

// Mock users database
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@mock.com",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: "2",
    name: "Designer User",
    email: "designer@mock.com",
    role: "designer",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: new Date().toISOString(),
    isActive: true,
  },
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })

        try {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Find user in mock database
          const user = mockUsers.find((u) => u.email === email && u.isActive)

          if (!user) {
            set({ error: "Usuario no encontrado o inactivo", isLoading: false })
            return false
          }

          // In real app, verify password hash
          // For mock, any password works

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })

          return true
        } catch (error) {
          set({
            error: "Error de conexión. Intenta nuevamente.",
            isLoading: false,
          })
          return false
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null })

        try {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1200))

          // Check if email already exists
          const existingUser = mockUsers.find((u) => u.email === userData.email)
          if (existingUser) {
            set({ error: "Este email ya está registrado", isLoading: false })
            return false
          }

          // Create new user
          const newUser: User = {
            ...userData,
            id: `user_${Date.now()}`,
            createdAt: new Date().toISOString(),
            isActive: true,
          }

          // Add to mock database (in real app, save to backend)
          mockUsers.push(newUser)

          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })

          return true
        } catch (error) {
          set({
            error: "Error al crear la cuenta. Intenta nuevamente.",
            isLoading: false,
          })
          return false
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        })
      },

      clearError: () => set({ error: null }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
