"use client"

import { useState } from "react"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const profileData = {
  name: "Guardianas de Estilo",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
  coverImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80",
  publications: "150",
  followers: "150",
  following: "150",
  category: "Consejos de moda",
  description:
    "Bienvenidos a nuestra comunidad, donde dos socias expertas en asesoría de imagen comparten sus conocimientos y servicios para ayudarte a brillar con tu estilo personal. Aquí encontrarás consejos prácticos, tendencias actuales y todo lo que necesitas para elevar tu imagen.",
  website: "www.guardianasdeestilo.com",
  verified: true,
}

const posts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=300&q=80",
    title: "Tendencias de verano",
    subtitle: "Los mejores looks",
    user: "Ana García",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=40&q=80",
    likes: 234,
    className: "row-span-3",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=300&q=80",
    title: "Vestido de noche elegante",
    subtitle: "Para ocasiones especiales",
    user: "María López",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=40&q=80",
    likes: 456,
    className: "row-span-4",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=300&q=80",
    title: "Estilo urbano moderno",
    subtitle: "Casual y elegante",
    user: "Carlos Ruiz",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80",
    likes: 189,
    className: "row-span-3",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1506629905607-d405b7a30db9?auto=format&fit=crop&w=300&q=80",
    title: "Look de día perfecto",
    subtitle: "Comodidad y estilo",
    user: "Sofia Martín",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=40&q=80",
    likes: 312,
    className: "row-span-2",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=300&q=80",
    title: "Estilo de vida minimalista",
    subtitle: "Menos es más",
    user: "Elena Vega",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=40&q=80",
    likes: 567,
    className: "row-span-5",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=300&q=80",
    title: "Moda y estilo personal",
    subtitle: "Tu propia identidad",
    user: "Laura Díaz",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=40&q=80",
    likes: 423,
    className: "row-span-3",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
    title: "Conjunto de otoño",
    subtitle: "Colores cálidos",
    user: "Patricia Sanz",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=40&q=80",
    likes: 234,
    className: "row-span-3",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=300&q=80",
    title: "Tendencias de accesorios",
    subtitle: "Detalles que marcan",
    user: "Carmen Gil",
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=40&q=80",
    likes: 345,
    className: "row-span-4",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=300&q=80",
    title: "Look casual chic",
    subtitle: "Elegancia relajada",
    user: "Andrea Moreno",
    avatar: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=40&q=80",
    likes: 189,
    className: "row-span-2",
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=300&q=80",
    title: "Estilo bohemio",
    subtitle: "Libertad y creatividad",
    user: "Natalia Ramos",
    avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=40&q=80",
    likes: 456,
    className: "row-span-4",
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80",
    title: "Moda sostenible",
    subtitle: "Consciencia y estilo",
    user: "Isabel Torres",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=40&q=80",
    likes: 678,
    className: "row-span-3",
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=300&q=80",
    title: "Tendencias primavera",
    subtitle: "Colores frescos",
    user: "Rocío Herrera",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=40&q=80",
    likes: 234,
    className: "row-span-2",
  },
]

export default function FashionCommunity() {
  const [followingProfile, setFollowingProfile] = useState(false)
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Profile Section with Cover Image */}
      <div className="relative">
        {/* Cover Image */}
        <div
          className="h-32 sm:h-48 md:h-64 bg-cover bg-center bg-gray-200"
          style={{
            backgroundImage: `url(${profileData.coverImage})`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>

        {/* Profile Content */}
        <div className="relative bg-white w-full px-2 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row lg:items-start gap-4 sm:gap-6">
            {/* Left Section - Profile Image and Info */}
            <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6 flex-1">
              {/* Profile Image */}
              <div className="relative flex-shrink-0 -mt-14 sm:-mt-16 lg:-mt-20">
                <div className="w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full border-4 border-green-400 bg-white p-1">
                  <img
                    src={profileData.avatar || "/placeholder.svg"}
                    alt={profileData.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 sm:mt-2 lg:mt-4">
                <div className="mb-2 sm:mb-4">
                  <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{profileData.name}</h1>
                  <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-600 rounded-full"></div>
                    <span className="text-purple-600 font-medium text-xs sm:text-base">{profileData.category}</span>
                  </div>
                </div>

                {/* About Section */}
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-3">Acerca de</h2>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-4 max-w-full sm:max-w-2xl">{profileData.description}</p>
                  <a href={`https://${profileData.website}`} className="text-blue-600 font-semibold hover:underline text-xs sm:text-base">
                    {profileData.website}
                  </a>
                </div>

                {/* Join Button */}
                <Button
                  onClick={() => setFollowingProfile(!followingProfile)}
                  className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 sm:px-6 py-2 rounded-md font-medium w-full sm:w-auto"
                >
                  Unirme
                </Button>
              </div>
            </div>

            {/* Right Section - Stats and Share */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-4 lg:gap-6 sm:mt-4">
              {/* Stats */}
              <div className="flex flex-row sm:flex-col gap-4 sm:gap-4 text-center">
                <div>
                  <div className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900">{profileData.publications}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Publicaciones</div>
                </div>
                <div>
                  <div className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900">{profileData.followers}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Seguidores</div>
                </div>
                <div>
                  <div className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900">{profileData.following}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Seguidos</div>
                </div>
              </div>

              {/* Share Button */}
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs with Filters */}
      <div className="bg-white border-b border-gray-200 w-full px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 sm:py-3 gap-2 sm:gap-0">
          <div className="flex items-center gap-4 sm:gap-8 w-full overflow-x-auto">
            <button className="py-2 text-xs sm:text-sm font-medium text-gray-900 border-b-2 border-gray-900 whitespace-nowrap">
              Publicaciones
            </button>
            <button className="py-2 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap">Colecciones</button>
            <button className="py-2 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap">Eventos</button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-full">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filtrar
            </button>
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Buscar producto"
                className="pl-8 pr-2 sm:pr-4 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors w-full sm:w-40"
              />
              <svg
                className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button className="flex items-center gap-1 sm:gap-2 bg-purple-600 hover:bg-purple-700 text-white px-2 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Crear publicación
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Pinterest-style Masonry Grid */}
      <div className="w-full px-2 sm:px-4 py-4 sm:py-6">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 sm:gap-4 space-y-4">
          {/* Pin 1 */}
          <div className="break-inside-avoid mb-4 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=300&q=80"
                alt="Madre e hija"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Madre e hija</h3>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=32&q=80"
                  alt="Estilo urbano"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-600">Estilo urbano.</span>
              </div>
            </div>
          </div>

          {/* Pin 2 */}
          <div className="break-inside-avoid mb-4 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=300&q=80"
                alt="Tendencias en calzado"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Tendencias en calzado.</h3>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=32&q=80"
                  alt="Estilo minimalista"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-600">Estilo minimalista.</span>
              </div>
            </div>
          </div>

          {/* Pin 3 */}
          <div className="break-inside-avoid mb-4 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=300&q=80"
                alt="Volando en el espacio"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Volando en el espacio</h3>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=32&q=80"
                  alt="La compañía espacial"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-600">La compañía espacial.</span>
              </div>
            </div>
          </div>

          {/* Pin 4 */}
          <div className="break-inside-avoid mb-4 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1506629905607-d405b7a30db9?auto=format&fit=crop&w=300&q=80"
                alt="¡Lávate los dientes, ponki"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">¡Lávate los dientes, ponki</h3>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=32&q=80"
                  alt="El usuario limpio"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-600">El usuario limpio.</span>
              </div>
            </div>
          </div>

          {/* Pin 5 */}
          <div className="break-inside-avoid mb-4 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=300&q=80"
                alt="Estilo de vida minimalista"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Estilo de vida minimalista.</h3>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=32&q=80"
                  alt="Tendencias en moda masculina"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-600">Tendencias en moda masculina.</span>
              </div>
            </div>
          </div>

          {/* Pin 6 */}
          <div className="break-inside-avoid mb-4 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=300&q=80"
                alt="Corriendo"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Corriendo</h3>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=32&q=80"
                  alt="Ropa deportiva"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-600">Ropa deportiva.</span>
              </div>
            </div>
          </div>

          {/* Pin 7 */}
          <div className="break-inside-avoid mb-4 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80"
                alt="Ilustraciones de peces"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Ilustraciones de peces</h3>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=32&q=80"
                  alt="Tendencias en moda femenina"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-600">Tendencias en moda femenina.</span>
              </div>
            </div>
          </div>

          {/* Pin 8 */}
          <div className="break-inside-avoid mb-4 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=300&q=80"
                alt="Abstracto"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Abstracto</h3>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=32&q=80"
                  alt="Estilo contemporáneo"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-600">Estilo contemporáneo.</span>
              </div>
            </div>
          </div>

          {/* Pin 9 */}
          <div className="break-inside-avoid mb-4 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=300&q=80"
                alt="Estilo de vida elegante"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Estilo de vida elegante.</h3>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=32&q=80"
                  alt="Tendencias en ropa de trabajo"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-600">Tendencias en ropa de trabajo.</span>
              </div>
            </div>
          </div>

          {/* Pin 10 */}
          <div className="break-inside-avoid mb-4 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=300&q=80"
                alt="Estrellas abstractas"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Estrellas abstractas</h3>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=32&q=80"
                  alt="Compañía Espacial"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-600">Compañía Espacial.</span>
              </div>
            </div>
          </div>

          {/* Pin 11 */}
          <div className="break-inside-avoid mb-4 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80"
                alt="Montañas"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Montañas</h3>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=32&q=80"
                  alt="Estilo bohemio"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-600">Estilo bohemio.</span>
              </div>
            </div>
          </div>

          {/* Pin 12 */}
          <div className="break-inside-avoid mb-4 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=300&q=80"
                alt="Tendencias en accesorios"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Tendencias en accesorios.</h3>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=32&q=80"
                  alt="Moda de lujo"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-600">Moda de lujo.</span>
              </div>
            </div>
          </div>

          {/* Pin 13 */}
          <div className="break-inside-avoid mb-4 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=300&q=80"
                alt="Estilo de vida saludable"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Estilo de vida saludable.</h3>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&q=80"
                  alt="Tendencias en moda de verano"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-600">Tendencias en moda de verano.</span>
              </div>
            </div>
          </div>

          {/* Pin 14 */}
          <div className="break-inside-avoid mb-4 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=300&q=80"
                alt="Birda Procesate Illustration"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Birda Procesate Illustration</h3>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=32&q=80"
                  alt="mathsfly"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-600">mathsfly.</span>
              </div>
            </div>
          </div>

          {/* Pin 15 */}
          <div className="break-inside-avoid mb-4 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=300&q=80"
                alt="Estilo vintage"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Estilo vintage.</h3>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=32&q=80"
                  alt="Ropa de calle"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-600">Ropa de calle.</span>
              </div>
            </div>
          </div>

          {/* Pin 16 */}
          <div className="break-inside-avoid mb-4 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=300&q=80"
                alt="Diseño de moda contemporánea"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Diseño de moda contemporánea.</h3>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=32&q=80"
                  alt="Tendencias de verano"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-600">Tendencias de verano.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
