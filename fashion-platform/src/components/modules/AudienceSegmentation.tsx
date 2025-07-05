'use client';

import React, { useState, useEffect } from 'react';
import { Users, Brain, Target, Zap, Crown, Sparkles, BarChart3, Eye, Star, Award, TrendingUp, MapPin, Heart, ShoppingBag, Calendar, Palette } from 'lucide-react';
import Image from 'next/image';

// Principio de Responsabilidad Única (SRP)
interface AILoadingProps {
  stage: number;
  totalStages: number;
}

interface AudienceSegment {
  id: string;
  name: string;
  description: string;
  size: number;
  percentage: number;
  confidence: number;
  demographics: {
    ageRange: string;
    gender: string;
    location: string[];
    income: string;
  };
  psychographics: {
    lifestyle: string;
    values: string[];
    interests: string[];
    shoppingBehavior: string;
  };
  neuralScore: number;
  clusterCenter: number[];
  purchasingPower: number;
  brandLoyalty: number;
  socialInfluence: number;
  trendinessScore: number;
  preferredChannels: string[];
  seasonalTrends: string[];
  riskProfile: 'Conservador' | 'Moderado' | 'Aventurero';
  recommendedStrategy: {
    messaging: string;
    channels: string[];
    products: string[];
    timing: string;
  };
  keyMetrics: {
    conversionRate: number;
    avgOrderValue: number;
    lifetime_value: number;
    engagementRate: number;
  };
}

interface AudienceSegmentationProps {
  campaignType?: string;
  targetRegion?: string;
}

// Mock data para segmentación de audiencia
const mockAudienceSegments: AudienceSegment[] = [
  {
    id: 'segment-001',
    name: 'Luxury Minimalists',
    description: 'Profesionales urbanos que valoran la calidad sobre la cantidad, buscan piezas atemporales.',
    size: 15420,
    percentage: 23.7,
    confidence: 94,
    demographics: {
      ageRange: '28-45 años',
      gender: '65% Femenino, 35% Masculino',
      location: ['Buenos Aires', 'Santiago', 'Montevideo'],
      income: '$3,000+ USD/mes'
    },
    psychographics: {
      lifestyle: 'Profesional urbano, conscious living',
      values: ['Sostenibilidad', 'Calidad', 'Autenticidad'],
      interests: ['Yoga', 'Arte', 'Viajes', 'Tecnología'],
      shoppingBehavior: 'Investigación exhaustiva, compras planificadas'
    },
    neuralScore: 0.94,
    clusterCenter: [0.8, 0.7, 0.9, 0.6, 0.8],
    purchasingPower: 87,
    brandLoyalty: 91,
    socialInfluence: 76,
    trendinessScore: 68,
    preferredChannels: ['Email premium', 'Instagram Stories', 'LinkedIn'],
    seasonalTrends: ['Primavera: Colores neutros', 'Otoño: Texturas premium'],
    riskProfile: 'Conservador',
    recommendedStrategy: {
      messaging: 'Enfoque en calidad, artesanía y valores sostenibles',
      channels: ['Email personalizado', 'Influencers de nicho', 'Eventos VIP'],
      products: ['Blazers premium', 'Accesorios de cuero', 'Calzado artesanal'],
      timing: 'Martes-Jueves, 7-9 AM y 6-8 PM'
    },
    keyMetrics: {
      conversionRate: 8.7,
      avgOrderValue: 245,
      lifetime_value: 1840,
      engagementRate: 12.3
    }
  },
  {
    id: 'segment-002',
    name: 'Digital Trendsetters',
    description: 'Gen Z fashion-forward que adoptan tendencias rápidamente y comparten en redes sociales.',
    size: 22150,
    percentage: 34.1,
    confidence: 89,
    demographics: {
      ageRange: '16-26 años',
      gender: '58% Femenino, 42% Masculino',
      location: ['Ciudad de México', 'Bogotá', 'São Paulo'],
      income: '$800-2,500 USD/mes'
    },
    psychographics: {
      lifestyle: 'Digital native, social media activo',
      values: ['Expresión personal', 'Diversidad', 'Innovación'],
      interests: ['TikTok', 'Gaming', 'Música', 'Cultura pop'],
      shoppingBehavior: 'Compras impulsivas, influenciado por redes'
    },
    neuralScore: 0.89,
    clusterCenter: [0.9, 0.4, 0.6, 0.9, 0.7],
    purchasingPower: 62,
    brandLoyalty: 45,
    socialInfluence: 95,
    trendinessScore: 96,
    preferredChannels: ['TikTok', 'Instagram Reels', 'Snapchat'],
    seasonalTrends: ['Verano: Colores vibrantes', 'Invierno: Streetwear'],
    riskProfile: 'Aventurero',
    recommendedStrategy: {
      messaging: 'Tendencias frescas, exclusividad y personalización',
      channels: ['TikTok ads', 'Micro-influencers', 'AR filters'],
      products: ['Streetwear', 'Accesorios tech', 'Limited editions'],
      timing: 'Viernes-Domingo, 3-6 PM y 8-11 PM'
    },
    keyMetrics: {
      conversionRate: 5.2,
      avgOrderValue: 89,
      lifetime_value: 420,
      engagementRate: 18.7
    }
  },
  {
    id: 'segment-003',
    name: 'Eco-Conscious Families',
    description: 'Familias con conciencia ambiental que priorizan marcas sostenibles y duraderas.',
    size: 18760,
    percentage: 28.9,
    confidence: 92,
    demographics: {
      ageRange: '30-50 años',
      gender: '72% Femenino, 28% Masculino',
      location: ['Barcelona', 'Valencia', 'Bilbao'],
      income: '$2,200-4,500 USD/mes'
    },
    psychographics: {
      lifestyle: 'Familia activa, valores tradicionales modernos',
      values: ['Sostenibilidad', 'Responsabilidad', 'Comunidad'],
      interests: ['Naturaleza', 'Cocina', 'Educación', 'Voluntariado'],
      shoppingBehavior: 'Compras conscientes, investigación de marcas'
    },
    neuralScore: 0.92,
    clusterCenter: [0.7, 0.8, 0.9, 0.5, 0.8],
    purchasingPower: 75,
    brandLoyalty: 88,
    socialInfluence: 67,
    trendinessScore: 52,
    preferredChannels: ['Email newsletters', 'Facebook', 'Blogs especializados'],
    seasonalTrends: ['Primavera: Ropa de ejercicio', 'Otoño: Ropa escolar'],
    riskProfile: 'Moderado',
    recommendedStrategy: {
      messaging: 'Durabilidad, valores familiares y impacto positivo',
      channels: ['Content marketing', 'Partnerships NGOs', 'Family events'],
      products: ['Ropa familiar', 'Materiales orgánicos', 'Multipropósito'],
      timing: 'Lunes-Miércoles, 9-11 AM y 7-9 PM'
    },
    keyMetrics: {
      conversionRate: 7.1,
      avgOrderValue: 167,
      lifetime_value: 1245,
      engagementRate: 9.8
    }
  },
  {
    id: 'segment-004',
    name: 'Power Professionals',
    description: 'Ejecutivos y emprendedores que buscan moda que proyecte autoridad y éxito.',
    size: 8450,
    percentage: 13.0,
    confidence: 88,
    demographics: {
      ageRange: '35-55 años',
      gender: '54% Femenino, 46% Masculino',
      location: ['Lima', 'Quito', 'La Paz'],
      income: '$4,000+ USD/mes'
    },
    psychographics: {
      lifestyle: 'Alto nivel ejecutivo, networking intenso',
      values: ['Éxito', 'Prestigio', 'Eficiencia'],
      interests: ['Negocios', 'Golf', 'Vinos', 'Arte'],
      shoppingBehavior: 'Servicio personalizado, marcas de prestigio'
    },
    neuralScore: 0.88,
    clusterCenter: [0.6, 0.9, 0.8, 0.7, 0.9],
    purchasingPower: 95,
    brandLoyalty: 94,
    socialInfluence: 82,
    trendinessScore: 71,
    preferredChannels: ['LinkedIn', 'Executive magazines', 'Personal shopping'],
    seasonalTrends: ['Todo el año: Formalwear premium'],
    riskProfile: 'Conservador',
    recommendedStrategy: {
      messaging: 'Exclusividad, estatus y rendimiento profesional',
      channels: ['Personal styling', 'Executive events', 'Premium partnerships'],
      products: ['Trajes de diseño', 'Relojes', 'Briefcases de lujo'],
      timing: 'Lunes-Viernes, 6-8 AM y 12-1 PM'
    },
    keyMetrics: {
      conversionRate: 12.4,
      avgOrderValue: 485,
      lifetime_value: 3250,
      engagementRate: 6.9
    }
  }
];

// Componente para el loader de IA ultra-realista
const NeuralNetworkLoader: React.FC<AILoadingProps> = ({ stage, totalStages }) => {
  const neuralStages = [
    { 
      icon: Brain, 
      message: "Inicializando Red Neuronal SegmentAI-5.0...", 
      detail: "Configurando 3 capas ocultas con 256 neuronas",
      technical: "NN: Input(47) → Hidden(256,128,64) → Output(4)"
    },
    { 
      icon: BarChart3, 
      message: "Procesando vectores de comportamiento...", 
      detail: "Analizando 847,000 patrones de usuarios",
      technical: "Batch processing: 10k samples, learning_rate=0.001"
    },
    { 
      icon: Target, 
      message: "Ejecutando clustering K-means...", 
      detail: "Optimizando centros de segmentos",
      technical: "K-means++: k=4, max_iter=300, tol=1e-4"
    },
    { 
      icon: Zap, 
      message: "Calculando scores de confianza...", 
      detail: "Validación cruzada con 5 folds",
      technical: "Cross-validation: accuracy=92.3%, f1-score=0.91"
    },
    { 
      icon: Crown, 
      message: "Generando insights estratégicos...", 
      detail: "Calibrando recomendaciones de marketing",
      technical: "Ensemble: Neural+RF+SVM, weighted_avg=0.924"
    },
  ];

  const currentStage = neuralStages[Math.min(stage, neuralStages.length - 1)];
  const Icon = currentStage.icon;

  return (
    <div className="bg-gradient-to-br from-purple-950 to-pink-950 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl shadow-purple-900/30">
      <div className="space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg mx-auto mb-4">
            <Icon size={28} className="animate-pulse" />
          </div>
          <h3 className="text-2xl font-light text-white mb-2">Red Neuronal Segmentando Audiencia</h3>
          <p className="text-purple-400 text-sm">Deep Learning + Clustering avanzado</p>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-white font-medium mb-2">{currentStage.message}</h4>
            <p className="text-purple-400 text-sm mb-1 font-medium">{currentStage.detail}</p>
            <p className="text-pink-400 text-xs font-mono font-bold">{currentStage.technical}</p>
          </div>

          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-700"
              style={{ width: `${((stage + 1) / totalStages) * 100}%` }}
            />
          </div>

          <div className="flex justify-center space-x-2">
            {neuralStages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= stage ? 'bg-purple-400' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-pink-400 text-sm font-bold">
            Neural Network procesando • Precisión: {Math.round(85 + (stage * 1.5))}%
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente para tarjetas de segmentos
const SegmentCard: React.FC<{ segment: AudienceSegment; index: number }> = ({ segment, index }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'Conservador': return 'text-green-600 bg-green-100';
      case 'Moderado': return 'text-yellow-600 bg-yellow-100';
      case 'Aventurero': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300 relative overflow-hidden">
      {/* Neural Score Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Brain size={12} />
          {(segment.neuralScore * 100).toFixed(0)}% NN
        </div>
      </div>

      {/* Segment Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
          {segment.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{segment.description}</p>
        
        {/* Audience Size */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">{segment.size.toLocaleString()}</div>
              <div className="text-sm text-gray-600">usuarios ({segment.percentage}%)</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-pink-600">{segment.confidence}%</div>
              <div className="text-xs text-gray-500">confianza</div>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <ShoppingBag size={14} className="text-blue-500" />
              <span className="text-xs font-medium text-gray-700">Poder Adquisitivo</span>
            </div>
            <div className="text-lg font-bold text-blue-600">{segment.purchasingPower}%</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <div className="flex items-center gap-2 mb-1">
              <Heart size={14} className="text-green-500" />
              <span className="text-xs font-medium text-gray-700">Lealtad</span>
            </div>
            <div className="text-lg font-bold text-green-600">{segment.brandLoyalty}%</div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
            <div className="flex items-center gap-2 mb-1">
              <Users size={14} className="text-orange-500" />
              <span className="text-xs font-medium text-gray-700">Influencia Social</span>
            </div>
            <div className="text-lg font-bold text-orange-600">{segment.socialInfluence}%</div>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={14} className="text-indigo-500" />
              <span className="text-xs font-medium text-gray-700">Trendy Score</span>
            </div>
            <div className="text-lg font-bold text-indigo-600">{segment.trendinessScore}%</div>
          </div>
        </div>

        {/* Risk Profile */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-gray-600">Perfil de Riesgo:</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(segment.riskProfile)}`}>
            {segment.riskProfile}
          </span>
        </div>

        {/* Demographics Preview */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Users size={16} />
            Demografia Clave
          </h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Edad:</span>
              <span className="ml-1 font-medium">{segment.demographics.ageRange}</span>
            </div>
            <div>
              <span className="text-gray-500">Ingresos:</span>
              <span className="ml-1 font-medium">{segment.demographics.income}</span>
            </div>
          </div>
        </div>

        {/* Key Performance Metrics */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Target size={14} className="text-purple-500" />
            <span className="text-gray-600">CVR: {segment.keyMetrics.conversionRate}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={14} className="text-gold-500" />
            <span className="text-gray-600">AOV: ${segment.keyMetrics.avgOrderValue}</span>
          </div>
        </div>
      </div>

      {/* Toggle Details Button */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-700 font-medium py-3 px-4 rounded-xl border border-purple-200 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Brain size={16} />
        {showDetails ? 'Ocultar Análisis Neural' : 'Ver Segmentación Completa'}
      </button>

      {/* Detailed Analysis */}
      {showDetails && (
        <div className="mt-4 space-y-4">
          {/* Psychographics */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Brain size={16} />
              Perfil Psicográfico
            </h4>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Lifestyle:</span> {segment.psychographics.lifestyle}</div>
              <div><span className="font-medium">Valores:</span> {segment.psychographics.values.join(', ')}</div>
              <div><span className="font-medium">Intereses:</span> {segment.psychographics.interests.join(', ')}</div>
            </div>
          </div>

          {/* Strategy Recommendations */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Target size={16} />
              Estrategia Recomendada
            </h4>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Mensaje:</span> {segment.recommendedStrategy.messaging}</div>
              <div><span className="font-medium">Canales:</span> {segment.recommendedStrategy.channels.join(', ')}</div>
              <div><span className="font-medium">Timing:</span> {segment.recommendedStrategy.timing}</div>
            </div>
          </div>

          {/* Neural Network Cluster Visualization */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <BarChart3 size={16} />
              Vector Neural (Centro del Cluster)
            </h4>
            <div className="flex gap-2">
              {segment.clusterCenter.map((value, idx) => (
                <div key={idx} className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">D{idx + 1}</div>
                  <div className="bg-white rounded h-2 relative">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded"
                      style={{ width: `${value * 100}%` }}
                    />
                  </div>
                  <div className="text-xs font-mono text-center mt-1">{value.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente principal con arquitectura SOLID
export function AudienceSegmentation({ campaignType, targetRegion }: AudienceSegmentationProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState(0);
  const [segments, setSegments] = useState<AudienceSegment[]>([]);
  const [selectedRegion, setSelectedRegion] = useState(targetRegion || 'all');

  useEffect(() => {
    const totalStages = 5;
    const stageInterval = setInterval(() => {
      setLoadingStage(prev => {
        if (prev >= totalStages - 1) {
          clearInterval(stageInterval);
          setTimeout(() => {
            setSegments(mockAudienceSegments);
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
        <NeuralNetworkLoader stage={loadingStage} totalStages={5} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Segmentación de Audiencia IA
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Red Neuronal identifica segmentos únicos basándose en comportamiento y preferencias
        </p>
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Brain size={16} className="text-purple-500" />
            <span>Neural Network</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-pink-500" />
            <span>847k usuarios analizados</span>
          </div>
          <div className="flex items-center gap-2">
            <Target size={16} className="text-blue-500" />
            <span>92.3% precisión</span>
          </div>
        </div>
      </div>

      {/* Segments Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {segments.map((segment, index) => (
          <div key={segment.id} className="bg-white rounded-2xl p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{segment.percentage}%</div>
            <div className="text-sm font-medium text-gray-800">{segment.name}</div>
            <div className="text-xs text-gray-500 mt-1">{segment.size.toLocaleString()} usuarios</div>
          </div>
        ))}
      </div>

      {/* Segments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {segments.map((segment, index) => (
          <SegmentCard key={segment.id} segment={segment} index={index} />
        ))}
      </div>

      {/* Neural Network Insights Summary */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Insights de Red Neuronal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">92.3%</div>
            <div className="text-sm text-gray-600">Precisión del Modelo</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-600 mb-2">4</div>
            <div className="text-sm text-gray-600">Segmentos Óptimos</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">847k</div>
            <div className="text-sm text-gray-600">Usuarios Analizados</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">94%</div>
            <div className="text-sm text-gray-600">Confianza Promedio</div>
          </div>
        </div>
      </div>
    </div>
  );
} 