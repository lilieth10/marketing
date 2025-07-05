import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type DesignerRequest } from './types/auth.types';
import { useAuthStore } from './auth.store';

interface DesignerRequestsStore {
  requests: DesignerRequest[];
  addRequest: (request: Omit<DesignerRequest, 'id' | 'submittedAt' | 'status' | 'createdAt'>) => void;
  updateRequestStatus: (id: string, status: 'approved' | 'rejected', adminNotes?: string, adminId?: string) => void;
  getUserRequest: (userId: string) => DesignerRequest | undefined;
  getPendingRequests: () => DesignerRequest[];
}

// Función auxiliar para agregar usuario a la lista de administración
const addUserToAdminList = (request: DesignerRequest) => {
  try {
    // Obtener la lista actual de usuarios admin
    const adminUsers = JSON.parse(localStorage.getItem('admin-users-list') || '[]');
    
    // Crear el nuevo usuario con rol de diseñador
    const newUser = {
      id: request.userId,
      name: request.userName,
      email: request.userEmail,
      role: 'designer',
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString(),
      riskScore: Math.floor(Math.random() * 20) + 5, // Score bajo para nuevos diseñadores
      totalOrders: 0,
      totalSpent: 0,
      avatar: request.userAvatar || '/images/placeholder1.png',
      location: 'No especificado',
      aiFlags: ['Diseñador nuevo, IA recomienda seguimiento']
    };

    // Verificar si el usuario ya existe en la lista
    const existingUserIndex = adminUsers.findIndex((user: any) => user.id === request.userId);
    
    if (existingUserIndex >= 0) {
      // Actualizar usuario existente
      adminUsers[existingUserIndex] = { ...adminUsers[existingUserIndex], role: 'designer', status: 'active' };
    } else {
      // Agregar nuevo usuario
      adminUsers.push(newUser);
    }

    // Guardar la lista actualizada
    localStorage.setItem('admin-users-list', JSON.stringify(adminUsers));
    
    console.log('Usuario agregado a lista de administración:', newUser);
  } catch (error) {
    console.error('Error agregando usuario a lista admin:', error);
  }
};

// Función auxiliar para actualizar el rol del usuario en el storage de usuarios registrados
const updateUserRoleInRegisteredUsers = (userId: string) => {
  const storedUsers = localStorage.getItem('registered_users');
  if (storedUsers) {
    const users = JSON.parse(storedUsers);
    const updatedUsers = users.map((u: any) =>
      u.id === userId ? { ...u, role: 'designer' } : u
    );
    localStorage.setItem('registered_users', JSON.stringify(updatedUsers));
  }
};

export const useDesignerRequestsStore = create<DesignerRequestsStore>()(
  persist(
    (set, get) => ({
      requests: [
        // Ejemplo de solicitud pendiente
        {
          id: 'req-1',
          userId: 'user-1',
          userName: 'María García',
          userEmail: 'maria@email.com',
          userAvatar: '/images/placeholder1.png',
          portfolioUrl: 'https://marigarcia.com',
          experience: '3 años diseñando para pequeñas boutiques locales',
          motivation: 'Quiero expandir mi alcance y llegar a más clientes a través de esta plataforma',
          status: 'pending',
          submittedAt: '2024-01-20T14:30:00Z',
          createdAt: '2024-01-20T14:30:00Z'
        }
      ],

      addRequest: (requestData) => {
        const now = new Date().toISOString();
        const newRequest: DesignerRequest = {
          ...requestData,
          id: `req-${Date.now()}`,
          status: 'pending',
          submittedAt: now,
          createdAt: now
        };

        set((state) => ({
          requests: [newRequest, ...state.requests]
        }));
      },

      updateRequestStatus: (id, status, adminNotes, adminId) => {
        set((state) => {
          const updatedRequests = state.requests.map((request) => {
            if (request.id === id) {
              const updatedRequest = { 
                ...request, 
                status, 
                reviewedAt: new Date().toISOString(),
                reviewedBy: adminId,
                adminNotes 
              };

              // Si la solicitud fue aprobada, agregar usuario a la lista de administración y actualizar su rol
              if (status === 'approved') {
                addUserToAdminList(updatedRequest);
                updateUserRoleInRegisteredUsers(updatedRequest.userId);
              }

              return updatedRequest;
            }
            return request;
          });

          return { requests: updatedRequests };
        });
      },

      getUserRequest: (userId) => {
        return get().requests.find((request) => request.userId === userId);
      },

      getPendingRequests: () => {
        return get().requests.filter((request) => request.status === 'pending');
      }
    }),
    {
      name: 'designer-requests-storage',
    }
  )
);

export { type DesignerRequest } from './types/auth.types'; 