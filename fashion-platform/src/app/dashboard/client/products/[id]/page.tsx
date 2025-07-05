'use client';

import React, { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Star, Heart, Share2, Sparkles, Crown, TrendingUp, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { AddToCartButton } from '@/components/modules/AddToCartButton';
import { SentimentAnalysis } from '@/components/modules/SentimentAnalysis';
import { mockProducts } from '@/data/mockProducts';
import { ProductPersonalization } from '@/components/modules/ProductPersonalization';

// Función para generar datos premium basados en el producto existente
const generatePremiumData = (product: any) => {
  const categories = {
    'Vestidos': {
      luxuryStory: "Diseñado por maestros costureros que han perfeccionado el arte del patronaje femenino durante décadas. Cada vestido cuenta una historia de elegancia atemporal.",
      emotionalImpact: "El 94% de usuarias reporta sentirse más segura y radiante al usarlo.",
      trendContext: "Destacado en revistas de moda y adoptado por influencers de estilo. Pieza clave en eventos exclusivos.",
      features: [
        "Patronaje de alta costura",
        "Tejidos premium seleccionados",
        "Corte favorecedor universal",
        "Acabados artesanales",
        "Diseño versátil día/noche"
      ]
    },
    'Blazers': {
      luxuryStory: "Creado en colaboración con ejecutivas de alto nivel, este blazer incorpora elementos de diseño que proyectan autoridad y sofisticación profesional.",
      emotionalImpact: "El 96% de usuarias reporta mayor confianza en reuniones y presentaciones importantes.",
      trendContext: "Viral entre mujeres líderes en LinkedIn. Featured como 'Power Piece' del año en medios especializados.",
      features: [
        "Corte arquitectónico premium",
        "Tejido italiano anti-arrugas",
        "Forro de seda natural",
        "Botones de diseño exclusivo",
        "Ergonomía para movimiento"
      ]
    },
    'Jeans': {
      luxuryStory: "Inspirado en la cultura urbana contemporánea y perfeccionado con técnicas de lavado artesanal que otorgan carácter único a cada prenda.",
      emotionalImpact: "El 91% de usuarios se siente más auténtico y cómodo en su estilo personal.",
      trendContext: "Trending en redes sociales entre jóvenes urbanos. Usado por artistas y creadores de contenido.",
      features: [
        "Denim premium de origen sustentable",
        "Lavado artesanal único",
        "Corte ergonómico moderno",
        "Detalles de diseño exclusivos",
        "Durabilidad garantizada"
      ]
    },
    'Blusas': {
      luxuryStory: "Confeccionada con sedas y algodones de la más alta calidad, representa la perfecta fusión entre tradición artesanal y diseño contemporáneo.",
      emotionalImpact: "El 97% de usuarias experimenta una sensación de elegancia y refinamiento inmediata.",
      trendContext: "Pieza favorita de estilistas profesionales. Aparece en editoriales de moda de revistas internacionales.",
      features: [
        "Tejidos de lujo certificados",
        "Costuras imperceptibles",
        "Caída perfecta garantizada",
        "Tratamiento anti-manchas",
        "Cuidado fácil premium"
      ]
    },
    'Streetwear': {
      luxuryStory: "Nacido en las calles y perfeccionado en ateliers urbanos, representa la evolución del streetwear hacia un lujo accesible y auténtico.",
      emotionalImpact: "El 89% de usuarios se conecta con su identidad urbana y se siente parte de una comunidad global.",
      trendContext: "Colaboraciones con artistas urbanos. Trending en plataformas de moda street y cultura urbana.",
      features: [
        "Materiales premium streetwear",
        "Diseño colaborativo con artistas",
        "Edición limitada numerada",
        "Comfort technology integrada",
        "Sustentabilidad urbana"
      ]
    },
    'Calzado': {
      luxuryStory: "Elaborado por maestros zapateros que combinan técnicas centenarias con innovación en materiales para crear calzado que perdura en el tiempo.",
      emotionalImpact: "El 93% de usuarios experimenta comodidad excepcional y confianza en cada paso.",
      trendContext: "Recomendado por podólogos y adoptado por profesionales que valoran comodidad y estilo.",
      features: [
        "Cuero premium de origen ético",
        "Tecnología de amortiguación",
        "Plantillas ergonómicas",
        "Resistencia al agua",
        "Garantía de durabilidad"
      ]
    },
    'Accesorios': {
      luxuryStory: "Cada pieza es cuidadosamente seleccionada y trabajada por artesanos especializados que entienden el poder de los detalles en el estilo personal.",
      emotionalImpact: "El 92% de usuarios siente que completa perfectamente su look y personalidad.",
      trendContext: "Must-have en círculos de moda. Pieza clave para completar looks de alto impacto.",
      features: [
        "Materiales nobles seleccionados",
        "Acabado artesanal premium",
        "Diseño atemporal",
        "Empaque de lujo incluido",
        "Certificado de autenticidad"
      ]
    },
    'Shorts': {
      luxuryStory: "Diseñado para el verano perfecto, combina comodidad y estilo en una prenda que se adapta a cualquier ocasión casual.",
      emotionalImpact: "El 90% de usuarios se siente cómodo y con estilo durante todo el día.",
      trendContext: "Básico de verano trending entre jóvenes. Perfecto para looks casuales y vacaciones.",
      features: [
        "Denim premium transpirable",
        "Corte favorecedor universal",
        "Resistente al desgaste",
        "Fácil combinación",
        "Comodidad todo el día"
      ]
    },
    'Tendencias de verano': {
      luxuryStory: "Captura la esencia del verano perfecto con diseños frescos que celebran la temporada de calor y alegría.",
      emotionalImpact: "El 95% de usuarias se siente radiante y lista para disfrutar el verano.",
      trendContext: "Trending en redes sociales como el must-have del verano. Usado por influencers de estilo.",
      features: [
        "Tejidos ultra-frescos",
        "Protección UV incorporada",
        "Diseños alegres y vibrantes",
        "Fácil cuidado",
        "Perfectos para vacaciones"
      ]
    },
    'Moda sostenible': {
      luxuryStory: "Cada pieza representa un compromiso con el planeta, usando materiales reciclados sin comprometer el estilo y la funcionalidad.",
      emotionalImpact: "El 96% de usuarios se siente bien consigo mismo al contribuir al cuidado del planeta.",
      trendContext: "Líder en moda sostenible. Reconocido por organizaciones ambientales internacionales.",
      features: [
        "100% materiales reciclados",
        "Producción carbon-neutral",
        "Certificación ecológica",
        "Durabilidad extendida",
        "Empaque biodegradable"
      ]
    }
  };

  // Generar métricas de estilo basadas en la categoría y precio (determinísticas para evitar hidratación)
  const baseScore = Math.floor(product.rating * 18) + Math.floor(product.price / 10);
  const categoryData = categories[product.category as keyof typeof categories] || categories['Streetwear'];
  
  // Usar el ID del producto para generar valores consistentes (sin Math.random)
  const idSum = product.id.split('').reduce((sum: number, char: string) => sum + char.charCodeAt(0), 0);
  const eleganceVariation = (idSum % 10) + 1;
  const versatilityVariation = (idSum % 8) + 1;
  const comfortVariation = (idSum % 12) + 1;
  const trendinessVariation = (idSum % 15) + 1;
  const exclusivityVariation = (idSum % 8) + 1;
  
  return {
    ...product,
    luxuryStory: categoryData.luxuryStory,
    emotionalImpact: categoryData.emotionalImpact,
    trendContext: categoryData.trendContext,
    features: categoryData.features,
    styleVector: {
      elegance: Math.min(95, baseScore + eleganceVariation),
      versatility: Math.min(95, baseScore + versatilityVariation),
      comfort: Math.min(95, baseScore + comfortVariation),
      trendiness: Math.min(95, baseScore + trendinessVariation),
      exclusivity: Math.min(95, baseScore + exclusivityVariation)
    },
    exclusivityScore: Math.min(95, baseScore + exclusivityVariation)
  };
};

// Mock product data - usar todos los productos de mockProducts
const getProductById = (id: string) => {
  const product = mockProducts.find(p => p.id === id);
  if (!product) return null;
  
  // Generar datos premium para todos los productos
  return generatePremiumData(product);
};

export default function ProductDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const product = getProductById(params.id as string);
  const [selectedSize, setSelectedSize] = useState('');
  const [showLuxuryStory, setShowLuxuryStory] = useState(false);
  const [showPersonalization, setShowPersonalization] = useState(false);
  
  // Determinar la URL de regreso basada en el parámetro 'from'
  const from = searchParams.get('from');
  const backUrl = from === 'profile' ? '/dashboard/client/profile' : '/dashboard/client';

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h1>
        <p className="text-gray-600 mb-6">Lo sentimos, el producto que buscas no existe o ha sido removido.</p>
        <Link href={backUrl} className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors">
          <ArrowLeft size={20} />
          Volver
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-8">
        <Link href={backUrl} className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
          <ArrowLeft size={20} />
          Volver
        </Link>
        <div className="flex items-center gap-4 ml-auto">
          <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
            <Heart size={20} />
          </button>
          <button className="p-2 text-gray-600 hover:text-blue-500 transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Botón de Personalización */}
      <div className="mb-4 flex justify-end">
        <button
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow hover:shadow-lg transition-all"
          onClick={() => setShowPersonalization(!showPersonalization)}
        >
          {showPersonalization ? 'Cerrar Personalización' : 'Personalizar prenda'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative w-full h-[600px] rounded-3xl overflow-hidden bg-gray-50">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.exclusivityScore > 85 && (
              <div className="absolute top-6 right-6">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <Crown size={16} />
                  Edición Limitada
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-400 fill-current" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-gray-500">({product.reviews} reseñas)</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
            <div className="text-3xl font-bold text-purple-600 mb-6">${product.price.toFixed(2)}</div>
          </div>

          {/* Style Metrics */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-700 mb-4">Análisis de Estilo IA</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{product.styleVector.elegance}%</div>
                <div className="text-sm text-gray-600">Elegancia</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{product.styleVector.versatility}%</div>
                <div className="text-sm text-gray-600">Versatilidad</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{product.exclusivityScore}%</div>
                <div className="text-sm text-gray-600">Exclusividad</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{product.styleVector.trendiness}%</div>
                <div className="text-sm text-gray-600">Tendencia</div>
              </div>
            </div>
          </div>

          {/* Luxury Story */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <button 
              onClick={() => setShowLuxuryStory(!showLuxuryStory)}
              className="flex items-center gap-3 w-full text-left"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">Historia de Lujo</h3>
                <p className="text-sm text-gray-600">Descubre la inspiración detrás de esta pieza</p>
              </div>
              <TrendingUp size={20} className={`text-purple-500 transition-transform ${showLuxuryStory ? 'rotate-180' : ''}`} />
            </button>
            
            {showLuxuryStory && (
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-4 animate-fadeIn">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">✨ La Historia</h4>
                  <p className="text-gray-600 text-sm italic leading-relaxed">"{product.luxuryStory}"</p>
                </div>
                
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <h4 className="font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                    <Heart size={16} />
                    Impacto Emocional
                  </h4>
                  <p className="text-emerald-600 text-sm">{product.emotionalImpact}</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                    <TrendingUp size={16} />
                    Contexto de Tendencias
                  </h4>
                  <p className="text-blue-600 text-sm">{product.trendContext}</p>
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Características Premium</h3>
            <ul className="space-y-2">
              {product.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Selecciona tu talla</h3>
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg font-semibold transition-all min-w-[50px] ${
                    selectedSize === size
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-300 text-gray-700 hover:border-purple-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="sticky bottom-0 bg-white p-4 -mx-4 border-t border-gray-200">
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                images: product.images,
                designerId: product.designerId,
                description: product.description,
                category: product.category,
                sizes: product.sizes,
                rating: product.rating,
                reviews: product.reviews,
                reviewSummary: product.reviewSummary,
                aiSummary: product.aiSummary,
                highlightedTopics: product.highlightedTopics,
                reviewsList: product.reviewsList,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
              }}
              fullWidth={true}
            />
          </div>
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div className="mt-16">
        <SentimentAnalysis productId={product.id} context="product" />
      </div>

      {/* Modal o sección de personalización */}
      {showPersonalization && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowPersonalization(false)}>
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-purple-600 text-2xl font-bold"
              onClick={() => setShowPersonalization(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <ProductPersonalization />
          </div>
        </div>
      )}
    </div>
  );
} 