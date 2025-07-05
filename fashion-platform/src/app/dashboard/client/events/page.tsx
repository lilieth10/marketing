'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, Star, Heart, Share2, Filter, Search, Plus, TrendingUp, Crown, Sparkles, Eye, ArrowRight, Bookmark, Camera, Send, Lock, MessageCircle, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { TrendPrediction } from '@/components/modules/TrendPrediction';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useCommunityStore } from '@/store/community.store';
import { useUserProfileStore } from '@/store/userProfile.store';
import { showSuccess } from '@/lib/sweetAlert';

interface FashionEvent {
  id: string;
  title: string;
  description: string;
  type: 'fashion_show' | 'workshop' | 'networking' | 'launch' | 'masterclass';
  date: string;
  time: string;
  location: {
    venue: string;
    city: string;
    address: string;
    isVirtual: boolean;
  };
  organizer: {
    name: string;
    avatar: string;
    verified: boolean;
    followers: string;
  };
  image: string;
  attendees: number;
  maxCapacity: number;
  price: number;
  isExclusive: boolean;
  tags: string[];
  aiRecommendationScore: number;
  trendingScore: number;
  status: 'upcoming' | 'live' | 'ended';
  specialFeatures: string[];
  isUserRegistered: boolean;
  isUserAttending: boolean;
  featured: boolean;
  rating: number;
}

const mockEvents: FashionEvent[] = [
  {
    id: 'event-001',
    title: 'Milano Fashion Week 2024 - Sustainable Luxury',
    description: 'Experimenta el futuro de la moda sostenible con las colecciones más innovadoras de diseñadores emergentes y establecidos.',
    type: 'fashion_show',
    date: '2024-03-15',
    time: '19:00',
    location: {
      venue: 'Palazzo delle Stelline',
      city: 'Milano, Italia',
      address: 'Corso Magenta, 61',
      isVirtual: false
    },
    organizer: {
      name: 'Milano Fashion Council',
      avatar: '/images/placeholder1.png',
      verified: true,
      followers: '2.3M'
    },
    image: '/images/products/blazer1.jpg',
    attendees: 847,
    maxCapacity: 1200,
    price: 85,
    isExclusive: true,
    tags: ['Sostenibilidad', 'Lujo', 'Diseñadores Emergentes', 'Networking'],
    aiRecommendationScore: 96,
    trendingScore: 94,
    status: 'upcoming',
    specialFeatures: ['Livestream 4K', 'Meet & Greet VIP', 'Cocktail de red'],
    isUserRegistered: true,
    isUserAttending: true,
    featured: true,
    rating: 4.8
  },
  {
    id: 'event-002',
    title: 'Masterclass: Diseño de Accesorios con IA',
    description: 'Aprende a integrar inteligencia artificial en el proceso creativo de diseño de accesorios únicos.',
    type: 'masterclass',
    date: '2024-02-28',
    time: '15:00',
    location: {
      venue: 'Virtual Event',
      city: 'Online',
      address: 'Plataforma exclusiva',
      isVirtual: true
    },
    organizer: {
      name: 'Sofia Martinez',
      avatar: '/images/placeholder2.png',
      verified: true,
      followers: '456K'
    },
    image: '/images/accesosrios.png',
    attendees: 234,
    maxCapacity: 500,
    price: 45,
    isExclusive: false,
    tags: ['IA', 'Accesorios', 'Diseño', 'Educación'],
    aiRecommendationScore: 91,
    trendingScore: 88,
    status: 'upcoming',
    specialFeatures: ['Material exclusivo', 'Certificado', 'Q&A en vivo'],
    isUserRegistered: true,
    isUserAttending: false,
    featured: false,
    rating: 4.6
  },
  {
    id: 'event-003',
    title: 'Networking: Emprendedores de Moda Tech',
    description: 'Conecta con otros emprendedores que están revolucionando la industria de la moda con tecnología.',
    type: 'networking',
    date: '2024-03-05',
    time: '18:30',
    location: {
      venue: 'Innovation Hub',
      city: 'Barcelona, España',
      address: 'Carrer de la Ciutat de Granada, 44',
      isVirtual: false
    },
    organizer: {
      name: 'FashionTech Barcelona',
      avatar: '/images/placeholder3.png',
      verified: true,
      followers: '89K'
    },
    image: '/images/products/shirt1.jpg',
    attendees: 156,
    maxCapacity: 200,
    price: 25,
    isExclusive: false,
    tags: ['Networking', 'Startup', 'Tecnología', 'Emprendimiento'],
    aiRecommendationScore: 87,
    trendingScore: 85,
    status: 'upcoming',
    specialFeatures: ['Pitch sessions', 'Mentores expertos', 'Cocktail networking'],
    isUserRegistered: false,
    isUserAttending: false,
    featured: false,
    rating: 4.4
  },
  {
    id: 'event-004',
    title: 'Workshop: Personalización con IA',
    description: 'Descubre cómo usar algoritmos de IA para personalización masiva de productos de moda.',
    type: 'workshop',
    date: '2024-03-08',
    time: '14:00',
    location: {
      venue: 'Tech Fashion Hub',
      city: 'Madrid, España',
      address: 'Gran Vía, 28',
      isVirtual: false
    },
    organizer: {
      name: 'IA Fashion Labs',
      avatar: '/images/placeholder4.png',
      verified: true,
      followers: '234K'
    },
    image: '/images/campera.png',
    attendees: 89,
    maxCapacity: 120,
    price: 60,
    isExclusive: false,
    tags: ['IA', 'Personalización', 'Workshop', 'Madrid'],
    aiRecommendationScore: 98,
    trendingScore: 92,
    status: 'upcoming',
    specialFeatures: ['Hands-on', 'Laptop incluido', 'Networking'],
    isUserRegistered: true,
    isUserAttending: true,
    featured: false,
    rating: 4.7
  },
  {
    id: 'event-005',
    title: 'Lanzamiento: Colección Eco-Digital',
    description: 'Presentación mundial de la primera colección 100% sostenible diseñada con IA.',
    type: 'launch',
    date: '2024-03-12',
    time: '20:00',
    location: {
      venue: 'Espacio Verde',
      city: 'Buenos Aires, Argentina',
      address: 'Puerto Madero, Dique 3',
      isVirtual: false
    },
    organizer: {
      name: 'EcoFashion Global',
      avatar: '/images/placeholder1.png',
      verified: true,
      followers: '1.2M'
    },
    image: '/images/products/dress1.jpg',
    attendees: 340,
    maxCapacity: 400,
    price: 40,
    isExclusive: true,
    tags: ['Sostenibilidad', 'IA', 'Lanzamiento', 'Buenos Aires'],
    aiRecommendationScore: 94,
    trendingScore: 96,
    status: 'upcoming',
    specialFeatures: ['Desfile exclusivo', 'Sustainable Goodie Bag', 'Meet & Greet'],
    isUserRegistered: false,
    isUserAttending: false,
    featured: false,
    rating: 4.5
  },
  {
    id: 'event-006',
    title: 'Conferencia: Futuro del Retail Fashion',
    description: 'Explorando las últimas tendencias en retail de moda impulsado por inteligencia artificial.',
    type: 'masterclass',
    date: '2024-03-20',
    time: '16:00',
    location: {
      venue: 'Centro de Convenciones',
      city: 'Ciudad de México, México',
      address: 'Av. Presidente Masaryk 111',
      isVirtual: false
    },
    organizer: {
      name: 'Retail Fashion Innovation',
      avatar: '/images/placeholder2.png',
      verified: true,
      followers: '678K'
    },
    image: '/images/botines.jpg',
    attendees: 567,
    maxCapacity: 800,
    price: 75,
    isExclusive: false,
    tags: ['Retail', 'IA', 'Conferencia', 'Innovación'],
    aiRecommendationScore: 89,
    trendingScore: 91,
    status: 'upcoming',
    specialFeatures: ['Speakers internacionales', 'Networking premium', 'Material exclusivo'],
    isUserRegistered: true,
    isUserAttending: false,
    featured: true,
    rating: 4.9
  }
];

const getEventStats = () => {
  const totalEvents = mockEvents.length;
  const thisMonth = mockEvents.filter(event => {
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    return eventDate.getMonth() === currentDate.getMonth() && 
           eventDate.getFullYear() === currentDate.getFullYear();
  }).length;
  const attending = mockEvents.filter(event => event.isUserAttending).length;
  const registered = mockEvents.filter(event => event.isUserRegistered).length;
  
  return {
    totalEvents: totalEvents.toString(),
    thisMonth: thisMonth.toString(),
    attending: attending.toString(),
    registered: registered.toString()
  };
};

const EventCard: React.FC<{ event: FashionEvent }> = ({ event }) => {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const getEventTypeIcon = (type: string) => {
    switch(type) {
      case 'fashion_show': return Crown;
      case 'workshop': return Star;
      case 'networking': return Users;
      case 'launch': return Sparkles;
      case 'masterclass': return TrendingUp;
      default: return Calendar;
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch(type) {
      case 'fashion_show': return 'Fashion Show';
      case 'workshop': return 'Workshop';
      case 'networking': return 'Networking';
      case 'launch': return 'Lanzamiento';
      case 'masterclass': return 'Masterclass';
      default: return 'Evento';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'live': return 'bg-red-100 text-red-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const TypeIcon = getEventTypeIcon(event.type);
  const capacity = Math.round((event.attendees / event.maxCapacity) * 100);

  const handleEventClick = () => {
    router.push(`/dashboard/client/events/${event.id}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={handleEventClick}>
      {/* AI Score Badge */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {event.isExclusive && (
          <div className="bg-gradient-to-r from-gold-400 to-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            Exclusivo
          </div>
        )}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
          IA {event.aiRecommendationScore}%
        </div>
      </div>

      {/* Event Image */}
      <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-gray-50 mb-4">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Quick Actions */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isBookmarked 
                ? 'bg-pink-500 text-white' 
                : 'bg-white/90 text-gray-700 hover:bg-white'
            }`}
          >
            <Bookmark size={14} />
          </button>
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
            <Share2 size={14} className="text-gray-700" />
          </button>
        </div>

        {/* Event Status */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(event.status)}`}>
            {event.status === 'upcoming' ? 'Próximamente' : 
             event.status === 'live' ? 'En vivo' : 'Finalizado'}
          </span>
        </div>
      </div>

      {/* Event Info */}
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-100 rounded-xl">
            <TypeIcon size={18} className="text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2">
              {event.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{getEventTypeLabel(event.type)}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              {new Date(event.date).toLocaleDateString('es', { 
                day: 'numeric', 
                month: 'short' 
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{event.time}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2">
          <MapPin size={16} className="text-gray-500 mt-0.5" />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-700">{event.location.venue}</div>
            <div className="text-xs text-gray-500">{event.location.city}</div>
          </div>
          {event.location.isVirtual && (
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
              Virtual
            </span>
          )}
        </div>

        {/* Organizer */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={event.organizer.avatar}
                alt={event.organizer.name}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            {event.organizer.verified && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-700">{event.organizer.name}</div>
            <div className="text-xs text-gray-500">{event.organizer.followers} seguidores</div>
          </div>
        </div>

        {/* Capacity & Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users size={14} className="text-gray-500" />
              <span className="text-sm text-gray-600">
                {event.attendees}/{event.maxCapacity}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full"
                style={{ width: `${capacity}%` }}
              />
            </div>
          </div>
          <div className="text-right">
            {event.price > 0 ? (
              <div className="text-lg font-bold text-purple-600">${event.price}</div>
            ) : (
              <div className="text-lg font-bold text-green-600">Gratis</div>
            )}
            <div className="text-xs text-gray-500">por persona</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {event.tags.slice(0, 3).map((tag: any, index: number) => (
            <span key={index} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              +{event.tags.length - 3}
            </span>
          )}
        </div>

        {/* Special Features */}
        {event.specialFeatures.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Incluye:</h4>
            <ul className="space-y-1">
              {event.specialFeatures.slice(0, 2).map((feature: string, index: number) => (
                <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
                  <Star size={12} className="text-purple-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => window.location.href = `/dashboard/client/events/${event.id}`}
            className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-white border-2 border-purple-500 text-purple-600 hover:bg-purple-50"
          >
            <Eye size={16} />
            Ver Evento
          </button>
          
          <button
            onClick={() => setIsRegistered(!isRegistered)}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              isRegistered
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
            }`}
          >
            {isRegistered ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Registrado
              </>
            ) : (
              <>
                <Plus size={16} />
                Registrarse
              </>
            )}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default function EventsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'attending' | 'recommended'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const { addPost, getPostsByCategory, likePost, unlikePost } = useCommunityStore();
  const { profile } = useUserProfileStore();
  
  // Get only events-related posts
  const eventPosts = getPostsByCategory('events');
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPostImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublishPost = async () => {
    if (!newPostContent.trim()) return;
    
    setIsPublishing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newPost = {
      author: {
        name: profile?.name || 'Usuario',
        avatar: '/images/placeholder1.png',
        verified: true,
        badge: 'Creador de Eventos'
      },
      content: newPostContent,
      image: newPostImage || '/images/placeholder3.png',
      timestamp: new Date().toLocaleString(),
      likes: 0,
      shares: 0,
      comments: 0,
      tags: ['#evento', '#moda'],
      category: 'events' as const,
      aiAnalysis: {
        sentiment: 'Muy Positivo',
        styleMatch: Math.floor(Math.random() * 20) + 80,
        trendAlignment: Math.floor(Math.random() * 25) + 75
      }
    };
    
    addPost(newPost);
    
    // Reset form
    setNewPostContent('');
    setNewPostImage(null);
    setIsPublishing(false);
    setShowPublishModal(false);
    
    // Show success message
    await showSuccess({
      title: '¡Post publicado exitosamente!',
      text: 'Tu publicación ha sido compartida con la comunidad y has ganado puntos de experiencia.',
      timer: 4000
    });
  };

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;
    
    // Filtrar por tab activo
    let matchesTab = true;
    if (activeTab === 'attending') {
      matchesTab = event.isUserRegistered || event.isUserAttending;
    } else if (activeTab === 'recommended') {
      matchesTab = event.aiRecommendationScore >= 90; // Solo eventos con alta recomendación IA
    }
    
    return matchesSearch && matchesType && matchesTab;
  }).sort((a, b) => {
    // Ordenar por score de IA si estamos en la tab de recomendados
    if (activeTab === 'recommended') {
      return b.aiRecommendationScore - a.aiRecommendationScore;
    }
    return 0;
  });

  const featuredEvents = filteredEvents.filter(event => event.featured);
  const regularEvents = filteredEvents.filter(event => !event.featured);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Eventos de Moda IA
              </h1>
              <p className="text-gray-600 mt-1">Descubre experiencias únicas recomendadas por inteligencia artificial</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPublishModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Plus size={16} />
                <span className="text-sm font-bold">Publicar Evento</span>
              </button>
              <button
                onClick={() => setShowAIAnalysis(!showAIAnalysis)}
                className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200 hover:from-purple-200 hover:to-pink-200 transition-all"
              >
                <span className="text-sm font-bold text-purple-700">🧠 Análisis IA</span>
              </button>
              <div className="px-4 py-2 bg-green-100 rounded-full border border-green-200">
                <span className="text-sm font-bold text-green-700">{getEventStats().thisMonth} eventos este mes</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-6">
            {[
              { key: 'all', label: 'Todos los Eventos', icon: Calendar },
              { key: 'attending', label: 'Mis Eventos', icon: Users },
              { key: 'recommended', label: 'IA Recomendados', icon: Sparkles }
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
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Todos los tipos</option>
              <option value="fashion_show">Fashion Shows</option>
              <option value="workshop">Workshops</option>
              <option value="networking">Networking</option>
              <option value="masterclass">Masterclass</option>
              <option value="launch">Lanzamientos</option>
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(getEventStats()).map(([key, value]) => (
              <div key={key} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                <div className="text-2xl font-bold text-purple-600">{value}</div>
                <div className="text-sm text-gray-600 capitalize">
                  {key === 'totalEvents' ? 'Total Eventos' :
                   key === 'thisMonth' ? 'Este Mes' :
                   key === 'attending' ? 'Asistiendo' :
                   'Registrado'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Analysis Section */}
      {showAIAnalysis && (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Predicción de Tendencias en Eventos</h3>
              <TrendPrediction category="events" timeframe="short" />
            </div>
          </div>
        </div>
      )}

      {/* Events Feed */}
      <div className="container mx-auto px-4 py-8">
        {eventPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Últimas Experiencias en Eventos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventPosts.slice(0, 4).map(post => (
                <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                  {/* Post Header */}
                  <div className="p-4 border-b border-gray-50">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                          {post.author.verified && (
                            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{post.author.badge} • {post.timestamp}</p>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4">
                    <p className="text-gray-700 mb-3">{post.content}</p>
                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full h-48 object-cover rounded-lg mb-3"
                      />
                    )}
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag: any, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => {
                            if (post.isLiked) {
                              unlikePost(post.id);
                            } else {
                              likePost(post.id);
                            }
                          }}
                          className={`flex items-center gap-2 transition-all ${
                            post.isLiked 
                              ? 'text-red-500 hover:text-red-600' 
                              : 'text-gray-500 hover:text-red-500'
                          }`}
                        >
                          <Heart 
                            size={18} 
                            className={post.isLiked ? 'fill-current' : ''} 
                          />
                          <span className="text-sm font-medium">{post.likes}</span>
                        </button>
                        <div className="flex items-center gap-2 text-gray-500">
                          <MessageCircle size={18} />
                          <span className="text-sm">{post.comments}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Share2 size={18} />
                          <span className="text-sm">{post.shares}</span>
                        </div>
                      </div>
                      
                      {/* AI Analysis */}
                      <div className="flex items-center gap-2 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                        <Sparkles size={12} />
                        <span>{post.aiAnalysis.sentiment}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
      <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Crown className="text-yellow-500" size={24} />
            Eventos Destacados
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredEvents.map((event) => (
              <Card 
                key={event.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white cursor-pointer"
                onClick={() => router.push(`/dashboard/client/events/${event.id}`)}
              >
                <div className="relative h-64">
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Implementar lógica para cambiar el estado de favorito
                      }}
                      className={`p-2 rounded-full backdrop-blur transition-all ${
                        event.featured 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <Heart size={16} className={event.featured ? 'fill-current' : ''} />
                    </button>
                    <button className="p-2 bg-white/80 rounded-full text-gray-700 hover:bg-white transition-all">
                      <Share2 size={16} />
                    </button>
                  </div>
                  {event.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ Destacado
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {event.type}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500 fill-current" size={14} />
                      <span className="text-sm font-semibold text-gray-700">{event.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} className="text-purple-500" />
                      <span>{new Date(event.date).toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} className="text-purple-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} className="text-purple-500" />
                      <span>{event.location.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users size={16} className="text-purple-500" />
                      <span>{event.attendees}/{event.maxCapacity} asistentes</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag: any, index: number) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-purple-600">
                      {event.price === 0 ? 'Gratis' : `€${event.price}`}
                    </div>
                    <Button
                      variant={event.isUserAttending ? 'secondary' : 'primary'}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Implementar lógica para cambiar el estado de asistencia
                      }}
                      className={event.isUserAttending ? 'border-green-300 text-green-700 bg-green-50' : ''}
                    >
                      {event.isUserAttending ? '✓ Confirmado' : 'Asistir'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular Events */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="text-blue-500" size={24} />
          Todos los Eventos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularEvents.map((event) => (
            <Card 
              key={event.id} 
              className="overflow-hidden hover:shadow-lg transition-all duration-300 group bg-white cursor-pointer"
              onClick={() => router.push(`/dashboard/client/events/${event.id}`)}
            >
              <div className="relative h-48">
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Implementar lógica para cambiar el estado de favorito
                    }}
                    className={`p-2 rounded-full backdrop-blur transition-all ${
                      event.featured 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <Heart size={14} className={event.featured ? 'fill-current' : ''} />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">
                    {event.type}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-500 fill-current" size={12} />
                    <span className="text-xs text-gray-700">{event.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-1 mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-purple-500" />
                    <span>{new Date(event.date).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-purple-500" />
                    <span className="truncate">{event.location.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-purple-500" />
                    <span>{event.attendees} asistentes</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-purple-600">
                    {event.price === 0 ? 'Gratis' : `€${event.price}`}
                  </div>
                  <Button
                    size="sm"
                    variant={event.isUserAttending ? 'secondary' : 'primary'}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Implementar lógica para cambiar el estado de asistencia
                    }}
                    className={event.isUserAttending ? 'border-green-300 text-green-700 bg-green-50 text-xs' : 'text-xs'}
                  >
                    {event.isUserAttending ? '✓' : 'Asistir'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron eventos</h3>
          <p className="text-gray-500">Intenta cambiar los filtros o buscar otros términos</p>
          </div>
        )}

      {/* Publish Event Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Compartir sobre Eventos</h2>
              <button
                onClick={() => setShowPublishModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Post Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ¿Qué quieres compartir sobre eventos?
                </label>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Comparte tu experiencia en eventos, descubrimientos, o recomendaciones..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Imagen (opcional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                  {newPostImage ? (
                    <div className="space-y-4">
                      <img
                        src={newPostImage}
                        alt="Preview"
                        className="max-h-40 mx-auto rounded-lg object-cover"
                      />
                      <button
                        onClick={() => setNewPostImage(null)}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        Eliminar imagen
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Camera size={32} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600 mb-2">Arrastra una imagen aquí o haz clic para seleccionar</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg cursor-pointer hover:bg-purple-200 transition-colors"
                      >
                        Seleccionar Imagen
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tags sugeridos
                </label>
                <div className="flex flex-wrap gap-2">
                  {['#evento', '#moda', '#networking', '#tendencias', '#IA'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Lock size={14} />
                <span>Se compartirá públicamente en la comunidad</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowPublishModal(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePublishPost}
                  disabled={!newPostContent.trim() || isPublishing}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    !newPostContent.trim() || isPublishing
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                  }`}
                >
                  {isPublishing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Publicando...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Publicar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 