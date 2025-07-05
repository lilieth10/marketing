'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useAuthStore } from '@/store/auth.store';
import { useUserProfileStore } from '@/store/userProfile.store';
import { ArrowLeft, Brain, TrendingUp, Sparkles, Target, Zap, BarChart3, Star, Award, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DesignerProfilePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { profile, updateProfile, initializeFromUser } = useUserProfileStore();
  const [isEditing, setIsEditing] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [analyzingProfile, setAnalyzingProfile] = useState(false);
  const [aiOptimization, setAiOptimization] = useState<any>(null);
  const [bioDraft, setBioDraft] = useState(profile.bio || '');

  useEffect(() => {
    if (user) {
      initializeFromUser(user);
    }
  }, [user, initializeFromUser]);

  useEffect(() => {
    if (isEditing) setBioDraft(profile.bio || '');
  }, [isEditing, profile.bio]);

  const handleSave = () => {
    updateProfile({ bio: bioDraft });
    setIsEditing(false);
  };

  const handleAIOptimization = () => {
    setAnalyzingProfile(true);
    setAiModalOpen(true);
    setAiOptimization(null);
    
    // Simular análisis IA del perfil
    setTimeout(() => {
      const optimization = {
        currentScore: Math.floor(Math.random() * 15) + 85,
        improvementPotential: Math.floor(Math.random() * 10) + 15,
        strengths: [
          'Portfolio diversificado y coherente',
          'Excelente engagement en redes sociales',
          'Productos bien optimizados para SEO',
          'Perfil profesional completado al 92%'
        ],
        weaknesses: [
          'Biografía podría ser más específica sobre tu nicho',
          'Faltan testimonios de clientes destacados',
          'Precios no optimizados según market analysis',
          'Frecuencia de publicación irregular'
        ],
        suggestedBio: 'Diseñadora especializada en moda sostenible y urbana. 5+ años creando piezas únicas que combinan estilo contemporáneo con consciencia ambiental. Reconocida por mi enfoque minimalista y uso de materiales eco-friendly. Colaboraciones con marcas éticas y presencia en Fashion Week Barcelona 2023.',
        brandingTips: [
          'Usa paleta de colores consistente (tierra/verdes)',
          'Destaca certificaciones de sostenibilidad',
          'Incluye proceso creativo en stories',
          'Colabora con influencers eco-conscious'
        ],
        pricingOptimization: {
          current: { min: 45, max: 180, avg: 89 },
          suggested: { min: 52, max: 195, avg: 98 },
          reason: 'Análisis de competencia muestra potencial de aumento del 10-12%'
        },
        contentStrategy: {
          optimalPostingTimes: ['Martes 18:00', 'Jueves 20:00', 'Sábado 11:00'],
          bestPerformingContent: 'Videos del proceso creativo (+145% engagement)',
          suggestedHashtags: ['#ModaSostenible', '#EcoFashion', '#DiseñoÉtico', '#SlowFashion']
        },
        predictions: {
          followerGrowth: '+340 en 30 días',
          salesIncrease: '+28% próximo trimestre',
          brandRecognition: '+65% con optimizaciones aplicadas'
        }
      };
      setAiOptimization(optimization);
      setAnalyzingProfile(false);
    }, 3000);
  };

  const profileCompleteness = 92;
  const nextMilestone = 95;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
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
            Mi Perfil de Diseñador ✨
            <Brain className="text-purple-600" size={32} />
          </h1>
          <p className="text-gray-600">Gestiona tu información y optimiza tu presencia con IA avanzada</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-3">
          <Button variant="secondary" onClick={handleAIOptimization} className="bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200">
            <Brain size={18} className="mr-2 text-purple-600" />
            🤖 Optimizar con IA
          </Button>
          <Button 
            variant={isEditing ? "primary" : "secondary"}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? '💾 Guardar' : '✏️ Editar'}
          </Button>
        </div>
      </div>

      {/* Progress y Score */}
      <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-indigo-900 flex items-center gap-2">
            <BarChart3 size={20} className="text-indigo-600" />
            Score de Perfil IA
          </h3>
          <span className="text-sm text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
            Análisis en tiempo real
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-indigo-700">Completitud del Perfil</span>
              <span className="text-sm font-medium text-indigo-900">{profileCompleteness}%</span>
            </div>
            <div className="w-full bg-indigo-100 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${profileCompleteness}%` }}
              ></div>
            </div>
            <p className="text-xs text-indigo-600 mt-2">
              ¡Solo {nextMilestone - profileCompleteness}% más para el siguiente nivel!
            </p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg border border-indigo-100">
            <div className="text-2xl font-bold text-green-600 mb-1">A+</div>
            <div className="text-sm text-green-700">Calificación IA</div>
          </div>
          
          <div className="text-center p-4 bg-white rounded-lg border border-indigo-100">
            <div className="text-2xl font-bold text-purple-600 mb-1">94</div>
            <div className="text-sm text-purple-700">Optimization Score</div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información Principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Star className="text-yellow-500" size={20} />
              Información Básica
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-3xl font-bold">
                      {user?.name.charAt(0).toUpperCase() || 'D'}
                    </span>
                  </div>
                  {isEditing && (
                    <button className="absolute -bottom-2 -right-2 bg-purple-600 text-white rounded-full p-2 text-xs hover:bg-purple-700 shadow-lg transition-all">
                      <Camera size={14} />
                    </button>
                  )}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{user?.name || 'Diseñador'}</h3>
                  <p className="text-gray-600 mt-1 text-lg">Diseñador de Moda Sostenible</p>
                  <div className="flex items-center space-x-2 mt-3">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-200">
                      ✅ Verificado
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full border border-purple-200">
                      ⭐ Premium
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full border border-yellow-200">
                      🏆 Top Rated
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Biografía Profesional</label>
                {isEditing ? (
                  <div className="space-y-2">
                    <textarea
                      className="w-full px-4 py-3 border-2 border-primary-light rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-primary-main bg-white text-gray-800 placeholder-gray-400 transition-all shadow-sm"
                      rows={5}
                      placeholder="Cuéntanos sobre ti, tu estilo y tu experiencia..."
                      value={bioDraft}
                      onChange={e => setBioDraft(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                      💡 IA sugiere: Menciona colaboraciones específicas y certificaciones para mayor credibilidad
                    </p>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {profile.bio || 'Aún no has escrito tu biografía profesional.'}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Especialidades</label>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-2 bg-purple-100 text-purple-700 rounded-full text-sm border border-purple-200 flex items-center gap-1">
                      🌱 Moda Sostenible
                    </span>
                    <span className="px-3 py-2 bg-blue-100 text-blue-700 rounded-full text-sm border border-blue-200 flex items-center gap-1">
                      👕 Streetwear
                    </span>
                    <span className="px-3 py-2 bg-green-100 text-green-700 rounded-full text-sm border border-green-200 flex items-center gap-1">
                      ✨ Casual Chic
                    </span>
                    {isEditing && (
                      <button className="px-3 py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-purple-300 hover:text-purple-600 transition-colors">
                        + Agregar
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Experiencia</label>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">5 años profesionales</span>
                      <TrendingUp className="text-green-600" size={18} />
                    </div>
                    <p className="text-xs text-green-600 mt-1">Crecimiento constante año tras año</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Enlaces y Contacto Mejorado */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="text-blue-500" size={20} />
              Presencia Digital
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                  <label className="block text-sm font-medium text-blue-700 mb-2 flex items-center gap-2">
                    🌐 Sitio Web
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Activo</span>
                  </label>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    www.mi-diseño.com
                  </a>
                  <p className="text-xs text-blue-600 mt-1">2.4K visitas este mes (+18%)</p>
                </div>
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-200">
                  <label className="block text-sm font-medium text-pink-700 mb-2 flex items-center gap-2">
                    📱 Instagram
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Verificado</span>
                  </label>
                  <p className="text-pink-700 font-medium">@mi_diseño_oficial</p>
                  <p className="text-xs text-pink-600 mt-1">1.2K seguidores (+127 esta semana)</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200">
                  <label className="block text-sm font-medium text-purple-700 mb-2 flex items-center gap-2">
                    📂 Portfolio
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">Premium</span>
                  </label>
                  <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                    Ver Portfolio Completo
                  </a>
                  <p className="text-xs text-purple-600 mt-1">15 proyectos destacados</p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                  <label className="block text-sm font-medium text-green-700 mb-2 flex items-center gap-2">
                    📞 Contacto Profesional
                  </label>
                  <p className="text-green-700 font-medium">{user?.email || 'correo@ejemplo.com'}</p>
                  <p className="text-xs text-green-600 mt-1">Respuesta promedio: 2 horas</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Panel Lateral Mejorado */}
        <div className="space-y-6">
          {/* Estadísticas del Perfil */}
          <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
            <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <BarChart3 size={18} className="text-indigo-600" />
              Analytics en Tiempo Real
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-indigo-100">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    👁️ Visualizaciones
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-indigo-900">2,340</span>
                    <div className="text-xs text-green-600">+12%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-indigo-100">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    👥 Seguidores
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-indigo-900">1,247</span>
                    <div className="text-xs text-green-600">+127</div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-indigo-100">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    👗 Productos
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-indigo-900">15</span>
                    <div className="text-xs text-blue-600">+2 nuevos</div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-indigo-100">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    ⭐ Rating Global
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-yellow-600">4.8/5</span>
                    <div className="text-xs text-green-600">Excelente</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Logros Mejorados */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award size={18} className="text-yellow-500" />
              Logros Desbloqueados
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="text-3xl mb-2">🥇</div>
                <div className="text-xs font-medium text-yellow-800">Top Seller</div>
                <div className="text-xs text-yellow-600">Nivel 3</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="text-3xl mb-2">🌱</div>
                <div className="text-xs font-medium text-green-800">Eco Hero</div>
                <div className="text-xs text-green-600">Certificado</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-xs font-medium text-purple-800">Fast Grower</div>
                <div className="text-xs text-purple-600">+100%</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200 opacity-50">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-xs font-medium text-gray-600">Legend</div>
                <div className="text-xs text-gray-500">Bloqueado</div>
              </div>
            </div>
          </Card>

          {/* Próximos Objetivos */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
            <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Target size={18} className="text-blue-600" />
              Objetivos IA
            </h3>
            
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Alcanzar 1,500 seguidores</span>
                  <span className="text-xs text-blue-600">84%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                </div>
                <div className="text-xs text-blue-600 mt-1">253 seguidores más</div>
              </div>
              
              <div className="bg-white p-3 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">20 productos publicados</span>
                  <span className="text-xs text-blue-600">75%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="text-xs text-blue-600 mt-1">5 productos más</div>
              </div>
              
              <div className="bg-white p-3 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Rating 4.9+</span>
                  <span className="text-xs text-blue-600">96%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
                <div className="text-xs text-blue-600 mt-1">+0.1 más</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Modal de Optimización IA */}
      <Modal 
        open={aiModalOpen} 
        onClose={() => setAiModalOpen(false)}
        title="🚀 Optimización Completa de Perfil IA"
      >
        <div className="space-y-6">
          {analyzingProfile ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 mb-2">Analizando tu perfil con IA avanzada...</p>
              <div className="text-sm text-gray-500">
                <p>• Evaluando coherencia de marca</p>
                <p>• Analizando performance vs competencia</p>
                <p>• Optimizando contenido y pricing</p>
                <p>• Generando estrategia personalizada</p>
              </div>
            </div>
          ) : aiOptimization ? (
            <div className="space-y-6">
              {/* Score actual vs potencial */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-100 text-center">
                  <div className="text-3xl font-bold text-blue-600">{aiOptimization.currentScore}%</div>
                  <div className="text-sm text-blue-700">Score Actual</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100 text-center">
                  <div className="text-3xl font-bold text-green-600">+{aiOptimization.improvementPotential}%</div>
                  <div className="text-sm text-green-700">Potencial de Mejora</div>
                </div>
              </div>

              {/* Fortalezas y Debilidades */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <Sparkles size={16} className="text-green-600" />
                    Fortalezas Identificadas
                  </h4>
                  <ul className="space-y-2">
                    {aiOptimization.strengths.map((strength: string, i: number) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-green-800">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100">
                  <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                    <Target size={16} className="text-orange-600" />
                    Áreas de Mejora
                  </h4>
                  <ul className="space-y-2">
                    {aiOptimization.weaknesses.map((weakness: string, i: number) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-orange-800">
                        <span className="text-orange-600 font-bold">•</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Biografía Sugerida */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                  <Brain size={16} className="text-purple-600" />
                  Biografía Optimizada por IA
                </h4>
                <div className="bg-white p-3 rounded border-l-4 border-purple-400">
                  <p className="text-gray-800 text-sm leading-relaxed italic">
                    "{aiOptimization.suggestedBio}"
                  </p>
                </div>
              </div>

              {/* Optimización de Precios */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-100">
                <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                  <TrendingUp size={16} className="text-yellow-600" />
                  Optimización de Precios
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded">
                    <div className="text-sm text-gray-600 mb-1">Rango Actual</div>
                    <div className="font-bold text-gray-900">
                      €{aiOptimization.pricingOptimization.current.min} - €{aiOptimization.pricingOptimization.current.max}
                    </div>
                    <div className="text-xs text-gray-500">Promedio: €{aiOptimization.pricingOptimization.current.avg}</div>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-green-400">
                    <div className="text-sm text-green-600 mb-1">Sugerido por IA</div>
                    <div className="font-bold text-green-900">
                      €{aiOptimization.pricingOptimization.suggested.min} - €{aiOptimization.pricingOptimization.suggested.max}
                    </div>
                    <div className="text-xs text-green-600">Promedio: €{aiOptimization.pricingOptimization.suggested.avg}</div>
                  </div>
                </div>
                <p className="text-xs text-yellow-700 mt-2 bg-yellow-100 p-2 rounded">
                  💡 {aiOptimization.pricingOptimization.reason}
                </p>
              </div>

              {/* Estrategia de Contenido */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-100">
                <h4 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                  <Zap size={16} className="text-indigo-600" />
                  Estrategia de Contenido IA
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-indigo-800 mb-2">Horarios Óptimos</div>
                    <div className="space-y-1">
                      {aiOptimization.contentStrategy.optimalPostingTimes.map((time: string, i: number) => (
                        <span key={i} className="inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs mr-1">
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-indigo-800 mb-2">Hashtags Trending</div>
                    <div className="space-y-1">
                      {aiOptimization.contentStrategy.suggestedHashtags.map((hashtag: string, i: number) => (
                        <span key={i} className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-1">
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-3 bg-white p-3 rounded border-l-4 border-indigo-400">
                  <div className="text-sm font-medium text-indigo-800">💡 Mejor Contenido:</div>
                  <div className="text-sm text-indigo-700">{aiOptimization.contentStrategy.bestPerformingContent}</div>
                </div>
              </div>

              {/* Predicciones */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-100">
                <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                  <BarChart3 size={16} className="text-emerald-600" />
                  Predicciones IA (30 días)
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center bg-white p-3 rounded">
                    <div className="text-xl font-bold text-emerald-600">{aiOptimization.predictions.followerGrowth}</div>
                    <div className="text-xs text-emerald-700">Nuevos Seguidores</div>
                  </div>
                  <div className="text-center bg-white p-3 rounded">
                    <div className="text-xl font-bold text-green-600">{aiOptimization.predictions.salesIncrease}</div>
                    <div className="text-xs text-green-700">Aumento en Ventas</div>
                  </div>
                  <div className="text-center bg-white p-3 rounded">
                    <div className="text-xl font-bold text-blue-600">{aiOptimization.predictions.brandRecognition}</div>
                    <div className="text-xs text-blue-700">Reconocimiento</div>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <Button 
                  variant="secondary" 
                  onClick={handleAIOptimization}
                  className="flex items-center space-x-2"
                >
                  <Brain size={16} />
                  <span>Re-analizar</span>
                </Button>
                <div className="space-x-2">
                  <Button variant="secondary">
                    📋 Generar Reporte
                  </Button>
                  <Button variant="primary">
                    🚀 Aplicar Todas las Optimizaciones
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
} 