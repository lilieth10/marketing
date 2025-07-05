'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Calendar, MapPin, Users, Clock, Star, Heart, Share2, ArrowLeft, 
  Crown, Sparkles, Eye, Bookmark, CheckCircle, Plus, MessageCircle,
  Phone, Mail, Globe, Instagram, Twitter, Facebook
} from 'lucide-react';
import Image from 'next/image';
import { useAuthStore } from '@/store/auth.store';

const getEventById = (id: string) => ({
  id,
  title: 'Milano Fashion Week 2024',
  subtitle: 'Sustainable Luxury Experience',
  description: 'Experimenta el futuro de la moda sostenible con las colecciones más innovadoras de diseñadores emergentes y establecidos.',
  date: '15 - 17 Marzo 2024',
  time: '19:00 - 23:00',
  duration: '3 días',
  location: {
    venue: 'Palazzo delle Stelline',
    city: 'Milano',
    country: 'Italia',
    address: 'Corso Magenta, 61, 20123 Milano MI, Italia'
  },
  organizer: {
    name: 'Milano Fashion Council',
    avatar: '/images/placeholder1.png',
    verified: true,
    followers: '2.3M',
    description: 'Organizador oficial de Milano Fashion Week desde 1958',
    website: 'milanofashionweek.com',
    email: 'info@milanofashionweek.com',
    phone: '+39 02 8645 0000'
  },
  mainImage: '/images/verano.jpg',
  gallery: ['/images/verano.jpg', '/images/accesosrios.png', '/images/hombres.webp'],
  attendees: 847,
  maxCapacity: 1200,
  price: 85,
  originalPrice: 120,
  isExclusive: true,
  tags: ['Sostenibilidad', 'Lujo', 'Diseño', 'Networking'],
  category: 'Fashion Show',
  difficulty: 'Todos los niveles',
  language: 'Español, Inglés, Italiano',
  aiRecommendationScore: 96,
  status: 'upcoming',
  highlights: [
    '🌿 100% Sostenible',
    '👔 Diseñadores Exclusivos', 
    '🥂 Networking Premium',
    '📱 Livestream 4K',
    '🎁 Goodie Bag Exclusivo',
    '🏆 Certificado de Asistencia'
  ],
  agenda: [
    {
      day: 'Día 1 - 15 Marzo',
      events: [
        { time: '19:00', title: 'Registro y Welcome Drink', location: 'Hall Principal' },
        { time: '19:30', title: 'Keynote: Futuro de la Moda Sostenible', location: 'Auditorio A' },
        { time: '20:30', title: 'Desfile: Colección Eco-Luxury', location: 'Pasarela Principal' },
        { time: '21:30', title: 'Cocktail & Networking', location: 'Terraza VIP' }
      ]
    },
    {
      day: 'Día 2 - 16 Marzo', 
      events: [
        { time: '18:00', title: 'Workshop: Diseño Circular', location: 'Sala 1' },
        { time: '19:00', title: 'Panel: Innovación en Materiales', location: 'Auditorio B' },
        { time: '20:00', title: 'Desfile: Diseñadores Emergentes', location: 'Pasarela Principal' },
        { time: '21:00', title: 'After Party Exclusivo', location: 'Rooftop' }
      ]
    }
  ]
});

export default function EventProfilePage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;
  const event = getEventById(eventId);
  const { user: currentUser } = useAuthStore();
  
  // Estado persistente de asistencia
  const [isAttending, setIsAttending] = useState(() => {
    if (!currentUser) return false;
    const key = `event_attending_${currentUser.id}`;
    const attending = JSON.parse(localStorage.getItem(key) || '[]');
    return attending.includes(eventId);
  });

  const handleAttendance = () => {
    if (!currentUser) return;
    const key = `event_attending_${currentUser.id}`;
    const attending = JSON.parse(localStorage.getItem(key) || '[]');
    let updated;
    if (isAttending) {
      updated = attending.filter((id: string) => id !== eventId);
    } else {
      updated = [...attending, eventId];
    }
    localStorage.setItem(key, JSON.stringify(updated));
    setIsAttending(!isAttending);
  };

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Obtener asistentes reales
  const getAttendees = () => {
    try {
      const allUsers = Object.keys(localStorage)
        .filter(key => key.startsWith('event_attending_'))
        .reduce((acc: string[], key) => {
          const attending = JSON.parse(localStorage.getItem(key) || '[]');
          if (attending.includes(eventId)) {
            const userId = key.replace('event_attending_', '');
            acc.push(userId);
          }
          return acc;
        }, []);
      return allUsers.length;
    } catch (error) {
      console.warn('Error getting attendees:', error);
      return event.attendees; // Fallback a mock data
    }
  };

  const attendees = getAttendees();
  const capacityPercentage = Math.round((attendees / event.maxCapacity) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Eventos</span>
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg transition-all ${
                  isBookmarked 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Bookmark size={18} />
              </button>
              <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Hero Section */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-8">
              {/* Main Image */}
              <div className="relative h-80 lg:h-96">
                <Image
                  src={event.gallery[selectedImageIndex]}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    IA {event.aiRecommendationScore}%
                  </span>
                </div>

                {/* Gallery Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {event.gallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        selectedImageIndex === index ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Event Info */}
              <div className="p-6 lg:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h1>
                    <p className="text-lg text-purple-600 font-semibold mb-3">
                      {event.subtitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">${event.price}</div>
                    {event.originalPrice > event.price && (
                      <div className="text-sm text-gray-400 line-through">${event.originalPrice}</div>
                    )}
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-purple-600" />
                    <div>
                      <div className="text-xs text-gray-500">Fecha</div>
                      <div className="text-sm font-semibold">15-17 Mar</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-purple-600" />
                    <div>
                      <div className="text-xs text-gray-500">Horario</div>
                      <div className="text-sm font-semibold">19:00-23:00</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-purple-600" />
                    <div>
                      <div className="text-xs text-gray-500">Ubicación</div>
                      <div className="text-sm font-semibold">Milano, Italia</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-purple-600" />
                    <div>
                      <div className="text-xs text-gray-500">Asistentes</div>
                      <div className="text-sm font-semibold">{attendees}</div>
                    </div>
                  </div>
                </div>

                {/* Agregar el botón de asistir después del grid de Quick Info */}
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={handleAttendance}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      isAttending
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                    }`}
                  >
                    {isAttending ? (
                      <>
                        <CheckCircle size={16} />
                        Asistiré
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        Asistir
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      isBookmarked 
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'border-2 border-gray-200 text-gray-700 hover:border-purple-500 hover:text-purple-500'
                    }`}
                  >
                    <Bookmark size={16} />
                  </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Acerca del evento</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Lo que incluye</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {event.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle size={16} className="text-green-600" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agenda */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Programa del evento</h3>
                  <div className="space-y-4">
                    {event.agenda.map((day, dayIndex) => (
                      <div key={dayIndex} className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">{day.day}</h4>
                        <div className="space-y-2">
                          {day.events.map((eventItem, eventIndex) => (
                            <div key={eventIndex} className="flex gap-4">
                              <div className="text-purple-600 font-medium text-sm min-w-[60px]">
                                {eventItem.time}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-sm">{eventItem.title}</div>
                                <div className="text-xs text-gray-500">{eventItem.location}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              {/* Registration Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-purple-600 mb-1">${event.price}</div>
                  <div className="text-sm text-gray-500">por persona</div>
                  <div className="text-xs text-green-600 font-medium">Descuento del 29% aplicado</div>
                </div>

                {/* Capacity Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Capacidad</span>
                    <span className="font-semibold">{attendees}/{event.maxCapacity}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${capacityPercentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{100 - capacityPercentage}% disponible</div>
                </div>

                {/* Registration Button */}
                <button
                  onClick={() => setIsAttending(!isAttending)}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all mb-3 ${
                    isAttending
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {isAttending ? (
                    <>
                      <CheckCircle size={18} className="inline mr-2" />
                      ¡Registrado!
                    </>
                  ) : (
                    <>
                      <Plus size={18} className="inline mr-2" />
                      Registrarse
                    </>
                  )}
                </button>

                {/* Contact Button */}
                <button className="w-full py-3 px-6 rounded-xl font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all">
                  <MessageCircle size={18} className="inline mr-2" />
                  Contactar organizador
                </button>

                <div className="text-xs text-gray-500 text-center mt-3">
                  ✓ Cancelación gratuita hasta 48h antes
                </div>
              </div>

              {/* Organizer Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold mb-4">Organizador</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={event.organizer.avatar}
                      alt={event.organizer.name}
                      fill
                      className="rounded-full object-cover"
                    />
                    {event.organizer.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckCircle size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{event.organizer.name}</div>
                    <div className="text-sm text-gray-500">{event.organizer.followers} seguidores</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{event.organizer.description}</p>
                
                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe size={14} />
                    <span>{event.organizer.website}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} />
                    <span>{event.organizer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={14} />
                    <span>{event.organizer.phone}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3 mt-4">
                  <button className="p-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors">
                    <Instagram size={16} />
                  </button>
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                    <Twitter size={16} />
                  </button>
                  <button className="p-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors">
                    <Facebook size={16} />
                  </button>
                </div>
              </div>

              {/* Event Details */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold mb-4">Detalles del evento</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duración:</span>
                    <span className="font-medium">{event.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Idioma:</span>
                    <span className="font-medium">{event.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nivel:</span>
                    <span className="font-medium">{event.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Categoría:</span>
                    <span className="font-medium">{event.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 