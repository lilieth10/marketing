import { Product } from '@/types';
import { Campaign } from './designer';

// Interfaces para IA del diseñador
export interface ProductAIAnalysis {
  riskScore: number;
  categories: string[];
  suggestedTags: string[];
  priceRecommendation: {
    min: number;
    max: number;
    optimal: number;
  };
  trendAlignment: 'high' | 'medium' | 'low';
  marketDemand: number;
  explanation: string;
  recommendations: string[];
}

export interface CampaignAIOptimization {
  audienceSegmentation: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  bestTimes: string[];
  budgetDistribution: {
    facebook: number;
    instagram: number;
    tiktok: number;
    google: number;
  };
  expectedROI: number;
  hashtags: string[];
  explanation: string;
  recommendations: string[];
}

export interface DesignerInsight {
  type: 'sales' | 'engagement' | 'trend' | 'customer';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  recommendation: string;
}

// Helper para análisis IA de productos
export function getProductAIAnalysis(product: Product): ProductAIAnalysis {
  const riskScore = Math.floor(Math.random() * 30) + 70; // Entre 70-100 para productos buenos
  
  const categories = [
    'Moda Urbana', 'Casual', 'Streetwear', 'Minimalista', 'Vintage', 'Sostenible'
  ];
  
  const tags = [
    'trending', 'sustainable', 'unisex', 'limited-edition', 'handmade', 'premium'
  ];
  
  const trendsLevel = ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low';
  
  return {
    riskScore,
    categories: categories.slice(0, Math.floor(Math.random() * 3) + 1),
    suggestedTags: tags.slice(0, Math.floor(Math.random() * 4) + 2),
    priceRecommendation: {
      min: product.price * 0.8,
      max: product.price * 1.4,
      optimal: product.price * 1.1
    },
    trendAlignment: trendsLevel,
    marketDemand: Math.floor(Math.random() * 40) + 60,
    explanation: `La IA analizó ${product.name} usando computer vision y análisis de mercado. El producto muestra ${trendsLevel === 'high' ? 'alta' : trendsLevel === 'medium' ? 'media' : 'baja'} alineación con tendencias actuales.`,
    recommendations: [
      'Considera ajustar el precio según la demanda del mercado',
      'Añade más variantes de color para aumentar el atractivo',
      'Optimiza las imágenes para mejor conversión',
      'Considera lanzar una campaña de influencers'
    ].slice(0, Math.floor(Math.random() * 2) + 2)
  };
}

// Helper para optimización IA de campañas
export function getCampaignAIOptimization(campaign: Campaign): CampaignAIOptimization {
  // --- Análisis de público objetivo ---
  const ta = (campaign.targetAudience || '').toLowerCase();
  const name = (campaign.name || '').toLowerCase();
  const isMujer = ta.includes('mujer') || ta.includes('femenin') || name.includes('mujer');
  const isHombre = ta.includes('hombre') || ta.includes('masculin') || name.includes('hombre') || name.includes('caballero');
  const isMixto = (isMujer && isHombre) || ta.includes('mixto') || ta.includes('ambos') || ta.includes('unisex') || (ta.includes('mujer') && ta.includes('hombre')) || (name.includes('mujer') && name.includes('hombre'));
  const isDeporte = ta.includes('deport') || name.includes('deport') || ta.includes('fitness') || name.includes('fitness');
  const isCasual = ta.includes('casual') || name.includes('casual');
  const isFormal = ta.includes('formal') || name.includes('formal') || ta.includes('ejecutiv') || name.includes('ejecutiv');
  const isSostenible = ta.includes('sostenible') || name.includes('sostenible') || ta.includes('eco') || name.includes('eco');
  const edades = ta.match(/\d{2}/g)?.map(Number) || [];
  const minEdad = edades.length ? Math.min(...edades) : 18;
  const maxEdad = edades.length ? Math.max(...edades) : 45;

  // --- Segmentación personalizada ---
  let primary = 'Jóvenes 18-25 interesados en moda';
  let secondary = 'Adultos 26-35 seguidores de tendencias';
  let tertiary = 'Mayores de 35 con preferencia por calidad';

  if (isMixto) {
    primary = `Hombres y mujeres ${minEdad}-${maxEdad} interesados en moda actual y profesional`;
    secondary = `Jóvenes de ambos géneros menores de ${minEdad} años, seguidores de tendencias y redes sociales`;
    tertiary = `Adultos mayores de ${maxEdad} años con preferencia por exclusividad y calidad en prendas ejecutivas`;
  } else if (isMujer) {
    primary = `Mujeres ${minEdad}-${maxEdad} interesadas en moda premium y tendencias`;
    secondary = `Mujeres jóvenes menores de ${minEdad} años, seguidoras de influencers y redes sociales`;
    tertiary = `Mujeres mayores de ${maxEdad} años con preferencia por sostenibilidad y calidad`;
  } else if (isHombre) {
    primary = `Hombres ${minEdad}-${maxEdad} interesados en streetwear, tecnología y deportes`;
    secondary = `Hombres jóvenes menores de ${minEdad} años, seguidores de marcas deportivas y gaming`;
    tertiary = `Hombres mayores de ${maxEdad} años con preferencia por comodidad y estilo clásico`;
  } else if (isDeporte) {
    primary = `Personas activas ${minEdad}-${maxEdad} interesadas en moda deportiva y fitness`;
    secondary = `Jóvenes deportistas menores de ${minEdad} años, seguidores de retos y tendencias fitness`;
    tertiary = `Adultos mayores de ${maxEdad} años que buscan ropa cómoda y funcional para entrenar`;
  } else if (isCasual) {
    primary = `Jóvenes ${minEdad}-${maxEdad} que prefieren moda casual y urbana`;
    secondary = `Adolescentes menores de ${minEdad} años, seguidores de streetwear`;
    tertiary = `Adultos mayores de ${maxEdad} años con preferencia por comodidad y versatilidad`;
  } else if (isFormal) {
    primary = `Profesionales ${minEdad}-${maxEdad} interesados en moda formal y ejecutiva`;
    secondary = `Jóvenes ejecutivos menores de ${minEdad} años, seguidores de marcas premium`;
    tertiary = `Adultos mayores de ${maxEdad} años con preferencia por trajes y prendas clásicas`;
  } else if (isSostenible) {
    primary = `Personas ${minEdad}-${maxEdad} comprometidas con la moda sostenible y ecológica`;
    secondary = `Jóvenes eco-conscientes menores de ${minEdad} años, seguidores de marcas verdes`;
    tertiary = `Adultos mayores de ${maxEdad} años que valoran la calidad y el impacto ambiental`;
  }

  // --- Horarios personalizados ---
  let bestTimes = ['Viernes 18:00-20:00', 'Sábado 12:00-14:00'];
  if (isDeporte) bestTimes = ['Lunes 7:00-9:00', 'Sábado 8:00-10:00'];
  if (isFormal) bestTimes = ['Martes 19:00-21:00', 'Jueves 20:00-22:00'];
  if (isCasual) bestTimes = ['Domingo 16:00-18:00', 'Miércoles 15:00-17:00'];
  if (isSostenible) bestTimes = ['Sábado 10:00-12:00', 'Domingo 11:00-13:00'];

  // --- Hashtags personalizados ---
  let hashtags = ['#Fashion', '#Tendencias', '#Moda2024'];
  if (isSostenible) hashtags = ['#SustainableFashion', '#EcoFriendly', '#SlowFashion'];
  if (isDeporte) hashtags = ['#SportStyle', '#ActiveWear', '#FitnessFashion'];
  if (isCasual) hashtags = ['#CasualWear', '#StreetStyle', '#UrbanFashion'];
  if (isFormal) hashtags = ['#FormalWear', '#Elegancia', '#BusinessStyle'];
  if (isMixto) hashtags.push('#Unisex', '#ParaTodos');

  // --- ROI esperado y presupuesto ---
  let expectedROI = 200;
  if (campaign.budget) {
    expectedROI = Math.floor(150 + campaign.budget / 10 + Math.random() * 100);
  }

  // --- Explicación personalizada ---
  const explicacionesMixto = [
    `La IA analizó la campaña "${campaign.name}" considerando el público objetivo mixto: hombres y mujeres de ${minEdad} a ${maxEdad} años. Se recomienda contenido inclusivo y estrategias diferenciadas para ambos géneros.`,
    `La campaña está dirigida a ambos géneros, por lo que la IA sugiere segmentar mensajes y creatividades para hombres y mujeres, maximizando el alcance y la conversión.`
  ];
  let explanation = `La IA analizó la campaña "${campaign.name}" considerando el público objetivo: ${campaign.targetAudience}.`;
  if (isMixto) explanation = explicacionesMixto[Math.floor(Math.random() * explicacionesMixto.length)];
  else if (isMujer) explanation += ' Alta afinidad con audiencias femeninas interesadas en moda premium y sostenible.';
  else if (isHombre) explanation += ' Se recomienda potenciar la presencia en plataformas visuales y colaboraciones con influencers masculinos.';
  if (isDeporte) explanation += ' El público objetivo es activo y busca innovación en moda deportiva.';
  if (isSostenible) explanation += ' Se recomienda destacar el impacto ecológico y la trazabilidad de los productos.';
  if (isCasual) explanation += ' El público prefiere comodidad y versatilidad en las prendas.';
  if (isFormal) explanation += ' Se recomienda resaltar la elegancia y la calidad de los materiales.';

  // --- Recomendaciones personalizadas ---
  let recommendations: string[] = [];
  if (isMixto) recommendations.push('Crea campañas inclusivas y usa modelos de ambos géneros.');
  if (isMujer) recommendations.push('Aprovecha Instagram y Pinterest para llegar a audiencias femeninas.');
  if (isHombre) recommendations.push('Utiliza colaboraciones con influencers masculinos y contenido en YouTube.');
  if (isDeporte) recommendations.push('Crea retos virales en TikTok y muestra resultados fitness reales.');
  if (isSostenible) recommendations.push('Destaca certificaciones ecológicas y procesos sostenibles en tus publicaciones.');
  if (isCasual) recommendations.push('Usa reels mostrando looks urbanos y colaboraciones con artistas locales.');
  if (isFormal) recommendations.push('Publica testimonios de profesionales y muestra detalles de confección.');
  if (recommendations.length === 0) recommendations.push('Enfócate en Instagram Stories para mayor engagement.');
  recommendations.push('Programa publicaciones en horarios de mayor actividad.');
  recommendations.push('Utiliza contenido generado por usuarios.');
  // Variar el orden para simular IA dinámica
  recommendations = recommendations.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 2) + 3);

  // --- Distribución de presupuesto realista ---
  const total = 100;
  let facebook = 25 + Math.floor(Math.random() * 15);
  let instagram = 35 + Math.floor(Math.random() * 20);
  let tiktok = 20 + Math.floor(Math.random() * 10);
  let google = total - (facebook + instagram + tiktok);
  if (google < 0) { google = 10; tiktok = total - (facebook + instagram + google); }

  return {
    audienceSegmentation: {
      primary,
      secondary,
      tertiary
    },
    bestTimes,
    budgetDistribution: {
      facebook,
      instagram,
      tiktok,
      google
    },
    expectedROI,
    hashtags,
    explanation,
    recommendations
  };
}

// Helper para insights del diseñador
export function getDesignerInsights(): DesignerInsight[] {
  const insights: DesignerInsight[] = [
    {
      type: 'sales',
      title: 'Aumento en ventas de productos sostenibles',
      description: 'Tus productos etiquetados como "sostenibles" han tenido un 45% más de ventas en los últimos 30 días.',
      impact: 'high',
      actionable: true,
      recommendation: 'Considera expandir tu línea de productos sostenibles y destacar más este aspecto en tu marketing.'
    },
    {
      type: 'engagement',
      title: 'Mejor rendimiento en Instagram',
      description: 'Tus posts de Instagram tienen 2.3x más engagement que otras plataformas.',
      impact: 'medium',
      actionable: true,
      recommendation: 'Incrementa la frecuencia de publicaciones en Instagram y considera Instagram Shopping.'
    },
    {
      type: 'trend',
      title: 'Tendencia emergente: Colores tierra',
      description: 'Los colores tierra están ganando popularidad. Tus productos en estos tonos podrían beneficiarse.',
      impact: 'medium',
      actionable: true,
      recommendation: 'Diseña una colección cápsula en tonos tierra para la próxima temporada.'
    },
    {
      type: 'customer',
      title: 'Feedback positivo en personalización',
      description: 'Los clientes valoran especialmente las opciones de personalización en tus productos.',
      impact: 'high',
      actionable: true,
      recommendation: 'Expande las opciones de personalización a más productos de tu catálogo.'
    }
  ];
  
  return insights.slice(0, Math.floor(Math.random() * 3) + 2);
}

// Helper para análisis de sentimiento de reseñas
export function getReviewSentimentAnalysis(reviews: string[]): {
  overall: 'positive' | 'neutral' | 'negative';
  score: number;
  breakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  keyTopics: string[];
  suggestedResponse?: string;
} {
  const score = Math.random() * 0.4 + 0.6; // Entre 0.6 y 1.0
  const positive = Math.floor(score * 100);
  const negative = Math.floor((1 - score) * 50);
  const neutral = 100 - positive - negative;
  
  return {
    overall: score > 0.8 ? 'positive' : score > 0.5 ? 'neutral' : 'negative',
    score: Math.round(score * 100),
    breakdown: {
      positive,
      neutral,
      negative
    },
    keyTopics: ['Calidad', 'Diseño', 'Precio', 'Sostenibilidad', 'Atención al cliente'].slice(0, 3),
    suggestedResponse: score > 0.8 
      ? '¡Gracias por tu reseña positiva! Nos alegra que hayas disfrutado del producto.'
      : 'Gracias por tu feedback. Valoramos mucho tu opinión y la tendremos en cuenta para futuras mejoras.'
  };
} 