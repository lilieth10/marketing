import { StaticImageData } from 'next/image';

interface HomeFeedPost {
  id: string;
  imageUrl: string | StaticImageData;
  authorAvatar: string | StaticImageData;
  authorName: string;
  description: string;
  likes: number;
  comments: number;
}

export const mockHomeFeedPosts: HomeFeedPost[] = [
  {
    id: '1', // Vestido Floral de Verano
    imageUrl: '/images/products/dress1.jpg',
    authorAvatar: '/images/placeholder1.png',
    authorName: 'FashionistaQueen',
    description: 'Vestido floral perfecto para el verano. ¡Me encanta este estilo!',
    likes: 190,
    comments: 30,
  },
  {
    id: '2', // Blazer de Lino Beige
    imageUrl: '/images/products/blazer1.jpg',
    authorAvatar: '/images/placeholder2.png',
    authorName: 'TrendsetterMax',
    description: 'Blazer elegante para un toque sofisticado y profesional.',
    likes: 170,
    comments: 28,
  },
  {
    id: '3', // Jeans Rotos "Street Style"
    imageUrl: '/images/products/jeans1.jpg',
    authorAvatar: '/images/placeholder3.png',
    authorName: 'UrbanChic',
    description: 'Estos jeans rotos son perfectos para un look urbano.',
    likes: 140,
    comments: 20,
  },
  {
    id: '4', // Camisa de Seda Clásica
    imageUrl: '/images/products/shirt1.jpg',
    authorAvatar: '/images/placeholder4.png',
    authorName: 'DesignMaven',
    description: 'Camisa de seda de lujo, la elegancia en cada hilo.',
    likes: 100,
    comments: 12,
  },
  {
    id: '5', // Sudadera Oversize "Urban"
    imageUrl: '/images/sudadera_mock.jpg',
    authorAvatar: '/images/placeholder1.png',
    authorName: 'FashionistaQueen',
    description: 'Mi sudadera oversize favorita para días relajados.',
    likes: 110,
    comments: 15,
  },
  {
    id: '6', // Botas Urbanas Negras
    imageUrl: '/images/products/borcegos.jpg',
    authorAvatar: '/images/placeholder2.png',
    authorName: 'TrendsetterMax',
    description: 'Botas urbanas que combinan con todo. Durabilidad y estilo.',
    likes: 120,
    comments: 18,
  },
  {
    id: '7', // Botines Elegantes Marrones
    imageUrl: '/images/products/botines.jpg',
    authorAvatar: '/images/placeholder3.png',
    authorName: 'UrbanChic',
    description: 'Botines perfectos para la oficina. Elegancia y comodidad.',
    likes: 95,
    comments: 14,
  },
  {
    id: '8', // Zapatos Formales Hombre
    imageUrl: '/images/zapatos.jpg',
    authorAvatar: '/images/placeholder4.png',
    authorName: 'DesignMaven',
    description: 'Zapatos clásicos que nunca pasan de moda.',
    likes: 85,
    comments: 10,
  },
  {
    id: '9', // Campera de Cuero Vintage
    imageUrl: '/images/campera.png',
    authorAvatar: '/images/placeholder1.png',
    authorName: 'FashionistaQueen',
    description: 'Campera de cuero vintage. ¡Rock and roll en estado puro!',
    likes: 200,
    comments: 35,
  },
  {
    id: '12', // Camiseta Mock Básica
    imageUrl: '/images/camiseta_mock.jpg',
    authorAvatar: '/images/placeholder2.png',
    authorName: 'TrendsetterMax',
    description: 'Camiseta básica de algodón premium. El básico perfecto.',
    likes: 90,
    comments: 10,
  },
  {
    id: '11', // Short Denim Clásico
    imageUrl: '/images/jeans_mock.jpg',
    authorAvatar: '/images/placeholder3.png',
    authorName: 'UrbanChic',
    description: 'Shorts de denim perfectos para el verano.',
    likes: 75,
    comments: 8,
  },
]; 