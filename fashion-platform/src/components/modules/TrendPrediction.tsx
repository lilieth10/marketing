'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Brain, Zap, Target, Crown, Sparkles, BarChart3, Users, Eye, Star, Award, Calendar, MapPin, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import Image from 'next/image';
import { mockProducts } from '@/data/mockProducts';
import { ProductCard } from './ProductCard';

// Principio de Responsabilidad Única (SRP)
interface AILoadingProps {
  stage: number;
  totalStages: number;
}

interface TrendPredictionResult {
  id: string;
  trendName: string;
  category: string;
  confidence: number;
  predictedGrowth: number;
  timeframe: string;
  description: string;
  keyInfluencers: string[];
  demographicTarget: string;
  marketImpact: 'Alto' | 'Medio' | 'Bajo';
  season: string;
  colors: string[];
  images: string[];
  rfScore: number; // Random Forest Score
  socialMentions: number;
  purchaseIntent: number;
  riskLevel: 'Bajo' | 'Medio' | 'Alto';
  recommendedActions: string[];
}

interface TrendCategoryProps {
  title: string;
  trends: TrendPredictionResult[];
  icon: React.ElementType;
  gradient: string;
  show: boolean;
}

interface TrendCardProps {
  trend: TrendPredictionResult;
  index: number;
}

interface TrendPredictionProps {
  category?: string;
  timeframe?: 'short' | 'medium' | 'long';
}

// Mock data para predicciones de tendencias
const mockTrendPredictions: TrendPredictionResult[] = [
  {
    id: 'trend-001',
    trendName: 'Maximalism Digital',
    category: 'Estilo Visual',
    confidence: 94,
    predictedGrowth: 127,
    timeframe: '3-6 meses',
    description: 'Combinación de estampados digitales vibrantes con siluetas arquitectónicas, impulsado por la cultura NFT.',
    keyInfluencers: ['@digitalfashionista', '@cyberlux', '@nftcouture'],
    demographicTarget: 'Gen Z, 18-28 años, high digital engagement',
    marketImpact: 'Alto',
    season: 'Primavera-Verano 2024',
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'],
    images: ['/images/products/blazer1.jpg', '/images/products/dress1.jpg'],
    rfScore: 0.94,
    socialMentions: 45782,
    purchaseIntent: 87,
    riskLevel: 'Medio',
    recommendedActions: [
      'Desarrollar línea de estampados digitales',
      'Colaborar con artistas NFT',
      'Crear campaña en TikTok/Instagram'
    ]
  },
  {
    id: 'trend-002',
    trendName: 'Neo-Minimalism',
    category: 'Filosofía de Diseño',
    confidence: 89,
    predictedGrowth: 78,
    timeframe: '6-12 meses',
    description: 'Evolución del minimalismo clásico con toques tecnológicos sutiles y materiales innovadores.',
    keyInfluencers: ['@cleanlines', '@futurebasics', '@techminimal'],
    demographicTarget: 'Profesionales, 25-40 años, ingresos altos',
    marketImpact: 'Alto',
    season: 'Todo el año',
    colors: ['#F8F9FA', '#E9ECEF', '#6C757D', '#343A40'],
    images: ['/images/products/shirt1.jpg', '/images/products/jeans1.jpg'],
    rfScore: 0.89,
    socialMentions: 62341,
    purchaseIntent: 92,
    riskLevel: 'Bajo',
    recommendedActions: [
      'Invertir en tejidos técnicos',
      'Simplificar líneas de productos',
      'Enfocarse en calidad premium'
    ]
  },
  {
    id: 'trend-003',
    trendName: 'Sustainable Luxury 2.0',
    category: 'Sostenibilidad',
    confidence: 96,
    predictedGrowth: 156,
    timeframe: '1-2 años',
    description: 'Lujo consciente que combina materiales reciclados con artesanía tradicional y transparencia total.',
    keyInfluencers: ['@sustainablelux', '@ecodesigner', '@consciousstyle'],
    demographicTarget: 'Millennials, 28-45 años, educación superior',
    marketImpact: 'Alto',
    season: 'Tendencia permanente',
    colors: ['#228B22', '#8FBC8F', '#DEB887', '#F5DEB3'],
    images: ['/images/products/blazer1.jpg', '/images/products/dress1.jpg'],
    rfScore: 0.96,
    socialMentions: 89567,
    purchaseIntent: 94,
    riskLevel: 'Bajo',
    recommendedActions: [
      'Certificar toda la cadena de suministro',
      'Comunicar impacto ambiental',
      'Crear programa de reciclaje'
    ]
  },
  {
    id: 'trend-004',
    trendName: 'Gender-Fluid Fashion',
    category: 'Inclusividad',
    confidence: 85,
    predictedGrowth: 203,
    timeframe: '2-3 años',
    description: 'Moda sin género que desafía las normas tradicionales con siluetas versátiles y colores neutros.',
    keyInfluencers: ['@genderfreestyle', '@fluidfashion', '@inclusivedesign'],
    demographicTarget: 'Gen Z y Millennials, 16-35 años, progresivos',
    marketImpact: 'Alto',
    season: 'Todo el año',
    colors: ['#E6E6FA', '#F0E68C', '#DDA0DD', '#98FB98'],
    images: ['/images/products/shirt1.jpg', '/images/products/jeans1.jpg'],
    rfScore: 0.85,
    socialMentions: 73421,
    purchaseIntent: 81,
    riskLevel: 'Medio',
    recommendedActions: [
      'Rediseñar tablas de tallas',
      'Crear línea unisex',
      'Actualizar marketing inclusivo'
    ]
  }
];

// Componente para el loader de IA ultra-realista
const TrendAnalysisLoader: React.FC<AILoadingProps> = ({ stage, totalStages }) => {
  const analysisStages = [
    { 
      icon: Brain, 
      message: "Inicializando Random Forest TrendLux-4.2...", 
      detail: "Cargando 847 árboles de decisión",
      technical: "RF: 847 trees, max_depth=15, n_features=23"
    },
    { 
      icon: BarChart3, 
      message: "Analizando 2.3M de interacciones sociales...", 
      detail: "Procesando patrones de comportamiento global",
      technical: "Social API: Instagram(1.2M), TikTok(0.8M), Pinterest(0.3M)"
    },
    { 
      icon: Target, 
      message: "Calculando vectores de preferencia...", 
      detail: "Segmentando audiencias por demografía premium",
      technical: "Clustering: K-means(k=12), Silhouette=0.87"
    },
    { 
      icon: TrendingUp, 
      message: "Ejecutando predicciones temporales...", 
      detail: "Modelando ciclos de tendencias con LSTM",
      technical: "LSTM: 3 layers, 128 units, dropout=0.2"
    },
    { 
      icon: Crown, 
      message: "Calibrando confianza del modelo...", 
      detail: "Validando precisión con datos históricos",
      technical: "Accuracy: 94.7%, Precision: 92.1%, Recall: 89.8%"
    },
  ];

  const currentStage = analysisStages[Math.min(stage, analysisStages.length - 1)];
  const Icon = currentStage.icon;

  return (
    <div className="bg-gradient-to-br from-blue-950 to-purple-950 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl shadow-blue-900/30">
      <div className="space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg mx-auto mb-4">
            <Icon size={28} className="animate-pulse" />
          </div>
          <h3 className="text-2xl font-light text-white mb-2">IA Prediciendo Tendencias Futuras</h3>
          <p className="text-blue-400 text-sm">Random Forest + Deep Learning en tiempo real</p>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-white font-medium mb-2">{currentStage.message}</h4>
            <p className="text-blue-400 text-sm mb-1 font-medium">{currentStage.detail}</p>
            <p className="text-pink-400 text-xs font-mono font-bold">{currentStage.technical}</p>
          </div>

          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-700"
              style={{ width: `${((stage + 1) / totalStages) * 100}%` }}
            />
          </div>

          <div className="flex justify-center space-x-2">
            {analysisStages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= stage ? 'bg-blue-400' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-pink-400 text-sm font-bold">
            Random Forest procesando • Confianza: {Math.round(85 + (stage * 2))}%
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente para tarjetas de tendencias
const TrendCard: React.FC<TrendCardProps> = ({ trend, index }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const getGrowthIcon = (growth: number) => {
    if (growth > 100) return <ArrowUp className="text-green-500" size={16} />;
    if (growth > 50) return <ArrowUp className="text-yellow-500" size={16} />;
    return <Minus className="text-gray-500" size={16} />;
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'Bajo': return 'text-green-600 bg-green-100';
      case 'Medio': return 'text-yellow-600 bg-yellow-100';
      case 'Alto': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact: string) => {
    switch(impact) {
      case 'Alto': return 'text-purple-600 bg-purple-100';
      case 'Medio': return 'text-blue-600 bg-blue-100';
      case 'Bajo': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Buscar productos relacionados por imagen, nombre o categoría
  let relatedProducts = mockProducts.filter(product =>
    product.images.some((img: string) => trend.images.includes(img)) ||
    product.name.toLowerCase().includes(trend.trendName.toLowerCase()) ||
    product.category.toLowerCase() === trend.category.toLowerCase()
  );
  // Si no hay suficientes relacionados, completar con productos mock hasta tener 3
  if (relatedProducts.length < 3) {
    const ids = new Set(relatedProducts.map(p => p.id));
    for (const p of mockProducts) {
      if (relatedProducts.length >= 3) break;
      if (!ids.has(p.id)) relatedProducts.push(p);
    }
  }
  const productsToShow = relatedProducts.slice(0, 3);

  return (
    <div className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 relative overflow-hidden">
      {/* Confidence Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Brain size={12} />
          {trend.confidence}% IA
        </div>
      </div>

      {/* Trend Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
          {trend.trendName}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{trend.description}</p>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200">
            <div className="flex items-center gap-2 mb-1">
              {getGrowthIcon(trend.predictedGrowth)}
              <span className="text-sm font-medium text-gray-700">Crecimiento Predicho</span>
            </div>
            <div className="text-2xl font-bold text-green-600">+{trend.predictedGrowth}%</div>
            <div className="text-xs text-gray-500">{trend.timeframe}</div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-200">
            <div className="flex items-center gap-2 mb-1">
              <Users size={16} className="text-purple-500" />
              <span className="text-sm font-medium text-gray-700">RF Score</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">{(trend.rfScore * 100).toFixed(1)}%</div>
            <div className="text-xs text-gray-500">Random Forest</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(trend.riskLevel)}`}>
            Riesgo: {trend.riskLevel}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(trend.marketImpact)}`}>
            Impacto: {trend.marketImpact}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
            {trend.category}
          </span>
        </div>

        {/* Color Palette */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-600">Paleta:</span>
          <div className="flex gap-1">
            {trend.colors.map((color, idx) => (
              <div
                key={idx}
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Social Metrics */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Eye size={14} className="text-gray-500" />
            <span className="text-gray-600">Menciones: {trend.socialMentions.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={14} className="text-gray-500" />
            <span className="text-gray-600">Intención: {trend.purchaseIntent}%</span>
          </div>
        </div>
      </div>

      {/* Toggle Details Button */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-700 font-medium py-3 px-4 rounded-xl border border-blue-200 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Sparkles size={16} />
        {showDetails ? 'Ocultar Detalles IA' : 'Ver Análisis Completo'}
      </button>

      {/* Detailed Analysis */}
      {showDetails && (
        <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Target size={16} />
            Análisis Demográfico
          </h4>
          <p className="text-sm text-gray-600 mb-4">{trend.demographicTarget}</p>
          
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Award size={16} />
            Acciones Recomendadas
          </h4>
          <ul className="space-y-2">
            {trend.recommendedActions.map((action, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                {action}
              </li>
            ))}
          </ul>

          <h4 className="font-semibold text-gray-800 mb-2 mt-4 flex items-center gap-2">
            <Users size={16} />
            Influencers Clave
          </h4>
          <div className="flex flex-wrap gap-2">
            {trend.keyInfluencers.map((influencer, idx) => (
              <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {influencer}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Productos recomendados por tendencia */}
      {productsToShow.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-bold text-purple-700 mb-4 flex items-center gap-2">
            <Sparkles size={18} /> Productos recomendados por tendencia
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productsToShow.map(product => (
              <ProductCard key={product.id} product={product} from="trend" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Componente principal con arquitectura SOLID
export function TrendPrediction({ category, timeframe = 'medium' }: TrendPredictionProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState(0);
  const [predictions, setPredictions] = useState<TrendPredictionResult[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');

  useEffect(() => {
    const totalStages = 5;
    const stageInterval = setInterval(() => {
      setLoadingStage(prev => {
        if (prev >= totalStages - 1) {
          clearInterval(stageInterval);
          setTimeout(() => {
            setPredictions(mockTrendPredictions);
            setIsLoading(false);
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(stageInterval);
  }, []);

  const filterPredictions = () => {
    let filtered = mockTrendPredictions;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(trend => 
        trend.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredPredictions = filterPredictions();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <TrendAnalysisLoader stage={loadingStage} totalStages={5} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Predicción de Tendencias IA
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Algoritmo Random Forest analiza millones de datos para predecir las próximas tendencias de moda
        </p>
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Brain size={16} className="text-blue-500" />
            <span>Random Forest ML</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-purple-500" />
            <span>2.3M datos analizados</span>
          </div>
          <div className="flex items-center gap-2">
            <Target size={16} className="text-green-500" />
            <span>94.7% precisión</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {['all', 'Estilo Visual', 'Sostenibilidad', 'Inclusividad'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
            }`}
          >
            {cat === 'all' ? 'Todas las Categorías' : cat}
          </button>
        ))}
      </div>

      {/* Predictions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredPredictions.map((trend, index) => (
          <TrendCard key={trend.id} trend={trend} index={index} />
        ))}
      </div>

      {/* AI Insights Summary */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Resumen de Insights IA
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {Math.round(filteredPredictions.reduce((acc, t) => acc + t.confidence, 0) / filteredPredictions.length)}%
            </div>
            <div className="text-sm text-gray-600">Confianza Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              +{Math.round(filteredPredictions.reduce((acc, t) => acc + t.predictedGrowth, 0) / filteredPredictions.length)}%
            </div>
            <div className="text-sm text-gray-600">Crecimiento Esperado</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {filteredPredictions.filter(t => t.riskLevel === 'Bajo').length}
            </div>
            <div className="text-sm text-gray-600">Tendencias Bajo Riesgo</div>
          </div>
        </div>
      </div>
    </div>
  );
} 