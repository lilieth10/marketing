'use client';

import React, { useState, useEffect } from 'react';
import { PenTool, Brain, Sparkles, Target, Crown, Zap, BarChart3, Eye, Star, Award, Copy, Download, Share2, RefreshCw, Wand2, MessageSquare, Hash, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

// Interfaces principales
interface ContentGenerationResult {
  id: string;
  type: 'product_description' | 'social_post' | 'blog_article' | 'email_campaign' | 'ad_copy';
  title: string;
  content: string;
  metadata: {
    wordCount: number;
    readingTime: string;
    seoScore: number;
    engagementPrediction: number;
    toneAnalysis: string;
    targetAudience: string;
  };
  gptScore: number;
  confidence: number;
  hashtags: string[];
  callToAction: string;
  variations: string[];
  keywords: string[];
  socialChannels: string[];
  performancePrediction: {
    clicks: number;
    engagement: number;
    conversion: number;
  };
}

interface ContentGenerationProps {
  contentType?: string;
  brand?: string;
  audience?: string;
}

// Mock data para generación de contenido
const mockGeneratedContent: ContentGenerationResult[] = [
  {
    id: 'content-001',
    type: 'product_description',
    title: 'Blazer Estructurado Milano - Edición Limitada',
    content: `Descubre la sofisticación redefinida con nuestro Blazer Estructurado Milano, una pieza maestra que fusiona la elegancia clásica italiana con un toque contemporáneo revolucionario.

Confeccionado con tejido de lana virgen premium importado directamente de las mejores tejedurías de Biella, este blazer presenta una silueta arquitectónica que realza tu figura mientras proyecta autoridad y refinamiento. Los detalles distintivos incluyen costuras francesas invisibles, botones de nácar natural y un forro de seda pura que garantiza comodidad durante todo el día.

La construcción semi-canvassed asegura que el blazer mantenga su forma impecable temporada tras temporada, mientras que los acabados hechos a mano reflejan nuestro compromiso inquebrantable con la artesanía excepcional.

Perfecto para reuniones ejecutivas, eventos de networking o cenas elegantes, este blazer se convierte en tu aliado estratégico para proyectar éxito y sofisticación en cada ocasión.`,
    metadata: {
      wordCount: 156,
      readingTime: '45 segundos',
      seoScore: 94,
      engagementPrediction: 87,
      toneAnalysis: 'Profesional, elegante, aspiracional',
      targetAudience: 'Profesionales ejecutivos, 28-45 años'
    },
    gptScore: 0.94,
    confidence: 96,
    hashtags: ['#LuxuryFashion', '#ExecutiveStyle', '#ItalianCraftsmanship', '#PremiumTailoring', '#PowerDressing'],
    callToAction: 'Experimenta la excelencia italiana. Agrega a tu guardarropa ejecutivo.',
    variations: [
      'Versión corta (50 palabras): Blazer Estructurado Milano combina elegancia italiana y diseño contemporáneo...',
      'Versión técnica: Especificaciones detalladas sobre construcción y materiales...',
      'Versión emocional: Siente la confianza que solo un blazer excepcional puede darte...'
    ],
    keywords: ['blazer premium', 'moda ejecutiva', 'lana italiana', 'artesanía', 'elegancia'],
    socialChannels: ['Instagram', 'LinkedIn', 'Pinterest'],
    performancePrediction: {
      clicks: 2847,
      engagement: 8.9,
      conversion: 12.3
    }
  },
  {
    id: 'content-002',
    type: 'social_post',
    title: 'Post Instagram - Colección Primavera 2024',
    content: `✨ NUEVA COLECCIÓN PRIMAVERA 2024 ✨

¿Lista para redefinir tu estilo esta temporada? 🌸

Nuestra nueva colección fusiona la frescura primaveral con la sofisticación urbana que te caracteriza. Cada pieza ha sido diseñada pensando en la mujer moderna que no teme destacar.

Desde vestidos que fluyen como una brisa suave hasta blazers que gritan "aquí llegó la jefa" 👑

🎨 Paleta de colores: Coral vibrante, verde jade, azul cielo
💫 Materiales sostenibles al 100%
🌿 Producción ética certificada

Porque tu estilo debe ser tan único como tu personalidad. ¿Cuál es tu favorito? Comenta abajo 👇

#SpringCollection2024 #SustainableFashion #EcoLuxury`,
    metadata: {
      wordCount: 89,
      readingTime: '25 segundos',
      seoScore: 88,
      engagementPrediction: 94,
      toneAnalysis: 'Casual, inspiracional, empoderador',
      targetAudience: 'Mujeres millennials, 25-40 años, conscientes de la moda'
    },
    gptScore: 0.91,
    confidence: 94,
    hashtags: ['#SpringCollection2024', '#SustainableFashion', '#EcoLuxury', '#ModernWoman', '#StyleInspo'],
    callToAction: '¿Cuál es tu favorito? Comenta abajo 👇',
    variations: [
      'Versión Stories: Contenido más dinámico con polls y stickers',
      'Versión TikTok: Script para video de 30 segundos',
      'Versión LinkedIn: Enfoque profesional en sostenibilidad'
    ],
    keywords: ['colección primavera', 'moda sostenible', 'estilo moderno', 'producción ética'],
    socialChannels: ['Instagram', 'TikTok', 'Facebook'],
    performancePrediction: {
      clicks: 5940,
      engagement: 15.2,
      conversion: 7.8
    }
  },
  {
    id: 'content-003',
    type: 'email_campaign',
    title: 'Email VIP - Acceso Exclusivo Colección Otoño',
    content: `Asunto: 🍂 Tu acceso VIP está aquí, [Nombre]

Querida [Nombre],

Como miembro de nuestro círculo VIP, eres la primera en conocer lo que está por revolucionar tu guardarropa otoñal.

La Colección Otoño 2024 "Urban Sophistication" llega con una propuesta audaz: combinar la calidez de los tejidos naturales con la funcionalidad que tu estilo de vida demanda.

🧥 PIEZAS DESTACADAS:
→ Abrigo Cashmere Infinity (Solo 50 unidades)
→ Conjunto Knit Luxe en tonos tierra
→ Botas Arquitectónicas de cuero italiano

👑 TU BENEFICIO VIP:
→ Acceso 48 horas antes del lanzamiento
→ 20% descuento exclusivo
→ Styling session gratuita virtual
→ Envío express sin costo

Sabemos que tu tiempo es valioso, por eso cada pieza ha sido diseñada para maximizar tu elegancia mientras simplifica tus decisiones de estilo.

¿Lista para ser la primera en llevar la sofisticación urbana?

[CTA: ACCEDER A MI COLECCIÓN VIP]

Con cariño,
El equipo de [Marca]

P.D. Este acceso es válido solo hasta el viernes. No queremos que te pierdas estas piezas únicas.`,
    metadata: {
      wordCount: 198,
      readingTime: '60 segundos',
      seoScore: 92,
      engagementPrediction: 89,
      toneAnalysis: 'Exclusivo, personal, urgente',
      targetAudience: 'Clientes VIP, alta frecuencia de compra'
    },
    gptScore: 0.96,
    confidence: 98,
    hashtags: ['#VIPAccess', '#ExclusiveCollection', '#UrbanSophistication', '#LimitedEdition'],
    callToAction: 'ACCEDER A MI COLECCIÓN VIP',
    variations: [
      'Versión corta: Email de recordatorio con menos texto',
      'Versión segmento joven: Tono más casual y emojis',
      'Versión última oportunidad: Mayor urgencia'
    ],
    keywords: ['acceso VIP', 'colección otoño', 'exclusivo', 'cashmere', 'preventa'],
    socialChannels: ['Email', 'SMS premium'],
    performancePrediction: {
      clicks: 1247,
      engagement: 23.4,
      conversion: 28.9
    }
  }
];

// Componente para el loader de GPT
const GPTGenerationLoader: React.FC<{ stage: number; totalStages: number }> = ({ stage, totalStages }) => {
  const gptStages = [
    { 
      icon: Brain, 
      message: "Inicializando GPT-Fashion-4.5 Fine-tuned...", 
      detail: "Cargando parámetros especializados en moda",
      technical: "Model: 175B params, fine-tuned on 500k fashion texts"
    },
    { 
      icon: PenTool, 
      message: "Analizando contexto y audiencia objetivo...", 
      detail: "Procesando datos demográficos y psicográficos",
      technical: "Context window: 4096 tokens, attention heads: 96"
    },
    { 
      icon: Sparkles, 
      message: "Generando estructura narrativa optimizada...", 
      detail: "Aplicando técnicas de storytelling y persuasión",
      technical: "Temperature: 0.7, top_p: 0.9, frequency_penalty: 0.3"
    },
    { 
      icon: Target, 
      message: "Optimizando para engagement y conversión...", 
      detail: "Calibrando tono y llamadas a la acción",
      technical: "A/B testing embeddings, CTR optimization: 94.3%"
    },
    { 
      icon: Crown, 
      message: "Finalizando contenido premium...", 
      detail: "Aplicando verificaciones de calidad y marca",
      technical: "Quality score: 96.2%, brand alignment: 98.1%"
    },
  ];

  const currentStage = gptStages[Math.min(stage, gptStages.length - 1)];
  const Icon = currentStage.icon;

  return (
    <div className="bg-gradient-to-br from-emerald-950 to-teal-950 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl shadow-emerald-900/30">
      <div className="space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg mx-auto mb-4">
            <Icon size={28} className="animate-pulse" />
          </div>
          <h3 className="text-2xl font-light text-white mb-2">GPT Generando Contenido Premium</h3>
          <p className="text-emerald-400 text-sm">Inteligencia Artificial especializada en moda</p>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-white font-medium mb-2">{currentStage.message}</h4>
            <p className="text-emerald-400 text-sm mb-1 font-medium">{currentStage.detail}</p>
            <p className="text-teal-400 text-xs font-mono font-bold">{currentStage.technical}</p>
          </div>

          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-700"
              style={{ width: `${((stage + 1) / totalStages) * 100}%` }}
            />
          </div>

          <div className="flex justify-center space-x-2">
            {gptStages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= stage ? 'bg-emerald-400' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-teal-400 text-sm font-bold">
            GPT Fine-tuned procesando • Creatividad: {Math.round(75 + (stage * 4))}%
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente para tarjetas de contenido generado
const ContentCard: React.FC<{ content: ContentGenerationResult; index: number }> = ({ content, index }) => {
  const [showVariations, setShowVariations] = useState(false);
  const [copied, setCopied] = useState(false);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'product_description': return PenTool;
      case 'social_post': return MessageSquare;
      case 'blog_article': return Star;
      case 'email_campaign': return Target;
      case 'ad_copy': return Zap;
      default: return PenTool;
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'product_description': return 'Descripción de Producto';
      case 'social_post': return 'Post Redes Sociales';
      case 'blog_article': return 'Artículo de Blog';
      case 'email_campaign': return 'Campaña de Email';
      case 'ad_copy': return 'Copy Publicitario';
      default: return 'Contenido';
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TypeIcon = getTypeIcon(content.type);

  return (
    <div className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-xl">
            <TypeIcon size={18} className="text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{getTypeLabel(content.type)}</h3>
            <p className="text-sm text-gray-500">{content.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            GPT {(content.gptScore * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Content Preview */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4 max-h-48 overflow-y-auto">
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {content.content.slice(0, 300)}
          {content.content.length > 300 && '...'}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Eye size={14} className="text-blue-500" />
            <span className="text-xs text-gray-700">Engagement</span>
          </div>
          <div className="text-lg font-bold text-blue-600">{content.metadata.engagementPrediction}%</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Target size={14} className="text-green-500" />
            <span className="text-xs text-gray-700">SEO Score</span>
          </div>
          <div className="text-lg font-bold text-green-600">{content.metadata.seoScore}%</div>
        </div>
      </div>

      {/* Hashtags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {content.hashtags.slice(0, 3).map((tag, idx) => (
          <span key={idx} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
        {content.hashtags.length > 3 && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            +{content.hashtags.length - 3} más
          </span>
        )}
      </div>

      {/* Performance Prediction */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-gray-800 mb-2 text-sm">Predicción de Performance</h4>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-emerald-600">{content.performancePrediction.clicks.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Clicks</div>
          </div>
          <div>
            <div className="text-lg font-bold text-teal-600">{content.performancePrediction.engagement}%</div>
            <div className="text-xs text-gray-600">Engagement</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">{content.performancePrediction.conversion}%</div>
            <div className="text-xs text-gray-600">Conversión</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={copyToClipboard}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Copy size={16} />
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
        <button
          onClick={() => setShowVariations(!showVariations)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw size={16} />
          Variaciones
        </button>
      </div>

      {/* Variations */}
      {showVariations && (
        <div className="mt-4 space-y-3">
          <h4 className="font-semibold text-gray-800 text-sm">Variaciones Generadas</h4>
          {content.variations.map((variation, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-700">{variation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Componente principal
export function ContentGeneration({ contentType, brand, audience }: ContentGenerationProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<ContentGenerationResult[]>([]);
  const [selectedType, setSelectedType] = useState(contentType || 'all');

  useEffect(() => {
    const totalStages = 5;
    const stageInterval = setInterval(() => {
      setLoadingStage(prev => {
        if (prev >= totalStages - 1) {
          clearInterval(stageInterval);
          setTimeout(() => {
            setGeneratedContent(mockGeneratedContent);
            setIsLoading(false);
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1800);

    return () => clearInterval(stageInterval);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <GPTGenerationLoader stage={loadingStage} totalStages={5} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
          Generación de Contenido IA
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          GPT Fine-tuned crea contenido premium optimizado para tu marca y audiencia
        </p>
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Brain size={16} className="text-emerald-500" />
            <span>GPT-4.5 Fine-tuned</span>
          </div>
          <div className="flex items-center gap-2">
            <PenTool size={16} className="text-teal-500" />
            <span>500k textos de moda</span>
          </div>
          <div className="flex items-center gap-2">
            <Target size={16} className="text-blue-500" />
            <span>96% calidad</span>
          </div>
        </div>
      </div>

      {/* Content Type Filters */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {['all', 'product_description', 'social_post', 'email_campaign', 'ad_copy'].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              selectedType === type
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'
            }`}
          >
            {type === 'all' ? 'Todo el Contenido' : 
             type === 'product_description' ? 'Descripciones' :
             type === 'social_post' ? 'Posts Sociales' :
             type === 'email_campaign' ? 'Email Marketing' :
             'Copy Publicitario'}
          </button>
        ))}
      </div>

      {/* Generated Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {generatedContent
          .filter(content => selectedType === 'all' || content.type === selectedType)
          .map((content, index) => (
            <ContentCard key={content.id} content={content} index={index} />
          ))}
      </div>

      {/* GPT Insights Summary */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Insights de Generación GPT
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-emerald-600 mb-2">96%</div>
            <div className="text-sm text-gray-600">Calidad Promedio</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-teal-600 mb-2">175B</div>
            <div className="text-sm text-gray-600">Parámetros del Modelo</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">500k</div>
            <div className="text-sm text-gray-600">Textos de Entrenamiento</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">89%</div>
            <div className="text-sm text-gray-600">Engagement Predicho</div>
          </div>
        </div>
      </div>
    </div>
  );
} 