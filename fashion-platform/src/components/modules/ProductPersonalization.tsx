'use client';

import React, { useState, useEffect } from 'react';
import { Palette, Brain, Sparkles, Shirt, Crown, Zap, Target, Star, Heart, Sliders, Wand2, Scissors, Eye, RotateCcw, Download, Share2, Shuffle } from 'lucide-react';
import Image from 'next/image';
import { useUserProfileStore } from '@/store/userProfile.store';
import { showSuccess } from '@/lib/sweetAlert';

interface PersonalizationOption {
  id: string;
  category: 'color' | 'size' | 'material' | 'style' | 'fit' | 'pattern';
  name: string;
  options: string[];
  aiRecommendation: string;
  popularityScore: number;
  trendScore: number;
}

interface PersonalizedProduct {
  id: string;
  baseProduct: {
    name: string;
    category: string;
    basePrice: number;
    image: string;
  };
  personalizations: {
    [key: string]: string;
  };
  aiScore: number;
  confidence: number;
  uniquenessScore: number;
  trendAlignment: number;
  priceAdjustment: number;
  finalPrice: number;
  estimatedPopularity: number;
  productionTime: string;
  sustainabilityScore: number;
  aiInsights: string[];
}

const mockPersonalizationOptions: PersonalizationOption[] = [
  {
    id: 'color',
    category: 'color',
    name: 'Paleta de Colores',
    options: ['Negro Clásico', 'Azul Marino', 'Beige Moderno', 'Verde Oliva', 'Coral Sunset'],
    aiRecommendation: 'Negro Clásico',
    popularityScore: 94,
    trendScore: 87
  },
  {
    id: 'material',
    category: 'material',
    name: 'Material Premium',
    options: ['Algodón Orgánico', 'Lana Merino', 'Seda Natural', 'Lino Europeo', 'Cachemira'],
    aiRecommendation: 'Algodón Orgánico',
    popularityScore: 89,
    trendScore: 96
  },
  {
    id: 'fit',
    category: 'fit',
    name: 'Ajuste Personalizado',
    options: ['Slim Fit', 'Regular Fit', 'Oversized', 'Tailored', 'Athletic'],
    aiRecommendation: 'Tailored',
    popularityScore: 92,
    trendScore: 84
  }
];

const mockPersonalizedProducts: PersonalizedProduct[] = [
  {
    id: 'custom-001',
    baseProduct: {
      name: 'Blazer Ejecutivo Premium',
      category: 'Formalwear',
      basePrice: 280,
      image: '/images/products/blazer1.jpg'
    },
    personalizations: {
      color: 'Negro Clásico',
      material: 'Lana Merino',
      fit: 'Tailored',
      style: 'Solapa Estrecha',
      details: 'Botones Nácar'
    },
    aiScore: 0.96,
    confidence: 94,
    uniquenessScore: 87,
    trendAlignment: 91,
    priceAdjustment: 45,
    finalPrice: 325,
    estimatedPopularity: 89,
    productionTime: '7-10 días',
    sustainabilityScore: 92,
    aiInsights: [
      'Combinación perfecta para perfil ejecutivo',
      'Material sostenible alineado con valores',
      'Ajuste optimizado para figura corporal',
      'Color versátil para múltiples ocasiones'
    ]
  },
  {
    id: 'custom-002',
    baseProduct: {
      name: 'Vestido Casual Elegante',
      category: 'Casual',
      basePrice: 160,
      image: '/images/products/dress1.jpg'
    },
    personalizations: {
      color: 'Coral Sunset',
      material: 'Algodón Orgánico',
      fit: 'Regular Fit',
      style: 'Manga 3/4',
      pattern: 'Estampado Floral Sutil'
    },
    aiScore: 0.91,
    confidence: 89,
    uniquenessScore: 94,
    trendAlignment: 88,
    priceAdjustment: 25,
    finalPrice: 185,
    estimatedPopularity: 92,
    productionTime: '5-7 días',
    sustainabilityScore: 95,
    aiInsights: [
      'Color trending para primavera 2024',
      'Estilo versátil para múltiples ocasiones',
      'Material eco-friendly premium',
      'Fit favorecedor para silueta natural'
    ]
  }
];

const PersonalizationLoader: React.FC<{ stage: number; totalStages: number }> = ({ stage, totalStages }) => {
  const stages = [
    { icon: Brain, message: "Analizando preferencias personales...", detail: "Procesando historial y gustos" },
    { icon: Palette, message: "Generando combinaciones únicas...", detail: "IA creando 847 variaciones" },
    { icon: Target, message: "Optimizando para tu figura...", detail: "Análisis de medidas y fit" },
    { icon: Sparkles, message: "Aplicando tendencias actuales...", detail: "Sincronizando con moda global" },
    { icon: Crown, message: "Finalizando tu diseño exclusivo...", detail: "Producto 100% personalizado listo" }
  ];

  const currentStage = stages[Math.min(stage, stages.length - 1)];
  const Icon = currentStage.icon;

  return (
    <div className="bg-gradient-to-br from-pink-950 to-purple-950 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg mx-auto mb-4">
          <Icon size={28} className="animate-pulse" />
        </div>
        <h3 className="text-2xl font-light text-white mb-2">IA Personalizando Tu Producto</h3>
        <p className="text-pink-400 text-sm">{currentStage.message}</p>
        <div className="w-full bg-white/10 rounded-full h-2 mt-6">
          <div 
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-700"
            style={{ width: `${((stage + 1) / totalStages) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

function getUserId() {
  try {
    const userProfile = useUserProfileStore.getState().profile;
    return userProfile?.id || null;
  } catch {
    return null;
  }
}

const PersonalizationPanel: React.FC<{ options: PersonalizationOption[] }> = ({ options }) => {
  const userId = getUserId();
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (userId) {
      const stored = localStorage.getItem(`preferences_${userId}`);
      if (stored) {
        setSelectedOptions(JSON.parse(stored));
      }
    }
  }, [userId]);

  const handleSelect = (optionId: string, value: string) => {
    setSelectedOptions(prev => {
      const updated = { ...prev, [optionId]: value };
      if (userId) {
        localStorage.setItem(`preferences_${userId}`, JSON.stringify(updated));
      }
      return updated;
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Sliders size={20} />
        Panel de Personalización IA
      </h3>
      
      <div className="space-y-6">
        {options.map(option => (
          <div key={option.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-700">{option.name}</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                  IA: {option.aiRecommendation}
                </span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  {option.trendScore}% Trend
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {option.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleSelect(option.id, opt)}
                  className={`p-3 text-sm rounded-lg border transition-all ${
                    selectedOptions[option.id] === opt
                      ? 'bg-pink-100 border-pink-300 text-pink-700'
                      : opt === option.aiRecommendation
                      ? 'bg-purple-50 border-purple-200 text-purple-700'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {opt}
                  {opt === option.aiRecommendation && (
                    <span className="ml-1 text-xs">🤖</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <button
        className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all"
        onClick={async () => {
          await showSuccess({
            title: '¡Producto personalizado generado!',
            text: 'Tu diseño único ha sido creado con IA. Puedes descargarlo o agregarlo a tu carrito.',
            timer: 4000
          });
        }}
      >
        Generar Producto Personalizado
      </button>
    </div>
  );
};

const PersonalizedProductCard: React.FC<{ product: PersonalizedProduct }> = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-800">{product.baseProduct.name}</h3>
          <p className="text-sm text-gray-500">Diseño 100% Personalizado</p>
        </div>
        <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          IA {(product.aiScore * 100).toFixed(0)}%
        </span>
      </div>

      <div className="relative w-full h-48 bg-gray-100 rounded-xl mb-4 overflow-hidden">
        <Image
          src={product.baseProduct.image}
          alt={product.baseProduct.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-purple-600">
          100% Único
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <h4 className="font-semibold text-gray-800">Personalizaciones:</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(product.personalizations).map(([key, value]) => (
            <div key={key} className="bg-gray-50 rounded-lg p-2">
              <div className="text-xs text-gray-500 capitalize">{key}</div>
              <div className="text-sm font-medium text-gray-800">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-pink-600">{product.uniquenessScore}%</div>
          <div className="text-xs text-gray-500">Único</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600">{product.trendAlignment}%</div>
          <div className="text-xs text-gray-500">Trending</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">{product.sustainabilityScore}%</div>
          <div className="text-xs text-gray-500">Sostenible</div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-gray-800 mb-2 text-sm">Insights de IA:</h4>
        <ul className="space-y-1">
          {product.aiInsights.slice(0, 2).map((insight, idx) => (
            <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
              <span className="text-pink-500 mt-1">•</span>
              {insight}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl font-bold text-gray-800">${product.finalPrice}</div>
          <div className="text-sm text-gray-500">
            Base: ${product.baseProduct.basePrice} + ${product.priceAdjustment} personalización
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-purple-600">{product.productionTime}</div>
          <div className="text-xs text-gray-500">Tiempo de producción</div>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all">
        Ordenar Producto Personalizado
      </button>
    </div>
  );
};

export function ProductPersonalization() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState(0);
  const [personalizedProducts, setPersonalizedProducts] = useState<PersonalizedProduct[]>([]);

  useEffect(() => {
    const totalStages = 5;
    const stageInterval = setInterval(() => {
      setLoadingStage(prev => {
        if (prev >= totalStages - 1) {
          clearInterval(stageInterval);
          setTimeout(() => {
            setPersonalizedProducts(mockPersonalizedProducts);
            setIsLoading(false);
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(stageInterval);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <PersonalizationLoader stage={loadingStage} totalStages={5} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Personalización de Productos IA
        </h2>
        <p className="text-gray-600">Crea prendas únicas diseñadas especialmente para ti</p>
        <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Brain size={16} className="text-pink-500" />
            <span>IA Personalizada</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-purple-500" />
            <span>100% Único</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart size={16} className="text-red-500" />
            <span>Diseñado para Ti</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <PersonalizationPanel options={mockPersonalizationOptions} />
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-gray-800">Productos Personalizados</h3>
          <div className="grid grid-cols-1 gap-6">
            {personalizedProducts.map(product => (
              <PersonalizedProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Estadísticas de Personalización IA
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-pink-600">∞</div>
            <div className="text-sm text-gray-600">Combinaciones Posibles</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">96%</div>
            <div className="text-sm text-gray-600">Satisfacción Cliente</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">7-10</div>
            <div className="text-sm text-gray-600">Días Producción</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-sm text-gray-600">Productos Únicos</div>
          </div>
        </div>
      </div>
    </div>
  );
}
