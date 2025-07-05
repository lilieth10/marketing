export type UserRole = 'client' | 'designer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface DesignerRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  portfolioUrl?: string;
  experience?: string;
  motivation?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  adminNotes?: string;
  createdAt: string; // Para compatibilidad
}

export interface AuthState {
  user: User | null;
  designerRequests: DesignerRequest[];
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role?: 'client' | 'designer') => Promise<boolean>;
  logout: () => void;
  requestDesignerRole: () => Promise<boolean>;
  getDesignerRequests: () => DesignerRequest[];
  approveDesignerRequest: (requestId: string) => Promise<boolean>;
  rejectDesignerRequest: (requestId: string) => Promise<boolean>;
} 