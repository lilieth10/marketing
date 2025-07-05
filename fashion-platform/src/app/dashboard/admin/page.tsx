'use client';

import React, { useState, useEffect } from 'react';
import { 
  getMockAdminStats, 
  getMockAdminUsers, 
  getMockActivityMetrics, 
  getMockContentItems, 
  getMockSupportTickets, 
  getMockAIAlerts,
  type AdminStats as AdminStatsType,
  type AdminUser,
  type ActivityMetric,
  type ContentItem,
  type SupportTicket,
  type AIAlert
} from '@/lib/mocks/admin';
import { AnomalyDetection } from '@/components/modules/AnomalyDetection';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/auth.store';
import { useDesignerRequestsStore } from '@/store/designerRequests.store';
import { 
  BarChart3, 
  Users, 
  Activity, 
  FileText, 
  MessageSquare, 
  Shield, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Search,
  Filter,
  MoreVertical,
  Brain,
  Zap,
  Target,
  Bell,
  Settings,
  Download,
  RefreshCw,
  DollarSign,
  ShoppingBag,
  UserCheck,
  UserX,
  Calendar,
  MapPin,
  Smartphone,
  Monitor,
  Star,
  Trash2,
  Edit,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import AdminStats from '@/components/admin/AdminStats';
import AdminAlerts from '@/components/admin/AdminAlerts';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminActivity from '@/components/admin/AdminActivity';
import AdminContent from '@/components/admin/AdminContent';
import AdminSupport from '@/components/admin/AdminSupport';
import AdminNavigation from '@/components/admin/AdminNavigation';
import { type DesignerRequest } from '@/store/designerRequests.store';
import { showSuccess, showError, showInfo } from '@/lib/sweetAlert';

type ActiveSection = 'dashboard' | 'users' | 'activity' | 'content' | 'support';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const { user } = useAuthStore();
  const { requests, updateRequestStatus, getPendingRequests } = useDesignerRequestsStore();
  
  const stats = getMockAdminStats();
  const activities = getMockActivityMetrics();
  const contents = getMockContentItems();
  const tickets = getMockSupportTickets();
  const alerts = getMockAIAlerts();

  // Función para cargar usuarios combinando mock + localStorage
  const loadAdminUsers = () => {
    try {
      const mockUsers = getMockAdminUsers();
      const storedUsers = JSON.parse(localStorage.getItem('admin-users-list') || '[]');
      
      // Combinar usuarios mock con usuarios del localStorage
      const allUsers = [...mockUsers];
      
      // Agregar usuarios del localStorage que no estén en mock
      storedUsers.forEach((storedUser: AdminUser) => {
        const existsInMock = mockUsers.some(mockUser => mockUser.id === storedUser.id);
        if (!existsInMock) {
          allUsers.push(storedUser);
        }
      });
      
      setAdminUsers(allUsers);
      console.log('Usuarios cargados:', allUsers);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
      setAdminUsers(getMockAdminUsers());
    }
  };

  useEffect(() => {
    loadAdminUsers();
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleApproveRequest = async (requestId: string, adminNotes?: string) => {
    updateRequestStatus(requestId, 'approved', adminNotes, user?.id);
    // Recargar usuarios después de aprobar
    setTimeout(() => {
      loadAdminUsers();
    }, 500);
    
    await showSuccess({
      title: '¡Solicitud aprobada!',
      text: 'El usuario ahora tiene acceso al panel de diseñador y ha sido notificado por email.',
      timer: 4000
    });
  };

  const handleRejectRequest = async (requestId: string, adminNotes?: string) => {
    updateRequestStatus(requestId, 'rejected', adminNotes, user?.id);
    
    await showInfo({
      title: 'Solicitud rechazada',
      text: 'El usuario ha sido notificado con los comentarios proporcionados.',
      confirmText: 'Entendido'
    });
  };

  const handleContentAction = (contentId: string, action: 'approve' | 'reject') => {};
  const handleTicketAction = (ticketId: string, action: 'assign' | 'resolve' | 'escalate') => {};
  const handleUserAction = (userId: string, action: 'activate' | 'suspend' | 'delete') => {};

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Cargando Dashboard de Admin...</h2>
          <p className="text-gray-500">Inicializando sistemas de IA y métricas</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard de Administrador</h1>
              <p className="text-gray-600">Control total de la plataforma con IA integrada</p>
            </div>
            <div className="flex items-center gap-3">
              {getPendingRequests().length > 0 && (
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Bell size={14} />
                  {getPendingRequests().length} solicitudes pendientes
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AdminNavigation activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="p-6">
        {activeSection === 'dashboard' && (
          <>
            <AdminStats stats={stats} />
            <div className="my-6" />
            <AdminAlerts alerts={alerts} />
          </>
        )}
        {activeSection === 'users' && (
          <AdminUsers
            users={adminUsers}
            designerRequests={requests}
            onApproveRequest={handleApproveRequest}
            onRejectRequest={handleRejectRequest}
            onUserAction={handleUserAction}
          />
        )}
        {activeSection === 'activity' && (
          <AdminActivity activities={activities} />
        )}
        {activeSection === 'content' && (
          <AdminContent contents={contents} onContentAction={handleContentAction} />
        )}
        {activeSection === 'support' && (
          <AdminSupport tickets={tickets} onTicketAction={handleTicketAction} />
        )}
      </div>
    </div>
  );
} 