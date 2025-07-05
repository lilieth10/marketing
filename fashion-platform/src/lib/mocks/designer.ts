import { Product } from '@/types';

export interface Campaign {
  id: string;
  name: string;
  status: "active" | "inactive" | "draft";
  targetAudience: string;
  startDate: string;
  endDate: string;
  budget?: number;
  platform?: string[];
  clicks?: number;
  impressions?: number;
  conversions?: number;
}

export interface DesignerEvent {
  id: string;
  title: string;
  type: 'fashion_show' | 'workshop' | 'collaboration' | 'launch';
  date: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  participants?: number;
  isRecommended?: boolean;
  aiRecommendationReason?: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  productId: string;
  productName: string;
  rating: number;
  comment: string;
  date: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  aiSuggestedResponse?: string;
}

export interface TrendAlert {
  id: string;
  title: string;
  description: string;
  category: 'color' | 'style' | 'material' | 'season';
  impact: 'high' | 'medium' | 'low';
  trendStrength: number;
  relevantProducts?: string[];
  actionableInsight: string;
}

export const getMockDesignerProducts = (): Product[] => {
  return [
    {
      id: '1',
      name: 'Vestido Verano Floral',
      description: 'Vestido ligero con estampado floral, ideal para días soleados y ocasiones casuales',
      price: 79.99,
      images: ['/images/products/dress1.jpg'],
      designerId: 'designer1',
      category: 'Vestidos',
      status: 'activos',
      tags: ['verano', 'floral', 'casual'],
      colors: ['Coral', 'Verde menta'],
      materials: ['Algodón orgánico'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      rating: 4.8,
      reviews: 124,
      reviewSummary: {
        positive: 85,
        neutral: 10,
        negative: 5
      },
      aiSummary: 'Producto altamente valorado con excelente engagement en redes sociales',
      highlightedTopics: ['Tendencias de verano'],
      reviewsList: [],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      name: 'Ropa Masculina Estilo Urbano',
      description: 'Conjunto de ropa masculina con estilo urbano moderno, cómodo y versátil.',
      price: 129.99,
      images: ['/images/products/shirt1.jpg'],
      designerId: 'designer1',
      category: 'Streetwear',
      status: 'agotados',
      tags: ['urbano', 'moderno', 'masculino'],
      colors: ['Negro', 'Gris oscuro'],
      materials: ['Algodón premium'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      rating: 4.6,
      reviews: 89,
      reviewSummary: {
        positive: 78,
        neutral: 15,
        negative: 7
      },
      aiSummary: 'Diseño innovador con alta demanda en el mercado masculino',
      highlightedTopics: ['Moda urbana'],
      reviewsList: [],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      id: '3',
      name: 'Vestido Floral de Verano',
      description: 'Un vestido ligero y fresco con estampado floral, perfecto para el verano. Corte A, tejido de algodón orgánico.',
      price: 89.99,
      images: ['/images/verano.jpg'],
      designerId: 'designer1',
      category: 'Vestidos',
      status: 'activos',
      tags: ['verano', 'floral', 'algodón'],
      colors: ['Rosa', 'Azul claro'],
      materials: ['Algodón orgánico'],
      sizes: ['XS', 'S', 'M', 'L'],
      rating: 4.7,
      reviews: 156,
      reviewSummary: {
        positive: 89,
        neutral: 8,
        negative: 3
      },
      aiSummary: 'Producto trending con alta demanda estacional',
      highlightedTopics: ['Sostenibilidad', 'Tendencias verano'],
      reviewsList: [],
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15'
    },
    {
      id: '4',
      name: 'Blazer de Lino Beige',
      description: 'Blazer elegante de lino color beige, ideal para un look profesional y casual. Corte recto.',
      price: 129.99,
      images: ['/images/products/blazer1.jpg'],
      designerId: 'designer1',
      category: 'Blazers',
      status: 'activos',
      tags: ['profesional', 'lino', 'elegante'],
      colors: ['Beige', 'Crema'],
      materials: ['Lino 100%'],
      sizes: ['S', 'M', 'L', 'XL'],
      rating: 4.5,
      reviews: 78,
      reviewSummary: {
        positive: 82,
        neutral: 12,
        negative: 6
      },
      aiSummary: 'Pieza versátil con potencial de crecimiento',
      highlightedTopics: ['Moda profesional'],
      reviewsList: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-10'
    },
    {
      id: '5',
      name: 'Jeans Rotos "Street Style"',
      description: 'Jeans de corte moderno con rotos estratégicos, perfectos para un look urbano y desenfadado.',
      price: 79.99,
      images: ['/images/products/jeans1.jpg'],
      designerId: 'designer1',
      category: 'Jeans',
      status: 'activos',
      tags: ['urbano', 'rotos', 'denim'],
      colors: ['Azul claro', 'Azul oscuro'],
      materials: ['Denim stretch'],
      sizes: ['28', '30', '32', '34', '36'],
      rating: 4.4,
      reviews: 203,
      reviewSummary: {
        positive: 76,
        neutral: 18,
        negative: 6
      },
      aiSummary: 'Estilo popular entre audiencia joven',
      highlightedTopics: ['Street style', 'Denim trends'],
      reviewsList: [],
      createdAt: '2024-01-03',
      updatedAt: '2024-01-12'
    },
    {
      id: '6',
      name: 'Nuevo Diseño Conceptual',
      description: 'Prototipo en desarrollo de chaqueta urbana con detalles únicos.',
      price: 0,
      images: ['/images/placeholder1.png'],
      designerId: 'designer1',
      category: 'Chaquetas',
      status: 'borradores',
      tags: ['prototipo', 'conceptual'],
      colors: ['Por definir'],
      materials: ['En desarrollo'],
      sizes: ['Pendiente'],
      rating: 0,
      reviews: 0,
      reviewSummary: {
        positive: 0,
        neutral: 0,
        negative: 0
      },
      aiSummary: 'Proyecto en fase inicial de desarrollo',
      highlightedTopics: ['Innovación'],
      reviewsList: [],
      createdAt: '2024-01-25',
      updatedAt: '2024-01-25'
    },
    {
      id: '7',
      name: 'Abrigo de Invierno Premium',
      description: 'Abrigo largo de lana premium, temporada pasada. Excelente calidad pero sin stock.',
      price: 199.99,
      images: ['/images/placeholder2.png'],
      designerId: 'designer1',
      category: 'Abrigos',
      status: 'agotados',
      tags: ['invierno', 'premium', 'lana'],
      colors: ['Negro', 'Gris'],
      materials: ['Lana virgen'],
      sizes: ['Agotado'],
      rating: 4.9,
      reviews: 45,
      reviewSummary: {
        positive: 93,
        neutral: 5,
        negative: 2
      },
      aiSummary: 'Producto de alta calidad con demanda constante',
      highlightedTopics: ['Lujo', 'Calidad premium'],
      reviewsList: [],
      createdAt: '2023-10-15',
      updatedAt: '2024-01-01'
    },
    {
      id: '8',
      name: 'Camiseta Básica Orgánica',
      description: 'Camiseta básica de algodón 100% orgánico, diseño minimalista.',
      price: 29.99,
      images: ['/images/placeholder3.png'],
      designerId: 'designer1',
      category: 'Camisetas',
      status: 'borradores',
      tags: ['básica', 'orgánica', 'minimalista'],
      colors: ['Blanco', 'Negro', 'Gris'],
      materials: ['Algodón orgánico'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      rating: 0,
      reviews: 0,
      reviewSummary: {
        positive: 0,
        neutral: 0,
        negative: 0
      },
      aiSummary: 'Concepto en revisión para lanzamiento',
      highlightedTopics: ['Sostenibilidad'],
      reviewsList: [],
      createdAt: '2024-01-20',
      updatedAt: '2024-01-23'
    },
    {
      id: '9',
      name: 'Zapatos Formales Cuero',
      description: 'Zapatos de cuero genuino para ocasiones formales, estilo clásico.',
      price: 159.99,
      images: ['/images/placeholder4.png'],
      designerId: 'designer1',
      category: 'Calzado',
      status: 'activos',
      tags: ['formal', 'cuero', 'clásico'],
      colors: ['Negro', 'Marrón'],
      materials: ['Cuero genuino'],
      sizes: ['39', '40', '41', '42', '43', '44'],
      rating: 4.6,
      reviews: 67,
      reviewSummary: {
        positive: 84,
        neutral: 11,
        negative: 5
      },
      aiSummary: 'Calzado de calidad con buena aceptación',
      highlightedTopics: ['Formalwear'],
      reviewsList: [],
      createdAt: '2024-01-08',
      updatedAt: '2024-01-16'
    },
    {
      id: '10',
      name: 'Sudadera con Capucha Limited',
      description: 'Sudadera edición limitada con diseño exclusivo, ya no disponible.',
      price: 89.99,
      images: ['/images/sudadera_mock.jpg'],
      designerId: 'designer1',
      category: 'Sudaderas',
      status: 'agotados',
      tags: ['limitada', 'exclusiva', 'capucha'],
      colors: ['Gris', 'Azul marino'],
      materials: ['Algodón-poliéster'],
      sizes: ['Agotado'],
      rating: 4.8,
      reviews: 234,
      reviewSummary: {
        positive: 91,
        neutral: 6,
        negative: 3
      },
      aiSummary: 'Edición limitada con alto valor de colección',
      highlightedTopics: ['Exclusividad', 'Streetwear'],
      reviewsList: [],
      createdAt: '2023-11-01',
      updatedAt: '2023-12-15'
    }
  ];
};

export const getMockDesignerCampaigns = (): Campaign[] => {
  return [
    {
      id: 'c1',
      name: 'Campaña Primavera 2024',
      status: "active",
      targetAudience: 'Jóvenes amantes de la moda sostenible',
      startDate: '2024-03-15',
      endDate: '2024-05-30',
      budget: 2500,
      platform: ['Instagram', 'Facebook', 'TikTok'],
      clicks: 12450,
      impressions: 89000,
      conversions: 234
    },
    {
      id: 'c2',
      name: 'Ofertas de Verano',
      status: "draft",
      targetAudience: 'Compradores recurrentes',
      startDate: '2024-06-01',
      endDate: '2024-07-31',
      budget: 1800,
      platform: ['Instagram', 'Email'],
      clicks: 0,
      impressions: 0,
      conversions: 0
    },
    {
      id: 'c3',
      name: 'Lanzamiento Colección Otoño',
      status: "inactive",
      targetAudience: 'Profesionales urbanos 25-40 años',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      budget: 3200,
      platform: ['Instagram', 'Facebook', 'Google Ads'],
      clicks: 8900,
      impressions: 156000,
      conversions: 189
    }
  ];
};

export const getMockDesignerEvents = (): DesignerEvent[] => {
  return [
    {
      id: 'e1',
      title: 'Semana de la Moda Sostenible',
      type: 'fashion_show',
      date: '2024-04-15',
      location: 'Madrid, España',
      status: 'upcoming',
      participants: 350,
      isRecommended: true,
      aiRecommendationReason: 'Alta alineación con tu nicho de moda sostenible y ubicación estratégica'
    },
    {
      id: 'e2',
      title: 'Workshop: Diseño con IA',
      type: 'workshop',
      date: '2024-04-08',
      location: 'Online',
      status: 'upcoming',
      participants: 150,
      isRecommended: true,
      aiRecommendationReason: 'Perfecta oportunidad para aprender sobre herramientas de IA en diseño'
    },
    {
      id: 'e3',
      title: 'Colaboración Marca X',
      type: 'collaboration',
      date: '2024-03-25',
      location: 'Barcelona, España',
      status: 'ongoing',
      participants: 25,
      isRecommended: false
    },
    {
      id: 'e4',
      title: 'Lanzamiento Plataforma Digital',
      type: 'launch',
      date: '2024-05-10',
      location: 'Valencia, España',
      status: 'upcoming',
      participants: 200,
      isRecommended: true,
      aiRecommendationReason: 'Oportunidad de networking con diseñadores emergentes en tu región'
    }
  ];
};

export const getMockCustomerReviews = (): CustomerReview[] => {
  return [
    {
      id: 'r1',
      customerName: 'María González',
      productId: 'p1',
      productName: 'Camiseta Gráfica Verano',
      rating: 5,
      comment: '¡Increíble calidad! El diseño es único y la tela súper cómoda. Definitivamente compraré más.',
      date: '2024-03-20',
      sentiment: 'positive',
      aiSuggestedResponse: '¡Muchas gracias María! Nos alegra saber que te encanta la camiseta. ¡Esperamos verte pronto en nuestra nueva colección!'
    },
    {
      id: 'r2',
      customerName: 'Carlos Ruiz',
      productId: 'p2',
      productName: 'Jeans Slim Fit Urbano',
      rating: 4,
      comment: 'Buenos jeans, el corte está perfecto. Solo me gustaría que tuvieran más opciones de color.',
      date: '2024-03-18',
      sentiment: 'positive',
      aiSuggestedResponse: 'Gracias por tu feedback Carlos. Estamos trabajando en expandir la gama de colores para los próximos lanzamientos.'
    },
    {
      id: 'r3',
      customerName: 'Ana Martín',
      productId: 'p3',
      productName: 'Sudadera Oversize Minimalista',
      rating: 3,
      comment: 'La sudadera está bien pero llegó un poco tarde y el packaging podría mejorar.',
      date: '2024-03-15',
      sentiment: 'neutral',
      aiSuggestedResponse: 'Hola Ana, lamentamos los inconvenientes con el envío y packaging. Hemos tomado nota para mejorar estos aspectos. ¡Gracias por tu paciencia!'
    },
    {
      id: 'r4',
      customerName: 'Luis Fernández',
      productId: 'p4',
      productName: 'Vestido Bohemio Floral',
      rating: 5,
      comment: 'Mi novia está encantada con el vestido. La calidad es excepcional y el diseño muy original.',
      date: '2024-03-22',
      sentiment: 'positive',
      aiSuggestedResponse: '¡Qué alegría Luis! Nos emociona saber que el vestido fue todo un éxito. ¡Saluda a tu novia de nuestra parte!'
    }
  ];
};

export const getMockTrendAlerts = (): TrendAlert[] => {
  return [
    {
      id: 't1',
      title: 'Colores Tierra en Alza',
      description: 'Los tonos tierra como terracota, camel y ocre están ganando popularidad en redes sociales (+73% menciones)',
      category: 'color',
      impact: 'high',
      trendStrength: 87,
      relevantProducts: ['p3', 'p5'],
      actionableInsight: 'Considera diseñar una colección cápsula en estos tonos para la próxima temporada'
    },
    {
      id: 't2',
      title: 'Texturas Naturales Trending',
      description: 'Materiales como lino, algodón orgánico y fibras recicladas están en demanda creciente',
      category: 'material',
      impact: 'medium',
      trendStrength: 65,
      relevantProducts: ['p1', 'p4'],
      actionableInsight: 'Destacar el uso de materiales sostenibles en tu marketing puede aumentar conversiones'
    },
    {
      id: 't3',
      title: 'Estilo Oversize Permanece',
      description: 'El estilo oversize sigue siendo popular, especialmente en prendas superiores',
      category: 'style',
      impact: 'medium',
      trendStrength: 58,
      relevantProducts: ['p3'],
      actionableInsight: 'Expandir la línea oversize podría capitalizar esta tendencia sostenida'
    },
    {
      id: 't4',
      title: 'Preparación Temporada Otoño',
      description: 'Es momento de preparar diseños otoñales. Tendencias apuntan a capas y tonos cálidos',
      category: 'season',
      impact: 'high',
      trendStrength: 92,
      relevantProducts: [],
      actionableInsight: 'Inicia el diseño de prendas de transición y abrigos para lanzar en agosto'
    }
  ];
}; 