'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Product } from '@/types';
import { getProductAIAnalysis } from '@/lib/mocks/iaDesigner';
import { Brain, TrendingUp, Tag, DollarSign, Target, Sparkles, BarChart3, Trash2 } from 'lucide-react';
import { useProductsStore } from '@/store/products.store';

interface DesignerProductsProps {
  products: Product[];
  showTitle?: boolean;
  maxItems?: number;
}

interface AIAnalysisResult {
  score: number;
  categories: string[];
  suggestedTags: string[];
  priceRecommendation: {
    min: number;
    max: number;
    optimal: number;
  };
  trendAlignment: 'high' | 'medium' | 'low';
  marketDemand: number;
  explanation: string;
  recommendations: string[];
}

export function DesignerProducts({ products, showTitle = true, maxItems }: DesignerProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const deleteProduct = useProductsStore(state => state.deleteProduct);

  const displayProducts = maxItems ? products.slice(0, maxItems) : products;

  const handleAnalyzeWithAI = (product: Product) => {
    setSelectedProduct(product);
    setAnalyzing(true);
    setModalOpen(true);
    setAiResult(null);
    
    // Simular análisis IA con loading
    setTimeout(() => {
      const analysis = getProductAIAnalysis(product);
      setAiResult({
        score: Math.min(95, Math.max(70, (product.rating * 15) + 70)), // Valor determinístico basado en rating
        categories: analysis.categories,
        suggestedTags: analysis.suggestedTags,
        priceRecommendation: analysis.priceRecommendation,
        trendAlignment: analysis.trendAlignment,
        marketDemand: analysis.marketDemand,
        explanation: analysis.explanation,
        recommendations: analysis.recommendations
      });
      setAnalyzing(false);
    }, 1800);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setAiResult(null);
    setSelectedProduct(null);
    setAnalyzing(false);
  };

  return (
    <>
      <Card className="p-6">
        {showTitle && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Brain className="text-purple-600" size={24} />
              Gestión Inteligente de Productos
            </h2>
            <span className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
              IA Activa
            </span>
          </div>
        )}

        <div className="space-y-4">
          {displayProducts.map((product) => (
            <div 
              key={product.id} 
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-purple-200 transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src={product.images[0] || '/images/placeholder.png'} 
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg shadow-sm"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-lg font-bold text-green-600">${product.price.toFixed(2)}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Categoría:</span>
                      <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {product.category || 'Sin categoría'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Stats rápidas */}
                <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <BarChart3 size={14} className="text-green-500" />
                    <span>{(product.reviews || 0) + 20} ventas</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp size={14} className="text-purple-500" />
                    <span>{Math.min(95, Math.max(60, (product.rating * 20) || 75))}% engagement</span>
                  </div>
                </div>
                
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAnalyzeWithAI(product)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center space-x-2"
                >
                  <Sparkles size={16} />
                  <span>Analizar con IA</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (window.confirm('¿Seguro que quieres eliminar este producto? Esta acción no se puede deshacer.')) {
                      deleteProduct(product.id);
                    }
                  }}
                  className="text-red-600 border-red-200 hover:bg-red-50 ml-1 p-2"
                  title="Eliminar producto"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Modal de Análisis IA */}
      <Modal 
        open={modalOpen} 
        onClose={handleCloseModal}
        title={`🤖 Análisis IA: ${selectedProduct?.name}`}
      >
        <div className="space-y-6">
          {analyzing ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 mb-2">Analizando producto con IA...</p>
              <div className="text-sm text-gray-500">
                <p>• Detectando tendencias del mercado</p>
                <p>• Analizando competencia</p>
                <p>• Optimizando precio</p>
                <p>• Generando recomendaciones</p>
              </div>
            </div>
          ) : aiResult ? (
            <div className="space-y-6">
              {/* Score General */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900">Score de Optimización IA</h3>
                    <p className="text-purple-700">Análisis completo del producto</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-purple-600">{aiResult.score}%</div>
                    <div className="text-sm text-purple-500">Excelente</div>
                  </div>
                </div>
              </div>

              {/* Análisis de Precio */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                <h4 className="font-semibold text-green-900 flex items-center gap-2 mb-3">
                  <DollarSign size={18} className="text-green-600" />
                  Optimización de Precio
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Mínimo</div>
                    <div className="font-bold text-green-600">${aiResult.priceRecommendation.min.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Óptimo</div>
                    <div className="font-bold text-green-700">${aiResult.priceRecommendation.optimal.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Máximo</div>
                    <div className="font-bold text-green-600">${aiResult.priceRecommendation.max.toFixed(2)}</div>
                  </div>
                </div>
              </div>

              {/* Categorías Sugeridas */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-900 flex items-center gap-2 mb-3">
                  <Tag size={18} className="text-blue-600" />
                  Categorías IA Detectadas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {aiResult.categories.map((category, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tendencias y Demanda */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-100">
                  <h4 className="font-semibold text-orange-900 flex items-center gap-2 mb-2">
                    <TrendingUp size={18} className="text-orange-600" />
                    Alineación con Tendencias
                  </h4>
                  <div className="text-2xl font-bold text-orange-600 capitalize">
                    {aiResult.trendAlignment === 'high' ? '🔥 Alta' : 
                     aiResult.trendAlignment === 'medium' ? '📈 Media' : '📉 Baja'}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-100">
                  <h4 className="font-semibold text-pink-900 flex items-center gap-2 mb-2">
                    <Target size={18} className="text-pink-600" />
                    Demanda del Mercado
                  </h4>
                  <div className="text-2xl font-bold text-pink-600">
                    {aiResult.marketDemand}%
                  </div>
                </div>
              </div>

              {/* Tags Sugeridos */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
                <h4 className="font-semibold text-indigo-900 flex items-center gap-2 mb-3">
                  <Sparkles size={18} className="text-indigo-600" />
                  Tags Optimizados por IA
                </h4>
                <div className="flex flex-wrap gap-2">
                  {aiResult.suggestedTags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      #{tag}
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
                <h4 className="font-semibold text-emerald-900 mb-3">🎯 Recomendaciones Accionables</h4>
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
                  onClick={() => handleAnalyzeWithAI(selectedProduct!)}
                  className="flex items-center space-x-2"
                >
                  <Brain size={16} />
                  <span>Re-analizar</span>
                </Button>
                <Button 
                  variant="primary"
                  onClick={handleCloseModal}
                >
                  Aplicar Cambios
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </Modal>
    </>
  );
} 