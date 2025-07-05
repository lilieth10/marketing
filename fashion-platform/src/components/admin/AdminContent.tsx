'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download, Settings, CheckCircle, ThumbsDown } from 'lucide-react';
import { type ContentItem } from '@/lib/mocks/admin';

interface AdminContentProps {
  contents: ContentItem[];
  onContentAction: (contentId: string, action: 'approve' | 'reject') => void;
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

function getRandomContentIA(content: ContentItem) {
  // Simula un análisis IA variable
  const riskLevels = ['low', 'medium', 'high'];
  const riskIdx = Math.floor(Math.random() * 3);
  const riskLevel = riskLevels[riskIdx];
  const sentiment = (Math.random() * (riskIdx === 2 ? 0.4 : 0.9)).toFixed(2);
  const flaggedReasons = [];
  if (riskLevel === 'high') flaggedReasons.push('Lenguaje negativo extremo', 'Posible review spam');
  if (riskLevel === 'medium') flaggedReasons.push('Contenido promocional excesivo');
  return {
    riskLevel,
    sentimentScore: sentiment,
    flaggedReasons,
    explanation: riskLevel === 'high' ? 'La IA detectó alto riesgo y posible abuso en este contenido.' : riskLevel === 'medium' ? 'La IA recomienda revisión manual.' : 'Sin riesgos detectados.',
    recommendation: riskLevel === 'high' ? 'Rechazar o suspender contenido.' : riskLevel === 'medium' ? 'Revisar manualmente.' : 'Aprobar contenido.'
  };
}

const AdminContent: React.FC<AdminContentProps> = ({ contents, onContentAction }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [iaResult, setIaResult] = useState<any>(null);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);

  const handleAnalyzeIA = (content: ContentItem) => {
    setSelectedContent(content);
    setAnalyzing(true);
    setModalOpen(true);
    setTimeout(() => {
      const result = getRandomContentIA(content);
      setIaResult(result);
      setAnalyzing(false);
    }, 1200);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIaResult(null);
    setSelectedContent(null);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Contenidos</h2>
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
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Contenido Pendiente de Moderación</h3>
            <span className="text-sm text-gray-500">
              {contents.filter((c) => c.status === 'pending' || c.status === 'flagged').length} elementos
            </span>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {contents.filter((c) => c.status === 'pending' || c.status === 'flagged').map((content) => (
            <div key={content.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{content.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      content.status === 'flagged' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {content.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      content.aiAnalysis.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                      content.aiAnalysis.riskLevel === 'medium' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      Risk: {content.aiAnalysis.riskLevel}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{content.content.substring(0, 150)}...</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Por: {content.author}</span>
                    <span>{new Date(content.createdAt).toLocaleDateString()}</span>
                    <span>❤️ {content.engagement.likes}</span>
                    <span>💬 {content.engagement.comments}</span>
                  </div>
                  {content.aiAnalysis.flaggedReasons.length > 0 && (
                    <div className="mt-3 p-3 bg-red-50 rounded-lg">
                      <p className="text-sm font-medium text-red-800 mb-1">Razones detectadas por IA:</p>
                      <ul className="text-sm text-red-700">
                        {content.aiAnalysis.flaggedReasons.map((reason, idx) => (
                          <li key={idx}>• {reason}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button
                    className="mt-3 text-xs text-purple-700 underline hover:text-purple-900 font-semibold"
                    onClick={() => handleAnalyzeIA(content)}
                  >
                    Analizar con IA
                  </button>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button 
                    size="sm" 
                    variant="primary"
                    onClick={() => onContentAction(content.id, 'approve')}
                  >
                    <CheckCircle size={16} className="mr-1" />
                    Aprobar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => onContentAction(content.id, 'reject')}
                  >
                    <ThumbsDown size={16} className="mr-1" />
                    Rechazar
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
            <p className="text-lg font-semibold text-gray-700">Analizando contenido con IA...</p>
            <p className="text-gray-500 text-sm">Procesando sentimiento y riesgo</p>
          </div>
        ) : iaResult && selectedContent ? (
          <div>
            <h3 className="text-xl font-bold text-purple-800 mb-2">Resultado IA para "{selectedContent.title}"</h3>
            <div className="mb-2">
              <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                iaResult.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                iaResult.riskLevel === 'medium' ? 'bg-orange-100 text-orange-800' :
                'bg-green-100 text-green-800'
              }`}>
                Riesgo: {iaResult.riskLevel}
              </span>
              <span className="ml-2 inline-block px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-800">
                Sentimiento: {iaResult.sentimentScore}
              </span>
            </div>
            {iaResult.flaggedReasons.length > 0 && (
              <ul className="mb-2 list-disc list-inside text-sm text-red-800">
                {iaResult.flaggedReasons.map((reason: string, idx: number) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            )}
            <p className="text-sm text-gray-700 mb-1"><b>Explicación IA:</b> {iaResult.explanation}</p>
            <p className="text-sm text-purple-700"><b>Recomendación:</b> {iaResult.recommendation}</p>
            <button
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold"
              onClick={() => handleAnalyzeIA(selectedContent)}
            >
              Reanalizar IA
            </button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default AdminContent; 