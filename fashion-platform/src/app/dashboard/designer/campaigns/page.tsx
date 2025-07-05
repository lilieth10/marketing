'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ArrowLeft, Brain, Zap, TrendingUp, Target, Plus, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DesignerCampaigns } from '@/components/designer/DesignerCampaigns';
import { useCampaignsStore } from '@/store/campaigns.store';
import { useAuthStore } from '@/store/auth.store';

export default function DesignerCampaignsPage() {
  const router = useRouter();
  const { campaigns, addCampaign } = useCampaignsStore();
  const { user } = useAuthStore();
  const [newCampaignModal, setNewCampaignModal] = useState(false);
  const [autoIAModal, setAutoIAModal] = useState(false);
  const [creatingCampaign, setCreatingCampaign] = useState(false);
  const [activatingIA, setActivatingIA] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState({
    name: '',
    objective: 'Aumentar ventas',
    budget: 0,
    targetAudience: '',
    platform: [] as string[]
  });

  // Filtrar campañas del diseñador actual
  const userCampaigns = campaigns.filter(campaign => 
    campaign.designerId === (user?.id || 'designer-1')
  );

  const handleNewCampaign = () => {
    setNewCampaignModal(true);
  };

  const handleActivateAutoIA = () => {
    setAutoIAModal(true);
  };

  const handleCreateCampaign = () => {
    if (!formData.name || !formData.budget || !formData.targetAudience) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setCreatingCampaign(true);
    
    setTimeout(() => {
      // Agregar campaña al store con IA automática
      addCampaign({
        name: formData.name,
        objective: formData.objective,
        budget: formData.budget,
        targetAudience: formData.targetAudience,
        platform: formData.platform.length > 0 ? formData.platform : ['Instagram', 'Facebook'],
        designerId: user?.id || 'designer-1',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'draft'
      });

      // Limpiar formulario
      setFormData({
        name: '',
        objective: 'Aumentar ventas',
        budget: 0,
        targetAudience: '',
        platform: []
      });

      setCreatingCampaign(false);
      setNewCampaignModal(false);
      alert('✨ Campaña creada exitosamente con optimización IA\n\n🎯 La campaña aparece en tu lista como "Borrador"\n📊 Puedes activarla cuando estés listo\n🤖 IA ya está optimizando la segmentación');
    }, 2000);
  };

  const handleActivateIA = () => {
    setActivatingIA(true);
    setTimeout(() => {
      setActivatingIA(false);
      setAutoIAModal(false);
      alert('🤖 IA Automática activada. Tus campañas se optimizarán en tiempo real');
    }, 1500);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlatformToggle = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platform: prev.platform.includes(platform)
        ? prev.platform.filter(p => p !== platform)
        : [...prev.platform, platform]
    }));
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header con botón de volver */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center mb-4">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Volver</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            Campañas de Marketing 📢
            <Brain className="text-blue-600" size={32} />
          </h1>
          <p className="text-gray-600">Gestiona y optimiza tus campañas publicitarias con IA avanzada</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="primary" 
            onClick={handleNewCampaign}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Plus size={18} className="mr-2" />
            Nueva Campaña IA
          </Button>
        </div>
      </div>

      {/* Stats Cards Mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium">Campañas Activas</p>
              <p className="text-2xl font-bold text-green-900">{userCampaigns.filter(c => c.status === 'active').length}</p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp size={12} />
                Optimizadas con IA
              </p>
            </div>
            <div className="p-3 bg-green-200 rounded-full">
              <span className="text-xl">📊</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-medium">Gasto del Mes</p>
              <p className="text-2xl font-bold text-blue-900">
                ${userCampaigns.reduce((acc, c) => acc + (c.budget || 0), 0).toLocaleString()}
              </p>
              <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                <Target size={12} />
                ROI optimizado
              </p>
            </div>
            <div className="p-3 bg-blue-200 rounded-full">
              <span className="text-xl">💰</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 font-medium">Impresiones</p>
              <p className="text-2xl font-bold text-purple-900">
                {(userCampaigns.reduce((acc, c) => acc + (c.impressions || 0), 0) / 1000).toFixed(1)}K
              </p>
              <p className="text-xs text-purple-600 mt-1 flex items-center gap-1">
                <Brain size={12} />
                Segmentación IA
              </p>
            </div>
            <div className="p-3 bg-purple-200 rounded-full">
              <span className="text-xl">👁️</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700 font-medium">Total Clicks</p>
              <p className="text-2xl font-bold text-yellow-900">
                {userCampaigns.reduce((acc, c) => acc + (c.clicks || 0), 0).toLocaleString()}
              </p>
              <p className="text-xs text-yellow-600 mt-1 flex items-center gap-1">
                <Zap size={12} />
                IA Predictiva
              </p>
            </div>
            <div className="p-3 bg-yellow-200 rounded-full">
              <span className="text-xl">📈</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Componente DesignerCampaigns con IA */}
      <DesignerCampaigns 
        campaigns={userCampaigns}
        showTitle={false}
      />

      {/* Panel de Insights IA adicional */}
      <Card className="p-8 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Brain className="text-indigo-600" size={32} />
            <h3 className="text-2xl font-bold text-indigo-900">IA Marketing Avanzada</h3>
          </div>
          <p className="text-indigo-700 mb-6 max-w-2xl mx-auto">
            Nuestros algoritmos analizan en tiempo real el comportamiento de tu audiencia para optimizar 
            automáticamente el targeting, presupuesto y timing de tus campañas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-indigo-100">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-gray-900">Targeting Inteligente</h4>
              <p className="text-sm text-gray-600">IA identifica tu audiencia perfecta</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-100">
              <div className="text-2xl mb-2">⏰</div>
              <h4 className="font-semibold text-gray-900">Timing Óptimo</h4>
              <p className="text-sm text-gray-600">Publica cuando tu audiencia está activa</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-indigo-100">
              <div className="text-2xl mb-2">💰</div>
              <h4 className="font-semibold text-gray-900">Budget Automático</h4>
              <p className="text-sm text-gray-600">Distribución inteligente de presupuesto</p>
            </div>
          </div>
          <Button 
            variant="primary" 
            onClick={handleActivateAutoIA}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            <Zap size={18} className="mr-2" />
            Activar IA Automática
          </Button>
        </div>
      </Card>

      {/* Modal Nueva Campaña */}
      <Modal 
        open={newCampaignModal} 
        onClose={() => setNewCampaignModal(false)}
        title="🚀 Crear Nueva Campaña con IA"
      >
        <div className="space-y-6">
          {creatingCampaign ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 mb-2">Creando campaña con IA...</p>
              <div className="text-sm text-gray-500">
                <p>• Analizando audiencia objetivo</p>
                <p>• Optimizando presupuesto</p>
                <p>• Configurando targeting</p>
                <p>• Generando creativos</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Campaña *</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Colección Primavera 2024"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Objetivo *</label>
                <select 
                  value={formData.objective}
                  onChange={(e) => handleInputChange('objective', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Aumentar ventas">Aumentar ventas</option>
                  <option value="Generar awareness">Generar awareness</option>
                  <option value="Conseguir leads">Conseguir leads</option>
                  <option value="Engagement">Engagement</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Audiencia Objetivo *</label>
                <input 
                  type="text" 
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Mujeres 25-35 interesadas en moda sostenible"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Presupuesto (USD) *</label>
                <input 
                  type="number" 
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="1500"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Plataformas (opcional)</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Instagram', 'Facebook', 'TikTok', 'Google'].map(platform => (
                    <label 
                      key={platform}
                      className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.platform.includes(platform)}
                        onChange={() => handlePlatformToggle(platform)}
                        className="text-blue-600"
                      />
                      <span className="text-sm font-medium">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                  <Brain size={16} className="text-blue-600" />
                  IA Sugerirá Automáticamente:
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Audiencia objetivo óptima</li>
                  <li>• Mejores horarios de publicación</li>
                  <li>• Distribución de presupuesto por plataforma</li>
                  <li>• Creativos y copy optimizados</li>
                </ul>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="secondary" onClick={() => setNewCampaignModal(false)}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={handleCreateCampaign}>
                  <Sparkles size={16} className="mr-2" />
                  Crear con IA
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Modal Activar IA Automática */}
      <Modal 
        open={autoIAModal} 
        onClose={() => setAutoIAModal(false)}
        title="🤖 Activar IA Automática"
      >
        <div className="space-y-6">
          {activatingIA ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 mb-2">Activando IA Automática...</p>
              <div className="text-sm text-gray-500">
                <p>• Configurando algoritmos</p>
                <p>• Conectando con plataformas</p>
                <p>• Calibrando optimizaciones</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200 text-center">
                <div className="text-4xl mb-3">🤖</div>
                <h3 className="text-lg font-bold text-purple-900 mb-2">IA Automática Premium</h3>
                <p className="text-purple-700 text-sm mb-4">
                  Optimización continua 24/7 de todas tus campañas
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm font-medium text-green-900">✓ Auto-optimización de presupuesto</span>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Incluido</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm font-medium text-green-900">✓ Ajuste automático de audiencias</span>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Incluido</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm font-medium text-green-900">✓ Optimización de timing</span>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Incluido</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-sm font-medium text-blue-900">⚡ Reportes predictivos</span>
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Premium</span>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Tip:</strong> La IA aprenderá de tus campañas anteriores y mejorará automáticamente el rendimiento en un 25-40% promedio.
                </p>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="secondary" onClick={() => setAutoIAModal(false)}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={handleActivateIA}>
                  <Zap size={16} className="mr-2" />
                  Activar Ahora
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
} 