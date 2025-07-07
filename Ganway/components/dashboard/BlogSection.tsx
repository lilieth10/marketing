"use client"

import { Clock, Calendar } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Tendencias de moda para esta temporada: lo que debes saber",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80",
    readTime: "5 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: true,
  },
  {
    id: 2,
    title: "Cómo combinar colores: una guía para principiantes",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=200&q=80",
    readTime: "5 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: false,
  },
  {
    id: 3,
    title: "Los mejores consejos para decorar tu hogar con estilo",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=200&q=80",
    readTime: "5 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: false,
  },
  {
    id: 4,
    title: "Arte contemporáneo: lo que está en auge este año",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=200&q=80",
    readTime: "5 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: false,
  },
]

const additionalPosts = [
  {
    id: 5,
    title: "Estilo minimalista: menos es más en la decoración",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80",
    readTime: "3 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: false,
  },
  {
    id: 6,
    title: "Las mejores tendencias de maquillaje para el 2023",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80",
    readTime: "5 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: false,
  },
  {
    id: 7,
    title: "Cómo elegir el perfume perfecto para cada ocasión",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400&q=80",
    readTime: "4 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: false,
  },
  {
    id: 8,
    title: "Consejos para un estilo de vida sostenible y chic",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80",
    readTime: "6 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: false,
  },
  {
    id: 9,
    title: "Los mejores destinos de viaje para amantes del arte",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80",
    readTime: "4 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: false,
  },
  {
    id: 10,
    title: "Cómo crear un armario cápsula: guía paso a paso",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=400&q=80",
    readTime: "5 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: false,
  },
  {
    id: 11,
    title: "Tendencias en joyería: lo que debes tener en cuenta",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80",
    readTime: "5 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: false,
  },
  {
    id: 12,
    title: "Cómo organizar tu espacio de trabajo con estilo",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=400&q=80",
    readTime: "5 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: false,
  },
  {
    id: 13,
    title: "Los secretos de la fotografía de moda: tips y trucos",
    image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=400&q=80",
    readTime: "6 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: false,
  },
  {
    id: 14,
    title: "Estilos de vida saludables: cómo empezar hoy mismo",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80",
    readTime: "5 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: false,
  },
  {
    id: 15,
    title: "Las mejores aplicaciones para seguir tendencias de moda",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80",
    readTime: "3 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: false,
  },
  {
    id: 16,
    title: "Cómo hacer un brunch perfecto: recetas y consejos",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80",
    readTime: "4 minutos de lectura",
    publishedDate: "Hace 3 meses",
    featured: false,
  },
]

export default function BlogSection() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const sidebarPosts = blogPosts.filter((post) => !post.featured).slice(0, 3)
  const gridPosts = [...blogPosts.filter((post) => !post.featured).slice(3), ...additionalPosts]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Section Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Lo más leído</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Article */}
        {featuredPost && (
          <div className="lg:col-span-2">
            <article className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {featuredPost.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.publishedDate}</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* Sidebar Articles */}
        <div className="space-y-6">
          {sidebarPosts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{post.publishedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Blog Grid Section */}
      <div className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridPosts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.publishedDate}</span>
                  </div>
                </div>
              </div>
            </article>
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
