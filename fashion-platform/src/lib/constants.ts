export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: {
    DESIGNER: '/dashboard/designer',
    ADMIN: '/dashboard/admin',
  },
} as const; 