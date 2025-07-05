'use client';

import React, { useEffect, useState } from 'react';
import { Search, Sparkles, TrendingUp, Heart, Star, Zap, Users, Calendar, Award, Target } from 'lucide-react';
import { ClientHomeButtons } from '@/components/modules/ClientHomeButtons';
import { HomeFeedGallery } from '@/components/modules/HomeFeedGallery';
import { useSearchStore } from '@/store/search.store';
import { Recommendations } from '@/components/modules/Recommendations';
import { useUserProfileStore } from '@/store/userProfile.store';
import { useAuthStore } from '@/store/auth.store';
import Image from 'next/image';

export default function ClientDashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const { searchTerm, setSearchTerm } = useSearchStore();
  const { profile, initializeFromUser } = useUserProfileStore();
  const { user } = useAuthStore();

  const hasInterests = profile.interests && profile.interests.length > 0;
  const recommendationTitle = hasInterests
    ? "Recomendado para Ti" 
    : "Tendencias del Momento";

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Inicializar perfil con datos del usuario autenticado
  useEffect(() => {
    if (user) {
      initializeFromUser(user);
    }
  }, [user, initializeFromUser]);

  // Mock stats for the user
  const userStats = {
    postsCreated: 12,
    likesReceived: 847,
    followers: 234,
    following: 156,
    eventsAttended: 8,
    styleScore: 92
  };

  // Mock trending topics
  const trendingTopics = [
    { id: 1, topic: "#MinimalLuxury", posts: 2847, growth: "+34%", color: "from-purple-500 to-pink-500" },
    { id: 2, topic: "#SustainableFashion", posts: 1923, growth: "+28%", color: "from-emerald-500 to-teal-500" },
    { id: 3, topic: "#PowerDressing", posts: 1756, growth: "+45%", color: "from-blue-500 to-indigo-500" },
  ];

  // Mock upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Fashion Week Digital",
      date: "15 Ene",
      time: "19:00",
      attendees: 1.2,
      type: "Virtual",
      color: "bg-purple-100 border-purple-200"
    },
    {
      id: 2,
      title: "Workshop: Estilo Minimalista",
      date: "18 Ene", 
      time: "15:30",
      attendees: 45,
      type: "Presencial",
      color: "bg-pink-100 border-pink-200"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600 font-medium">Cargando tu experiencia personalizada...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center shadow-md max-w-md">
          <p className="font-semibold text-lg mb-2">¡Ups! Ha ocurrido un error.</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Ganway
                  </h1>
                  <p className="text-xs text-gray-500">Tu plataforma de moda inteligente</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos, estilos, eventos..."
                  className="w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm bg-white/80 backdrop-blur-sm"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchTerm.trim()) {
                      // Navegar a productos con el término de búsqueda
                      window.location.href = `/dashboard/client/products?search=${encodeURIComponent(searchTerm.trim())}`;
                    }
                  }}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                {searchTerm && (
                  <button
                    onClick={() => {
                      if (searchTerm.trim()) {
                        window.location.href = `/dashboard/client/products?search=${encodeURIComponent(searchTerm.trim())}`;
                      }
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    <Search size={16} />
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-purple-700">IA Activa</span>
              </div>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  ¡Hola, {profile.name || user?.name || 'Fashionista'}! 👋
                </h2>
                <p className="text-purple-100 mb-3">
                  {currentTime.getHours() < 12 ? 'Buenos días' : 
                   currentTime.getHours() < 18 ? 'Buenas tardes' : 'Buenas noches'}, 
                  es hora de descubrir tu próximo look favorito
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Target size={16} />
                    <span>Estilo: {profile.stylePreference || 'Personalizado'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={16} />
                    <span>Score: {userStats.styleScore}%</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Zap size={20} className="text-purple-600" />
                Acciones Rápidas
              </h3>
              <ClientHomeButtons />
            </div>

            {/* Feed Gallery */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Users size={20} className="text-purple-600" />
                Descubre Inspiración
              </h3>
              <HomeFeedGallery />
            </div>

            {/* AI Recommendations */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <Recommendations title={recommendationTitle} strict={hasInterests} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Award size={20} className="text-purple-600" />
                Tu Actividad
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Publicaciones</span>
                  <span className="font-semibold text-purple-600">{userStats.postsCreated}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Me gusta recibidos</span>
                  <span className="font-semibold text-pink-600">{userStats.likesReceived}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Seguidores</span>
                  <span className="font-semibold text-blue-600">{userStats.followers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Eventos asistidos</span>
                  <span className="font-semibold text-emerald-600">{userStats.eventsAttended}</span>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-purple-600" />
                Tendencias IA
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <div key={topic.id} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{topic.topic}</p>
                      <p className="text-xs text-gray-500">{topic.posts} posts</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">{topic.growth}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-purple-600" />
                Próximos Eventos
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className={`p-3 rounded-xl border ${event.color}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm text-gray-800">{event.title}</h4>
                      <span className="text-xs font-medium text-gray-600">{event.type}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{event.date} • {event.time}</span>
                      <span>{event.attendees > 100 ? `${(event.attendees/1000).toFixed(1)}K` : event.attendees} asistentes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 