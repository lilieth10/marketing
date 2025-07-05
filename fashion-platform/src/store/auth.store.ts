import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, DesignerRequest } from './types/auth.types';

// Mock users for testing
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@mock.com',
    password: 'mockpass', // dummy
    role: 'admin',
  },
  {
    id: '2',
    name: 'Designer User',
    email: 'designer@mock.com',
    password: 'mockpass', // dummy
    role: 'designer',
  },
  // Usuario admin especial para pruebas
  {
    id: '999',
    name: 'Admin Demo',
    email: 'admin123@gmail.com',
    password: '123456', // Solo para validación interna, no se expone
    role: 'admin',
  },
];

// Mock designer requests
const mockDesignerRequests: DesignerRequest[] = [
  {
    id: '1',
    userId: '3',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];

// Utilidad para hacer backup y restaurar usuarios
function backupRegisteredUsers() {
  const users = localStorage.getItem('registered_users');
  if (users) {
    localStorage.setItem('registered_users_backup', users);
  }
}

function restoreRegisteredUsersIfCorrupt() {
  let usersRaw = localStorage.getItem('registered_users');
  let users;
  try {
    users = JSON.parse(usersRaw || '[]');
    if (!Array.isArray(users)) {
      throw new Error('No es array');
    }
  } catch {
    // Intentar restaurar desde backup
    const backup = localStorage.getItem('registered_users_backup');
    if (backup) {
      try {
        const backupUsers = JSON.parse(backup);
        if (Array.isArray(backupUsers)) {
          localStorage.setItem('registered_users', backup);
          return;
        }
      } catch {}
    }
    // Si no hay backup válido, inicializar como array vacío
    localStorage.setItem('registered_users', '[]');
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      designerRequests: [],
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          restoreRegisteredUsersIfCorrupt();

          // Primero verificar usuarios mock (admin y diseñador)
          const mockUser = mockUsers.find(u => u.email === email);
          // Validar clave solo para el admin especial
          if (mockUser) {
            if (mockUser.email === 'admin123@gmail.com' && password !== '123456') {
              set({ error: 'Credenciales inválidas', isAuthenticated: false, isLoading: false, user: null });
              return false;
            }
            set({ 
              user: mockUser, 
              isAuthenticated: true, 
              isLoading: false,
              error: null 
            });
            backupRegisteredUsers();
            return true;
          }

          // Si no es un usuario mock, verificar usuarios registrados
          const storedUsers = localStorage.getItem('registered_users');
          if (storedUsers) {
            const users = JSON.parse(storedUsers);
            // Buscar usuario por email y contraseña
            const registeredUser = users.find((u: User) => u.email === email && u.password === password);
            if (registeredUser) {
              // Verificar si hay una solicitud de diseñador aprobada
              const designerRequests = JSON.parse(localStorage.getItem('designer_requests') || '[]');
              const approvedRequest = designerRequests.find(
                (r: DesignerRequest) => r.userEmail === email && r.status === 'approved'
              );

              if (approvedRequest) {
                registeredUser.role = 'designer';
                // Actualizar el usuario en localStorage
                const updatedUsers = users.map((u: User) => 
                  u.email === email ? { ...u, role: 'designer' } : u
                );
                localStorage.setItem('registered_users', JSON.stringify(updatedUsers));
              }

              // Cargar el perfil del usuario si existe
              const userProfile = localStorage.getItem(`user-profile-${registeredUser.id}`);
              if (userProfile) {
                const profile = JSON.parse(userProfile);
                // No hacer nada con el perfil aquí, se manejará en userProfile.store
              }

              set({ 
                user: registeredUser, 
                isAuthenticated: true, 
                isLoading: false,
                error: null 
              });
              backupRegisteredUsers();
              return true;
            }
          }

          set({ 
            error: 'Credenciales inválidas', 
            isLoading: false,
            isAuthenticated: false,
            user: null 
          });
          return false;
        } catch (error) {
          set({ 
            error: 'Error al iniciar sesión', 
            isLoading: false,
            isAuthenticated: false,
            user: null 
          });
          return false;
        }
      },

      register: async (name: string, email: string, password: string, role: 'client' | 'designer' = 'client') => {
        set({ isLoading: true, error: null });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          restoreRegisteredUsersIfCorrupt();

          // Verificar si el email ya existe en usuarios mock
          if (mockUsers.some(u => u.email === email)) {
            set({ 
              error: 'El email ya está registrado', 
              isLoading: false,
              isAuthenticated: false,
              user: null 
            });
            return false;
          }

          // Verificar si el email ya existe en usuarios registrados
          let storedUsers = localStorage.getItem('registered_users');
          let existingUsers: User[] = [];
          try {
            existingUsers = storedUsers ? JSON.parse(storedUsers) : [];
            if (!Array.isArray(existingUsers)) existingUsers = [];
          } catch { existingUsers = []; }
          
          if (existingUsers.some((u: User) => u.email === email)) {
            set({ 
              error: 'El email ya está registrado', 
              isLoading: false,
              isAuthenticated: false,
              user: null 
            });
            return false;
          }

          // Create new user with unique ID y guardar contraseña
          const newUser: User = {
            id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name,
            email,
            password, // Guardar la contraseña
            role,
          };

          // Save to localStorage
          localStorage.setItem('registered_users', JSON.stringify([...existingUsers, newUser]));

          // Update state
          set({ 
            user: newUser, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          });
          backupRegisteredUsers();
          return true;
        } catch (error) {
          set({ 
            error: 'Error al registrar usuario', 
            isLoading: false,
            isAuthenticated: false,
            user: null 
          });
          return false;
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          error: null,
          isLoading: false 
        });
      },

      updateUserRole: (userId: string, newRole: 'client' | 'designer' | 'admin') => {
        set((state) => {
          // Si es el usuario actual, actualizar su rol
          if (state.user && state.user.id === userId) {
            return {
              ...state,
              user: {
                ...state.user,
                role: newRole
              }
            };
          }
          return state;
        });

        // Actualizar el rol en localStorage
        const storedUsers = localStorage.getItem('registered_users');
        if (storedUsers) {
          const users = JSON.parse(storedUsers);
          const updatedUsers = users.map((u: User) => 
            u.id === userId ? { ...u, role: newRole } : u
          );
          localStorage.setItem('registered_users', JSON.stringify(updatedUsers));
        }
        backupRegisteredUsers();
      },

      requestDesignerRole: async () => {
        const { user } = get();
        if (!user) return false;

        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          const newRequest: DesignerRequest = {
            id: Date.now().toString(),
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            status: 'pending',
            createdAt: new Date().toISOString(),
          };

          // Guardar la solicitud en localStorage
          const existingRequests = JSON.parse(localStorage.getItem('designer_requests') || '[]');
          localStorage.setItem('designer_requests', JSON.stringify([...existingRequests, newRequest]));

          // Actualizar el estado
          set(state => ({
            designerRequests: [...state.designerRequests, newRequest],
            isLoading: false,
            error: null
          }));

          return true;
        } catch (error) {
          set({ 
            error: 'Error al solicitar rol de diseñador', 
            isLoading: false 
          });
          return false;
        }
      },

      getDesignerRequests: () => {
        // Obtener solicitudes de localStorage
        const storedRequests = JSON.parse(localStorage.getItem('designer_requests') || '[]');
        return storedRequests;
      },

      approveDesignerRequest: async (requestId: string) => {
        set({ isLoading: true, error: null });
        try {
          // Obtener solicitudes de localStorage
          const storedRequests = JSON.parse(localStorage.getItem('designer_requests') || '[]');
          const request = storedRequests.find((r: DesignerRequest) => r.id === requestId);
          
          if (!request) {
            set({ 
              error: 'Solicitud no encontrada', 
              isLoading: false 
            });
            return false;
          }

          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Actualizar solicitud en localStorage
          const updatedRequests = storedRequests.map((r: DesignerRequest) =>
            r.id === requestId ? { ...r, status: 'approved' } : r
          );
          localStorage.setItem('designer_requests', JSON.stringify(updatedRequests));

          // Actualizar el rol del usuario en localStorage
          const storedUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
          const updatedUsers = storedUsers.map((u: User) =>
            u.email === request.userEmail ? { ...u, role: 'designer' } : u
          );
          localStorage.setItem('registered_users', JSON.stringify(updatedUsers));

          // Actualizar el estado
          set(state => ({
            designerRequests: updatedRequests,
            isLoading: false,
            error: null
          }));

          return true;
        } catch (error) {
          set({ 
            error: 'Error al aprobar solicitud', 
            isLoading: false 
          });
          return false;
        }
      },

      rejectDesignerRequest: async (requestId: string) => {
        set({ isLoading: true, error: null });
        try {
          // Obtener solicitudes de localStorage
          const storedRequests = JSON.parse(localStorage.getItem('designer_requests') || '[]');
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Actualizar solicitud en localStorage
          const updatedRequests = storedRequests.map((r: DesignerRequest) =>
            r.id === requestId ? { ...r, status: 'rejected' } : r
          );
          localStorage.setItem('designer_requests', JSON.stringify(updatedRequests));

          // Actualizar el estado
          set(state => ({
            designerRequests: updatedRequests,
            isLoading: false,
            error: null
          }));

          return true;
        } catch (error) {
          set({ 
            error: 'Error al rechazar solicitud', 
            isLoading: false 
          });
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
); 