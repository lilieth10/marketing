'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download, Settings } from 'lucide-react';
import { type SupportTicket } from '@/lib/mocks/admin';

interface AdminSupportProps {
  tickets: SupportTicket[];
  onTicketAction: (ticketId: string, action: 'assign' | 'resolve' | 'escalate') => void;
}

// Modal simple reutilizable - Mobile optimizado
const Modal = ({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-2 sm:p-4">
      <div className="bg-white rounded-lg sm:rounded-xl shadow-lg max-w-md w-full p-4 sm:p-6 relative animate-fade-in max-h-[95vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-lg sm:text-xl z-10">×</button>
        <div className="pr-6">
          {children}
        </div>
      </div>
    </div>
  );
};

function getRandomSupportIA(ticket: SupportTicket) {
  // Simula un análisis IA variable
  const responses = [
    'La IA recomienda atención prioritaria: posible bloqueo injustificado. Revisar historial y contactar al usuario urgentemente.',
    'La IA sugiere revisar el historial de pagos y enviar un desglose detallado al usuario.',
    'La IA detecta un error común de subida de imágenes. Sugerir formatos compatibles y revisar logs del servidor.',
    'La IA recomienda responder en menos de 24h para mantener la satisfacción del usuario.',
    'La IA sugiere escalar el ticket a soporte técnico avanzado.'
  ];
  const idx = Math.floor(Math.random() * responses.length);
  return {
    suggestedResponse: responses[idx],
    explanation: 'La IA analizó el ticket y generó una respuesta basada en el historial y la prioridad.',
    recommendation: idx === 0 ? 'Atender de inmediato.' : idx === 4 ? 'Escalar a soporte avanzado.' : 'Responder en el menor tiempo posible.'
  };
}

const AdminSupport: React.FC<AdminSupportProps> = ({ tickets, onTicketAction }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [iaResult, setIaResult] = useState<any>(null);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const handleAnalyzeIA = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setAnalyzing(true);
    setModalOpen(true);
    setTimeout(() => {
      const result = getRandomSupportIA(ticket);
      setIaResult(result);
      setAnalyzing(false);
    }, 1200);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIaResult(null);
    setSelectedTicket(null);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Soporte al Usuario</h2>
        <div className="flex space-x-3">
          <Button variant="secondary">
            <Download size={16} className="mr-2" />
            Exportar
          </Button>
          <Button variant="primary">
            <Settings size={16} className="mr-2" />
            Configurar IA
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Tickets Abiertos', value: tickets.filter((t) => t.status === 'open').length, color: 'red' },
          { label: 'En Progreso', value: tickets.filter((t) => t.status === 'in_progress').length, color: 'yellow' },
          { label: 'Resueltos Hoy', value: tickets.filter((t) => t.status === 'resolved').length, color: 'green' },
          { label: 'Tiempo Promedio', value: '2.4h', color: 'blue' }
        ].map((stat, idx) => (
          <Card key={idx} className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </Card>
        ))}
      </div>
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Tickets de Soporte</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{ticket.subject}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.priority === 'critical' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {ticket.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ticket.status === 'open' ? 'bg-red-100 text-red-800' :
                      ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{ticket.description.substring(0, 150)}...</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>De: {ticket.userName}</span>
                    <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    <span>Categoría: {ticket.category}</span>
                    {ticket.estimatedResolutionTime && (
                      <span>ETA: {ticket.estimatedResolutionTime}h</span>
                    )}
                  </div>
                  {ticket.aiSuggestedResponse && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800 mb-1">Respuesta sugerida por IA:</p>
                      <p className="text-sm text-blue-700">{ticket.aiSuggestedResponse}</p>
                    </div>
                  )}
                  <button
                    className="mt-3 text-xs text-purple-700 underline hover:text-purple-900 font-semibold"
                    onClick={() => handleAnalyzeIA(ticket)}
                  >
                    Analizar con IA
                  </button>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button 
                    size="sm" 
                    variant="primary"
                    onClick={() => onTicketAction(ticket.id, 'assign')}
                  >
                    Asignar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => onTicketAction(ticket.id, 'resolve')}
                  >
                    Resolver
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      {/* Modal IA */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        {analyzing ? (
          <div className="flex flex-col items-center justify-center p-6">
            <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></span>
            <p className="text-lg font-semibold text-gray-700">Analizando ticket con IA...</p>
            <p className="text-gray-500 text-sm">Procesando historial y prioridad</p>
          </div>
        ) : iaResult && selectedTicket ? (
          <div>
            <h3 className="text-xl font-bold text-purple-800 mb-2">Respuesta IA para "{selectedTicket.subject}"</h3>
            <div className="mb-2">
              <span className="inline-block px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-800">
                Sugerencia IA
              </span>
            </div>
            <p className="text-sm text-blue-700 mb-2">{iaResult.suggestedResponse}</p>
            <p className="text-sm text-gray-700 mb-1"><b>Explicación IA:</b> {iaResult.explanation}</p>
            <p className="text-sm text-purple-700"><b>Recomendación:</b> {iaResult.recommendation}</p>
            <button
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold"
              onClick={() => handleAnalyzeIA(selectedTicket)}
            >
              Reanalizar IA
            </button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default AdminSupport; 