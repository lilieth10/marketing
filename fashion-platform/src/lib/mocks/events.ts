import { StaticImageData } from 'next/image';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  imageUrl: string | StaticImageData;
  description: string;
}

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Semana de la Moda de Primavera',
    date: '15 - 20 de Abril, 2024',
    location: 'Centro de Convenciones, Ciudad de la Moda',
    imageUrl: '/images/placeholder1.png',
    description: 'Descubre las últimas colecciones de primavera de diseñadores emergentes y establecidos.',
  },
  {
    id: '2',
    name: 'Gala Anual de la Moda Sostenible',
    date: '10 de Mayo, 2024',
    location: 'Museo de Arte Moderno, Distrito Creativo',
    imageUrl: '/images/placeholder2.png',
    description: 'Una noche para celebrar la moda ética y el diseño sostenible, con pasarela y premios.',
  },
  {
    id: '3',
    name: 'Taller de Diseño de Accesorios DIY',
    date: '25 de Mayo, 2024',
    location: 'Estudio Creativo, Barrio Bohemian',
    imageUrl: '/images/placeholder3.png',
    description: 'Aprende a crear tus propios accesorios de moda únicos en este taller interactivo.',
  },
  {
    id: '4',
    name: 'Venta de Muestras de Verano',
    date: '5 - 7 de Junio, 2024',
    location: 'Espacio Pop-Up, Centro Comercial',
    imageUrl: '/images/placeholder4.png',
    description: 'Grandes descuentos en colecciones de verano anteriores de tus marcas favoritas.',
  },
]; 