import { StaticImageData } from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  imageUrl: string | StaticImageData;
  excerpt: string;
  content: string; // Full content for a potential detail page
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Las 10 Tendencias de Moda Imperdibles para el Verano 2024',
    author: 'Ana Fashionista',
    date: '15 de Julio, 2024',
    imageUrl: '/images/placeholder1.png',
    excerpt: 'Descubre lo que está marcando pauta en el mundo de la moda esta temporada. Desde colores vibrantes hasta siluetas innovadoras.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '2',
    title: 'Guía Definitiva para Elegir el Vestido Perfecto',
    author: 'Estilo y Elegancia',
    date: '10 de Julio, 2024',
    imageUrl: '/images/placeholder2.png',
    excerpt: 'Encuentra el vestido ideal para cada ocasión, considerando tu tipo de cuerpo y el evento. Consejos de expertos.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '3',
    title: 'Moda Sostenible: Un Compromiso con el Futuro',
    author: 'Conciencia Textil',
    date: '5 de Julio, 2024',
    imageUrl: '/images/placeholder3.png',
    excerpt: 'Explora cómo la industria de la moda está evolucionando hacia prácticas más éticas y respetuosas con el medio ambiente.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '4',
    title: 'Accesorios que Transforman tu Outfit: Guía Práctica',
    author: 'Glamour Diario',
    date: '1 de Julio, 2024',
    imageUrl: '/images/placeholder4.png',
    excerpt: 'Desde joyería hasta bolsos y calzado, descubre cómo los accesorios adecuados pueden elevar cualquier conjunto.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
]; 