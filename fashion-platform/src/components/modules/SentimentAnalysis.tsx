'use client';

import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, TrendingUp, Users, Award, MessageSquareQuote, Brain, Zap } from 'lucide-react';
import { getMockSentimentAnalysisByContext, AIAnalysisResult, SentimentInsight, EmotionalMetrics, PremiumReview } from '@/lib/mocks/sentimentAnalysis';

// Principio de Responsabilidad Única (SRP)
interface AILoadingProps {
  stage: number;
  totalStages: number;
}

interface EmotionalBarProps {
  emotion: keyof EmotionalMetrics;
  value: number;
  color: string;
  description: string;
  show: boolean;
}

interface LuxuryInsightProps {
  insight: SentimentInsight;
  index: number;
}

interface PremiumReviewProps {
  review: PremiumReview;
  colorClass: string;
}

interface SentimentAnalysisProps {
  productId: string;
  context?: 'product' | 'event' | 'community';
}

// Componente para el loader de IA ultra-realista
const AIAnalysisLoader: React.FC<AILoadingProps> = ({ stage, totalStages }) => {
  const analysisStages = [
    { icon: Brain, message: "Inicializando modelo SentimentLux-GPT-4.2...", detail: "Cargando parámetros neuronales" },
    { icon: Zap, message: "Procesando 1,247 reseñas con NLP avanzado...", detail: "Análisis semántico en progreso" },
    { icon: TrendingUp, message: "Calculando métricas emocionales premium...", detail: "Algoritmo de sofisticación activado" },
    { icon: Users, message: "Segmentando insights por demografía VIP...", detail: "Analizando patrones de lujo" },
    { icon: Award, message: "Generando recomendaciones de alto valor...", detail: "Calibrando confianza del modelo" },
  ];

  const currentStage = analysisStages[Math.min(stage, analysisStages.length - 1)];
  const Icon = currentStage.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
          <Icon size={20} className="animate-pulse" />
        </div>
        <div className="flex-1">
          <p className="text-white font-medium">{currentStage.message}</p>
          <p className="text-gray-400 text-sm mt-1">{currentStage.detail}</p>
        </div>
      </div>
      
      <div className="w-full bg-white/10 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${((stage + 1) / totalStages) * 100}%` }}
        />
      </div>
      
      <div className="text-center">
        <p className="text-gray-300 text-sm">
          Procesando con IA Premium • Confianza: {Math.round(85 + (stage * 2.5))}%
        </p>
      </div>
    </div>
  );
};

// Componente para barras emocionales premium
const EmotionalBar: React.FC<EmotionalBarProps> = ({ emotion, value, color, description, show }) => {
  const emotionIcons = {
    elegance: '✨',
    confidence: '💎', 
    sophistication: '🎩',
    exclusivity: '👑',
    comfort: '🤗'
  };

  const emotionLabels = {
    elegance: 'Elegancia',
    confidence: 'Confianza',
    sophistication: 'Sofisticación', 
    exclusivity: 'Exclusividad',
    comfort: 'Comodidad'
  };

  return (
    <div className="group hover:bg-white/5 rounded-xl p-4 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
  <div className="flex items-center gap-3">
          <span className="text-2xl">{emotionIcons[emotion]}</span>
          <div>
            <h4 className="text-white font-medium">{emotionLabels[emotion]}</h4>
            <p className="text-gray-400 text-sm">{description}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-light text-white">{value}%</span>
          <p className="text-xs text-gray-400">índice premium</p>
        </div>
      </div>
      
      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
        <div 
          className={`${color} h-1.5 rounded-full transition-all duration-1500 ease-out`}
          style={{ width: show ? `${value}%` : '0%' }}
        />
      </div>
    </div>
  );
};

// Componente para insights de lujo
const LuxuryInsightCard: React.FC<LuxuryInsightProps> = ({ insight, index }) => {
  return (
    <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-sm">
          {index + 1}
        </div>
        <div className="flex-1">
          <p className="text-white font-medium mb-2">{insight.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              <Users size={14} />
              {insight.demographic}
            </span>
            <span className="flex items-center gap-1">
              <Sparkles size={14} />
              {insight.luxuryContext}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-light text-amber-400">{insight.percentage}%</div>
          <div className="text-xs text-gray-400">precisión IA</div>
        </div>
      </div>
  </div>
);
};

// Componente para reseñas premium
const PremiumReviewCard: React.FC<PremiumReviewProps> = ({ review, colorClass }) => {
  const tierColors = {
    VIP: 'from-yellow-400 to-amber-500',
    Premium: 'from-purple-400 to-purple-500', 
    Regular: 'from-gray-400 to-gray-500'
  };

  return (
    <div className="relative border-l-2 border-white/20 pl-6 py-4">
      <div className="absolute -left-2 top-4">
        <MessageSquareQuote size={16} className={colorClass} />
      </div>
      
      <blockquote className="text-gray-200 italic leading-relaxed mb-3">
        "{review.text}"
      </blockquote>
      
      <div className="flex items-center justify-between">
        <cite className="text-sm text-gray-400 not-italic">— {review.author}</cite>
        <div className="flex items-center gap-2">
          {review.verifiedPurchase && (
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              ✓ Compra verificada
            </span>
          )}
          <span className={`text-xs bg-gradient-to-r ${tierColors[review.clientTier]} text-white px-2 py-1 rounded-full font-medium`}>
            {review.clientTier}
          </span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mt-3">
        {review.luxuryTags.map((tag: string, index: number) => (
          <span key={index} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
  </div>
);
};

// Componente principal con arquitectura SOLID
export function SentimentAnalysis({ productId, context = 'product' }: SentimentAnalysisProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState(0);
  const [analysisData, setAnalysisData] = useState<AIAnalysisResult | null>(null);

  useEffect(() => {
    const totalStages = 5;
    const stageInterval = setInterval(() => {
      setLoadingStage(prev => {
        if (prev < totalStages - 1) {
          return prev + 1;
        } else {
          clearInterval(stageInterval);
          setTimeout(() => {
            setAnalysisData(getMockSentimentAnalysisByContext(context, productId));
            setIsLoading(false);
          }, 1000);
          return prev;
        }
      });
    }, 900);

    return () => clearInterval(stageInterval);
  }, [productId, context]);

  if (!analysisData && !isLoading) return null;

  return (
    <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/30">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
          <Brain size={24} />
        </div>
        <div>
          <h3 className="font-light text-2xl text-white tracking-wide">Análisis de Sentimiento por IA</h3>
          <p className="text-gray-400 text-sm mt-1">
            {isLoading ? 'Procesando...' : `Modelo: ${analysisData?.modelVersion} • Confianza: ${analysisData?.aiConfidenceScore}%`}
          </p>
        </div>
      </div>

      {isLoading ? (
        <AIAnalysisLoader stage={loadingStage} totalStages={5} />
      ) : (
        <div className="space-y-8 animate-fade-in">
          {/* Perfil Emocional Premium */}
          <div>
            <h4 className="text-white font-medium mb-6 flex items-center gap-2">
              <Sparkles size={18} className="text-amber-400" />
              Perfil Emocional Premium
            </h4>
            <div className="space-y-2">
              <EmotionalBar emotion="elegance" value={analysisData!.emotionalProfile.elegance} color="bg-gradient-to-r from-amber-400 to-yellow-500" description="Impacto en percepción de sofisticación" show={!isLoading} />
              <EmotionalBar emotion="confidence" value={analysisData!.emotionalProfile.confidence} color="bg-gradient-to-r from-emerald-400 to-green-500" description="Incremento en autoestima reportado" show={!isLoading} />
              <EmotionalBar emotion="sophistication" value={analysisData!.emotionalProfile.sophistication} color="bg-gradient-to-r from-purple-400 to-purple-500" description="Reconocimiento de refinamiento" show={!isLoading} />
              <EmotionalBar emotion="exclusivity" value={analysisData!.emotionalProfile.exclusivity} color="bg-gradient-to-r from-pink-400 to-rose-500" description="Sensación de pertenencia a élite" show={!isLoading} />
              <EmotionalBar emotion="comfort" value={analysisData!.emotionalProfile.comfort} color="bg-gradient-to-r from-blue-400 to-cyan-500" description="Bienestar físico y emocional" show={!isLoading} />
            </div>
          </div>

          {/* Insights de Lujo */}
          <div className="border-t border-white/10 pt-8">
            <h4 className="text-white font-medium mb-6 flex items-center gap-2">
              <Award size={18} className="text-purple-400" />
              Insights de Audiencia Premium
            </h4>
            <div className="space-y-4">
              {analysisData!.luxuryInsights.map((insight, index) => (
                <LuxuryInsightCard key={insight.id} insight={insight} index={index} />
              ))}
            </div>
          </div>

          {/* Reseñas Destacadas */}
          <div className="border-t border-white/10 pt-8">
            <h4 className="text-white font-medium mb-6 flex items-center gap-2">
              <MessageSquareQuote size={18} className="text-blue-400" />
              Testimonios Verificados por IA
            </h4>
            <div className="space-y-6">
              {analysisData!.premiumReviews.map((review) => (
                <PremiumReviewCard 
                  key={review.id} 
                  review={review} 
                  colorClass={review.sentiment === 'positive' ? 'text-emerald-400' : review.sentiment === 'negative' ? 'text-rose-400' : 'text-gray-400'} 
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 