'use client';

// src/app/dashboard/designer/page.tsx7
import React, { useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/auth.store';
import { useProductsStore } from '@/store/products.store';
import { useCampaignsStore } from '@/store/campaigns.store';
import { useRouter } from 'next/navigation';
import { DesignerProducts } from '@/components/designer/DesignerProducts';
import { DesignerCampaigns } from '@/components/designer/DesignerCampaigns';
import { DesignerAnalytics } from '@/components/designer/DesignerAnalytics';
import Link from 'next/link';
import { Sparkles, TrendingUp, Brain, Zap } from 'lucide-react';

export default function DesignerDashboard() {
  const { products } = useProductsStore();
  const { campaigns } = useCampaignsStore();
  const { user } = useAuthStore();
  const router = useRouter();

  // Filtrar productos y campañas del usuario actual
  const userProducts = products.filter(product => 
    product.designerId === (user?.id || 'designer-1')
  );
  
  const userCampaigns = campaigns.filter(campaign => 
    campaign.designerId === (user?.id || 'designer-1')
  );

  // Campañas activas
  const activeCampaigns = userCampaigns.filter(campaign => 
    campaign.status === 'active'
  );

  useEffect(() => {
    if (!user || user.role !== 'designer') {
      router.push('/dashboard/client');
    }
  }, [user, router]);

  if (!user || user.role !== 'designer') {
    return null;
  }

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header de bienvenida mejorado */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                ¡Hola, {user.name}! 👋
                <Sparkles className="text-yellow-300" size={28} />
              </h1>
              <p className="text-purple-100 text-lg mb-4">
                Bienvenido a tu panel de diseñador con IA integrada. Gestiona tus productos, campañas y análisis desde aquí.
              </p>
              <div className="flex items-center gap-4 text-purple-100">
                <div className="flex items-center gap-2">
                  <Brain size={18} />
                  <span className="text-sm">IA Activa</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={18} />
                  <span className="text-sm">Análisis en Tiempo Real</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block text-right">
              <div className="bg-white bg-opacity-20 rounded-xl p-4">
                <div className="text-3xl font-bold">{userProducts.length}</div>
                <div className="text-purple-200 text-sm">Productos activos</div>
                <div className="text-2xl font-bold mt-2">{activeCampaigns.length}</div>
                <div className="text-purple-200 text-sm">Campañas en curso</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/dashboard/designer/publish">
          <Card className="p-6 hover:shadow-xl transition-all cursor-pointer border-l-4 border-purple-500 group hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full group-hover:from-purple-200 group-hover:to-purple-300 transition-all">
                <span className="text-2xl">➕</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Publicar Producto</h3>
                <p className="text-sm text-gray-600">Con análisis IA automático</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/designer/campaigns">
          <Card className="p-6 hover:shadow-xl transition-all cursor-pointer border-l-4 border-blue-500 group hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full group-hover:from-blue-200 group-hover:to-blue-300 transition-all">
                <span className="text-2xl">📢</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Nueva Campaña</h3>
                <p className="text-sm text-gray-600">Optimizada con IA</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/designer/analytics">
          <Card className="p-6 hover:shadow-xl transition-all cursor-pointer border-l-4 border-green-500 group hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-full group-hover:from-green-200 group-hover:to-green-300 transition-all">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ver Análisis</h3>
                <p className="text-sm text-gray-600">Insights predictivos</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard/designer/profile">
          <Card className="p-6 hover:shadow-xl transition-all cursor-pointer border-l-4 border-pink-500 group hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full group-hover:from-pink-200 group-hover:to-pink-300 transition-all">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Mi Perfil</h3>
                <p className="text-sm text-gray-600">Optimización IA</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Stats cards mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium">Ventas del Mes</p>
              <p className="text-2xl font-bold text-green-900">
                ${(userProducts.reduce((acc, p) => acc + (p.price || 0), 0) * 4.2).toFixed(0)}
              </p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp size={12} />
                ↗ +18.5%
              </p>
            </div>
            <div className="p-3 bg-green-200 rounded-full">
              <span className="text-xl">💰</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
          <div className="flex items-center justify-between">
          <div>
              <p className="text-sm text-blue-700 font-medium">Productos</p>
              <p className="text-2xl font-bold text-blue-900">{userProducts.length}</p>
              <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                <Sparkles size={12} />
                Optimizados con IA
              </p>
            </div>
            <div className="p-3 bg-blue-200 rounded-full">
              <span className="text-xl">👗</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
          <div className="flex items-center justify-between">
          <div>
              <p className="text-sm text-purple-700 font-medium">Campañas</p>
              <p className="text-2xl font-bold text-purple-900">{userCampaigns.length}</p>
              <p className="text-xs text-purple-600 mt-1 flex items-center gap-1">
                <TrendingUp size={12} />
                {activeCampaigns.length} activas
              </p>
            </div>
            <div className="p-3 bg-purple-200 rounded-full">
              <span className="text-xl">📢</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-pink-700 font-medium">Score IA</p>
              <p className="text-2xl font-bold text-pink-900">
                {Math.min(94, 70 + (userProducts.length * 3) + (activeCampaigns.length * 5))}%
              </p>
              <p className="text-xs text-pink-600 mt-1 flex items-center gap-1">
                <Brain size={12} />
                Optimización alta
              </p>
            </div>
            <div className="p-3 bg-pink-200 rounded-full">
              <span className="text-xl">🤖</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Secciones modulares con componentes existentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Productos recientes con IA */}
        <DesignerProducts 
          products={userProducts} 
          showTitle={true}
          maxItems={3}
        />

        {/* Campañas activas con IA */}
        <DesignerCampaigns 
          campaigns={activeCampaigns}
          showTitle={true}
          maxItems={3}
        />
      </div>

      {/* Analytics integrado */}
      <DesignerAnalytics />

      {/* CTA final */}
      <Card className="p-8 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Brain className="text-indigo-600" size={32} />
            <h3 className="text-2xl font-bold text-indigo-900">¿Listo para maximizar tu éxito?</h3>
          </div>
          <p className="text-indigo-700 mb-6 max-w-2xl mx-auto">
            Nuestra IA ha analizado tu perfil y tiene recomendaciones personalizadas para impulsar tus ventas y engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/designer/analytics">
              <Button variant="primary" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                <Sparkles size={18} className="mr-2" />
                Ver Análisis Completo
              </Button>
            </Link>
            <Link href="/dashboard/designer/campaigns">
              <Button variant="secondary" className="border-indigo-300 text-indigo-700 hover:bg-indigo-50">
                <Zap size={18} className="mr-2" />
                Crear Campaña IA
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}