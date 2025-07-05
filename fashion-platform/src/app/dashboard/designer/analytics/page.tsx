'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ArrowLeft, Brain, TrendingUp, Target, Zap, Download, Bell, Settings, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DesignerAnalytics } from '@/components/designer/DesignerAnalytics';

export default function DesignerAnalyticsPage() {
  const router = useRouter();
  const [reportModal, setReportModal] = useState(false);
  const [alertsModal, setAlertsModal] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [alertsConfigured, setAlertsConfigured] = useState(false);

  // Función para generar reporte IA completo
  const handleGenerateReport = () => {
    setGeneratingReport(true);
    setReportModal(true);
    
    setTimeout(() => {
      setGeneratingReport(false);
      setReportGenerated(true);
    }, 3000);
  };

  // Función para configurar alertas inteligentes
  const handleConfigureAlerts = () => {
    setAlertsModal(true);
  };

  const handleSaveAlerts = () => {
    setAlertsConfigured(true);
    setTimeout(() => {
      setAlertsModal(false);
      setAlertsConfigured(false);
    }, 2000);
  };

  const handleDownloadReport = () => {
    // Simular descarga de reporte
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Reporte IA Completo - Fashion Platform\n\n=== ANÁLISIS GENERAL ===\nVentas totales: $18,450 (+24.5%)\nProductos vendidos: 247 (+18%)\nNuevos clientes: 89 (+31%)\n\n=== PREDICCIONES IA ===\nCrecimiento Q2: +89%\nCategoría estrella: Eco-Friendly\nMercado emergente: Europa\n\n=== RECOMENDACIONES ===\n1. Expandir línea sostenible\n2. Incrementar presencia en Instagram\n3. Lanzar colección en colores tierra\n4. Explorar mercado europeo\n\nGenerado por Fashion Platform IA';
    link.download = 'reporte-ia-completo.txt';
    link.click();
    alert('📄 Reporte descargado exitosamente');
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header con botón de volver */}
      <div className="flex justify-between items-center">
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
            📊 Análisis y Estadísticas
            <Brain className="text-purple-600" size={32} />
          </h1>
          <p className="text-gray-600">Métricas detalladas con insights de IA avanzada y predicciones en tiempo real</p>
        </div>
      </div>

      {/* Stats Cards Mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium">Ventas del Mes</p>
              <p className="text-2xl font-bold text-green-900">$18,450</p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp size={12} />
                ↗ +24.5% vs mes anterior
              </p>
            </div>
            <div className="p-3 bg-green-200 rounded-full">
              <span className="text-xl">💰</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-medium">Productos Vendidos</p>
              <p className="text-2xl font-bold text-blue-900">247</p>
              <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                <Target size={12} />
                ↗ +18% esta semana
              </p>
            </div>
            <div className="p-3 bg-blue-200 rounded-full">
              <span className="text-xl">👗</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 font-medium">Nuevos Clientes</p>
              <p className="text-2xl font-bold text-purple-900">89</p>
              <p className="text-xs text-purple-600 mt-1 flex items-center gap-1">
                <Brain size={12} />
                ↗ +31% segmentación IA
              </p>
            </div>
            <div className="p-3 bg-purple-200 rounded-full">
              <span className="text-xl">👥</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-pink-700 font-medium">Score IA Global</p>
              <p className="text-2xl font-bold text-pink-900">9.4/10</p>
              <p className="text-xs text-pink-600 mt-1 flex items-center gap-1">
                <Zap size={12} />
                Optimización activa
              </p>
            </div>
            <div className="p-3 bg-pink-200 rounded-full">
              <span className="text-xl">🤖</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Componente DesignerAnalytics con IA completa */}
      <DesignerAnalytics />

      {/* Panel adicional de Predicciones IA */}
      <Card className="p-8 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Brain className="text-indigo-600" size={32} />
            <h3 className="text-2xl font-bold text-indigo-900">Predicciones IA Avanzadas</h3>
          </div>
          <p className="text-indigo-700 mb-6 max-w-2xl mx-auto">
            Nuestros algoritmos de machine learning analizan miles de patrones para predecir tendencias, 
            demanda y oportunidades de crecimiento específicas para tu marca.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg border border-indigo-100">
              <div className="text-3xl mb-3">📈</div>
              <h4 className="font-semibold text-gray-900 mb-2">Proyección Q2</h4>
              <div className="text-2xl font-bold text-green-600 mb-1">+89%</div>
              <p className="text-sm text-gray-600">Crecimiento predicho en ventas</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-indigo-100">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-semibold text-gray-900 mb-2">Producto Estrella</h4>
              <div className="text-lg font-bold text-purple-600 mb-1">Eco-Friendly</div>
              <p className="text-sm text-gray-600">Categoría con mayor potencial</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-indigo-100">
              <div className="text-3xl mb-3">💡</div>
              <h4 className="font-semibold text-gray-900 mb-2">Oportunidad</h4>
              <div className="text-lg font-bold text-blue-600 mb-1">Europa</div>
              <p className="text-sm text-gray-600">Mercado emergente detectado</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              onClick={handleGenerateReport}
            >
              <Brain size={18} className="mr-2" />
              Generar Reporte IA Completo
            </Button>
            <Button 
              variant="secondary" 
              className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
              onClick={handleConfigureAlerts}
            >
              <Zap size={18} className="mr-2" />
              Configurar Alertas Inteligentes
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal de Reporte IA */}
      <Modal 
        open={reportModal} 
        onClose={() => setReportModal(false)}
        title="🤖 Generando Reporte IA Completo"
        size="lg"
      >
        <div className="space-y-6">
          {generatingReport ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
              <p className="text-lg font-semibold text-gray-700 mb-4">Generando reporte completo con IA...</p>
              <div className="text-sm text-gray-500 space-y-2">
                <p>• Analizando tendencias de mercado (73%)</p>
                <p>• Procesando datos de ventas y comportamiento</p>
                <p>• Generando predicciones y recomendaciones</p>
                <p>• Creando visualizaciones avanzadas</p>
              </div>
            </div>
          ) : reportGenerated ? (
            <div className="space-y-6">
              <div className="text-center py-4">
                <CheckCircle className="text-green-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">¡Reporte IA Generado!</h3>
                <p className="text-gray-600">El análisis completo está listo para descargar</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-4">📊 Contenido del Reporte:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-600">✓</span>
                      <span>Análisis de rendimiento detallado</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-600">✓</span>
                      <span>Predicciones de tendencias Q2-Q3</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-600">✓</span>
                      <span>Segmentación de clientes IA</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-600">✓</span>
                      <span>Optimización de precios</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-600">✓</span>
                      <span>Análisis de competencia</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-600">✓</span>
                      <span>Oportunidades de mercado</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-600">✓</span>
                      <span>Recomendaciones accionables</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-600">✓</span>
                      <span>Gráficos y visualizaciones</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button 
                  variant="primary" 
                  className="flex-1"
                  onClick={handleDownloadReport}
                >
                  <Download size={18} className="mr-2" />
                  Descargar Reporte PDF
                </Button>
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => setReportModal(false)}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </Modal>

      {/* Modal de Alertas Inteligentes */}
      <Modal 
        open={alertsModal} 
        onClose={() => setAlertsModal(false)}
        title="⚡ Configurar Alertas Inteligentes"
        size="lg"
      >
        <div className="space-y-6">
          {alertsConfigured ? (
            <div className="text-center py-8">
              <CheckCircle className="text-green-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">¡Alertas Configuradas!</h3>
              <p className="text-gray-600">Recibirás notificaciones inteligentes por email y en la app</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Bell className="text-blue-600 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Alertas Inteligentes con IA</h4>
                    <p className="text-sm text-blue-800">
                      La IA monitoreará constantemente tus métricas y te alertará sobre oportunidades, 
                      riesgos y cambios importantes en tiempo real.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Tipos de Alertas:</h4>
                
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <input type="checkbox" defaultChecked className="mt-1" />
                    <div>
                      <div className="font-medium text-gray-900">📈 Oportunidades de Ventas</div>
                      <div className="text-sm text-gray-600">Detecta tendencias emergentes y productos con potencial</div>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <input type="checkbox" defaultChecked className="mt-1" />
                    <div>
                      <div className="font-medium text-gray-900">⚠️ Alertas de Riesgo</div>
                      <div className="text-sm text-gray-600">Identifica caídas en ventas o problemas de inventario</div>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <input type="checkbox" defaultChecked className="mt-1" />
                    <div>
                      <div className="font-medium text-gray-900">🎯 Metas y Objetivos</div>
                      <div className="text-sm text-gray-600">Te notifica cuando alcanzas hitos importantes</div>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <input type="checkbox" defaultChecked className="mt-1" />
                    <div>
                      <div className="font-medium text-gray-900">🔥 Tendencias de Mercado</div>
                      <div className="text-sm text-gray-600">Alertas sobre nuevas tendencias de moda y comportamiento</div>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <input type="checkbox" className="mt-1" />
                    <div>
                      <div className="font-medium text-gray-900">🛒 Comportamiento de Clientes</div>
                      <div className="text-sm text-gray-600">Cambios en patrones de compra y preferencias</div>
                    </div>
                  </label>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Frecuencia de Alertas:</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="frequency" value="realtime" defaultChecked />
                      <span className="text-sm">⚡ Tiempo real (recomendado)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="frequency" value="daily" />
                      <span className="text-sm">📅 Resumen diario</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="frequency" value="weekly" />
                      <span className="text-sm">📊 Resumen semanal</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button 
                  variant="primary" 
                  className="flex-1"
                  onClick={handleSaveAlerts}
                >
                  <Settings size={18} className="mr-2" />
                  Activar Alertas IA
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setAlertsModal(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
} 