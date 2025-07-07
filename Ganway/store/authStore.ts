import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "designer" | "client"
  avatar?: string
  cover?: string
  createdAt: string
  isActive: boolean
  bio?: string
  website?: string
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
    cover: "/placeholder.svg?height=120&width=120",
    createdAt: new Date().toISOString(),
    isActive: true,
    bio: "Administrador de la plataforma.",
    website: "www.admin.com",
  },
  {
    id: "2",
    name: "Designer User",
    email: "designer@mock.com",
    role: "designer",
    avatar: "/placeholder.svg?height=40&width=40",
    cover: "/placeholder.svg?height=120&width=120",
    createdAt: new Date().toISOString(),
    isActive: true,
    bio: "Diseñador de moda.",
    website: "www.designer.com",
  },
]

// Añadir helpers para persistir usuarios en localStorage
function getStoredUsers(): User[] {
  if (typeof window === "undefined") return mockUsers
  const stored = localStorage.getItem("users_db")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return mockUsers
    }
  }
  return mockUsers
}

function saveUsers(users: User[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("users_db", JSON.stringify(users))
    } catch (error) {
      console.error("Error guardando usuarios:", error)
    }
  }
}

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

          const users = getStoredUsers()
          const user = users.find((u) => u.email === email)

          if (!user) {
            set({ error: "Usuario no encontrado. Regístrate primero.", isLoading: false })
            return false
          }

          // En la app real, aquí se verifica el password
          // En el mock, cualquier password funciona

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

          let users = getStoredUsers()
          const existingUser = users.find((u) => u.email === userData.email)
          if (existingUser) {
            set({ error: "Este email ya está registrado. Inicia sesión con tu cuenta.", isLoading: false })
            return false
          }

          // Create new user
          const newUser: User = {
            ...userData,
            id: `user_${Date.now()}`,
            createdAt: new Date().toISOString(),
            isActive: true,
            avatar: userData.avatar || "/placeholder.svg?height=40&width=40",
            cover: userData.cover || "/placeholder.svg?height=120&width=120",
          }

          // Add to mock database (in real app, save to backend)
          users = [...users, newUser]
          saveUsers(users)

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
