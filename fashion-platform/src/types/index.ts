export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'designer' | 'client';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  designerId: string;
  category: string;
  status?: 'activos' | 'borradores' | 'agotados';
  tags?: string[];
  colors?: string[];
  materials?: string[];
  sizes?: string[];
  rating: number;
  reviews: number;
  reviewSummary: {
    positive: number;
    neutral: number;
    negative: number;
  };
  aiSummary: string;
  highlightedTopics: string[];
  reviewsList: Review[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface Recommendation {
  id: string;
  userId: string;
  products: Product[];
  createdAt: Date;
}

export interface AIRecommendationReason {
  type: 'style_match' | 'price_preference' | 'brand_affinity' | 'seasonal_trend' | 'social_influence';
  confidence: number;
  description: string;
  technicalDetail: string;
  luxuryStory?: string;
  emotionalImpact?: string;
  trendContext?: string;
} 