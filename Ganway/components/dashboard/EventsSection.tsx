"use client"

import { Clock, Calendar, Filter, Search, Heart } from "lucide-react"
import EventDetail from "./EventDetail"
import { useState } from "react"

const events = [
  {
    id: 1,
    title: "Desfile de moda de primavera en París, tendencias de estilo y accesorios",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
    readTime: "5 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: true,
  },
  {
    id: 2,
    title: "Desfile de moda en París con las últimas tendencias",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=200&q=80",
    readTime: "6 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: false,
  },
  {
    id: 3,
    title: "Tendencias de primavera en la pasarela de Nueva York",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=200&q=80",
    readTime: "6 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: false,
  },
  {
    id: 4,
    title: "Colección de verano en la semana de la moda de Milán",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=200&q=80",
    readTime: "5 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: false,
  },
]

const additionalEvents = [
  {
    id: 5,
    title: "Desfile de moda primavera-verano",
    description: "Explora las últimas tendencias en moda para la temporada.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=300&q=80",
    date: "24/02/08",
    liked: false,
  },
  {
    id: 6,
    title: "Colección de alta costura",
    description: "Descubre artistas exclusivos y sus creaciones.",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=300&q=80",
    date: "24/02/08",
    liked: false,
  },
  {
    id: 7,
    title: "Tendencias de moda urbana",
    description: "Vive la moda en cada rincón de la ciudad.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=300&q=80",
    date: "24/02/08",
    liked: false,
  },
  {
    id: 8,
    title: "Exposición de moda sostenible",
    description: "Vive la moda ética y responsable.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=300&q=80",
    date: "24/02/08",
    liked: false,
  },
  {
    id: 9,
    title: "Festival de moda alternativa",
    description: "Celebra la diversidad en la moda contemporánea.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80",
    date: "24/02/08",
    liked: false,
  },
  {
    id: 10,
    title: "Pasarela de moda nocturna",
    description: "Noche para todos los amantes de la moda.",
    image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=300&q=80",
    date: "24/02/08",
    liked: false,
  },
  {
    id: 11,
    title: "Muestra de moda vintage",
    description: "Revive el estilo de épocas pasadas.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=300&q=80",
    date: "24/02/08",
    liked: false,
  },
  {
    id: 12,
    title: "Concurso de diseñadores emergentes",
    description: "Descubre nuevos talentos en la moda.",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=300&q=80",
    date: "24/02/08",
    liked: false,
  },
  {
    id: 13,
    title: "Exhibición de moda digital",
    description: "La moda del futuro en un solo lugar.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=300&q=80",
    date: "24/02/08",
    liked: false,
  },
  {
    id: 14,
    title: "Taller de moda sostenible",
    description: "Aprende a crear moda responsable.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=300&q=80",
    date: "24/02/08",
    liked: false,
  },
  {
    id: 15,
    title: "Exposición de moda contemporánea",
    description: "Explora la moda de hoy.",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=300&q=80",
    date: "24/02/08",
    liked: false,
  },
  {
    id: 16,
    title: "Desfile de moda de lujo",
    description: "Disfruta del glamour y la elegancia.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=300&q=80",
    date: "24/02/08",
    liked: false,
  },
]

type FeaturedEvent = typeof events[number];
type AdditionalEvent = typeof additionalEvents[number];
type AnyEvent = FeaturedEvent | AdditionalEvent;

export default function EventsSection() {
  const featuredEvent = events.find((event) => event.featured)
  const sidebarEvents = events.filter((event) => !event.featured)
  const [selectedEvent, setSelectedEvent] = useState<AnyEvent | null>(null)

  if (selectedEvent) {
    return (
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <button
          className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 border border-gray-200"
          onClick={() => setSelectedEvent(null)}
        >
          ← Volver a eventos
        </button>
        <EventDetail />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Eventos más destacado</h2>

        {/* Filter and Search Controls */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-full">
            <Filter className="w-4 h-4" />
            Filtrar
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar evento"
              className="pl-8 pr-4 py-1.5 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors w-40"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Event */}
        {featuredEvent && (
          <div className="lg:col-span-2">
            <article className="group cursor-pointer" onClick={() => setSelectedEvent(featuredEvent)}>
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={featuredEvent.image || "/placeholder.svg"}
                  alt={featuredEvent.title}
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {featuredEvent.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{featuredEvent.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredEvent.publishedDate}</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* Sidebar Events */}
        <div className="space-y-6">
          {sidebarEvents.map((event) => (
            <article key={event.id} className="group cursor-pointer" onClick={() => setSelectedEvent(event)}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {event.title}
                  </h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{event.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{event.publishedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Events Grid Section - EXACTO COMO LA IMAGEN */}
      <div className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer relative"
              onClick={() => setSelectedEvent(event)}
            >
              {/* Heart icon en la esquina superior derecha */}
              <button className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full p-1 shadow-sm">
                <Heart className="w-4 h-4" />
              </button>

              <div className="flex h-56">
                {/* Contenido de texto a la izquierda (60% del ancho) */}
                <div className="w-3/5 p-6 bg-gray-50 flex flex-col justify-start space-y-4">
                  <div className="space-y-4">
                    <p className="text-xs text-gray-500">Fecha: {event.date}</p>
                    <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors text-sm leading-tight">
                      {event.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3">{event.description}</p>
                  </div>

                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-xs font-medium transition-colors self-start mt-auto">
                    Conocer más
                  </button>
                </div>

                {/* Imagen rectangular vertical a la derecha (40% del ancho) */}
                <div className="w-2/5 relative overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
            Cargar más
          </button>
        </div>
      </div>
    </div>
  )
}
