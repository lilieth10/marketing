'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DesignerEventsPage() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const events = [
    {
      id: 1,
      name: 'Fashion Week Barcelona 2024',
      date: '2024-03-15',
      location: 'Barcelona, España',
      type: 'Desfile',
      participants: 500,
      cost: 2500,
      aiMatch: 92,
      description: 'El evento más importante de moda en España'
    },
    {
      id: 2,
      name: 'Sustainable Fashion Summit',
      date: '2024-02-20',
      location: 'Madrid, España',
      type: 'Taller',
      participants: 200,
      cost: 350,
      aiMatch: 88,
      description: 'Conecta con diseñadores comprometidos con la sostenibilidad'
    },
    {
      id: 3,
      name: 'Designer Networking Night',
      date: '2024-02-05',
      location: 'Online',
      type: 'Networking',
      participants: 150,
      cost: 0,
      aiMatch: 65,
      description: 'Evento virtual para conocer otros diseñadores'
    }
  ];

  const handleAIAnalysis = (event: any) => {
    setSelectedEvent(event);
    setAnalyzing(true);
    setModalOpen(true);
    setTimeout(() => setAnalyzing(false), 2000);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Volver</span>
          </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📅 Eventos y Oportunidades</h1>
        <p className="text-gray-600">Descubre eventos recomendados por IA para hacer crecer tu marca</p>
      </div>

      <Card className="p-6 mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center space-x-4">
          <span className="text-3xl">🤖</span>
          <div className="flex-1">
            <h3 className="font-semibold text-purple-900 mb-2">🎯 Recomendaciones IA</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 rounded border-l-4 border-green-400">
                <p className="font-medium text-green-900">📈 Tendencia</p>
                <p className="text-green-800">Eventos sostenibles +73%</p>
              </div>
              <div className="bg-white p-3 rounded border-l-4 border-blue-400">
                <p className="font-medium text-blue-900">🚀 Oportunidad</p>
                <p className="text-blue-800">Timing perfecto lanzamientos</p>
              </div>
              <div className="bg-white p-3 rounded border-l-4 border-yellow-400">
                <p className="font-medium text-yellow-900">💡 Sugerencia</p>
                <p className="text-yellow-800">Networking +45% conversión</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-xl">📅</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Eventos Disponibles</p>
              <p className="text-xl font-bold text-gray-900">{events.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-xl">🎯</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Match Promedio IA</p>
              <p className="text-xl font-bold text-gray-900">82%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-purple-600 text-xl">👥</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Networking Total</p>
              <p className="text-xl font-bold text-gray-900">850</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-yellow-600 text-xl">💰</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Inversión Promedio</p>
              <p className="text-xl font-bold text-gray-900">€950</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">
                    {event.type === 'Desfile' ? '👗' : event.type === 'Taller' ? '🎓' : '🤝'}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{event.type}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  event.aiMatch >= 80 ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'
                }`}>
                  🤖 {event.aiMatch}% Match
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{event.name}</h3>
                <div className="space-y-1 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <span>📅</span>
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📍</span>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>👥</span>
                    <span>{event.participants} participantes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>💰</span>
                    <span>{event.cost === 0 ? 'Gratuito' : `€${event.cost}`}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="secondary" className="flex-1 text-sm">
                  ℹ️ Más Info
                </Button>
                <button
                  onClick={() => handleAIAnalysis(event)}
                  className="flex-1 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
                >
                  🤖 Análisis IA
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="🤖 Análisis IA del Evento" size="xl">
        {analyzing ? (
          <div className="flex flex-col items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
            <p className="text-lg font-semibold mb-2">Analizando evento con IA...</p>
            <p className="text-gray-500 text-sm">Evaluando compatibilidad y ROI</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-400">
              <h3 className="font-semibold text-purple-900 mb-2">🎯 Compatibilidad: {selectedEvent?.aiMatch}%</h3>
              <p className="text-purple-800 text-sm">
                Este evento es altamente compatible con tu perfil y estilo de diseño.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">📊</span>
                  ROI Estimado
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Networking</span>
                    <span className="font-medium text-green-600">+45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Visibilidad</span>
                    <span className="font-medium text-blue-600">+62%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Ventas Potenciales</span>
                    <span className="font-medium text-purple-600">+38%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">🎯</span>
                  Audiencia Objetivo
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Compradores millennials (35%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Profesionales moda (28%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Influencers (22%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                    <span>Medios especializados (15%)</span>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="mr-2">💡</span>
                Recomendaciones IA
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600 text-sm">✅</span>
                  <div>
                    <p className="font-medium text-green-900 text-sm">Timing Perfecto</p>
                    <p className="text-green-800 text-xs">
                      El evento coincide con el lanzamiento de tu nueva colección
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600 text-sm">📱</span>
                  <div>
                    <p className="font-medium text-blue-900 text-sm">Estrategia Digital</p>
                    <p className="text-blue-800 text-xs">
                      Prepara contenido para redes sociales durante el evento
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-600 text-sm">🤝</span>
                  <div>
                    <p className="font-medium text-purple-900 text-sm">Networking Estratégico</p>
                    <p className="text-purple-800 text-xs">
                      Enfócate en conectar con buyers y representantes de tiendas
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex space-x-3">
              <Button variant="secondary" className="flex-1" onClick={() => setModalOpen(false)}>
                Cerrar
              </Button>
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                📝 Inscribirse al Evento
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
