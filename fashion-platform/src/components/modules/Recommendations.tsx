'use client';

import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { useUserProfileStore } from '@/store/userProfile.store';
import { Cpu, Sparkles, TrendingUp, Crown, Zap, Users, BarChart3, Brain, Star, Heart, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { mockAIRecommendations, AIRecommendationResult, AIRecommendedProduct, UserPreferences, mockUserProfiles, RecommendationReason } from '@/lib/mocks/aiRecommendations';
import { AddToCartButton } from './AddToCartButton';
import Image from 'next/image';
import { mockProducts } from '@/data/mockProducts';

// Principio de Responsabilidad Única (SRP)
interface AIProcessingStage {
  icon: React.ElementType;
  title: string;
  description: string;
  technicalDetail: string;
}

interface AILoadingProps {
  stage: number;
  totalStages: number;
  userProfile: UserPreferences;
}

interface RecommendationSectionProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  products: AIRecommendedProduct[];
  gradient: string;
  show: boolean;
}

interface RecommendationCardProps {
  product: AIRecommendedProduct;
  index: number;
}

interface RecommendationsProps {
  title?: string;
  strict?: boolean;
  from?: string;
}

// Filtros emocionales
const EMOTIONAL_FILTERS = [
  { id: 'all', label: 'All ✨', description: 'Todos los productos' },
  { id: 'confidence', label: 'Confidence 💎', description: 'Prendas que transmiten seguridad y poder' },
  { id: 'elegance', label: 'Elegance 👑', description: 'Sofisticación y refinamiento' },
  { id: 'comfort', label: 'Comfort 🤗', description: 'Comodidad sin sacrificar estilo' },
  { id: 'creativity', label: 'Creativity 🎨', description: 'Expresión artística y originalidad' },
  { id: 'power', label: 'Power ⚡', description: 'Autoridad y liderazgo' }
];

// Componente para el loader de IA ultra-realista
const AIRecommendationLoader: React.FC<AILoadingProps> = ({ stage, totalStages, userProfile }) => {
  const processingStages: AIProcessingStage[] = [
    { 
      icon: Brain, 
      title: "Analizando tu perfil de estilo único...", 
      description: "Procesando vectores de preferencias personales",
      technicalDetail: `Perfil detectado: ${userProfile.lifestyle} • Elegancia: ${userProfile.styleProfile.elegance}%`
    },
    { 
      icon: BarChart3, 
      title: "Calculando similitudes con algoritmo de Coseno...", 
      description: "Comparando 2,847 productos en base de datos premium",
      technicalDetail: "Similitud de Coseno v2.1 • Vectores de 5 dimensiones"
    },
    { 
      icon: TrendingUp, 
      title: "Identificando tendencias en tu segmento...", 
      description: "Analizando patrones de compra de perfil similar",
      technicalDetail: `Rango de precio: $${userProfile.priceRange[0]}-${userProfile.priceRange[1]} • Categorías: ${userProfile.preferredCategories.join(', ')}`
    },
    { 
      icon: Sparkles, 
      title: "Curando selección de productos premium...", 
      description: "Aplicando filtros de calidad y exclusividad",
      technicalDetail: "Exclusividad mín: 70% • Rating mín: 4.5★"
    },
    { 
      icon: Crown, 
      title: "Finalizando recomendaciones personalizadas...", 
      description: "Generando insights de estilo y combinaciones",
      technicalDetail: "Modelo: RecommendAI-Fashion-4.8 • Confianza: 96%"
    },
  ];

  const currentStage = processingStages[Math.min(stage, processingStages.length - 1)];
  const Icon = currentStage.icon;

  return (
    <div className="bg-gradient-to-br from-indigo-950 to-purple-950 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl shadow-indigo-900/30">
      <div className="space-y-4 sm:space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg mx-auto mb-4">
            <Icon size={20} className="sm:hidden animate-pulse" />
            <Icon size={28} className="hidden sm:block animate-pulse" />
          </div>
          <h3 className="text-lg sm:text-2xl font-light text-white mb-2 px-2">IA Creando Tu Selección Perfecta</h3>
          <p className="text-purple-400 text-xs sm:text-sm px-2">Algoritmo de recomendaciones premium en acción</p>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-white font-medium mb-2">{currentStage.title}</h4>
            <p className="text-purple-400 text-sm mb-1 font-medium">{currentStage.description}</p>
            <p className="text-pink-400 text-xs font-mono font-bold">{currentStage.technicalDetail}</p>
          </div>

          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-700"
              style={{ width: `${((stage + 1) / totalStages) * 100}%` }}
            />
          </div>

          <div className="flex justify-center space-x-2">
            {processingStages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= stage ? 'bg-indigo-400' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-pink-400 text-sm font-bold">
            Procesando con IA Premium • Tiempo estimado: {Math.max(1, 5 - stage)} segundos
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente para tarjetas de productos recomendados premium
function RecommendationCard({ product, from = 'home' }: { product: AIRecommendedProduct; from?: string }) {
  const [showStory, setShowStory] = useState(false);
  const [darkMode] = useState(false);

  return (
    <div className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300 relative overflow-hidden cursor-pointer" 
         onClick={() => window.location.href = `/dashboard/client/products/${product.id}?from=${from}`}>
      {/* Luxury Badge */}
      {product.exclusivityScore > 85 && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Crown size={12} />
            Exclusivo
          </div>
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full h-64 mb-4 rounded-2xl overflow-hidden bg-gray-50">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Actions */}
        {from === 'home' && (
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
              <Heart size={16} className="text-red-500" />
            </button>
            <button 
              onClick={() => setShowStory(!showStory)}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            >
              <Sparkles size={16} className="text-purple-500" />
            </button>
          </div>
        )}
        
        {from === 'profile' && (
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={() => setShowStory(!showStory)}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            >
              <Sparkles size={16} className="text-purple-500" />
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <h3 className={`text-sm font-semibold mb-1 truncate ${
          darkMode ? 'text-purple-500 font-bold group-hover:text-purple-400' : 'text-gray-800 group-hover:text-purple-600'
        }`}>
          {product.name}
        </h3>
        <p className={`text-xs mb-2 ${darkMode ? 'text-slate-700 font-medium' : 'text-gray-500'}`}>
          {product.category}
        </p>

        {/* Style Vector Metrics */}
        <div className="flex items-center gap-3 mb-3 text-xs">
          <div className="flex items-center">
            <Star size={14} className={darkMode ? 'text-purple-400 fill-current' : 'text-yellow-400 fill-current'} />
            <span className={`font-bold ml-1 ${darkMode ? 'text-purple-400' : 'text-gray-700'}`}>
              {product.rating}
            </span>
          </div>
          <div className="flex items-center text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
            <Sparkles size={14} className="mr-1"/>
            <span>{Math.round(product.styleVector.elegance)}% Elegante</span>
          </div>
        </div>

        {/* Exclusivity Score */}
        <div className="flex justify-between items-center text-sm mb-3">
          <span className="text-purple-400 font-bold">Exclusividad</span>
          <span className="text-pink-400 font-medium">{product.exclusivityScore}%</span>
        </div>
        
        {/* Price */}
        <div className="mt-auto relative z-20">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className={`text-xl font-bold ${darkMode ? 'text-pink-400' : 'text-gray-900'}`}> 
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>
          <AddToCartButton 
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              images: product.images,
              designerId: "mock-designer",
              description: product.personalizedDescription,
              category: product.category,
              sizes: ["S", "M", "L", "XL"],
              rating: product.rating,
              reviews: 75, // Valor fijo para evitar problemas de hidratación
              reviewSummary: {
                positive: 85,
                neutral: 10,
                negative: 5
              },
              aiSummary: product.personalizedDescription,
              highlightedTopics: ["AI Recommended", "Trending"],
              reviewsList: [],
              createdAt: "2024-01-01T00:00:00Z", // Valor fijo en lugar de new Date()
              updatedAt: "2024-01-01T00:00:00Z" // Valor fijo en lugar de new Date()
            }}
            fullWidth={true}
          />
        </div>

        {/* Luxury Story Expansion */}
        {showStory && product.reasons[0] && (
          <div className="mt-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 animate-fadeIn">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles size={12} className="text-white" />
              </div>
              <span className="text-sm font-bold text-purple-700">Historia de Lujo</span>
            </div>
            
            {/* Luxury Story */}
            {product.reasons[0].luxuryStory && (
              <div className="mb-3">
                <p className="text-xs text-gray-700 leading-relaxed italic">
                  "{product.reasons[0].luxuryStory}"
                </p>
              </div>
            )}

            {/* Emotional Impact */}
            {product.reasons[0].emotionalImpact && (
              <div className="mb-3 p-3 bg-white rounded-lg border border-emerald-100">
                <div className="flex items-center gap-1 mb-1">
                  <Heart size={12} className="text-emerald-500" />
                  <span className="text-xs font-semibold text-emerald-700">Impacto Emocional</span>
                </div>
                <p className="text-xs text-gray-600">{product.reasons[0].emotionalImpact}</p>
              </div>
            )}

            {/* Trend Context */}
            {product.reasons[0].trendContext && (
              <div className="p-3 bg-white rounded-lg border border-blue-100">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp size={12} className="text-blue-500" />
                  <span className="text-xs font-semibold text-blue-700">Contexto de Tendencias</span>
                </div>
                <p className="text-xs text-gray-600">{product.reasons[0].trendContext}</p>
              </div>
            )}
          </div>
        )}

        {/* Why Perfect for You */}
        <div className="text-xs text-slate-700 mt-3">
          <strong className="text-purple-400 font-bold">Por qué es perfecto para ti:</strong>
          <p className="mt-1 text-pink-400 font-medium">{product.reasons[0]?.description}</p>
        </div>
      </div>
    </div>
  );
}

// Componente para secciones de recomendaciones
const RecommendationSection: React.FC<RecommendationSectionProps & { from?: string }> = ({ 
  title, subtitle, icon: Icon, products, gradient, show, from = 'home'
}) => {
  if (!show || products.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <div className={`flex items-center justify-center w-12 h-12 rounded-2xl ${gradient} text-white shadow-lg`}>
          <Icon size={20} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-purple-500">{title}</h3>
          <p className="text-pink-400 text-sm font-bold">{subtitle}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <RecommendationCard key={product.id} product={product} from={from} />
        ))}
      </div>
    </div>
  );
};

function getUserId() {
  // Intentar obtener el usuario actual del perfil
  try {
    const userProfile = useUserProfileStore.getState().profile;
    return userProfile?.id || null;
  } catch {
    return null;
  }
}

// Componente principal con arquitectura SOLID
export function Recommendations({ title = 'Recomendaciones IA Premium', strict = false, from = 'home' }: RecommendationsProps) {
  const [recommendationResult, setRecommendationResult] = useState<AIRecommendationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState(0);
  const [emotionalFilter, setEmotionalFilter] = useState<string>('all');
  const { profile } = useUserProfileStore();
  const userId = getUserId();

  const emotionalFilters = [
    { key: 'all', label: 'Todo', icon: '✨', description: 'Ver todas las recomendaciones' },
    { key: 'confidence', label: 'Confianza', icon: '💎', description: 'Para reuniones importantes y presentaciones' },
    { key: 'elegance', label: 'Elegancia', icon: '👑', description: 'Para eventos formales y galas' },
    { key: 'comfort', label: 'Comodidad', icon: '🤗', description: 'Para el día a día y trabajo desde casa' },
    { key: 'creativity', label: 'Creatividad', icon: '🎨', description: 'Para expresar tu lado artístico' },
    { key: 'power', label: 'Poder', icon: '⚡', description: 'Para proyectar autoridad y liderazgo' }
  ];

  // Cargar recomendaciones previas si existen
  useEffect(() => {
    if (userId) {
      const stored = localStorage.getItem(`recommendationResult_${userId}`);
      if (stored) {
        setRecommendationResult(JSON.parse(stored));
      }
    }
  }, [userId]);

  // Cuando se generan nuevas recomendaciones, guardarlas
  const handleNewRecommendations = (result: AIRecommendationResult) => {
    setRecommendationResult(result);
    if (userId) {
      localStorage.setItem(`recommendationResult_${userId}`, JSON.stringify(result));
    }
  };

  // Filter products based on emotional intent
  const filterByEmotion = (products: AIRecommendedProduct[]) => {
    if (emotionalFilter === 'all') return products;
    return products.filter(product => {
      const styleVector = product.styleVector;
      switch (emotionalFilter) {
        case 'confidence':
          return styleVector.elegance > 80 && styleVector.exclusivity > 75;
        case 'elegance':
          return styleVector.elegance > 85 && styleVector.versatility > 80;
        case 'comfort':
          return styleVector.comfort > 80;
        case 'creativity':
          return styleVector.trendiness > 75 && styleVector.versatility > 85;
        case 'power':
          return styleVector.exclusivity > 80 && styleVector.elegance > 80;
        default:
          return true;
      }
    });
  };

  useEffect(() => {
    const totalStages = 5;
    const stageInterval = setInterval(() => {
      setLoadingStage(prev => {
        if (prev < totalStages - 1) {
          return prev + 1;
        } else {
          clearInterval(stageInterval);
          setTimeout(() => {
            // Lógica inteligente basada en intereses del usuario
            let userType = "default";
            const interests = profile.interests.map(i => i.toLowerCase());
            let combinedProducts: AIRecommendationResult['recommendations'] = { primary: [], trending: [], luxury: [] };
            let found = false;
            if (profile.interests.length === 0) {
              userType = "trending";
            } else {
              if (interests.some(i => ["minimalismo", "minimalist", "clean", "simple"].includes(i))) {
                const min = mockAIRecommendations["minimalism"];
                if (min) {
                  combinedProducts.primary = [...combinedProducts.primary, ...min.recommendations.primary];
                  combinedProducts.trending = [...combinedProducts.trending, ...min.recommendations.trending];
                  combinedProducts.luxury = [...combinedProducts.luxury, ...min.recommendations.luxury];
                  found = true;
                }
              }
              if (interests.some(i => ["calzado", "zapatos", "botas", "sneakers"].includes(i))) {
                const calz = mockAIRecommendations["calzado"];
                if (calz) {
                  combinedProducts.primary = [...combinedProducts.primary, ...calz.recommendations.primary];
                  combinedProducts.trending = [...combinedProducts.trending, ...calz.recommendations.trending];
                  combinedProducts.luxury = [...combinedProducts.luxury, ...calz.recommendations.luxury];
                  found = true;
                }
              }
              if (interests.some(i => ["accesorios", "bolsos", "joyas", "bufandas"].includes(i))) {
                const acc = mockAIRecommendations["accesorios"];
                if (acc) {
                  combinedProducts.primary = [...combinedProducts.primary, ...acc.recommendations.primary];
                  combinedProducts.trending = [...combinedProducts.trending, ...acc.recommendations.trending];
                  combinedProducts.luxury = [...combinedProducts.luxury, ...acc.recommendations.luxury];
                  found = true;
                }
              }
              if (interests.some(i => ["alta costura", "luxury", "lujo", "alta moda", "premium"].includes(i))) {
                const lux = mockAIRecommendations["1"];
                if (lux) {
                  combinedProducts.primary = [...combinedProducts.primary, ...lux.recommendations.primary];
                  combinedProducts.trending = [...combinedProducts.trending, ...lux.recommendations.trending];
                  combinedProducts.luxury = [...combinedProducts.luxury, ...lux.recommendations.luxury];
                  found = true;
                }
              }
              if (interests.some(i => ["business", "formal", "professional"].includes(i))) {
                const exec = mockAIRecommendations["1"];
                if (exec) {
                  combinedProducts.primary = [...combinedProducts.primary, ...exec.recommendations.primary];
                  combinedProducts.trending = [...combinedProducts.trending, ...exec.recommendations.trending];
                  combinedProducts.luxury = [...combinedProducts.luxury, ...exec.recommendations.luxury];
                  found = true;
                }
              }
              if (interests.some(i => ["art", "creative", "street style"].includes(i))) {
                const cre = mockAIRecommendations["creative"];
                if (cre) {
                  combinedProducts.primary = [...combinedProducts.primary, ...cre.recommendations.primary];
                  combinedProducts.trending = [...combinedProducts.trending, ...cre.recommendations.trending];
                  combinedProducts.luxury = [...combinedProducts.luxury, ...cre.recommendations.luxury];
                  found = true;
                }
              }
              if (interests.some(i => ["sport", "casual", "comfort"].includes(i))) {
                const cas = mockAIRecommendations["casual"];
                if (cas) {
                  combinedProducts.primary = [...combinedProducts.primary, ...cas.recommendations.primary];
                  combinedProducts.trending = [...combinedProducts.trending, ...cas.recommendations.trending];
                  combinedProducts.luxury = [...combinedProducts.luxury, ...cas.recommendations.luxury];
                  found = true;
                }
              }
              if (!found) {
                userType = "trending";
              }
            }
            let result: AIRecommendationResult | undefined;
            if (found && combinedProducts.primary.length > 0) {
              // Usar la primera recomendación encontrada como base y reemplazar productos
              const baseRecommendation = interests.some(i => ["minimalismo", "minimalist", "clean", "simple"].includes(i)) 
                ? mockAIRecommendations["minimalism"]
                : interests.some(i => ["calzado", "zapatos", "botas", "sneakers"].includes(i))
                ? mockAIRecommendations["calzado"]
                : interests.some(i => ["accesorios", "bolsos", "joyas", "bufandas"].includes(i))
                ? mockAIRecommendations["accesorios"]
                : interests.some(i => ["alta costura", "luxury", "lujo", "alta moda", "premium"].includes(i))
                ? mockAIRecommendations["1"]
                : mockAIRecommendations["trending"];
              result = {
                ...baseRecommendation,
                products: combinedProducts.primary,
                recommendations: combinedProducts
              };
            } else {
              let fallback = mockAIRecommendations[userType];
              // Si el usuario es nuevo y no hay productos trending, crear uno en caliente
              if (userType === "trending" && (!fallback || !fallback.recommendations || fallback.recommendations.primary.length === 0)) {
                const now = new Date();
                const trendingProducts = mockProducts.slice(0, 3).map((p, idx) => ({
                  id: p.id,
                  name: p.name,
                  price: p.price,
                  images: p.images,
                  category: p.category,
                  rating: p.rating,
                  styleVector: {
                    elegance: 80,
                    versatility: 80,
                    comfort: 80,
                    trendiness: 80,
                    exclusivity: 80
                  },
                  cosineSimilarity: 0.8 + idx * 0.05,
                  reasons: [
                    {
                      type: 'trend_alignment',
                      confidence: 90,
                      description: 'Producto destacado por IA',
                      technicalDetail: 'Mock tendencia IA'
                    }
                  ] as RecommendationReason[],
                  exclusivityScore: 80,
                  trendScore: 80,
                  personalizedDescription: 'Producto destacado por IA para tendencias',
                  luxuryStory: p.aiSummary || '',
                  emotionalImpact: 'Tendencia actual',
                  trendContext: 'Mock tendencia'
                }));
                fallback = {
                  userId: "user_trending_mock",
                  recommendationId: `REC-TRENDING-MOCK-${now.getTime()}`,
                  products: trendingProducts,
                  algorithm: "TrendAnalysis_Mock",
                  modelVersion: "1.0",
                  processingTime: 0.5,
                  confidenceScore: 90,
                  userStyleProfile: mockUserProfiles.default,
                  analysisTimestamp: now.toISOString(),
                  recommendations: {
                    primary: trendingProducts,
                    trending: [],
                    luxury: []
                  }
                };
              }
              result = fallback ? { ...fallback } : undefined;
            }
            if (result) {
              handleNewRecommendations(result);
            }
            setIsLoading(false);
          }, 1000);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(stageInterval);
  }, [profile]);

  if (!recommendationResult && !isLoading) return null;

  const mockUserProfile = {
    styleProfile: { elegance: 85, versatility: 80, comfort: 90, trendiness: 75, exclusivity: 70 },
    priceRange: [50, 300] as [number, number],
    preferredCategories: ['casual', 'business'],
    bodyType: 'average',
    lifestyle: 'professional',
    colorPalette: ['navy', 'white', 'beige']
  };

  return (
    <section className="my-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-medium text-purple-500 tracking-wide">{title}</h2>
          <p className="text-pink-400 mt-1 font-bold">
            {isLoading ? 'Procesando...' : `${recommendationResult?.algorithm} • Confianza: ${recommendationResult?.confidenceScore}%`}
          </p>
        </div>
      </div>

      {/* Emotional Filters */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-purple-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Filtros Emocionales IA</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {emotionalFilters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setEmotionalFilter(filter.key)}
              className={`group flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                emotionalFilter === filter.key
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-300 hover:shadow-md'
              }`}
              title={filter.description}
            >
              <span className="text-lg">{filter.icon}</span>
              <span className="font-semibold text-sm">{filter.label}</span>
            </button>
          ))}
        </div>
        {emotionalFilter !== 'all' && (
          <p className="text-sm text-gray-600 mt-2 italic">
            {emotionalFilters.find(f => f.key === emotionalFilter)?.description}
          </p>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl p-8 text-white">
          <AIRecommendationLoader 
            stage={4} 
            totalStages={5} 
            userProfile={mockUserProfile}
          />
        </div>
      )}

      {/* Recommendations Grid */}
      {!isLoading && recommendationResult && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filterByEmotion(recommendationResult.products).map((product) => (
            <RecommendationCard key={product.id} product={product} from={from} />
          ))}
        </div>
      )}

      {/* No results for filter */}
      {!isLoading && recommendationResult && filterByEmotion(recommendationResult.products).length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No hay productos para este filtro</h3>
          <p className="text-gray-600 mb-4">Prueba con otro filtro emocional o explora todas las recomendaciones</p>
          <button
            onClick={() => setEmotionalFilter('all')}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Ver Todas las Recomendaciones
          </button>
        </div>
      )}
    </section>
  );
} 