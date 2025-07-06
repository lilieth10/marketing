"use client"

import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"

export function useAuth() {
  const { user, isAuthenticated, isLoading, error, login, register, logout, clearError } = useAuthStore()
  const router = useRouter()

  const redirectToDashboard = (role: string) => {
    const dashboardRoutes = {
      admin: "/dashboard/admin",
      designer: "/dashboard/designer",
      client: "/dashboard/client",
    }

    const route = dashboardRoutes[role as keyof typeof dashboardRoutes] || "/dashboard/client"
    router.push(route)
  }

  const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password)
    if (success && user) {
      redirectToDashboard(user.role)
    }
    return success
  }

  const handleRegister = async (userData: any) => {
    const success = await register(userData)
    if (success && user) {
      redirectToDashboard(user.role)
    }
    return success
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    clearError,
  }
}
