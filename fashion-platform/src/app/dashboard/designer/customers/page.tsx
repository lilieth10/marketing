'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ArrowLeft, Brain, Heart, MessageSquare, TrendingUp, Target, Users, Sparkles, Zap, BarChart3 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DesignerCustomersPage() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [aiResponseModal, setAiResponseModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [generatingResponse, setGeneratingResponse] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [aiResponse, setAiResponse] = useState<string>('');

  const customers = [
    {
      id: 1,
      name: 'María González',
      email: 'maria@email.com',
      totalOrders: 12,
      totalSpent: 2450,
      lastOrder: '2024-01-15',
      sentiment: 'positive',
      sentimentScore: 92,
      avatar: '👩‍💼',
      location: 'Madrid, España',
      preferredStyle: 'Casual Elegante',
      loyaltyLevel: 'VIP',
      avgOrderValue: 204,
      favoriteCategory: 'Blazers'
    },
    {
      id: 2,
      name: 'Ana Martínez',
      email: 'ana@email.com',
      totalOrders: 8,
      totalSpent: 1680,
      lastOrder: '2024-01-10',
      sentiment: 'positive',
      sentimentScore: 87,
      avatar: '👩‍🎨',
      location: 'Barcelona, España',
      preferredStyle: 'Bohemio',
      loyaltyLevel: 'Gold',
      avgOrderValue: 210,
      favoriteCategory: 'Vestidos'
    },
    {
      id: 3,
      name: 'Carmen López',
      email: 'carmen@email.com',
      totalOrders: 15,
      totalSpent: 3200,
      lastOrder: '2024-01-20',
      sentiment: 'neutral',
      sentimentScore: 65,
      avatar: '👩‍💻',
      location: 'Valencia, España',
      preferredStyle: 'Minimalista',
      loyaltyLevel: 'Platinum',
      avgOrderValue: 213,
      favoriteCategory: 'Camisetas'
    }
  ];

  const reviews = [
    {
      id: 1,
      customerId: 1,
      customerName: 'María González',
      rating: 5,
      comment: 'Increíble calidad y diseño. Los materiales son excelentes y el fit es perfecto. Definitivamente volveré a comprar.',
      date: '2024-01-15',
      sentiment: 'positive',
      sentimentScore: 95,
      product: 'Blazer Elegante',
      topics: ['Calidad', 'Diseño', 'Materiales', 'Fit'],
      responded: false
    },
    {
      id: 2,
      customerId: 2,
      customerName: 'Ana Martínez',
      rating: 4,
      comment: 'Me encanta el estilo, aunque tardó un poco en llegar. La calidad es muy buena y el diseño es hermoso.',
      date: '2024-01-10',
      sentiment: 'positive',
      sentimentScore: 78,
      product: 'Vestido Bohemio',
      topics: ['Estilo', 'Calidad', 'Envío', 'Diseño'],
      responded: true
    },
    {
      id: 3,
      customerId: 3,
      customerName: 'Carmen López',
      rating: 3,
      comment: 'El producto está bien pero esperaba mejor calidad por el precio. El diseño es bonito pero la tela se siente barata.',
      date: '2024-01-20',
      sentiment: 'neutral',
      sentimentScore: 55,
      product: 'Camiseta Minimalista',
      topics: ['Precio', 'Calidad', 'Materiales', 'Diseño'],
      responded: false
    }
  ];

  const handleCustomerAnalysis = (customer: any) => {
    setSelectedCustomer(customer);
    setAnalyzing(true);
    setModalOpen(true);
    setAiResult(null);
    
    // Simular análisis IA avanzado
    setTimeout(() => {
      const result = {
        loyaltyPrediction: Math.floor(Math.random() * 20) + 80,
        churnRisk: Math.floor(Math.random() * 30) + 10,
        lifetimeValue: Math.floor(Math.random() * 2000) + 3000,
        personalityProfile: {
          traits: ['Calidad-consciente', 'Estilo clásico', 'Comprador leal'],
          preferences: ['Materiales premium', 'Colores neutros', 'Cortes clásicos'],
          behaviors: ['Compra mensualmente', 'Lee reseñas', 'Sigue tendencias conservadoras']
        },
        recommendations: [
          'Enviar catálogo de nueva colección premium',
          'Ofrecer descuento exclusivo del 15%',
          'Invitar a evento VIP de lanzamiento',
          'Recomendar blazers de temporada'
        ],
        nextPurchasePrediction: {
          probability: 87,
          timeframe: '10-15 días',
          suggestedProducts: ['Blazer Primavera', 'Pantalones Formal', 'Blusa Elegante']
        }
      };
      setAiResult(result);
      setAnalyzing(false);
    }, 2500);
  };

  const handleAIResponse = (review: any) => {
    setSelectedReview(review);
    setGeneratingResponse(true);
    setAiResponseModal(true);
    setAiResponse('');
    
    // Simular generación de respuesta IA
    setTimeout(() => {
      let response = '';
      if (review.sentiment === 'positive') {
        response = `¡Hola ${review.customerName}! 😊 Muchas gracias por tu reseña tan positiva sobre ${review.product}. Nos alegra muchísimo saber que te encanta la calidad y el diseño. ¡Esperamos verte pronto en nuestra nueva colección de primavera! 🌸✨`;
      } else if (review.sentiment === 'neutral') {
        response = `Hola ${review.customerName}, gracias por tu feedback sobre ${review.product}. Valoramos mucho tu opinión y lamentamos que no haya cumplido completamente tus expectativas. Nos encantaría poder ofrecerte un 20% de descuento en tu próxima compra para que puedas probar nuestra nueva línea premium. 💎`;
      } else {
        response = `Hola ${review.customerName}, lamentamos que ${review.product} no haya sido de tu total agrado. Tu feedback es muy valioso para nosotros. Me gustaría ofrecerte un reembolso completo o un cambio por cualquier otro producto de nuestra colección. Por favor, contáctanos directamente. 🙏`;
      }
      setAiResponse(response);
      setGeneratingResponse(false);
    }, 2000);
  };

  const getSentimentColor = (sentiment: string, score: number) => {
    if (sentiment === 'positive' && score >= 80) return 'text-green-700 bg-green-100';
    if (sentiment === 'positive') return 'text-blue-700 bg-blue-100';
    if (sentiment === 'neutral') return 'text-yellow-700 bg-yellow-100';
    return 'text-red-700 bg-red-100';
  };

  const getSentimentIcon = (sentiment: string) => {
    if (sentiment === 'positive') return '😊';
    if (sentiment === 'neutral') return '😐';
    return '😞';
  };

  const getLoyaltyColor = (level: string) => {
    switch (level) {
      case 'Platinum': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'VIP': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Gold': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
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
            👥 Gestión de Clientes
            <Brain className="text-purple-600" size={32} />
          </h1>
          <p className="text-gray-600">Analiza a tus clientes con IA avanzada y mejora la experiencia personalizada</p>
        </div>
      </div>

      {/* AI Sentiment Overview Mejorado */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-green-900 flex items-center gap-2">
            <Brain size={20} className="text-green-600" />
            📊 Análisis de Sentimientos IA en Tiempo Real
          </h3>
          <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
            Actualizado hace 2 min
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border-l-4 border-green-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-green-900 flex items-center gap-1">
                  😊 Muy Positivos
                </p>
                <p className="text-2xl font-bold text-green-800">67%</p>
              </div>
              <TrendingUp className="text-green-500" size={24} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-blue-900 flex items-center gap-1">
                  🙂 Positivos
                </p>
                <p className="text-2xl font-bold text-blue-800">18%</p>
              </div>
              <BarChart3 className="text-blue-500" size={24} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-yellow-900 flex items-center gap-1">
                  😐 Neutrales
                </p>
                <p className="text-2xl font-bold text-yellow-800">12%</p>
              </div>
              <Target className="text-yellow-500" size={24} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-red-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-red-900 flex items-center gap-1">
                  😞 Negativos
                </p>
                <p className="text-2xl font-bold text-red-800">3%</p>
              </div>
              <Zap className="text-red-500" size={24} />
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-medium">Total Clientes</p>
              <p className="text-2xl font-bold text-blue-900">{customers.length}</p>
              <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                <Users size={12} />
                +12% este mes
              </p>
            </div>
            <div className="p-3 bg-blue-200 rounded-full">
              <Users className="text-blue-600" size={20} />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium">Ingresos Totales</p>
              <p className="text-2xl font-bold text-green-900">€7,330</p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp size={12} />
                +28% vs mes anterior
              </p>
            </div>
            <div className="p-3 bg-green-200 rounded-full">
              <span className="text-xl">💰</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 font-medium">Rating Promedio</p>
              <p className="text-2xl font-bold text-purple-900">4.6/5</p>
              <p className="text-xs text-purple-600 mt-1 flex items-center gap-1">
                <Sparkles size={12} />
                Optimizado IA
              </p>
            </div>
            <div className="p-3 bg-purple-200 rounded-full">
              <span className="text-xl">⭐</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-pink-700 font-medium">NPS Score</p>
              <p className="text-2xl font-bold text-pink-900">87</p>
              <p className="text-xs text-pink-600 mt-1 flex items-center gap-1">
                <Heart size={12} />
                Excelente lealtad
              </p>
            </div>
            <div className="p-3 bg-pink-200 rounded-full">
              <Heart className="text-pink-600" size={20} />
            </div>
          </div>
        </Card>
      </div>

      {/* Lista de Clientes Mejorada */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="text-blue-600" size={24} />
            Clientes con Análisis IA
          </h2>
          <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Perfiles Inteligentes
          </span>
        </div>

        <div className="space-y-4">
          {customers.map((customer) => (
            <div key={customer.id} className="p-6 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100 hover:border-purple-200 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">{customer.avatar}</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      {customer.name}
                      <span className={`text-xs px-2 py-1 rounded-full border ${getLoyaltyColor(customer.loyaltyLevel)}`}>
                        {customer.loyaltyLevel}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600">{customer.location} • {customer.preferredStyle}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500">
                        💰 €{customer.totalSpent.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        📦 {customer.totalOrders} pedidos
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getSentimentColor(customer.sentiment, customer.sentimentScore)}`}>
                        {getSentimentIcon(customer.sentiment)} {customer.sentimentScore}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="hidden md:block text-right text-sm text-gray-600">
                    <div className="font-medium text-gray-900">€{customer.avgOrderValue}</div>
                    <div className="text-xs">Ticket promedio</div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleCustomerAnalysis(customer)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center space-x-2"
                  >
                    <Brain size={16} />
                    <span>Analizar IA</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Reseñas con IA */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="text-green-600" size={24} />
            Reseñas con Respuesta IA
          </h2>
          <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
            Auto-respuesta Activa
          </span>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 bg-gradient-to-r from-white to-gray-50 rounded-lg border border-gray-100 hover:border-green-200 transition-all">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-gray-900">{review.customerName}</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>⭐</span>
                      ))}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getSentimentColor(review.sentiment, review.sentimentScore)}`}>
                      {review.sentimentScore}%
                    </span>
                    {review.responded && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        ✅ Respondido
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm mb-2">"{review.comment}"</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>📦 {review.product}</span>
                    <span>•</span>
                    <span>📅 {review.date}</span>
                    <span>•</span>
                    <div className="flex gap-1">
                      {review.topics.slice(0, 3).map((topic, i) => (
                        <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button
                  variant={review.responded ? "secondary" : "primary"}
                  size="sm"
                  onClick={() => handleAIResponse(review)}
                  className={!review.responded ? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white" : ""}
                >
                  <Sparkles size={14} className="mr-1" />
                  {review.responded ? 'Ver Respuesta' : 'Responder IA'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Modal de Análisis de Cliente */}
      <Modal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        title={`🤖 Análisis Completo IA: ${selectedCustomer?.name}`}
      >
        <div className="space-y-6">
          {analyzing ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 mb-2">Analizando perfil del cliente...</p>
              <div className="text-sm text-gray-500">
                <p>• Procesando historial de compras</p>
                <p>• Analizando patrones de comportamiento</p>
                <p>• Calculando lifetime value</p>
                <p>• Generando recomendaciones personalizadas</p>
              </div>
            </div>
          ) : aiResult ? (
            <div className="space-y-6">
              {/* Métricas principales */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100 text-center">
                  <div className="text-2xl font-bold text-green-600">{aiResult.loyaltyPrediction}%</div>
                  <div className="text-sm text-green-700">Lealtad Predicha</div>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border border-red-100 text-center">
                  <div className="text-2xl font-bold text-red-600">{aiResult.churnRisk}%</div>
                  <div className="text-sm text-red-700">Riesgo de Abandono</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100 text-center">
                  <div className="text-2xl font-bold text-blue-600">€{aiResult.lifetimeValue}</div>
                  <div className="text-sm text-blue-700">Valor de Vida</div>
                </div>
              </div>

              {/* Perfil de Personalidad */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
                <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                  <Brain size={18} className="text-purple-600" />
                  Perfil de Personalidad IA
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Rasgos</h5>
                    {aiResult.personalityProfile.traits.map((trait: string, i: number) => (
                      <span key={i} className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs mr-1 mb-1">
                        {trait}
                      </span>
                    ))}
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Preferencias</h5>
                    {aiResult.personalityProfile.preferences.map((pref: string, i: number) => (
                      <span key={i} className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-1 mb-1">
                        {pref}
                      </span>
                    ))}
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Comportamientos</h5>
                    {aiResult.personalityProfile.behaviors.map((behavior: string, i: number) => (
                      <span key={i} className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs mr-1 mb-1">
                        {behavior}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Predicción de Próxima Compra */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-100">
                <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
                  <Target size={18} className="text-orange-600" />
                  Predicción de Próxima Compra
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{aiResult.nextPurchasePrediction.probability}%</div>
                    <div className="text-sm text-orange-700">Probabilidad</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-orange-600">{aiResult.nextPurchasePrediction.timeframe}</div>
                    <div className="text-sm text-orange-700">Tiempo estimado</div>
                  </div>
                  <div>
                    <div className="text-sm text-orange-700 mb-2">Productos sugeridos:</div>
                    {aiResult.nextPurchasePrediction.suggestedProducts.map((product: string, i: number) => (
                      <span key={i} className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs mr-1 mb-1">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recomendaciones */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-100">
                <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                  <Sparkles size={18} className="text-emerald-600" />
                  Acciones Recomendadas
                </h4>
                <ul className="space-y-2">
                  {aiResult.recommendations.map((rec: string, i: number) => (
                    <li key={i} className="flex items-start space-x-2 text-sm text-emerald-800">
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
                  onClick={() => handleCustomerAnalysis(selectedCustomer)}
                  className="flex items-center space-x-2"
                >
                  <Brain size={16} />
                  <span>Re-analizar</span>
                </Button>
                <div className="space-x-2">
                  <Button variant="secondary">
                    📧 Enviar Email
                  </Button>
                  <Button variant="primary">
                    💎 Aplicar Estrategia
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Modal>

      {/* Modal de Respuesta IA */}
      <Modal 
        open={aiResponseModal} 
        onClose={() => setAiResponseModal(false)}
        title={`💬 Respuesta IA para ${selectedReview?.customerName}`}
      >
        <div className="space-y-6">
          {generatingResponse ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600 mb-2">Generando respuesta personalizada...</p>
              <div className="text-sm text-gray-500">
                <p>• Analizando tono del comentario</p>
                <p>• Personalizando mensaje</p>
                <p>• Añadiendo toque humano</p>
                <p>• Optimizando para retención</p>
              </div>
            </div>
          ) : aiResponse ? (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Reseña original:</h4>
                <p className="text-sm text-gray-700 italic">"{selectedReview?.comment}"</p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-green-600" />
                  Respuesta Generada por IA:
                </h4>
                <div className="bg-white p-3 rounded border-l-4 border-green-400">
                  <p className="text-gray-800 leading-relaxed">{aiResponse}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <Button 
                  variant="secondary" 
                  onClick={() => handleAIResponse(selectedReview)}
                  className="flex items-center space-x-2"
                >
                  <Brain size={16} />
                  <span>Regenerar</span>
                </Button>
                <div className="space-x-2">
                  <Button variant="secondary">
                    ✏️ Editar
                  </Button>
                  <Button variant="primary">
                    📤 Enviar Respuesta
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