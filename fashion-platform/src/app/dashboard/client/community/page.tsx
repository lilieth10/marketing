'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useCommunityStore } from '@/store/community.store';
import { useAuthStore } from '@/store/auth.store';
import { useUserProfileStore } from '@/store/userProfile.store';
import { useGamificationStore } from '@/store/gamification.store';
import { 
  Heart, MessageCircle, Share2, Sparkles, Camera, TrendingUp, Hash, 
  Crown, Brain, Users, BarChart3, Zap, Plus, Filter, Search, 
  Calendar, MapPin, Eye, Star, Award, Trash
} from 'lucide-react';
import { SentimentAnalysis } from '@/components/modules/SentimentAnalysis';
import Image from 'next/image';
import Link from 'next/link';
import { showDeleteConfirmation } from '@/lib/sweetAlert';

// Mock data para trending topics
const trendingTopics = [
  { id: 1, topic: "#MinimalLuxury", posts: 2847, growth: "+34%", engagement: 89 },
  { id: 2, topic: "#SustainableFashion", posts: 1923, growth: "+28%", engagement: 92 },
  { id: 3, topic: "#PowerDressing", posts: 1756, growth: "+45%", engagement: 87 },
  { id: 4, topic: "#StreetStyleAI", posts: 1432, growth: "+52%", engagement: 94 }
];

// Mock data para AI insights
const aiInsights = [
  {
    title: "Tendencia Emergente Detectada",
    description: "Los blazers oversized están ganando tracción entre profesionales de 25-35 años",
    confidence: 94,
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200"
  },
  {
    title: "Análisis de Sentimiento Global",
    description: "95% de posts sobre 'sustainable luxury' tienen sentimiento positivo",
    confidence: 97,
    icon: Heart,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200"
  },
  {
    title: "Predicción de Color",
    description: "Los tonos terrosos dominarán la próxima temporada según IA",
    confidence: 89,
    icon: Star,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200"
  }
];

// Mock fashion creators
const fashionCreators = [
  {
    id: 1,
    name: "Sofia Martinez",
    title: "Sustainable Fashion Expert",
    followers: "156K",
    avatar: "/images/placeholder1.png",
    verified: true,
    speciality: "Eco-Luxury",
    engagementRate: 8.7,
    badge: "Top Creator"
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    title: "Minimalist Designer",
    followers: "89K",
    avatar: "/images/placeholder2.png",
    verified: true,
    speciality: "Clean Lines",
    engagementRate: 9.2,
    badge: "Trending"
  },
  {
    id: 3,
    name: "Carmen Valdez",
    title: "Power Dressing Guru",
    followers: "203K",
    avatar: "/images/placeholder3.png",
    verified: true,
    speciality: "Executive Style",
    engagementRate: 7.8,
    badge: "Verified"
  }
];

const communityStats = {
  totalMembers: "25.7K",
  activeToday: "3.2K",
  postsToday: "847",
  engagementRate: "94%"
};

export default function CommunityPage() {
  const { user } = useAuthStore();
  const { posts, addPost, likePost, unlikePost, getPostsByCategory, initializePosts, deletePost } = useCommunityStore();
  const { profile } = useUserProfileStore();
  const { addPoints, updateStreak } = useGamificationStore();
  
  const [activeTab, setActiveTab] = useState<'feed' | 'trending' | 'creators'>('feed');
  const [selectedCategory, setSelectedCategory] = useState<'general' | 'events' | 'profile'>('general');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'trending' | 'following'>('all');
  
  useEffect(() => {
    setIsClient(true);
    
    // Limpieza preventiva solo si hay problemas de quota
    try {
      const storageSize = JSON.stringify(localStorage).length;
      if (storageSize > 8000000) { // 8MB límite más generoso
        console.log('LocalStorage muy lleno, limpiando datos antiguos...');
        // Solo limpiar datos específicos en lugar de todo
        const keysToClean = ['community-posts-storage', 'user-profile-storage', 'cart-storage'];
        keysToClean.forEach(key => {
          try {
            const item = localStorage.getItem(key);
            if (item && item.length > 1000000) { // Solo limpiar items grandes
              localStorage.removeItem(key);
            }
          } catch {}
        });
      }
    } catch (error) {
      // Solo en caso de error crítico
      console.warn('Error accediendo localStorage:', error);
    }
  }, []);

  const handleLoadCommunityContent = () => {
    initializePosts();
  };
    
  const filteredPosts = getPostsByCategory(selectedCategory);
    
  const analyzePostSentiment = (text: string) => {
    // Palabras clave positivas y negativas
    const positiveWords = ['encantar', 'gustar', 'increíble', 'perfecto', 'bueno', 'hermoso', 'fantástico'];
    const negativeWords = ['malo', 'terrible', 'horrible', 'feo', 'decepcionante'];
    
    // Detectar negaciones
    const negations = ['no', 'nunca', 'tampoco', 'ni'];
    const words = text.toLowerCase().split(' ');
    let hasNegation = false;
    let positiveCount = 0;
    let negativeCount = 0;

    // Buscar negaciones y palabras clave
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      // Si es una negación, marcar las próximas 3 palabras como negadas
      if (negations.includes(word)) {
        hasNegation = true;
        // Contar las siguientes palabras positivas como negativas
        for (let j = i + 1; j < Math.min(i + 4, words.length); j++) {
          if (positiveWords.some(pw => words[j].includes(pw))) {
            negativeCount++;
            i = j; // Saltar estas palabras
            break;
          }
        }
      } else {
        // Si no hay negación activa, contar normalmente
        if (!hasNegation) {
          if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
          if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
        }
      }
      
      // Reset negación después de 3 palabras
      if (i > 0 && i % 3 === 0) hasNegation = false;
    }

    // Calcular sentimiento final
    let sentiment: 'positive' | 'negative' | 'neutral';
    // Usar valores determinísticos basados en el contenido del texto para evitar problemas de hidratación
    const textHash = text.split('').reduce((hash: number, char: string) => hash + char.charCodeAt(0), 0);
    let styleMatch = 75 + (textHash % 20);
    let trendAlignment = 70 + (textHash % 25);

    if (negativeCount > positiveCount) {
      sentiment = 'negative';
      styleMatch = Math.max(60, styleMatch - 20);
      trendAlignment = Math.max(55, trendAlignment - 15);
    } else if (positiveCount > negativeCount) {
      sentiment = 'positive';
    } else {
      sentiment = 'neutral';
      styleMatch = Math.max(70, styleMatch - 10);
      trendAlignment = Math.max(65, trendAlignment - 10);
    }

    return {
      sentiment,
      styleMatch: Math.round(styleMatch),
      trendAlignment: Math.round(trendAlignment)
    };
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    
    // Detectar negaciones y sentimiento
    const text = newPostContent.toLowerCase();
    const hasNegation = text.includes('no ') || text.includes('nunca ') || text.includes('tampoco ');
    const hasPositive = text.includes('encanta') || text.includes('gusta') || text.includes('increíble') || text.includes('perfecto');
    
    // Si hay negación, invertir el sentimiento
    const sentiment = hasNegation ? 'negative' : (hasPositive ? 'positive' : 'neutral');
    
    const newPost = {
      author: {
        name: user?.name || 'Usuario',
        avatar: '/images/placeholder1.png',
        verified: false,
        badge: 'Nuevo Miembro'
      },
      content: newPostContent,
      image: selectedImage || '',
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'ahora',
      tags: extractTags(newPostContent),
      category: selectedCategory,
      aiAnalysis: {
        sentiment,
        styleMatch: sentiment === 'positive' ? 85 : (sentiment === 'negative' ? 65 : 75),
        trendAlignment: sentiment === 'positive' ? 90 : (sentiment === 'negative' ? 70 : 80)
      }
    };
    
    addPost(newPost);
    addPoints(25, 'post_creation');
    updateStreak();
    
    setNewPostContent('');
    setSelectedImage(null);
    setShowNewPost(false);
  };

  const extractTags = (content: string): string[] => {
    const hashtags = content.match(/#[\w\u00C0-\u017F]+/g);
    return hashtags || [];
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      // Usar la imagen REAL que subió el usuario
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLike = (postId: string | number, isCurrentlyLiked: boolean) => {
    if (isCurrentlyLiked) {
      unlikePost(postId);
    } else {
      likePost(postId);
      addPoints(2, 'like_post');
    }
  };

  const categories = [
    { key: 'general', label: 'General', icon: '💬', count: posts.filter(p => p.category === 'general').length },
    { key: 'events', label: 'Eventos', icon: '📅', count: posts.filter(p => p.category === 'events').length },
    { key: 'profile', label: 'Mi Perfil', icon: '👤', count: posts.filter(p => p.category === 'profile').length }
  ];

  const handleDeletePost = async (postId: number) => {
    const result = await showDeleteConfirmation('esta publicación');
    
    if (result.isConfirmed) {
      deletePost(String(postId));
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header with AI Insights */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Fashion Community IA
              </h1>
              <p className="text-gray-600 mt-1">Conecta, inspírate y descubre con inteligencia artificial</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200">
                <span className="text-sm font-bold text-purple-700">🧠 IA Activa</span>
              </div>
              <div className="px-4 py-2 bg-emerald-100 rounded-full border border-emerald-200">
                <span className="text-sm font-bold text-emerald-700">{communityStats.activeToday} activos hoy</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
            {[
              { key: 'feed', label: 'Feed Principal', icon: Users },
              { key: 'trending', label: 'Tendencias IA', icon: TrendingUp },
              { key: 'creators', label: 'Top Creators', icon: Crown }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === key
                    ? 'bg-white text-purple-700 shadow-md'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'feed' && (
              <div className="space-y-6">
                {/* Create Post */}
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <button
                      onClick={() => setShowNewPost(true)}
                      className="flex-1 bg-gray-100 text-left px-4 py-3 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                    >
                      ¿Qué quieres compartir hoy?
                    </button>
                  </div>
                  
                  {showNewPost && (
                    <div className="space-y-4 border-t pt-4">
                      <textarea
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Comparte tu look, evento o experiencia fashion..."
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        rows={4}
                      />
                      
                      {selectedImage && (
                        <div className="relative inline-block">
                          <img src={selectedImage} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                      <button 
                        onClick={() => setSelectedImage(null)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <label className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 cursor-pointer">
                        <input 
                          type="file" 
                          accept="image/*" 
                              onChange={handleImageUpload}
                          className="hidden" 
                            />
                            <Camera size={20} />
                            <span className="text-sm font-medium">
                              {uploading ? 'Subiendo...' : 'Agregar foto'}
                            </span>
                      </label>
                    </div>
                        
                        <div className="flex space-x-3">
                          <Button
                            variant="secondary"
                            onClick={() => {
                              setShowNewPost(false);
                              setNewPostContent('');
                              setSelectedImage(null);
                            }}
                          >
                            Cancelar
                          </Button>
                          <Button
                            variant="primary"
                      onClick={handleCreatePost}
                            disabled={!newPostContent.trim() || uploading}
                          >
                            <Sparkles size={16} className="mr-2" />
                            Publicar
                          </Button>
                        </div>
                  </div>
                </div>
                  )}
                </Card>

                {/* AI Insights */}
                {showAIInsights && (
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <Brain size={20} className="text-purple-600" />
                        Insights de IA
                      </h3>
                      <button 
                        onClick={() => setShowAIInsights(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {aiInsights.map((insight, index) => (
                        <div key={index} className={`p-4 rounded-xl border ${insight.bg} ${insight.border}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <insight.icon size={16} className={insight.color} />
                            <span className="text-xs font-bold text-gray-600">{insight.confidence}% confianza</span>
                          </div>
                          <h4 className="font-semibold text-sm text-gray-800 mb-1">{insight.title}</h4>
                          <p className="text-xs text-gray-600">{insight.description}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Filter Bar */}
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value as any)}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-purple-300 focus:outline-none"
                      >
                        {categories.map((category) => (
                          <option key={category.key} value={category.key}>{category.label}</option>
                        ))}
                      </select>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Eye size={16} />
                        <span>{filteredPosts.length} posts</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Filter size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Search size={16} />
                      </button>
                    </div>
                  </div>
                </Card>

                {/* Posts Feed */}
                {filteredPosts.length === 0 ? (
                  <Card className="p-12 text-center">
                    <div className="text-6xl mb-4">👥</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedCategory === 'general' 
                        ? '¡Bienvenido a la comunidad!' 
                        : `No hay posts en ${selectedCategory}`
                      }
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {selectedCategory === 'general' 
                        ? 'Puedes crear tu primer post o explorar contenido de la comunidad'
                        : `Aún no tienes posts en ${selectedCategory}. ¡Crea el primero!`
                      }
                    </p>
                    <div className="flex justify-center gap-3">
                      <Button variant="primary" onClick={() => setShowNewPost(true)}>
                        Crear primer post
                      </Button>
                      {selectedCategory === 'general' && (
                        <Button variant="secondary" onClick={handleLoadCommunityContent}>
                          Explorar comunidad
                        </Button>
                      )}
                    </div>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {filteredPosts.map((post) => (
                      <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
                        {/* Header del post */}
                        <div className="flex items-center space-x-3 mb-4">
                          <Link href={`/dashboard/client/community/${post.author.name.replace(/\s/g, '')}`}>
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-12 h-12 rounded-full object-cover hover:scale-105 transition-transform"
                            />
                          </Link>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Link href={`/dashboard/client/community/${post.author.name.replace(/\s/g, '')}`} className="hover:underline">
                                <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                              </Link>
                              {post.author.verified && (
                                <span className="text-blue-500">✓</span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{post.author.badge}</span>
                              <span>•</span>
                              <span>{post.timestamp}</span>
                            </div>
                          </div>
                          {/* Botón eliminar SOLO para el autor */}
                          {user && post.author.name === (profile.name || user.name || user.email?.split('@')[0]) && (
                            <button
                              onClick={() => handleDeletePost(typeof post.id === 'string' ? parseInt(post.id) : post.id)}
                              className="ml-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 w-8 h-8 flex items-center justify-center z-20 shadow-lg"
                              title="Eliminar publicación"
                            >
                              <Trash size={18} />
                            </button>
                          )}
                        </div>
                          
                        {/* Contenido */}
                        <p className="text-gray-800 mb-4">{post.content}</p>
                          
                        {/* Imagen */}
                          {post.image && (
                            <div className="mb-4">
                            <img
                                src={post.image} 
                              alt="Post image"
                              className="w-full max-w-md rounded-lg object-cover"
                              />
                            </div>
                          )}
                          
                        {/* Tags */}
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="text-purple-600 bg-purple-50 px-2 py-1 rounded-full text-sm font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Análisis IA */}
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg mb-4">
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Sparkles size={14} className="text-indigo-500" />
                              <span className="text-gray-600">IA:</span>
                              <span className="font-medium text-indigo-700">{post.aiAnalysis.sentiment}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <TrendingUp size={14} className="text-purple-500" />
                              <span className="text-gray-600">Estilo:</span>
                              <span className="font-medium text-purple-700">{post.aiAnalysis.styleMatch}%</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Hash size={14} className="text-pink-500" />
                              <span className="text-gray-600">Tendencia:</span>
                              <span className="font-medium text-pink-700">{post.aiAnalysis.trendAlignment}%</span>
                            </div>
                          </div>
                        </div>

                        {/* Acciones */}
                        <div className="flex items-center space-x-6 pt-3 border-t border-gray-100">
                          <button
                            onClick={() => handleLike(post.id, post.isLiked || false)}
                            className={`flex items-center space-x-2 transition-colors ${
                              post.isLiked 
                                ? 'text-red-500 hover:text-red-600' 
                                : 'text-gray-500 hover:text-red-500'
                            }`}
                          >
                            <Heart size={18} className={post.isLiked ? 'fill-current' : ''} />
                            <span className="text-sm font-medium">{post.likes}</span>
                          </button>
                          
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                            <MessageCircle size={18} />
                            <span className="text-sm font-medium">{post.comments}</span>
                          </button>
                          
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                            <Share2 size={18} />
                            <span className="text-sm font-medium">{post.shares}</span>
                          </button>
                      </div>
                      </Card>
                  ))}
                </div>
                )}
              </div>
            )}

            {activeTab === 'trending' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <TrendingUp size={24} className="text-purple-600" />
                    Tendencias en Tiempo Real
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trendingTopics.map((topic) => (
                      <div key={topic.id} className="p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-800">{topic.topic}</h4>
                          <span className="text-xs font-bold text-emerald-600">{topic.growth}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{topic.posts} posts</span>
                          <span>{topic.engagement}% engagement</span>
                        </div>
                        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                            style={{ width: `${topic.engagement}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                
                <SentimentAnalysis productId={''} context="community" />
              </div>
            )}

            {activeTab === 'creators' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <Crown size={24} className="text-purple-600" />
                    Top Creators de Moda
                  </h3>
                  <div className="space-y-4">
                    {fashionCreators.map((creator) => (
                      <div key={creator.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors">
                        <div className="relative">
                          <Image 
                            src={creator.avatar} 
                            alt={creator.name} 
                            width={64} 
                            height={64} 
                            className="rounded-full object-cover"
                          />
                          {creator.verified && (
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-800">{creator.name}</h4>
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                              {creator.badge}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{creator.title}</p>
                          <p className="text-xs text-gray-500">Especialidad: {creator.speciality}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-800">{creator.followers}</div>
                          <div className="text-xs text-gray-500">seguidores</div>
                          <div className="text-xs text-emerald-600 font-semibold">{creator.engagementRate}% engagement</div>
                        </div>
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-semibold hover:from-purple-700 hover:to-pink-700 transition-all">
                          Seguir
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-purple-600" />
                Estadísticas
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Miembros totales</span>
                  <span className="font-semibold text-purple-600">{communityStats.totalMembers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Activos hoy</span>
                  <span className="font-semibold text-emerald-600">{communityStats.activeToday}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Posts hoy</span>
                  <span className="font-semibold text-pink-600">{communityStats.postsToday}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Engagement</span>
                  <span className="font-semibold text-blue-600">{communityStats.engagementRate}</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Zap size={20} className="text-purple-600" />
                Acciones Rápidas
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowNewPost(true)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 hover:border-purple-300 transition-colors"
                >
                  <Plus size={16} className="text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Nueva Publicación</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 hover:border-emerald-300 transition-colors">
                  <Calendar size={16} className="text-emerald-600" />
                  <span className="text-sm font-medium text-gray-700">Crear Evento</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:border-blue-300 transition-colors">
                  <Users size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Encontrar Amigos</span>
                </button>
              </div>
            </Card>

            {/* Upcoming Events */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-purple-600" />
                Próximos Eventos
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
                  <h4 className="font-semibold text-sm text-gray-800">Fashion Week Digital</h4>
                  <p className="text-xs text-gray-600">15 Ene • 19:00</p>
                  <p className="text-xs text-purple-600 font-medium">1.2K asistentes</p>
                </div>
                <div className="p-3 rounded-xl bg-pink-50 border border-pink-200">
                  <h4 className="font-semibold text-sm text-gray-800">Workshop IA Design</h4>
                  <p className="text-xs text-gray-600">18 Ene • 15:30</p>
                  <p className="text-xs text-pink-600 font-medium">45 asistentes</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}