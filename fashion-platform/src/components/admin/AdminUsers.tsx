'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Search,
  Filter,
  Download,
  CheckCircle,
  ThumbsDown,
  UserCheck,
  UserX,
  Edit,
  ExternalLink,
  MapPin,
  Clock
} from 'lucide-react';
import { type AdminUser } from '@/lib/mocks/admin';
import { type DesignerRequest } from '@/store/types/auth.types';

interface AdminUsersProps {
  users: AdminUser[];
  designerRequests: DesignerRequest[];
  onApproveRequest: (requestId: string) => void;
  onRejectRequest: (requestId: string) => void;
  onUserAction: (userId: string, action: 'activate' | 'suspend' | 'delete') => void;
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

function getRandomIAResult(user: AdminUser) {
  // Simula un análisis IA variable
  const risk = Math.floor(Math.random() * 100);
  const flags = [];
  if (risk > 80) flags.push('Riesgo de fraude detectado por IA');
  if (user.role === 'designer' && risk < 20) flags.push('Diseñador seguro, sin anomalías');
  if (user.totalOrders > 100) flags.push('Cliente VIP según IA');
  if (risk > 60 && user.status === 'active') flags.push('Actividad inusual detectada');
  return {
    riskScore: risk,
    flags,
    explanation: risk > 70 ? 'La IA detectó patrones anómalos en el comportamiento de este usuario.' : 'No se detectaron riesgos significativos.',
    recommendation: risk > 70 ? 'Revisar manualmente y considerar suspensión.' : 'Sin acción necesaria.'
  };
}

const AdminUsersComponent: React.FC<AdminUsersProps> = ({ 
  users, 
  designerRequests, 
  onApproveRequest, 
  onRejectRequest, 
  onUserAction 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [iaResult, setIaResult] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const filteredUsers = users.filter((user: AdminUser) => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAnalyzeIA = (user: AdminUser) => {
    setSelectedUser(user);
    setAnalyzing(true);
    setModalOpen(true);
    setTimeout(() => {
      const result = getRandomIAResult(user);
      setIaResult(result);
      setAnalyzing(false);
    }, 1200);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIaResult(null);
    setSelectedUser(null);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <Button variant="secondary">
            <Filter size={16} className="mr-2" />
            Filtros
          </Button>
          <Button variant="primary">
            <Download size={16} className="mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Solicitudes de Diseñador */}
      {designerRequests.filter(r => r.status === 'pending').length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <UserCheck className="text-blue-600" size={20} />
            Solicitudes de Diseñador Pendientes ({designerRequests.filter(r => r.status === 'pending').length})
          </h3>
          <div className="space-y-4">
            {designerRequests.filter(r => r.status === 'pending').map((request) => (
              <div key={request.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {request.userAvatar && (
                        <img src={request.userAvatar} alt={request.userName} className="w-12 h-12 rounded-full object-cover" />
                      )}
                <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{request.userName}</h4>
                  <p className="text-sm text-gray-600">{request.userEmail}</p>
                        <p className="text-xs text-gray-500">Solicitado: {new Date(request.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">📋 Experiencia</h5>
                        <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-200">
                          {request.experience}
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">💭 Motivación</h5>
                        <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-200">
                          {request.motivation}
                        </p>
                      </div>
                    </div>

                    {request.portfolioUrl && (
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-800 mb-2">🌐 Portfolio</h5>
                        <a 
                          href={request.portfolioUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 hover:text-blue-800 underline text-sm flex items-center gap-1"
                        >
                          <ExternalLink size={12} />
                          {request.portfolioUrl}
                        </a>
                      </div>
                    )}
                </div>
                  
                  <div className="flex flex-col space-y-2 ml-6">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => onApproveRequest(request.id)}
                      className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle size={16} className="mr-1" />
                    Aprobar
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onRejectRequest(request.id)}
                      className="bg-red-100 text-red-700 hover:bg-red-200 border-red-300"
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
      )}

      {/* Historial de Solicitudes */}
      {designerRequests.filter(r => r.status !== 'pending').length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="text-gray-600" size={20} />
            Historial de Solicitudes
          </h3>
          <div className="space-y-3">
            {designerRequests.filter(r => r.status !== 'pending').map((request) => (
              <div key={request.id} className={`p-4 rounded-lg border ${
                request.status === 'approved' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{request.userName}</h4>
                    <p className="text-sm text-gray-600">{request.userEmail}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {request.status === 'approved' ? 'Aprobada' : 'Rechazada'} el{' '}
                      {request.reviewedAt ? new Date(request.reviewedAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      request.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {request.status === 'approved' ? '✅ Aprobada' : '❌ Rechazada'}
                    </span>
                  </div>
                </div>
                {request.adminNotes && (
                  <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                    <p className="text-xs font-medium text-gray-700 mb-1">Notas del administrador:</p>
                    <p className="text-sm text-gray-600">{request.adminNotes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tabla de Usuarios */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actividad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IA Risk Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user: AdminUser) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="flex items-center space-x-1 mt-1">
                          <MapPin size={12} className="text-gray-400" />
                          <span className="text-xs text-gray-500">{user.location}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'designer' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'suspended' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex flex-col">
                      <span>{new Date(user.lastActivity).toLocaleDateString()}</span>
                      <span className="text-xs text-gray-500">
                        {user.totalOrders} pedidos • €{user.totalSpent?.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className={`text-sm font-medium ${
                        (user.riskScore || 0) < 30 ? 'text-green-600' :
                        (user.riskScore || 0) < 70 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {user.riskScore || 0}%
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${
                            (user.riskScore || 0) < 30 ? 'bg-green-400' :
                            (user.riskScore || 0) < 70 ? 'bg-yellow-400' :
                            'bg-red-400'
                          }`}
                          style={{ width: `${user.riskScore || 0}%` }}
                        />
                      </div>
                      {user.aiFlags && user.aiFlags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.aiFlags.slice(0, 2).map((flag, idx) => (
                            <span key={idx} className="text-xs bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded">
                              {flag}
                            </span>
                          ))}
                        </div>
                      )}
                      <button
                        className="mt-2 text-xs text-purple-700 underline hover:text-purple-900 font-semibold"
                        onClick={() => handleAnalyzeIA(user)}
                      >
                        Analizar con IA
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => onUserAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}
                      >
                        {user.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Edit size={16} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <ExternalLink size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal IA */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        {analyzing ? (
          <div className="flex flex-col items-center justify-center p-6">
            <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></span>
            <p className="text-lg font-semibold text-gray-700">Analizando con IA...</p>
            <p className="text-gray-500 text-sm">Procesando patrones y riesgos</p>
          </div>
        ) : iaResult && selectedUser ? (
          <div>
            <h3 className="text-xl font-bold text-purple-800 mb-2">Resultado IA para {selectedUser.name}</h3>
            <div className="mb-2">
              <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                iaResult.riskScore > 70 ? 'bg-red-100 text-red-800' :
                iaResult.riskScore > 40 ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                Riesgo: {iaResult.riskScore}%
              </span>
            </div>
            {iaResult.flags.length > 0 && (
              <ul className="mb-2 list-disc list-inside text-sm text-yellow-800">
                {iaResult.flags.map((flag: string, idx: number) => (
                  <li key={idx}>{flag}</li>
                ))}
              </ul>
            )}
            <p className="text-sm text-gray-700 mb-1"><b>Explicación IA:</b> {iaResult.explanation}</p>
            <p className="text-sm text-purple-700"><b>Recomendación:</b> {iaResult.recommendation}</p>
            <button
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold"
              onClick={() => handleAnalyzeIA(selectedUser)}
            >
              Reanalizar IA
            </button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default AdminUsersComponent; 