import type { Recommendation, Product } from '@/types';

// Fechas fijas para evitar problemas de hidratación
const MOCK_DATES = {
  PRODUCT_1: '2024-03-01T00:00:00.000Z',
  PRODUCT_2: '2024-03-02T00:00:00.000Z',
  PRODUCT_3: '2024-03-03T00:00:00.000Z',
  RECOMMENDATION_1: '2024-03-10T00:00:00.000Z',
  RECOMMENDATION_2: '2024-03-11T00:00:00.000Z',
} as const;

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Vestido Floral Primavera',
    description: 'Vestido de verano con estampado floral y corte A',
    price: 89.99,
    images: ['/images/dress1.jpg'],
    designerId: 'designer1',
    createdAt: new Date(MOCK_DATES.PRODUCT_1),
    updatedAt: new Date(MOCK_DATES.PRODUCT_1),
  },
  {
    id: '2',
    name: 'Blazer Minimalista',
    description: 'Blazer elegante en tono beige con corte recto',
    price: 129.99,
    images: ['/images/blazer1.jpg'],
    designerId: 'designer2',
    createdAt: new Date(MOCK_DATES.PRODUCT_2),
    updatedAt: new Date(MOCK_DATES.PRODUCT_2),
  },
  {
    id: '3',
    name: 'Pantalón Palazzo',
    description: 'Pantalón palazzo de alta costura en seda',
    price: 149.99,
    images: ['/images/pants1.jpg'],
    designerId: 'designer1',
    createdAt: new Date(MOCK_DATES.PRODUCT_3),
    updatedAt: new Date(MOCK_DATES.PRODUCT_3),
  },
];

export const getMockRecommendations = (): Recommendation[] => {
  return [
    {
      id: '1',
      userId: 'user1',
      products: [mockProducts[0], mockProducts[1]],
      createdAt: new Date(MOCK_DATES.RECOMMENDATION_1),
    },
    {
      id: '2',
      userId: 'user1',
      products: [mockProducts[2]],
      createdAt: new Date(MOCK_DATES.RECOMMENDATION_2),
    },
  ];
}; 