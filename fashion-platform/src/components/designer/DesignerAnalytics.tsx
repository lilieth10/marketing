import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useUserProfileStore } from '@/store/userProfile.store';
import { useCampaignsStore } from '@/store/campaigns.store';
import { BarChart3, TrendingUp } from 'lucide-react';

interface DesignerAnalyticsProps {}

interface DesignerInsight {
  type: 'sales' | 'engagement' | 'trend' | 'customer';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  recommendation: string;
  value?: string;
  change?: number;
}

interface AnalyticsData {
  totalSales: number;
  salesChange: number;
  totalOrders: number;
  ordersChange: number;
  avgOrderValue: number;
  avgOrderChange: number;
  conversionRate: number;
  conversionChange: number;
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
}

// Helper para insights del diseñador
function getDesignerInsights(): DesignerInsight[] {
  const insights: DesignerInsight[] = [
    {
      type: 'sales',
      title: 'Aumento en ventas de productos sostenibles',
      description: 'Tus productos etiquetados como "sostenibles" han tenido un 45% más de ventas en los últimos 30 días.',
      impact: 'high',
      actionable: true,
      recommendation: 'Considera expandir tu línea de productos sostenibles y destacar más este aspecto en tu marketing.',
      value: '+45%',
      change: 45
    },
    {
      type: 'engagement',
      title: 'Mejor rendimiento en Instagram',
      description: 'Tus posts de Instagram tienen 2.3x más engagement que otras plataformas.',
      impact: 'medium',
      actionable: true,
      recommendation: 'Incrementa la frecuencia de publicaciones en Instagram y considera Instagram Shopping.',
      value: '2.3x',
      change: 130
    },
    {
      type: 'trend',
      title: 'Tendencia emergente: Colores tierra',
      description: 'Los colores tierra están ganando popularidad. Tus productos en estos tonos podrían beneficiarse.',
      impact: 'medium',
      actionable: true,
      recommendation: 'Diseña una colección cápsula en tonos tierra para la próxima temporada.',
      value: '+73%',
      change: 73
    },
    {
      type: 'customer',
      title: 'Feedback positivo en personalización',
      description: 'Los clientes valoran especialmente las opciones de personalización en tus productos.',
      impact: 'high',
      actionable: true,
      recommendation: 'Expande las opciones de personalización a más productos de tu catálogo.',
      value: '4.8/5',
      change: 20
    },
    {
      type: 'sales',
      title: 'Horario óptimo de conversión detectado',
      description: 'La IA detectó que tus ventas se concentran los jueves entre 15:00-17:00 horas.',
      impact: 'medium',
      actionable: true,
      recommendation: 'Programa el lanzamiento de nuevos productos y ofertas especiales en este horario.',
      value: '🕒 15-17h',
      change: 25
    },
    {
      type: 'engagement',
      title: 'Contenido de video en aumento',
      description: 'Tus videos de productos tienen 4x más interacciones que las imágenes estáticas.',
      impact: 'high',
      actionable: true,
      recommendation: 'Crea más contenido de video mostrando el proceso de diseño y uso de productos.',
      value: '4x',
      change: 300
    }
  ];
  
  return insights.slice(0, Math.floor(Math.random() * 4) + 3);
}

// Mock data para análisis
function getAnalyticsData(): AnalyticsData {
  return {
    totalSales: 12450,
    salesChange: 18.5,
    totalOrders: 156,
    ordersChange: 12.3,
    avgOrderValue: 79.81,
    avgOrderChange: 5.2,
    conversionRate: 3.4,
    conversionChange: -0.8,
    topProducts: [
      { name: 'Camiseta Gráfica Verano', sales: 45, revenue: 1347.55 },
      { name: 'Jeans Slim Fit Urbano', sales: 32, revenue: 1919.68 },
      { name: 'Sudadera Oversize Minimalista', sales: 28, revenue: 1260.00 }
    ]
  };
}

function getUserId() {
  try {
    const userProfile = useUserProfileStore.getState().profile;
    return userProfile?.id || null;
  } catch {
    return null;
  }
}

export const DesignerAnalytics: React.FC<DesignerAnalyticsProps> = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const userId = getUserId();
  const [insights, setInsights] = useState<DesignerInsight[]>([]);
  const [selectedInsight, setSelectedInsight] = useState<DesignerInsight | null>(null);
  
  const analyticsData = getAnalyticsData();
  const { campaigns } = useCampaignsStore();

  // Cargar insights previos
  useEffect(() => {
    if (userId) {
      const stored = localStorage.getItem(`designer_reports_${userId}`);
      if (stored) {
        setInsights(JSON.parse(stored));
      }
    }
  }, [userId]);

  // Guardar insights al generarlos
  const handleNewInsights = (newInsights: DesignerInsight[]) => {
    setInsights(newInsights);
    if (userId) {
      localStorage.setItem(`designer_reports_${userId}`, JSON.stringify(newInsights));
    }
  };

  const handleGenerateInsights = () => {
    setAnalyzing(true);
    setModalOpen(true);
    
    setTimeout(() => {
      const newInsights = getDesignerInsights();
      handleNewInsights(newInsights);
      setAnalyzing(false);
    }, 2000);
  };

  const handleViewInsight = (insight: DesignerInsight) => {
    setSelectedInsight(insight);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedInsight(null);
    setAnalyzing(false);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-700 bg-red-100';
      case 'medium': return 'text-yellow-700 bg-yellow-100';
      case 'low': return 'text-green-700 bg-green-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sales': return '💰';
      case 'engagement': return '📈';
      case 'trend': return '🔥';
      case 'customer': return '👥';
      default: return '📊';
    }
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    const color = change >= 0 ? 'text-green-600' : 'text-red-600';
    return <span className={color}>{sign}{change}%</span>;
  };

  // Mock de datos de evolución por campaña
  const campaignStats = campaigns.slice(0, 5).map((c, i) => ({
    name: c.name,
    ventas: Math.floor(Math.random() * 1000 + 100 * i),
    clicks: Math.floor(Math.random() * 500 + 50 * i),
    impresiones: Math.floor(Math.random() * 5000 + 500 * i),
    conversiones: Math.floor(Math.random() * 100 + 10 * i),
  }));

  return (
    <div className="space-y-8">
      {/* Panel de gráficos de campañas */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="text-blue-600" />
          <h2 className="text-lg font-bold text-blue-900">Evolución de Campañas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs md:text-sm">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2 pr-4">Campaña</th>
                <th className="py-2 pr-4">Ventas</th>
                <th className="py-2 pr-4">Clicks</th>
                <th className="py-2 pr-4">Impresiones</th>
                <th className="py-2 pr-4">Conversiones</th>
              </tr>
            </thead>
            <tbody>
              {campaignStats.map((stat, idx) => (
                <tr key={idx} className="border-b hover:bg-blue-50">
                  <td className="py-2 pr-4 font-semibold text-blue-800">{stat.name}</td>
                  <td className="py-2 pr-4">{stat.ventas}</td>
                  <td className="py-2 pr-4">{stat.clicks}</td>
                  <td className="py-2 pr-4">{stat.impresiones}</td>
                  <td className="py-2 pr-4">{stat.conversiones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {/* Insights IA de campañas */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-purple-600" />
          <h2 className="text-lg font-bold text-purple-900">Insights IA de Campañas</h2>
        </div>
        <ul className="space-y-3">
          {campaignStats.map((stat, idx) => (
            <li key={idx} className="bg-purple-50 rounded-lg p-3 flex flex-col md:flex-row md:items-center md:justify-between">
              <span className="font-semibold text-purple-800">{stat.name}</span>
              <span className="text-sm text-purple-700 mt-1 md:mt-0">{stat.ventas > 800 ? '¡Campaña top en ventas!' : stat.conversiones > 80 ? 'Alta conversión detectada' : 'Potencial de mejora con IA'}</span>
            </li>
          ))}
        </ul>
      </Card>
      <section className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Análisis de Rendimiento</h2>
          <Button variant="primary" onClick={handleGenerateInsights}>
            🤖 Generar Insights IA
          </Button>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ventas Totales</p>
                <p className="text-2xl font-bold text-gray-900">${analyticsData.totalSales.toLocaleString()}</p>
                <p className="text-xs mt-1">{formatChange(analyticsData.salesChange)} vs mes anterior</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-xl">💰</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.totalOrders}</p>
                <p className="text-xs mt-1">{formatChange(analyticsData.ordersChange)} vs mes anterior</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-xl">📦</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Valor Promedio</p>
                <p className="text-2xl font-bold text-gray-900">${analyticsData.avgOrderValue}</p>
                <p className="text-xs mt-1">{formatChange(analyticsData.avgOrderChange)} vs mes anterior</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-xl">📊</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Conversión</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.conversionRate}%</p>
                <p className="text-xs mt-1">{formatChange(analyticsData.conversionChange)} vs mes anterior</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <span className="text-xl">🎯</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Productos top */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos Más Vendidos</h3>
          <div className="space-y-3">
            {analyticsData.topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full text-sm font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} unidades vendidas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${product.revenue.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">ingresos</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights de IA */}
        {insights.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights de IA Generados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((insight, idx) => (
                <Card 
                  key={idx} 
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleViewInsight(insight)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getTypeIcon(insight.type)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                        {insight.impact}
                      </span>
                    </div>
                    {insight.value && (
                      <span className="text-sm font-bold text-purple-600">{insight.value}</span>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{insight.description}</p>
                  {insight.actionable && (
                    <div className="mt-3 flex items-center space-x-2">
                      <span className="text-xs text-green-600 font-medium">✅ Accionable</span>
                      <span className="text-xs text-gray-400">Click para ver detalles</span>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {insights.length === 0 && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Genera Insights con IA</h3>
            <p className="text-gray-600 mb-4">Obtén recomendaciones personalizadas basadas en tus datos de rendimiento</p>
            <Button variant="primary" onClick={handleGenerateInsights}>
              Generar Análisis IA
            </Button>
          </div>
        )}
      </section>

      <Modal 
        open={modalOpen} 
        onClose={handleCloseModal}
        title={selectedInsight ? "Detalle del Insight" : "Generando Insights IA"}
        size="lg"
      >
        {analyzing ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
            <p className="text-lg font-semibold text-gray-700 mb-2">Analizando datos con IA...</p>
            <p className="text-gray-500 text-sm text-center">
              Procesando métricas de ventas, engagement y comportamiento de clientes
            </p>
          </div>
        ) : selectedInsight ? (
          <div className="space-y-6">
            <div className="flex items-start space-x-4 pb-4 border-b">
              <div className="p-3 bg-purple-100 rounded-lg">
                <span className="text-2xl">{getTypeIcon(selectedInsight.type)}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-gray-900">{selectedInsight.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(selectedInsight.impact)}`}>
                    Impacto {selectedInsight.impact}
                  </span>
                </div>
                {selectedInsight.value && (
                  <p className="text-2xl font-bold text-purple-600">{selectedInsight.value}</p>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">📊 Descripción del Insight</p>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                {selectedInsight.description}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">💡 Recomendación de IA</p>
              <p className="text-gray-600 bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                {selectedInsight.recommendation}
              </p>
            </div>

            {selectedInsight.actionable && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-blue-600">✅</span>
                  <p className="text-sm font-medium text-blue-900">Este insight es accionable</p>
                </div>
                <p className="text-sm text-blue-800">
                  Puedes implementar esta recomendación de inmediato para mejorar tus resultados.
                </p>
              </div>
            )}

            <div className="flex space-x-3 pt-4 border-t">
              <Button variant="primary" className="flex-1">
                ✅ Marcar como Implementado
              </Button>
              <Button variant="secondary" className="flex-1">
                📅 Recordar Más Tarde
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}; 