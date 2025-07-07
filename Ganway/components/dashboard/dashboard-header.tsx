"use client"

import { Search, ShoppingCart, Bell, User, MessageSquare, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cartStore"
import Link from "next/link"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"

export function DashboardHeader() {
  const { items: cartItems } = useCartStore()
  const { logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo - Optimizado para móviles */}
          <div className="flex items-center space-x-2 flex-shrink-0 mr-4 sm:mr-6 md:mr-8 lg:mr-12">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-600 rounded-sm flex items-center justify-center">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-white rounded-sm"></div>
            </div>
            <span className="text-lg sm:text-xl font-semibold text-gray-900">Ganway</span>
          </div>

          {/* Desktop Navigation - Solo visible en pantallas grandes */}
          <nav className="hidden xl:flex items-center space-x-6 lg:space-x-8">
            <Link
              href="/dashboard/client"
              className="text-gray-900 font-medium hover:text-purple-600 transition-colors text-sm lg:text-base"
            >
              Inicio
            </Link>
            <Link
              href="/dashboard/client/shop"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm lg:text-base"
            >
              Tienda
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm lg:text-base"
            >
              Comunidad
            </Link>
            <Link
              href="/dashboard/client/blog"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm lg:text-base"
            >
              Blog
            </Link>
            <Link
              href="/dashboard/client/events"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm lg:text-base"
            >
              Eventos
            </Link>
          </nav>

          {/* Desktop Search Bar - Solo visible en pantallas muy grandes */}
          <div className="hidden xl:flex flex-1 max-w-lg mx-6 lg:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar inspiración, tendencias..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Right Actions - Optimizado para móviles */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Mobile/Tablet Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="xl:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>


            {/* Messages Button */}
            <button className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full relative transition-colors">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-blue-500 text-white text-xs rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center text-[10px] sm:text-xs">
                2
              </span>
            </button>

            {/* Cart Button */}
            <Link
              href="/dashboard/client/cart"
              className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full relative transition-colors"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-purple-600 text-white text-xs rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center text-[10px] sm:text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Notifications Button */}
            <button className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full relative transition-colors">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-500 text-white text-xs rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center text-[10px] sm:text-xs">
                5
              </span>
            </button>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full hover:bg-gray-100 transition-colors p-1.5 sm:p-2"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
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

            {/* Mobile Menu Button - Visible en tablets y móviles */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors ml-1"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Mejorado */}
        {isSearchOpen && (
          <div className="xl:hidden py-3 sm:py-4 border-t border-gray-100 bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar inspiración, tendencias..."
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white shadow-sm"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu - Completamente rediseñado */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-gray-100 bg-white shadow-lg">
            <div className="py-4 space-y-1">
              <Link
                href="/dashboard/client"
                className="block px-4 py-3 text-gray-900 font-medium hover:text-purple-600 hover:bg-purple-50 transition-colors rounded-lg mx-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/dashboard/client/shop"
                className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium transition-colors rounded-lg mx-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tienda
              </Link>
              <Link
                href="#"
                className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium transition-colors rounded-lg mx-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Comunidad
              </Link>
              <Link
                href="/dashboard/client/blog"
                className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium transition-colors rounded-lg mx-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/dashboard/client/events"
                className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium transition-colors rounded-lg mx-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Eventos
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
