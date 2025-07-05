'use client';

import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { getCampaignAIOptimization } from '@/lib/mocks/iaDesigner';
import { Brain, Target, Clock, DollarSign, Users, TrendingUp, Sparkles, BarChart3, Zap, Trash2, Share2, ThumbsUp, MessageCircle } from 'lucide-react';
import { useCampaignsStore } from '@/store/campaigns.store';

interface Campaign {
  id: string;
  name: string;
  status: "active" | "inactive" | "draft";
  targetAudience: string;
  startDate: string;
  endDate: string;
  budget?: number;
  platform?: string[];
  clicks?: number;
  impressions?: number;
  conversions?: number;
}

interface DesignerCampaignsProps {
  campaigns: Campaign[];
  showTitle?: boolean;
  maxItems?: number;
}

interface CampaignAIResult {
  audienceSegmentation: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  bestTimes: string[];
  budgetDistribution: {
    facebook: number;
    instagram: number;
    tiktok: number;
    google: number;
  };
  expectedROI: number;
  hashtags: string[];
  explanation: string;
  recommendations: string[];
}

export function DesignerCampaigns({ campaigns, showTitle = true, maxItems }: DesignerCampaignsProps) {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<CampaignAIResult | null>(null);
  const publishCampaign = useCampaignsStore(state => state.publishCampaign);
  const deleteCampaign = useCampaignsStore(state => state.deleteCampaign);
  const [shareMenuOpen, setShareMenuOpen] = useState<string | null>(null);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  // Estado social persistente por campaña
  const [socialStats, setSocialStats] = React.useState<{[id: string]: {likes: number, shares: number, comments: number}}>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('campaign_social_stats');
      return stored ? JSON.parse(stored) : {};
    }
    return {};
  });
  const updateSocial = (id: string, field: 'likes' | 'shares' | 'comments') => {
    setSocialStats(prev => {
      const updated = {
        ...prev,
        [id]: {
          likes: prev[id]?.likes || 0,
          shares: prev[id]?.shares || 0,
          comments: prev[id]?.comments || 0,
          [field]: (prev[id]?.[field] || 0) + 1
        }
      };
      localStorage.setItem('campaign_social_stats', JSON.stringify(updated));
      return updated;
    });
  };

  const displayCampaigns = maxItems ? campaigns.slice(0, maxItems) : campaigns;

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return '🟢';
      case 'draft':
        return '🟡';
      case 'inactive':
        return '⚪';
      default:
        return '⚪';
    }
  };

  const handleOptimizeWithAI = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setAnalyzing(true);
    setModalOpen(true);
    setAiResult(null);
    
    // Simular optimización IA con loading
    setTimeout(() => {
      const optimization = getCampaignAIOptimization(campaign);
      setAiResult(optimization);
      setAnalyzing(false);
    }, 2000);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setAiResult(null);
    setSelectedCampaign(null);
    setAnalyzing(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Seguro que quieres eliminar esta campaña? Esta acción no se puede deshacer.')) {
      deleteCampaign(id);
    }
  };

  // Cerrar menú al hacer clic fuera
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (shareMenuRef.current && !shareMenuRef.current.contains(e.target as Node)) {
        setShareMenuOpen(null);
      }
    }
    if (shareMenuOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [shareMenuOpen]);

  return (
    <>
      <Card className="p-6">
        {showTitle && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Zap className="text-blue-600" size={24} />
              Campañas Inteligentes
            </h2>
            <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              IA Marketing
            </span>
          </div>
        )}

        <div className="space-y-4">
          {displayCampaigns.map((campaign) => (
            <div 
              key={campaign.id} 
              className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:border-blue-200 transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-2xl">📢</span>
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <span className="text-lg">{getStatusIcon(campaign.status)}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status === 'active' ? 'Activa' : 
                       campaign.status === 'draft' ? 'Borrador' : 'Inactiva'}
                    </span>
                    <span className="text-sm text-gray-500">{campaign.targetAudience}</span>
                    {campaign.budget && (
                      <span className="text-sm font-medium text-green-600">${campaign.budget.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 md:gap-3 justify-end w-full md:w-auto mt-2 md:mt-0 relative">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOptimizeWithAI(campaign)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center space-x-2"
                >
                  <Brain size={16} />
                  <span>Optimizar con IA</span>
                </Button>
                {campaign.status === 'draft' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => publishCampaign(campaign.id)}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white flex items-center space-x-2"
                  >
                    <Zap size={16} />
                    <span>Publicar</span>
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(campaign.id)}
                  className="text-red-600 border-red-200 hover:bg-red-50 ml-1 p-2"
                  title="Eliminar campaña"
                >
                  <Trash2 size={16} />
                </Button>
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShareMenuOpen(shareMenuOpen === campaign.id ? null : campaign.id)}
                    className="ml-1"
                    title="Compartir campaña"
                  >
                    <Share2 size={16} />
                  </Button>
                  {shareMenuOpen === campaign.id && (
                    <div ref={shareMenuRef} className="absolute z-50 mt-2 right-0 bg-white border rounded shadow-lg p-2 w-40">
                      <div className="font-semibold text-gray-700 mb-2">Compartir en:</div>
                      <button className="w-full flex items-center gap-2 py-1 hover:bg-gray-100 rounded" onClick={() => { updateSocial(campaign.id, 'shares'); setShareMenuOpen(null); }}><img src="/images/tiktok.svg" alt="TikTok" className="w-5 h-5"/> TikTok</button>
                      <button className="w-full flex items-center gap-2 py-1 hover:bg-gray-100 rounded" onClick={() => { updateSocial(campaign.id, 'shares'); setShareMenuOpen(null); }}><img src="/images/instagram.svg" alt="Instagram" className="w-5 h-5"/> Instagram</button>
                      <button className="w-full flex items-center gap-2 py-1 hover:bg-gray-100 rounded" onClick={() => { updateSocial(campaign.id, 'shares'); setShareMenuOpen(null); }}><img src="/images/facebook.svg" alt="Facebook" className="w-5 h-5"/> Facebook</button>
                      <button className="w-full flex items-center gap-2 py-1 hover:bg-gray-100 rounded" onClick={() => { updateSocial(campaign.id, 'shares'); setShareMenuOpen(null); }}><img src="/images/twitter.svg" alt="Twitter" className="w-5 h-5"/> Twitter</button>
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateSocial(campaign.id, 'likes')}
                  className="ml-1"
                  title="Me gusta"
                >
                  <ThumbsUp size={16} />
                  <span className="ml-1 text-xs">{socialStats[campaign.id]?.likes || 0}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateSocial(campaign.id, 'comments')}
                  className="ml-1"
                  title="Comentar"
                >
                  <MessageCircle size={16} />
                  <span className="ml-1 text-xs">{socialStats[campaign.id]?.comments || 0}</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Modal de Optimización IA */}
      <Modal 
        open={modalOpen} 
        onClose={handleCloseModal}
        title={`🚀 Optimización IA: ${selectedCampaign?.name}`}
      >
        <div className="space-y-6">
          {analyzing ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 mb-2">Optimizando campaña con IA...</p>
              <div className="text-sm text-gray-500">
                <p>• Analizando audiencia objetivo</p>
                <p>• Optimizando distribución de presupuesto</p>
                <p>• Detectando mejores horarios</p>
                <p>• Generando hashtags trending</p>
              </div>
            </div>
          ) : aiResult ? (
            <div className="space-y-6">
              {/* ROI Esperado */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">ROI Esperado</h3>
                    <p className="text-green-700">Retorno de inversión optimizado por IA</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">{aiResult.expectedROI}%</div>
                    <div className="text-sm text-green-500">Proyectado</div>
                  </div>
                </div>
              </div>

              {/* Segmentación de Audiencia */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                <h4 className="font-semibold text-purple-900 flex items-center gap-2 mb-4">
                  <Users size={18} className="text-purple-600" />
                  Segmentación de Audiencia IA
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-100">
                    <span className="text-sm font-medium text-gray-700">Audiencia Primaria</span>
                    <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">
                      {aiResult.audienceSegmentation.primary}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-100">
                    <span className="text-sm font-medium text-gray-700">Audiencia Secundaria</span>
                    <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">
                      {aiResult.audienceSegmentation.secondary}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-100">
                    <span className="text-sm font-medium text-gray-700">Audiencia Terciaria</span>
                    <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">
                      {aiResult.audienceSegmentation.tertiary}
                    </span>
                  </div>
                </div>
              </div>

              {/* Distribución de Presupuesto */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-900 flex items-center gap-2 mb-4">
                  <DollarSign size={18} className="text-blue-600" />
                  Distribución Óptima de Presupuesto
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Facebook</span>
                      <span className="font-bold text-blue-600">{aiResult.budgetDistribution.facebook}%</span>
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${aiResult.budgetDistribution.facebook}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Instagram</span>
                      <span className="font-bold text-pink-600">{aiResult.budgetDistribution.instagram}%</span>
                    </div>
                    <div className="w-full bg-pink-100 rounded-full h-2 mt-2">
                      <div 
                        className="bg-pink-500 h-2 rounded-full" 
                        style={{ width: `${aiResult.budgetDistribution.instagram}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">TikTok</span>
                      <span className="font-bold text-purple-600">{aiResult.budgetDistribution.tiktok}%</span>
                    </div>
                    <div className="w-full bg-purple-100 rounded-full h-2 mt-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${aiResult.budgetDistribution.tiktok}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Google</span>
                      <span className="font-bold text-green-600">{aiResult.budgetDistribution.google}%</span>
                    </div>
                    <div className="w-full bg-green-100 rounded-full h-2 mt-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${aiResult.budgetDistribution.google}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mejores Horarios */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-100">
                <h4 className="font-semibold text-orange-900 flex items-center gap-2 mb-3">
                  <Clock size={18} className="text-orange-600" />
                  Horarios Óptimos de Publicación
                </h4>
                <div className="flex flex-wrap gap-2">
                  {aiResult.bestTimes.map((time, index) => (
                    <span 
                      key={index}
                      className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hashtags Optimizados */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
                <h4 className="font-semibold text-indigo-900 flex items-center gap-2 mb-3">
                  <Sparkles size={18} className="text-indigo-600" />
                  Hashtags Trending
                </h4>
                <div className="flex flex-wrap gap-2">
                  {aiResult.hashtags.map((hashtag, index) => (
                    <span 
                      key={index}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-indigo-200 transition-colors"
                    >
                      {hashtag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Explicación IA */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">💡 Explicación del Análisis</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{aiResult.explanation}</p>
              </div>

              {/* Recomendaciones */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-100">
                <h4 className="font-semibold text-emerald-900 mb-3">🎯 Estrategias Recomendadas</h4>
                <ul className="space-y-2">
                  {aiResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-emerald-800">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <Button 
                  variant="secondary" 
                  onClick={() => handleOptimizeWithAI(selectedCampaign!)}
                  className="flex items-center space-x-2"
                >
                  <Brain size={16} />
                  <span>Re-optimizar</span>
                </Button>
                <Button 
                  variant="primary"
                  onClick={handleCloseModal}
                >
                  Aplicar Optimización
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </Modal>
    </>
  );
} 