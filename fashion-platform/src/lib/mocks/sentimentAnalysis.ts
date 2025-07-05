// IA-003: Análisis de Sentimiento Premium para Plataforma de Moda
// Algoritmo: Sentiment Analysis + Emotional Intelligence + Luxury Insights

export interface EmotionalMetrics {
  elegance: number;
  confidence: number;
  sophistication: number;
  exclusivity: number;
  comfort: number;
}

export interface SentimentInsight {
  id: string;
  emotion: keyof EmotionalMetrics;
  description: string;
  percentage: number;
  demographic: string;
  luxuryContext: string;
}

export interface PremiumReview {
  id: string;
  text: string;
  author: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  emotionalScore: EmotionalMetrics;
  luxuryTags: string[];
  verifiedPurchase: boolean;
  clientTier: 'VIP' | 'Premium' | 'Regular';
}

export interface AIAnalysisResult {
  productId: string;
  overallSentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  emotionalProfile: EmotionalMetrics;
  luxuryInsights: SentimentInsight[];
  premiumReviews: PremiumReview[];
  aiConfidenceScore: number;
  analysisTimestamp: string;
  modelVersion: string;
}

// Listas de comentarios variados por contexto
const productComments = [
  "La calidad del tejido es excepcional y el diseño muy elegante.",
  "Me sorprendió la comodidad y el ajuste perfecto.",
  "Ideal para eventos formales, recibí muchos cumplidos.",
  "El acabado artesanal marca la diferencia.",
  "Perfecto para el día a día con un toque de sofisticación."
];
const eventComments = [
  "La organización fue impecable y el ambiente inspirador.",
  "Conocí a personas increíbles y aprendí mucho.",
  "El networking superó mis expectativas.",
  "Las charlas de tendencias fueron muy útiles.",
  "Sin duda repetiría la experiencia."
];
const communityComments = [
  "La comunidad es muy activa y siempre hay buen feedback.",
  "Me encanta compartir mis looks y recibir consejos.",
  "Gran espacio para inspirarse y descubrir nuevas tendencias.",
  "El apoyo entre miembros es lo mejor.",
  "Siempre encuentro ideas frescas y originales."
];

// Utilidad para obtener un valor pseudoaleatorio fijo por id y rango
function pseudoRandomInRange(id: string, min: number, max: number, salt: string = ""): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash << 5) - hash + id.charCodeAt(i);
  for (let i = 0; i < salt.length; i++) hash = (hash << 3) - hash + salt.charCodeAt(i);
  const normalized = Math.abs(Math.sin(hash)) % 1;
  return Math.round(min + normalized * (max - min));
}

// Utilidad para elegir un comentario fijo por id
function pickComment(id: string, comments: string[], salt: string = ""): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash << 5) - hash + id.charCodeAt(i);
  for (let i = 0; i < salt.length; i++) hash = (hash << 3) - hash + salt.charCodeAt(i);
  const idx = Math.abs(hash) % comments.length;
  return comments[idx];
}

// Función principal para obtener análisis de sentimientos mock por contexto e id
export function getMockSentimentAnalysisByContext(
  context: 'product' | 'event' | 'community',
  id: string
): AIAnalysisResult {
  // Rango de valores por contexto
  const ranges = {
    product: { elegance: [85, 100], confidence: [80, 98], sophistication: [80, 98], exclusivity: [75, 95], comfort: [80, 98] },
    event:   { elegance: [80, 95], confidence: [80, 98], sophistication: [80, 98], exclusivity: [70, 90], comfort: [75, 95] },
    community: { elegance: [75, 90], confidence: [75, 95], sophistication: [75, 95], exclusivity: [65, 85], comfort: [80, 98] }
  };
  const r = ranges[context];
  const emotionalProfile: EmotionalMetrics = {
    elegance: pseudoRandomInRange(id, r.elegance[0], r.elegance[1], 'elegance'),
    confidence: pseudoRandomInRange(id, r.confidence[0], r.confidence[1], 'confidence'),
    sophistication: pseudoRandomInRange(id, r.sophistication[0], r.sophistication[1], 'sophistication'),
    exclusivity: pseudoRandomInRange(id, r.exclusivity[0], r.exclusivity[1], 'exclusivity'),
    comfort: pseudoRandomInRange(id, r.comfort[0], r.comfort[1], 'comfort'),
  };
  // Sentimiento general
  const positive = pseudoRandomInRange(id, 80, 98, 'positive');
  const negative = pseudoRandomInRange(id, 1, 10, 'negative');
  const neutral = 100 - positive - negative;
  // Insights
  const luxuryInsights: SentimentInsight[] = [
    {
      id: `insight-${id}-1`,
      emotion: 'elegance',
      description: context === 'product' ?
        'Destacado por su elegancia y atención al detalle.' :
        context === 'event' ? 'Evento reconocido por su ambiente sofisticado.' :
        'La comunidad valora la elegancia en las publicaciones.',
      percentage: emotionalProfile.elegance,
      demographic: context === 'product' ? 'Clientes premium 30-50 años' : context === 'event' ? 'Asistentes VIP' : 'Miembros activos',
      luxuryContext: context === 'product' ? 'Uso diario y eventos formales' : context === 'event' ? 'Galas y networking' : 'Interacciones sociales'
    },
    {
      id: `insight-${id}-2`,
      emotion: 'confidence',
      description: context === 'product' ?
        'Aporta confianza y seguridad al usuario.' :
        context === 'event' ? 'Los asistentes reportan sentirse inspirados.' :
        'Los miembros se sienten cómodos compartiendo opiniones.',
      percentage: emotionalProfile.confidence,
      demographic: context === 'product' ? 'Profesionales y ejecutivos' : context === 'event' ? 'Emprendedores' : 'Usuarios recurrentes',
      luxuryContext: context === 'product' ? 'Presentaciones y reuniones' : context === 'event' ? 'Workshops y charlas' : 'Foros y debates'
    }
  ];
  // Comentarios
  const comments = context === 'product' ? productComments : context === 'event' ? eventComments : communityComments;
  // Premium reviews
  const premiumReviews: PremiumReview[] = [
    {
      id: `review-${id}-1`,
      text: pickComment(id, comments),
      author: context === 'product' ? 'Cliente verificado' : context === 'event' ? 'Asistente' : 'Miembro comunidad',
      sentiment: positive > negative ? 'positive' : negative > positive ? 'negative' : 'neutral',
      emotionalScore: emotionalProfile,
      luxuryTags: [context === 'product' ? 'Calidad' : context === 'event' ? 'Networking' : 'Inspiración'],
      verifiedPurchase: context === 'product',
      clientTier: positive > 90 ? 'VIP' : positive > 85 ? 'Premium' : 'Regular'
    }
  ];
  return {
    productId: id,
    overallSentiment: { positive, neutral, negative },
    emotionalProfile,
    luxuryInsights,
    premiumReviews,
    aiConfidenceScore: pseudoRandomInRange(id, 90, 99, 'conf'),
    analysisTimestamp: new Date().toISOString(),
    modelVersion: 'SentimentLux-GPT-4.2'
  };
}