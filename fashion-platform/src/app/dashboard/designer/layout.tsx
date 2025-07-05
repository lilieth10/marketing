'use client';

import React from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Home, MessageCircle, BookOpen, Calendar, Bell } from 'lucide-react';

interface DesignerLayoutProps {
  children: React.ReactNode;
}

export default function DesignerLayout({ children }: DesignerLayoutProps) {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Solo redirigir si definitivamente no es diseñador
    if (user && user.role && user.role !== 'designer') {
      router.push('/dashboard/client');
    }
  }, [user, router]);

  // Mostrar loading mientras carga la autenticación
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Si el usuario no es diseñador, redirigir
  if (user.role !== 'designer') {
    return null;
  }

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard/designer',
      icon: '🏠',
      current: pathname === '/dashboard/designer'
    },
    {
      name: 'Mis Productos',
      href: '/dashboard/designer/products',
      icon: '👗',
      current: pathname === '/dashboard/designer/products'
    },
    {
      name: 'Pedidos',
      href: '/dashboard/designer/orders',
      icon: '📦',
      current: pathname === '/dashboard/designer/orders'
    },
    {
      name: 'Publicar Producto',
      href: '/dashboard/designer/publish',
      icon: '➕',
      current: pathname === '/dashboard/designer/publish'
    },
    {
      name: 'Campañas',
      href: '/dashboard/designer/campaigns',
      icon: '📢',
      current: pathname === '/dashboard/designer/campaigns'
    },
    {
      name: 'Análisis',
      href: '/dashboard/designer/analytics',
      icon: '📊',
      current: pathname === '/dashboard/designer/analytics'
    },
    {
      name: 'Clientes',
      href: '/dashboard/designer/customers',
      icon: '👥',
      current: pathname === '/dashboard/designer/customers'
    },
    {
      name: 'Mi Perfil',
      href: '/dashboard/designer/profile',
      icon: '👤',
      current: pathname === '/dashboard/designer/profile'
    },
    {
      name: 'Eventos',
      href: '/dashboard/designer/events',
      icon: '📅',
      current: pathname === '/dashboard/designer/events'
    }
  ];

  const handleLogout = () => {
    useAuthStore.getState().logout();
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white shadow-lg">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">Ganway</div>
                <div className="text-xs text-purple-600 font-medium">Diseñador</div>
              </div>
            </div>
          </div>

          {/* Usuario */}
          <div className="px-4 mb-6">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  item.current
                    ? 'bg-purple-100 text-purple-700 border-r-2 border-purple-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              <span className="mr-3 text-lg">🚪</span>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Barra superior - como en el Figma */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo y navegación principal */}
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-3 md:hidden">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">G</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">Ganway Designer</div>
                </div>
                
                {/* Navegación horizontal */}
                <nav className="hidden md:flex items-center space-x-6">
                  <Link 
                    href="/dashboard/designer"
                    className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <Home size={18} />
                    <span className="text-sm font-medium">Inicio</span>
                  </Link>
                  <Link 
                    href="/blog"
                    className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <BookOpen size={18} />
                    <span className="text-sm font-medium">Blog</span>
                  </Link>
                  <Link 
                    href="/community"
                    className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <MessageCircle size={18} />
                    <span className="text-sm font-medium">Comunidad</span>
                  </Link>
                  <Link 
                    href="/events"
                    className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <Calendar size={18} />
                    <span className="text-sm font-medium">Eventos</span>
                  </Link>
                </nav>
              </div>

              {/* Buscador y acciones */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchTerm.trim()) {
                        router.push(`/dashboard/designer/products?search=${encodeURIComponent(searchTerm.trim())}`);
                      }
                    }}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                
                <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="md:hidden p-2 text-gray-600 hover:text-red-700 transition-colors"
                >
                  🚪
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
} 