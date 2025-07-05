import { StaticImageData } from 'next/image';

// Tipos de datos
export interface CommunityUser {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  user: CommunityUser;
  text: string;
  timestamp: string;
}

export interface CommunityPost {
  id: string;
  author: CommunityUser;
  timestamp: string;
  text: string;
  imageUrl: string;
  likes: number;
  comments: Comment[];
}

export interface Trend {
  id: string;
  topic: string;
  postCount: number;
}

// Datos de prueba
const users: CommunityUser[] = [
  { id: 'user-1', name: 'Ana Torres', avatar: 'https://i.pravatar.cc/150?u=user-1' },
  { id: 'user-2', name: 'Carlos Vera', avatar: 'https://i.pravatar.cc/150?u=user-2' },
  { id: 'user-3', name: 'Sofía Reyes', avatar: 'https://i.pravatar.cc/150?u=user-3' },
  { id: 'user-4', name: 'David Kim', avatar: 'https://i.pravatar.cc/150?u=user-4' },
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    author: users[0],
    timestamp: 'Hace 2 horas',
    text: '¡Enamorada de esta combinación de blazer y jeans! El look perfecto para una tarde de café. ¿Qué opinan? #StreetStyle #OOTD',
    imageUrl: '/images/products/blazer1.jpg',
    likes: 124,
    comments: [
      { id: 'comment-1', user: users[1], text: '¡Qué buen estilo, Ana!', timestamp: 'Hace 1 hora' },
      { id: 'comment-2', user: users[2], text: 'Me encanta el blazer.', timestamp: 'Hace 30 mins' },
    ],
  },
  {
    id: 'post-2',
    author: users[2],
    timestamp: 'Ayer',
    text: 'Experimentando con vestidos bohemios para el verano. La comodidad y el estilo pueden ir de la mano. ☀️ #BohoChic',
    imageUrl: '/images/products/dress1.jpg',
    likes: 350,
    comments: [
      { id: 'comment-3', user: users[0], text: '¡Precioso! ¿De dónde es?', timestamp: 'Hace 5 horas' },
    ],
  },
  {
    id: 'post-3',
    author: users[3],
    timestamp: 'Hace 3 días',
    text: 'El minimalismo es más que una tendencia, es un estilo de vida. Esta camisa blanca es un básico indispensable en mi armario.',
    imageUrl: '/images/products/shirt1.jpg',
    likes: 88,
    comments: [],
  },
];

export const mockTopCreators: CommunityUser[] = users.slice(0, 3);

export const mockTrends: Trend[] = [
  { id: 'trend-1', topic: '#ModaSostenible', postCount: 1200 },
  { id: 'trend-2', topic: '#DIYFashion', postCount: 850 },
  { id: 'trend-3', topic: '#VintageFinds', postCount: 2300 },
  { id: 'trend-4', topic: '#LookDeOficina', postCount: 540 },
]; 