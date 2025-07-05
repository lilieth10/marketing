'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart.store';
import { useUserProfileStore } from '@/store/userProfile.store';
import { toast } from 'sonner';
import { 
  ShoppingCart, 
  Home, 
  Package, 
  Users, 
  Bell, 
  BookOpen, 
  User, 
  MessageCircle, 
  Plus, 
  Calendar,
  HelpCircle,
  LogOut,
  X,
  Crown,
  Settings,
  Star,
  Palette
} from 'lucide-react';
import { useDesignerRequestsStore } from '@/store/designerRequests.store';
import { useAuthStore } from '@/store/auth.store';
import { showConfirmation } from '@/lib/sweetAlert';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const helpTopics = [
    {
      title: "¿Cómo funciona la IA de recomendaciones?",
      content: "Nuestra IA analiza tus preferencias, historial de compras y tendencias para sugerirte productos personalizados que se adapten a tu estilo único."
    },
    {
      title: "Filtros emocionales",
      content: "Los filtros emocionales te permiten encontrar prendas según el sentimiento que quieres transmitir: confianza, elegancia, comodidad, etc."
    },
    {
      title: "Comunidad de moda",
      content: "Conecta con otros amantes de la moda, comparte tus looks y descubre tendencias en nuestra comunidad activa."
    },
    {
      title: "Análisis de sentimientos",
      content: "Cada producto incluye análisis de sentimientos basado en reseñas reales para ayudarte a tomar mejores decisiones."
    },
    {
      title: "Personalización de perfil",
      content: "Completa tu perfil con intereses y preferencias para recibir recomendaciones más precisas."
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg sm:rounded-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 rounded-t-lg sm:rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <HelpCircle className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Centro de Ayuda</h2>
                <p className="text-sm sm:text-base text-gray-600 hidden sm:block">Preguntas frecuentes y guías</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {helpTopics.map((topic, index) => (
            <div key={index} className="border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">{topic.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{topic.content}</p>
            </div>
          ))}
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg sm:rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-purple-800 mb-2">¿Necesitas más ayuda?</h3>
            <p className="text-sm sm:text-base text-purple-700 mb-4">Nuestro equipo de soporte está disponible 24/7 para ayudarte.</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base">
                Chat en Vivo
              </button>
              <button className="px-4 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors text-sm sm:text-base">
                Enviar Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function ClientNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { items } = useCartStore();
  const { profile, resetProfile } = useUserProfileStore();
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showDesignerRequest, setShowDesignerRequest] = useState(false);
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const { user } = useAuthStore();
  const { getUserRequest } = useDesignerRequestsStore();

  const isDesigner = user?.role === 'designer';
  const existingRequest = getUserRequest(user?.id || '');
  const canRequestDesigner = !isDesigner && (!existingRequest || existingRequest.status === 'rejected');

  const handleLogout = async () => {
    const result = await showConfirmation({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que quieres cerrar sesión? Perderás el acceso a tu cuenta hasta que vuelvas a iniciar sesión.',
      confirmText: 'Cerrar Sesión',
      cancelText: 'Cancelar',
      icon: 'warning'
    });

    if (result.isConfirmed) {
      resetProfile(); // limpiar perfil al cerrar sesión
      toast.success('Sesión cerrada correctamente');
      router.push('/auth/login');
    }
  };

  const navItems = [
    { href: '/dashboard/client', icon: Home, label: 'Inicio' },
    { href: '/dashboard/client/products', icon: Package, label: 'Productos' },
    { href: '/dashboard/client/events', icon: Calendar, label: 'Eventos' },
    { href: '/dashboard/client/community', icon: Users, label: 'Comunidad' },
    { href: '/dashboard/client/blog', icon: BookOpen, label: 'Blog' },
    { href: '/dashboard/client/orders', icon: MessageCircle, label: 'Pedidos' },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/dashboard/client') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/dashboard/client" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ganway
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActiveLink(item.href)
                      ? 'bg-purple-100 text-purple-700 font-semibold'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Help Button */}
              <button
                onClick={() => setShowHelpModal(true)}
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                title="Centro de Ayuda"
              >
                <HelpCircle size={24} />
              </button>

              {/* Notifications */}
              <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 relative">
                <Bell size={24} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Cart */}
              <Link
                href="/dashboard/client/cart"
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 relative"
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Profile Dropdown */}
              <div className="relative group">
                <Link
                  href="/dashboard/client/profile"
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-purple-50 transition-all duration-200"
                >
                  <Image
                    src={profile.avatar}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-purple-200"
                  />
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {profile.name || 'Usuario'}
                  </span>
                </Link>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link
                      href="/dashboard/client/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                    >
                      <User size={16} className="mr-3" />
                      Mi Perfil
                    </Link>
                    <Link
                      href="/dashboard/client/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                    >
                      <MessageCircle size={16} className="mr-3" />
                      Configuración
                    </Link>
                    {canRequestDesigner && (
                      <button
                        onClick={() => {
                          router.push('/dashboard/client/profile?solicitarDisenador=1');
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 hover:text-purple-600 transition-colors font-semibold"
                      >
                        <Crown size={16} className="mr-3 text-purple-600" />
                        Solicitar ser Diseñador
                      </button>
                    )}
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} className="mr-3" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <div className="flex justify-around py-2">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center p-2 text-xs ${
                  isActiveLink(item.href)
                    ? 'text-purple-600'
                    : 'text-gray-600'
                }`}
              >
                <item.icon size={20} />
                <span className="mt-1">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Modals */}
      <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />
    </>
  );
}