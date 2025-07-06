"use client"
import { Search, ShoppingCart, Bell, User, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cartStore"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu" // Import DropdownMenu components
import { useAuth } from "@/hooks/useAuth" // Import useAuth to get logout function

export function DashboardHeader() {
  const { items: cartItems } = useCartStore()
  const { logout } = useAuth() // Get logout function from useAuth hook

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-purple-600 rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 border border-white rounded-sm"></div>
            </div>
            <span className="text-xl font-semibold text-gray-900">Ganway</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard/client" className="text-gray-900 font-medium">
              Inicio
            </Link>
            <Link href="/dashboard/client/shop" className="text-gray-600 hover:text-gray-900 font-medium">
              Tienda
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium">
              Comunidad
            </Link>
            <Link href="/dashboard/client/articles/a1" className="text-gray-600 hover:text-gray-900 font-medium">
              Blog
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 font-medium">
              Eventos
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar inspiración, tendencias..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium">
              Publicar
            </Button>
            {/* Messages Button */}
            <button className="p-2 text-gray-600 hover:text-gray-900 relative">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>{" "}
              {/* Mock count for messages */}
            </button>
            {/* Cart Button */}
            <Link href="/dashboard/client/cart" className="p-2 text-gray-600 hover:text-gray-900 relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button className="p-2 text-gray-600 hover:text-gray-900 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                5
              </span>
            </button>
            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/client/profile">Mis datos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Configuración</DropdownMenuItem>
                <DropdownMenuItem>Ayuda</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>Cerrar sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
