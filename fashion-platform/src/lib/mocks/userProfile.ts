import { StaticImageData } from 'next/image';
import avatar from '@/../public/images/products/dress1.jpg';

interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string | StaticImageData;
  preferences: string[];
  location: string;
  followers: number;
  following: number;
  posts: number;
}

export const mockUserProfile: UserProfile = {
  id: 'user-123',
  name: 'Liliana Pérez',
  username: 'lili.perez',
  email: 'liliana.perez@example.com',
  phone: '+123 456 7890',
  bio: 'Apasionada por la moda sostenible y el diseño innovador. Siempre en busca de nuevas tendencias y creadores emergentes.',
  avatar: avatar,
  preferences: [],
  location: 'Buenos Aires, Argentina',
  followers: 1250,
  following: 320,
  posts: 48,
}; 