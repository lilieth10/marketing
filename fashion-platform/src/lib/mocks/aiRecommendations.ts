// IA-001: Recomendación de productos de moda basada en preferencias del usuario
// Algoritmo: Similitud de Coseno + Style Vector Analysis + Luxury Preference Engine

export interface StyleVector {
  elegance: number;
  versatility: number;
  comfort: number;
  trendiness: number;
  exclusivity: number;
}

export interface UserPreferences {
  styleProfile: StyleVector;
  priceRange: [number, number];
  preferredCategories: string[];
  bodyType: string;
  lifestyle: string;
  colorPalette: string[];
}

export interface RecommendationReason {
  type: 'style_match' | 'trend_alignment' | 'lifestyle_fit' | 'color_harmony' | 'luxury_upgrade';
  confidence: number;
  description: string;
  technicalDetail: string;
  luxuryStory?: string;
  emotionalImpact?: string;
  trendContext?: string;
}

export interface AIRecommendedProduct {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  rating: number;
  styleVector: StyleVector;
  cosineSimilarity: number;
  reasons: RecommendationReason[];
  exclusivityScore: number;
  trendScore: number;
  personalizedDescription: string;
  luxuryStory?: string;
  emotionalImpact?: string;
  trendContext?: string;
}

export interface AIRecommendationResult {
  userId: string;
  recommendationId: string;
  products: AIRecommendedProduct[];
  algorithm: string;
  modelVersion: string;
  processingTime: number;
  confidenceScore: number;
  userStyleProfile: UserPreferences;
  analysisTimestamp: string;
  recommendations: {
    primary: AIRecommendedProduct[];
    trending: AIRecommendedProduct[];
    luxury: AIRecommendedProduct[];
  };
}

// Mock Data Ultra-Realista para IA-001
export const mockUserProfiles: Record<string, UserPreferences> = {
  "user_executive": {
    styleProfile: {
      elegance: 95,
      versatility: 88,
      comfort: 75,
      trendiness: 70,
      exclusivity: 92
    },
    priceRange: [200, 800],
    preferredCategories: ['formal', 'business', 'luxury'],
    bodyType: 'slender',
    lifestyle: 'executive',
    colorPalette: ['black', 'navy', 'ivory', 'charcoal', 'burgundy']
  },
  "user_creative": {
    styleProfile: {
      elegance: 78,
      versatility: 95,
      comfort: 85,
      trendiness: 92,
      exclusivity: 65
    },
    priceRange: [80, 300],
    preferredCategories: ['casual', 'street', 'artistic'],
    bodyType: 'average',
    lifestyle: 'creative',
    colorPalette: ['emerald', 'terracotta', 'mustard', 'sage', 'coral']
  },
  "default": {
    styleProfile: {
      elegance: 80,
      versatility: 85,
      comfort: 90,
      trendiness: 75,
      exclusivity: 70
    },
    priceRange: [50, 250],
    preferredCategories: ['casual', 'versatile'],
    bodyType: 'average',
    lifestyle: 'balanced',
    colorPalette: ['navy', 'white', 'beige', 'soft pink', 'sage']
  }
};

export const mockAIRecommendations: Record<string, AIRecommendationResult> = {
  "trending": {
    userId: "user_trending",
    recommendationId: "REC-2024-TREND-001",
    products: [],
    algorithm: "TrendAnalysis_v3.0 + PopularityScore_Premium",
    modelVersion: "TrendAI-Fashion-5.1",
    processingTime: 0.8,
    confidenceScore: 98.2,
    userStyleProfile: mockUserProfiles.default,
    analysisTimestamp: "2024-01-15T18:00:00Z",
    recommendations: {
      primary: [
        {
          id: "1",
          name: "Vestido Floral de Verano",
          price: 89.99,
          images: ["/images/products/dress1.jpg"],
          category: "Trending Now",
          rating: 4.8,
          styleVector: {
            elegance: 85,
            versatility: 92,
            comfort: 88,
            trendiness: 97,
            exclusivity: 78
          },
          cosineSimilarity: 0.95,
          reasons: [
            {
              type: "trend_alignment",
              confidence: 97,
              description: "Tendencia #1 en redes sociales esta semana",
              technicalDetail: "Trend score: 97% - Viral en Instagram y TikTok"
            }
          ],
          exclusivityScore: 78,
          trendScore: 97,
          personalizedDescription: "El vestido que todas están usando. Diseño viral que marca tendencia en las redes sociales.",
          luxuryStory: "Inspirado en las pasarelas de moda",
          emotionalImpact: "Genera emociones positivas en un 95% de las usuarias",
          trendContext: "Trending en círculos de moda de Nueva York y Londres"
        },
        {
          id: "3",
          name: "Jeans Rotos \"Street Style\"",
          price: 79.99,
          images: ["/images/products/jeans1.jpg"],
          category: "Street Trending",
          rating: 4.6,
          styleVector: {
            elegance: 70,
            versatility: 95,
            comfort: 92,
            trendiness: 94,
            exclusivity: 75
          },
          cosineSimilarity: 0.88,
          reasons: [
            {
              type: "trend_alignment",
              confidence: 94,
              description: "Estilo oversized que domina las calles urbanas",
              technicalDetail: "Street style trending: 94% - Adoptado por influencers de moda"
            }
          ],
          exclusivityScore: 75,
          trendScore: 94,
          personalizedDescription: "El look casual que está revolucionando la moda urbana. Comodidad y estilo sin límites.",
          luxuryStory: "Inspirado en el estilo urbano de los años 90",
          emotionalImpact: "Genera sensación de libertad y estilo en un 92% de las usuarias",
          trendContext: "Trending en círculos de moda de Brooklyn y Londres"
        }
      ],
      trending: [
        {
          id: "2",
          name: "Blazer de Lino Beige",
          price: 129.99,
          images: ["/images/products/blazer1.jpg"],
          category: "Power Dressing",
          rating: 4.9,
          styleVector: {
            elegance: 93,
            versatility: 88,
            comfort: 82,
            trendiness: 91,
            exclusivity: 89
          },
          cosineSimilarity: 0.92,
          reasons: [
            {
              type: "trend_alignment",
              confidence: 91,
              description: "El blazer que usan las CEO más influyentes",
              technicalDetail: "Business trend: 91% - Destacado en Forbes y Vogue"
            }
          ],
          exclusivityScore: 89,
          trendScore: 91,
          personalizedDescription: "El blazer de poder que está redefiniendo el dress code corporativo moderno.",
          luxuryStory: "Inspirado por Fortune 500 CEOs",
          emotionalImpact: "Aumenta la percepción de liderazgo en un 34%",
          trendContext: "Trending en círculos empresariales de NYC y Londres"
        }
      ],
      luxury: [
        {
          id: "4",
          name: "Camisa de Seda Clásica",
          price: 199.99,
          images: ["/images/products/shirt1.jpg"],
          category: "Luxury Trending",
          rating: 4.9,
          styleVector: {
            elegance: 97,
            versatility: 85,
            comfort: 91,
            trendiness: 88,
            exclusivity: 92
          },
          cosineSimilarity: 0.90,
          reasons: [
            {
              type: "luxury_upgrade",
              confidence: 92,
              description: "Pieza de lujo que marca tendencia en alta costura",
              technicalDetail: "Luxury trend: 92% - Recomendada por Harper's Bazaar"
            }
          ],
          exclusivityScore: 92,
          trendScore: 88,
          personalizedDescription: "La camisa de seda que está conquistando las pasarelas internacionales.",
          luxuryStory: "Tejida en los telares históricos de Como, Italia",
          emotionalImpact: "Eleva la percepción de sofisticación en un 28%",
          trendContext: "Favorita de diplomáticos y CEO de empresas tecnológicas"
        }
      ]
    }
  },
  "casual": {
    userId: "user_casual",
    recommendationId: "REC-2024-CASUAL-001",
    products: [],
    algorithm: "ComfortStyle_v2.5 + CasualVector_Advanced",
    modelVersion: "CasualAI-Fashion-4.3",
    processingTime: 1.1,
    confidenceScore: 93.8,
    userStyleProfile: mockUserProfiles.default,
    analysisTimestamp: "2024-01-15T17:30:00Z",
    recommendations: {
      primary: [
        {
          id: "3",
          name: "Jeans Rotos \"Street Style\"",
          price: 79.99,
          images: ["/images/products/jeans1.jpg"],
          category: "Casual Luxury",
          rating: 4.7,
          styleVector: {
            elegance: 70,
            versatility: 95,
            comfort: 98,
            trendiness: 85,
            exclusivity: 78
          },
          cosineSimilarity: 0.94,
          reasons: [
            {
              type: "style_match",
              confidence: 94,
              description: "Perfecto para tu estilo casual y cómodo",
              technicalDetail: "Comfort score: 98% - Máxima comodidad sin sacrificar estilo"
            }
          ],
          exclusivityScore: 78,
          trendScore: 85,
          personalizedDescription: "Jeans diseñados para el día a día activo. Comodidad y estilo en cada paso.",
          luxuryStory: "Inspirado en la calidad de los jeans de Denim & Co",
          emotionalImpact: "Genera sensación de comodidad y confianza en un 98% de las usuarias",
          trendContext: "Trending en círculos de moda de Los Ángeles y Londres"
        }
      ],
      trending: [
        {
          id: "1",
          name: "Vestido Floral de Verano",
          price: 89.99,
          images: ["/images/products/dress1.jpg"],
          category: "Vestidos",
          rating: 4.5,
          styleVector: {
            elegance: 85,
            versatility: 92,
            comfort: 88,
            trendiness: 85,
            exclusivity: 75
          },
          cosineSimilarity: 0.90,
          reasons: [
            {
              type: "style_match",
              confidence: 90,
              description: "Vestido fresco y elegante, perfecto para tu estilo profesional relajado",
              technicalDetail: "Tejido de algodón premium con estampado floral sofisticado.",
              luxuryStory: "Inspirado en la elegancia natural de las ejecutivas modernas que valoran el confort sin sacrificar estilo.",
              emotionalImpact: "Aumenta la confianza personal y proyecta frescura profesional.",
              trendContext: "Favorito entre profesionales del sector creativo y tecnológico."
            }
          ],
          exclusivityScore: 75,
          trendScore: 85,
          personalizedDescription: "Perfecto para reuniones informales y eventos de networking. El estampado floral añade sofisticación sin perder profesionalismo."
        }
      ],
      luxury: []
    }
  },
  "1": {
    userId: "user_executive",
    recommendationId: "REC-2024-001-A",
    products: [],
    algorithm: "CosineSimilarity_v2.1 + StyleVector_Premium",
    modelVersion: "RecommendAI-Fashion-4.8",
    processingTime: 1.2,
    confidenceScore: 96.4,
    userStyleProfile: mockUserProfiles.user_executive,
    analysisTimestamp: "2024-01-15T15:30:00Z",
    recommendations: {
      primary: [
        {
          id: "4",
          name: "Camisa de Seda Clásica",
          price: 299,
          images: ["/images/products/shirt1.jpg"],
          category: "Alta Costura",
          rating: 4.9,
          styleVector: {
            elegance: 97,
            versatility: 85,
            comfort: 91,
            trendiness: 75,
            exclusivity: 89
          },
          cosineSimilarity: 0.94,
          reasons: [
            {
              type: "style_match",
              confidence: 94,
              description: "Coincidencia perfecta con tu perfil de elegancia ejecutiva",
              technicalDetail: "Vector de estilo: 97% elegancia, alineado con preferencias de lujo",
              luxuryStory: "Inspirada en el poder femenino de las CEOs de Fortune 500. Esta blusa encarna la elegancia atemporal que proyecta autoridad sin sacrificar feminidad.",
              emotionalImpact: "Aumenta la confianza personal en un 34% según análisis de 2,847 usuarias ejecutivas.",
              trendContext: "Trending en círculos empresariales de Nueva York y Londres. Usada por 12 CEOs en los últimos 30 días."
            },
            {
              type: "luxury_upgrade",
              confidence: 89,
              description: "Seda premium que eleva cualquier conjunto profesional",
              technicalDetail: "Exclusividad: 89% - Categoria premium detectada en historial"
            }
          ],
          exclusivityScore: 89,
          trendScore: 75,
          personalizedDescription: "Perfecta para tus reuniones de alto nivel. La seda de alta calidad y el corte impecable reflejan tu estatus profesional."
        },
        {
          id: "1",
          name: "Vestido Floral de Verano",
          price: 89.99,
          images: ["/images/products/dress1.jpg"],
          category: "Vestidos",
          rating: 4.5,
          styleVector: {
            elegance: 95,
            versatility: 92,
            comfort: 88,
            trendiness: 85,
            exclusivity: 93
          },
          cosineSimilarity: 0.98,
          reasons: [
            {
              type: "style_match",
              confidence: 98,
              description: "Diseño inspirado en ejecutivos Fortune 500. Aumenta la percepción de liderazgo en 34%.",
              technicalDetail: "Match ejecutivo: 98% - Detectado preferencia por autoridad profesional."
            }
          ],
          exclusivityScore: 93,
          trendScore: 85,
          personalizedDescription: "Blazer premium diseñado para líderes visionarios como tú.",
          luxuryStory: "Inspirado por Fortune 500 CEOs",
          emotionalImpact: "Aumenta la confianza en un 34%",
          trendContext: "Trending en círculos empresariales de NYC y Londres"
        },
        {
          id: "2",
          name: "Blazer de Lino Beige",
          price: 129.99,
          images: ["/images/products/blazer1.jpg"],
          category: "Blazers", 
          rating: 4.8,
          styleVector: {
            elegance: 97,
            versatility: 89,
            comfort: 91,
            trendiness: 82,
            exclusivity: 95
          },
          cosineSimilarity: 0.96,
          reasons: [
            {
              type: "style_match",
              confidence: 96,
              description: "Seda italiana premium usada por diplomáticos europeos. Transmite sofisticación instantánea.",
              technicalDetail: "Luxury match: 96% - Seda de Como, Italia."
            }
          ],
          exclusivityScore: 95,
          trendScore: 82,
          personalizedDescription: "Seda italiana que refleja tu exquisito gusto por la calidad.",
          luxuryStory: "Tejida en los telares históricos de Como, Italia",
          emotionalImpact: "Eleva la percepción de sofisticación en un 28%",
          trendContext: "Favorita de diplomáticos y CEO de empresas tecnológicas"
        },
        {
          id: "3",
          name: "Jeans Rotos \"Street Style\"",
          price: 79.99,
          images: ["/images/products/jeans1.jpg"],
          category: "Jeans",
          rating: 4.2,
          styleVector: {
            elegance: 98,
            versatility: 85,
            comfort: 87,
            trendiness: 91,
            exclusivity: 96
          },
          cosineSimilarity: 0.97,
          reasons: [
            {
              type: "style_match",
              confidence: 97,
              description: "Diseño exclusivo usado en galas de Cannes. Garantiza elegancia memorable en eventos VIP.",
              technicalDetail: "Exclusivity: 97% - Edición limitada, solo 50 piezas."
            }
          ],
          exclusivityScore: 96,
          trendScore: 91,
          personalizedDescription: "Vestido de gala para momentos extraordinarios que mereces vivir.",
          luxuryStory: "Inspirado en las alfombras rojas de Cannes",
          emotionalImpact: "Genera admiración instantánea y eleva autoestima en un 42%",
          trendContext: "Viral en Instagram entre celebridades A-list"
        }
      ],
      trending: [
        {
          id: "2",
          name: "Blazer de Lino Beige",
          price: 129.99,
          images: ["/images/products/blazer1.jpg"],
          category: "Blazers",
          rating: 4.8,
          styleVector: {
            elegance: 93,
            versatility: 88,
            comfort: 82,
            trendiness: 85,
            exclusivity: 89
          },
          cosineSimilarity: 0.95,
          reasons: [
            {
              type: "style_match",
              confidence: 95,
              description: "Blazer elegante de lino que combina profesionalismo con comodidad",
              technicalDetail: "Lino premium con corte recto y minimalista, ideal para ejecutivas.",
              luxuryStory: "Diseñado para la mujer moderna que lidera con elegancia. El lino aporta sofisticación natural.",
              emotionalImpact: "Proyecta autoridad y confianza en entornos profesionales.",
              trendContext: "Básico imprescindible en guardarropas ejecutivos modernos."
            }
          ],
          exclusivityScore: 89,
          trendScore: 85,
          personalizedDescription: "Blazer versátil para looks profesionales y casuales elegantes."
        },
        {
          id: "3",
          name: "Jeans Rotos \"Street Style\"",
          price: 79.99,
          images: ["/images/products/jeans1.jpg"],
          category: "Jeans",
          rating: 4.2,
          styleVector: {
            elegance: 70,
            versatility: 95,
            comfort: 92,
            trendiness: 91,
            exclusivity: 75
          },
          cosineSimilarity: 0.85,
          reasons: [
            {
              type: "style_match",
              confidence: 85,
              description: "Jeans urbanos con rotos estratégicos para un look moderno y desenfadado",
              technicalDetail: "Denim de alta calidad con corte moderno y detalles urbanos.",
              luxuryStory: "El equilibrio perfecto entre rebeldía y sofisticación urbana.",
              emotionalImpact: "Genera sensación de autenticidad y estilo personal.",
              trendContext: "Imprescindible en el street style de las ciudades más fashion."
            }
          ],
          exclusivityScore: 75,
          trendScore: 91,
          personalizedDescription: "Para días casuales donde quieres mantener un edge urbano sofisticado."
        }
      ],
      luxury: [
        {
          id: "3",
          name: "Jeans Rotos \"Street Style\"",
          price: 79.99,
          images: ["/images/products/jeans1.jpg"],
          category: "Jeans",
          rating: 4.2,
          styleVector: {
            elegance: 70,
            versatility: 95,
            comfort: 98,
            trendiness: 85,
            exclusivity: 78
          },
          cosineSimilarity: 0.76,
          reasons: [
            {
              type: "color_harmony",
              confidence: 85,
              description: "Tonalidad perfecta para tu paleta de colores preferida",
              technicalDetail: "Color analysis: 85% match con navy/charcoal palette"
            }
          ],
          exclusivityScore: 78,
          trendScore: 85,
          personalizedDescription: "Cuando necesitas comodidad sin sacrificar estilo. Diseño premium para tus momentos de relajación sofisticada."
        }
      ]
    }
  },
  "creative": {
    userId: "user_creative",
    recommendationId: "REC-2024-002-C",
    products: [],
    algorithm: "CosineSimilarity_v2.1 + CreativeVector_Advanced",
    modelVersion: "RecommendAI-Fashion-4.8",
    processingTime: 0.9,
    confidenceScore: 91.7,
    userStyleProfile: mockUserProfiles.user_creative,
    analysisTimestamp: "2024-01-15T16:15:00Z",
    recommendations: {
      primary: [
        {
          id: "3",
          name: "Jeans Rotos \"Street Style\"",
          price: 79.99,
          images: ["/images/products/jeans1.jpg"],
          category: "Jeans",
          rating: 4.2,
          styleVector: {
            elegance: 65,
            versatility: 92,
            comfort: 95,
            trendiness: 88,
            exclusivity: 75
          },
          cosineSimilarity: 0.89,
          reasons: [
            {
              type: "style_match",
              confidence: 89,
              description: "Expresión perfecta de tu personalidad creativa y urbana",
              technicalDetail: "Creative vector: 92% versatility + 88% trendiness alignment"
            }
          ],
          exclusivityScore: 75,
          trendScore: 88,
          personalizedDescription: "Tu lienzo personal. Estos jeans capturan tu espíritu artístico con un toque urbano sofisticado."
        }
      ],
      trending: [],
      luxury: []
    }
  },
  "minimalism": {
    userId: "user_minimalism",
    recommendationId: "REC-2024-MINIMAL-001",
    products: [],
    algorithm: "MinimalistAI_v1.0 + CleanLinesEngine",
    modelVersion: "MinimalAI-Fashion-1.0",
    processingTime: 0.7,
    confidenceScore: 97.5,
    userStyleProfile: {
      styleProfile: {
        elegance: 90,
        versatility: 93,
        comfort: 88,
        trendiness: 80,
        exclusivity: 85
      },
      priceRange: [100, 400],
      preferredCategories: ["minimalismo", "minimalist", "clean", "simple"],
      bodyType: "average",
      lifestyle: "minimalist",
      colorPalette: ["white", "black", "beige", "gray"]
    },
    analysisTimestamp: "2024-01-15T19:00:00Z",
    recommendations: {
      primary: [
        {
          id: "10",
          name: "Collar de Perlas Clásico",
          price: 89.99,
          images: ["/images/accesosrios.png"],
          category: "Accesorios",
          rating: 4.8,
          styleVector: {
            elegance: 92,
            versatility: 95,
            comfort: 87,
            trendiness: 82,
            exclusivity: 88
          },
          cosineSimilarity: 0.97,
          reasons: [
            {
              type: "style_match",
              confidence: 97,
              description: "Diseño limpio y líneas puras, ideal para un look minimalista premium.",
              technicalDetail: "Minimalismo puro: 97% - Sin adornos, máxima elegancia.",
              luxuryStory: "Creado por artesanos milaneses que han perfeccionado el arte del corte limpio durante generaciones. Este blazer representa la esencia del 'less is more' llevado a la perfección.",
              emotionalImpact: "El 96% de usuarias reporta sentirse más segura y profesional al usarlo.",
              trendContext: "Adoptado por arquitectas y diseñadoras de renombre. Pieza clave en 8 desfiles de Semana de la Moda."
            }
          ],
          exclusivityScore: 88,
          trendScore: 82,
          personalizedDescription: "El blazer perfecto para quienes buscan sofisticación sin excesos."
        },
        {
          id: "11",
          name: "Short Denim Clásico",
          price: 49.99,
          images: ["/images/jeans_mock.jpg"],
          category: "Shorts",
          rating: 4.5,
          styleVector: {
            elegance: 70,
            versatility: 92,
            comfort: 90,
            trendiness: 85,
            exclusivity: 75
          },
          cosineSimilarity: 0.88,
          reasons: [
            {
              type: "style_match",
              confidence: 88,
              description: "Short cómodo y versátil, perfecto para el verano y looks casuales.",
              technicalDetail: "Denim de alta calidad con corte favorecedor.",
              luxuryStory: "Diseñado con denim premium que mejora con cada lavado. Inspirado en el estilo californiano.",
              emotionalImpact: "Genera sensación de libertad y comodidad en un 92% de las usuarias.",
              trendContext: "Básico de verano que nunca pasa de moda. Favorito de influencers de lifestyle."
            }
          ],
          exclusivityScore: 75,
          trendScore: 85,
          personalizedDescription: "El short perfecto para tus días de verano y momentos de relajación."
        }
      ],
      trending: [],
      luxury: []
    }
  },
  "calzado": {
    userId: "user_calzado",
    recommendationId: "REC-2024-CALZADO-001",
    products: [],
    algorithm: "FootwearAI_v2.0 + ComfortEngine",
    modelVersion: "ShoeAI-Fashion-3.2",
    processingTime: 0.8,
    confidenceScore: 94.3,
    userStyleProfile: {
      styleProfile: {
        elegance: 85,
        versatility: 90,
        comfort: 95,
        trendiness: 87,
        exclusivity: 80
      },
      priceRange: [80, 350],
      preferredCategories: ["calzado", "zapatos", "botas", "sneakers"],
      bodyType: "average",
      lifestyle: "active",
      colorPalette: ["black", "brown", "white", "beige"]
    },
    analysisTimestamp: "2024-01-15T20:00:00Z",
    recommendations: {
      primary: [
        {
          id: "7",
          name: "Botines Elegantes Marrones",
          price: 119.99,
          images: ["/images/products/botines.jpg"],
          category: "Calzado Premium",
          rating: 4.8,
          styleVector: {
            elegance: 90,
            versatility: 95,
            comfort: 88,
            trendiness: 85,
            exclusivity: 87
          },
          cosineSimilarity: 0.95,
          reasons: [
            {
              type: "style_match",
              confidence: 95,
              description: "Botines versátiles que combinan con tu estilo y necesidades de comodidad.",
              technicalDetail: "Cuero 100% genuino + suela ergonómica para uso diario.",
              luxuryStory: "Fabricados por artesanos españoles con técnicas tradicionales de curtido. Cada par requiere 72 horas de trabajo manual.",
              emotionalImpact: "El 93% siente mayor confianza al caminar. Aumenta la sensación de elegancia en un 89%.",
              trendContext: "Favoritos de fashionistas en Instagram. Tendencia #1 en calzado urbano esta temporada."
            }
          ],
          exclusivityScore: 87,
          trendScore: 85,
          personalizedDescription: "La combinación perfecta entre elegancia y comodidad para tu día a día."
        },
        {
          id: "8",
          name: "Zapatos Formales Hombre",
          price: 179.99,
          images: ["/images/zapatos.jpg"],
          category: "Calzado Formal",
          rating: 4.6,
          styleVector: {
            elegance: 95,
            versatility: 85,
            comfort: 82,
            trendiness: 80,
            exclusivity: 90
          },
          cosineSimilarity: 0.91,
          reasons: [
            {
              type: "style_match",
              confidence: 91,
              description: "Diseño clásico renovado, perfecto para ocasiones formales y casuales elegantes.",
              technicalDetail: "Suela de cuero italiano + plantilla acolchada para mayor comodidad.",
              luxuryStory: "Inspirados en los clásicos oxfords británicos, pero con un toque contemporáneo. Cada par es numerado y viene con certificado de autenticidad.",
              emotionalImpact: "Proyecta profesionalismo y sofisticación. El 96% se siente más segura en reuniones importantes.",
              trendContext: "Elegidos por ejecutivas de Fortune 500. Aparecen en 15 revistas de moda este mes."
            }
          ],
          exclusivityScore: 90,
          trendScore: 80,
          personalizedDescription: "Elegancia atemporal que nunca pasa de moda. Tu calzado de confianza para ocasiones especiales."
        }
      ],
      trending: [],
      luxury: []
    }
  },
  "accesorios": {
    userId: "user_accesorios",
    recommendationId: "REC-2024-ACC-001",
    products: [],
    algorithm: "AccessoryAI_v1.5 + StyleMatch",
    modelVersion: "AccAI-Fashion-2.1",
    processingTime: 0.6,
    confidenceScore: 92.8,
    userStyleProfile: {
      styleProfile: {
        elegance: 88,
        versatility: 92,
        comfort: 85,
        trendiness: 90,
        exclusivity: 85
      },
      priceRange: [50, 200],
      preferredCategories: ["accesorios", "bolsos", "joyas", "bufandas"],
      bodyType: "average",
      lifestyle: "fashion-forward",
      colorPalette: ["gold", "silver", "black", "brown"]
    },
    analysisTimestamp: "2024-01-15T21:00:00Z",
    recommendations: {
      primary: [
        {
          id: "10",
          name: "Collar de Perlas Clásico",
          price: 89.99,
          images: ["/images/accesosrios.png"],
          category: "Accesorios Premium",
          rating: 4.8,
          styleVector: {
            elegance: 92,
            versatility: 88,
            comfort: 85,
            trendiness: 87,
            exclusivity: 89
          },
          cosineSimilarity: 0.89,
          reasons: [
            {
              type: "style_match",
              confidence: 89,
              description: "Collar elegante que complementa perfectamente tu estilo y añade sofisticación.",
              technicalDetail: "Perlas naturales + cierre de plata 925 para mayor durabilidad.",
              luxuryStory: "Diseñado siguiendo tradiciones clásicas de joyería. Cada perla ha sido seleccionada cuidadosamente por expertos.",
              emotionalImpact: "El 91% se siente más elegante y sofisticada. Aumenta la confianza personal en un 85%.",
              trendContext: "Accesorio atemporal que nunca pasa de moda. Usado por celebridades en eventos de gala."
            }
          ],
          exclusivityScore: 89,
          trendScore: 87,
          personalizedDescription: "El accesorio perfecto para añadir elegancia clásica a cualquier look."
        }
      ],
      trending: [],
      luxury: []
    }
  }
};

// Función para simular el algoritmo de Similitud de Coseno
export function calculateCosineSimilarity(userVector: StyleVector, productVector: StyleVector): number {
  const userValues = Object.values(userVector);
  const productValues = Object.values(productVector);
  
  const dotProduct = userValues.reduce((sum, val, i) => sum + val * productValues[i], 0);
  const userMagnitude = Math.sqrt(userValues.reduce((sum, val) => sum + val * val, 0));
  const productMagnitude = Math.sqrt(productValues.reduce((sum, val) => sum + val * val, 0));
  
  return dotProduct / (userMagnitude * productMagnitude);
}

export function getAIRecommendations(userType: string = "default"): AIRecommendationResult {
  return mockAIRecommendations[userType] || mockAIRecommendations["1"];
} 