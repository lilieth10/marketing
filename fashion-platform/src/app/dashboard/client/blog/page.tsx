'use client';

import React, { useState } from 'react';
import { BlogPostList } from '@/components/landing/Blog/BlogPostList';
import { ContentGeneration } from '@/components/modules/ContentGeneration';
import { SentimentAnalysis } from '@/components/modules/SentimentAnalysis';
import { TrendPrediction } from '@/components/modules/TrendPrediction';
import { PenTool, Brain, Sparkles, TrendingUp, Users, Eye, Star, Heart, Share2, Bookmark, MessageSquare, Calendar, Clock, Search, Filter, Plus } from 'lucide-react';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage: string;
  likes: number;
  comments: number;
  shares: number;
  aiScore: number;
  engagementPrediction: number;
  trendingScore: number;
  isPersonalized: boolean;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: 'blog-001',
    title: 'El Futuro de la Moda Sostenible: Tendencias 2024',
    excerpt: 'Descubre cómo la inteligencia artificial está revolucionando la industria de la moda sostenible y qué tendencias marcarán el 2024.',
    content: `La moda sostenible ha evolucionado de ser una tendencia nicho a convertirse en el futuro inevitable de la industria. En 2024, veremos cómo la inteligencia artificial acelera esta transformación de maneras que apenas estamos comenzando a imaginar.

## La Revolución Silenciosa

Los algoritmos de IA ahora pueden predecir qué materiales tendrán menor impacto ambiental, optimizar cadenas de suministro para reducir emisiones de carbono, y hasta diseñar prendas que se biodegraden de manera controlada.

## Personalización Masiva Sostenible

Una de las aplicaciones más emocionantes es la personalización masiva. Imagina prendas diseñadas específicamente para ti, no solo en términos de estilo y ajuste, sino también considerando tu huella de carbono personal y preferencias éticas.

La startup francesa "EcoDesign AI" ha desarrollado un algoritmo que puede generar hasta 10,000 variaciones únicas de una prenda base, todas optimizadas para diferentes tipos de cuerpo, climas y preferencias de sostenibilidad.

## El Papel de los Materiales Inteligentes

Los materiales bio-based están siendo desarrollados con ayuda de machine learning. Desde hongos que se convierten en cuero hasta algas que se transforman en fibras textiles, la IA está acelerando el descubrimiento de nuevos materiales sostenibles.

## Transparencia Total

Blockchain combinado con IA permitirá trazabilidad completa. Podrás escanear un código QR en tu prenda y ver exactamente dónde se cultivó el algodón, cuánta agua se usó, y cuál fue la huella de carbono de cada paso de la producción.

## Conclusión

El futuro de la moda sostenible no es solo sobre hacer menos daño, sino sobre crear un impacto positivo. La IA nos está dando las herramientas para lograrlo a escala global.`,
    author: {
      name: 'Dr. Elena Rodriguez',
      avatar: '/images/placeholder1.png',
      role: 'Especialista en Moda Sostenible'
    },
    publishedAt: '2024-01-20',
    readTime: '8 min lectura',
    category: 'Sostenibilidad',
    tags: ['IA', 'Sostenibilidad', 'Futuro', 'Innovación'],
    featuredImage: '/images/verano.jpg',
    likes: 847,
    comments: 156,
    shares: 234,
    aiScore: 94,
    engagementPrediction: 89,
    trendingScore: 92,
    isPersonalized: true
  },
  {
    id: 'blog-002',
    title: 'Cómo la IA Está Transformando el Diseño de Accesorios',
    excerpt: 'Un vistazo profundo a las herramientas de inteligencia artificial que están cambiando la forma en que se diseñan y producen los accesorios de moda.',
    content: `Los accesorios han sido durante mucho tiempo el reino de la creatividad humana pura. Sin embargo, la inteligencia artificial está abriendo nuevas fronteras en el diseño de accesorios que combinan creatividad humana con precisión algorítmica.

## Diseño Generativo

Los algoritmos de diseño generativo pueden crear miles de variaciones de un accesorio en segundos. Marcas como Nervous System utilizan algoritmos que imitan patrones naturales para crear joyas únicas que serían imposibles de concebir manualmente.

## Personalización en Tiempo Real

La startup "Accessory AI" ha desarrollado una plataforma que analiza tu guardarropa a través de fotos y recomienda accesorios personalizados. El sistema considera factores como:

- Paleta de colores personal
- Estilo de vida y ocasiones frecuentes  
- Proporciones corporales
- Preferencias de materiales

## Optimización de Materiales

Los algoritmos pueden determinar la distribución óptima de materiales para maximizar durabilidad mientras minimizan el costo. Esto es especialmente útil en joyería, donde cada gramo de metal precioso cuenta.

## Predicción de Tendencias

Los sistemas de IA analizan millones de imágenes en redes sociales para identificar tendencias emergentes en accesorios antes de que lleguen al mainstream. Esto permite a los diseñadores anticiparse al mercado.

## El Futuro Híbrido

El futuro no es IA vs humanos, sino IA + humanos. Los mejores diseños surgen cuando la creatividad humana se combina con la capacidad de procesamiento y análisis de la inteligencia artificial.`,
    author: {
      name: 'Marco Antonelli',
      avatar: '/images/placeholder2.png',
      role: 'Diseñador de Accesorios Tech'
    },
    publishedAt: '2024-01-18',
    readTime: '6 min lectura',
    category: 'Diseño',
    tags: ['IA', 'Accesorios', 'Diseño', 'Tecnología'],
    featuredImage: '/images/accesosrios.png',
    likes: 623,
    comments: 89,
    shares: 167,
    aiScore: 91,
    engagementPrediction: 87,
    trendingScore: 85,
    isPersonalized: false
  },
  {
    id: 'blog-003',
    title: 'Análisis de Sentimientos: Lo Que Realmente Piensa tu Audiencia',
    excerpt: 'Aprende cómo el análisis de sentimientos con IA puede transformar tu estrategia de marketing de moda y conectar mejor con tu audiencia.',
    content: `En el mundo digital actual, entender lo que realmente siente tu audiencia va más allá de likes y comentarios. El análisis de sentimientos powered by IA nos permite descifrar las emociones detrás de cada interacción.

## Más Allá de los Números

Tradicionalmente, las marcas se enfocaban en métricas cuantitativas: views, clicks, conversiones. Pero ¿qué hay del sentimiento cualitativo? ¿Cómo se siente realmente tu audiencia respecto a tu marca?

## La Ciencia del Sentimiento

Los algoritmos de procesamiento de lenguaje natural (NLP) pueden analizar texto y determinar:

- **Sentimiento general**: Positivo, negativo, neutro
- **Emociones específicas**: Alegría, tristeza, sorpresa, enojo
- **Intensidad emocional**: Del 1 al 10
- **Contexto cultural**: Considerando modismos y expresiones regionales

## Casos de Uso Reales

### 1. Lanzamiento de Producto
Cuando Zara lanzó su colección sustainable, el análisis de sentimientos reveló que aunque el 78% de menciones eran positivas, había una preocupación recurrente sobre los precios. Esto les permitió ajustar su comunicación.

### 2. Crisis de Reputación
Una marca de lujo detectó sentimientos negativos emergentes 48 horas antes de que se viralizara una controversia, permitiéndoles preparar una respuesta proactiva.

### 3. Influencer Marketing
El análisis reveló que colaboraciones con micro-influencers generaban 23% más sentimiento positivo que con macro-influencers, a pesar de menor reach.

## Implementación Práctica

Para implementar análisis de sentimientos en tu estrategia:

1. **Define tus KPIs emocionales**: ¿Qué emociones quieres evocar?
2. **Monitorea en tiempo real**: Usa herramientas que analicen menciones constantemente
3. **Actúa en base a insights**: No solo midas, responde

## El Futuro Emocional

La próxima frontera es el análisis de sentimientos multimedia: IA que puede interpretar emociones en videos, imágenes, y hasta audio. Imagina entender cómo se siente alguien al probarse tu prenda solo por su expresión facial.

## Conclusión

El análisis de sentimientos no reemplaza la intuición humana, la amplifica. Nos da superpoderes para entender a nuestra audiencia a una escala y profundidad antes imposible.`,
    author: {
      name: 'Sofia Chen',
      avatar: '/images/placeholder3.png',
      role: 'Data Scientist & Marketing Strategist'
    },
    publishedAt: '2024-01-15',
    readTime: '7 min lectura',
    category: 'Marketing',
    tags: ['IA', 'Marketing', 'Análisis', 'Datos'],
    featuredImage: '/images/chart-placeholder.png',
    likes: 1024,
    comments: 203,
    shares: 445,
    aiScore: 96,
    engagementPrediction: 94,
    trendingScore: 88,
    isPersonalized: true
  }
];

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <article className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300">
      {/* AI Badges */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {post.isPersonalized && (
            <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold border border-purple-200">
              🤖 Personalizado para Ti
            </span>
          )}
          <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">
            IA Score: {post.aiScore}%
          </span>
        </div>
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`p-2 rounded-full transition-colors ${
            isBookmarked ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          <Bookmark size={16} />
        </button>
      </div>

      {/* Featured Image */}
      <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-gray-100 mb-4">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2">
          {post.title}
        </h2>
        
        <p className="text-gray-600 text-sm line-clamp-3">
          {post.excerpt}
        </p>

        {/* Author & Meta */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-800 text-sm">{post.author.name}</div>
            <div className="text-gray-500 text-xs">{post.author.role}</div>
          </div>
          <div className="text-right text-xs text-gray-500">
            <div>{new Date(post.publishedAt).toLocaleDateString('es')}</div>
            <div>{post.readTime}</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              #{tag}
            </span>
          ))}
        </div>

        {/* Engagement Metrics */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-1 transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart size={16} className={isLiked ? 'fill-current' : ''} />
              <span className="text-sm">{post.likes}</span>
            </button>
            <div className="flex items-center gap-1 text-gray-500">
              <MessageSquare size={16} />
              <span className="text-sm">{post.comments}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Share2 size={16} />
              <span className="text-sm">{post.shares}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500">
              Engagement: {post.engagementPrediction}%
            </div>
            {post.trendingScore > 85 && (
              <div className="flex items-center gap-1 text-orange-500">
                <TrendingUp size={14} />
                <span className="text-xs font-medium">Trending</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default function DashboardBlogPage() {
  const [activeTab, setActiveTab] = useState<'personalized' | 'trending' | 'ai-tools'>('personalized');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Blog de Moda IA
              </h1>
              <p className="text-gray-600 mt-1">Contenido inteligente personalizado para tu perfil y preferencias</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200">
                <span className="text-sm font-bold text-purple-700">🧠 Contenido IA</span>
              </div>
              <div className="px-4 py-2 bg-green-100 rounded-full border border-green-200">
                <span className="text-sm font-bold text-green-700">3 artículos nuevos hoy</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-6">
            {[
              { key: 'personalized', label: 'Para Ti', icon: Sparkles },
              { key: 'trending', label: 'Tendencias', icon: TrendingUp },
              { key: 'ai-tools', label: 'Herramientas IA', icon: Brain }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === key
                    ? 'bg-white text-purple-700 shadow-md'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Todas las categorías</option>
              <option value="sostenibilidad">Sostenibilidad</option>
              <option value="diseño">Diseño</option>
              <option value="marketing">Marketing</option>
              <option value="tecnología">Tecnología</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'personalized' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Artículos Personalizados para Ti</h2>
              <p className="text-gray-600">Contenido seleccionado por IA basado en tus intereses y actividad</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'trending' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Predicción de Tendencias</h2>
              <p className="text-gray-600">Análisis de IA sobre las próximas tendencias en moda</p>
            </div>
            <TrendPrediction category="fashion_content" timeframe="medium" />
          </div>
        )}

        {activeTab === 'ai-tools' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Herramientas de IA para Contenido</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Generador de Contenido IA</h3>
                  <ContentGeneration contentType="blog_article" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Análisis de Sentimientos</h3>
                  <SentimentAnalysis productId="blog-content" context="event" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && activeTab === 'personalized' && (
          <div className="text-center py-12">
            <PenTool size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron artículos</h3>
            <p className="text-gray-500">Intenta ajustar tus filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
} 