"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Settings, Share2, MessageCircle, Plus, Heart, Trash2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { usePostStore } from "@/store/postStore" // Import usePostStore
import { useAuth } from "@/hooks/useAuth" // Import useAuth to get current user
import { NewPublicationModal } from "./new-publication-modal" // Import the new modal
import { useCartStore } from "@/store/cartStore" // Import useCartStore
import Swal from "sweetalert2" // Import SweetAlert2
import type { Post } from "@/store/postStore"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { AIRecommendations } from "./ai-recommendations"
import { AIProductAnalysis } from "./ai-product-analysis"
import { Sparkles } from "lucide-react"

export function UserProfile() {
  const { user } = useAuth() // Get current logged-in user
  const { posts, toggleLike, deletePost } = usePostStore() // Get posts and actions from store
  const { items: cartItems, purchases } = useCartStore() // Get cart items and purchases for 'Mis compras'
  const [activeTab, setActiveTab] = useState("creations")
  const [isNewPublicationModalOpen, setIsNewPublicationModalOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const [mockAvatar, setMockAvatar] = useState<string | undefined>()
  const [mockCover, setMockCover] = useState<string | undefined>()
  const [isConfigOpen, setIsConfigOpen] = useState(false)
  const [configTab, setConfigTab] = useState("datos")
  const [profileConfig, setProfileConfig] = useState<any>(null)

  // Filter posts by the current logged-in user
  const userCreations = posts.filter((post) => post.userId === user?.id)
  const savedPosts = posts.filter((post) => post.isSaved) // Filter saved posts

  // Mock user data (can be replaced with actual user data from auth store if needed)
  const profileUser = {
    id: user?.id || "mock-user-id",
    name: profileConfig?.datos?.nombre || user?.name || "Alexia Rawles",
    username: profileConfig?.datos?.usuario || user?.email?.split("@")[0] || "@AlexiaRawles",
    avatar: user?.avatar || "/placeholder.svg?height=120&width=120",
    bio: profileConfig?.datos?.bio || "Apasionada por la moda y el arte, siempre busco la forma de expresar mi creatividad a través de mis diseños. Comparto mi viaje y mis looks diarios.",
    website: profileConfig?.datos?.website || "www.alexiarawles.com",
    followers: "1.2M",
    following: "150",
    postsCount: userCreations.length.toString(), // Dynamic post count
  }

  // Al inicio del componente UserProfile
  useEffect(() => {
    // Cargar avatar y portada desde localStorage si existen
    const savedAvatar = localStorage.getItem(`avatar_${user?.id}`)
    const savedCover = localStorage.getItem(`cover_${user?.id}`)
    if (savedAvatar) setMockAvatar(savedAvatar)
    if (savedCover) setMockCover(savedCover)
    // Cargar datos de perfil desde configuración
    const profileData = localStorage.getItem("user_profile_data")
    if (profileData) {
      try {
        const parsed = JSON.parse(profileData)
        setProfileConfig(parsed)
      } catch {}
    }
  }, [user?.id])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setMockAvatar(reader.result as string)
        if (user?.id) localStorage.setItem(`avatar_${user.id}`, reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setMockCover(reader.result as string)
        if (user?.id) localStorage.setItem(`cover_${user.id}`, reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const renderPostGrid = (postsToRender: typeof posts) => {
    if (postsToRender.length === 0) {
      return (
        <div className="text-center text-gray-600 py-10 col-span-full">No tienes publicaciones aún. ¡Crea una!</div>
      )
    }
    return (
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {postsToRender.map((post) => (
          <div key={post.id} className="break-inside-avoid mb-4">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
              {/* Image */}
              <div className="relative group cursor-pointer">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={300}
                  height={post.height}
                  className="w-full h-auto object-cover"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                    Ver Publicación
                  </Button>
                </div>
                {/* Delete Button (only for owner) */}
                {user?.id === post.userId && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70"
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      Swal.fire({
                        title: "¿Estás seguro?",
                        text: "¿Quieres eliminar esta publicación?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#8B5CF6",
                        cancelButtonColor: "#EF4444",
                        confirmButtonText: "Sí, eliminar",
                        cancelButtonText: "Cancelar",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deletePost(post.id, user.id)
                          Swal.fire("Eliminado!", "Tu publicación ha sido eliminada.", "success")
                        }
                      })
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleMockLike(post.id)
                    }}
                    className={`flex items-center space-x-1 transition-colors ${post.isLiked ? "text-red-500" : "text-gray-600"}`}
                  >
                    <Heart className={`w-3 h-3 ${post.isLiked ? "fill-current" : ""}`} />
                    <span>{post.likes}</span>
                  </button>
                  <MessageCircle className="w-3 h-3" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Definir avatar y cover a mostrar
  const avatarToShow = mockAvatar || user?.avatar || "/placeholder-user.jpg"
  const coverToShow = mockCover || user?.cover || "/images/dashboard/beige-elegant-blazer.jpg"

  // Mock user para Post (cumpliendo el tipo Post['user'])
  const postUser: Post["user"] = {
    name: profileUser.name,
    username: profileUser.username,
    avatar: avatarToShow,
  }

  // Corrección de mocks para cumplir el tipo Post
  const mockPosts: Post[] = [
    {
      id: "mock1",
      image: "/images/dashboard/blue-denim-urban.jpg",
      title: "Denim Urbano",
      user: postUser,
      likes: 0,
      comments: 0,
      height: 400,
      category: "Denim",
      isLiked: false,
      isSaved: false,
      type: "photo",
      userId: profileUser.id,
      description: "Look denim urbano para todos los días.",
    },
    {
      id: "mock2",
      image: "/images/dashboard/black-grunge-style.jpg",
      title: "Chaqueta Grunge Negra",
      user: postUser,
      likes: 0,
      comments: 0,
      height: 400,
      category: "Grunge",
      isLiked: false,
      isSaved: false,
      type: "photo",
      userId: profileUser.id,
      description: "Chaqueta negra con estilo grunge.",
    },
    {
      id: "mock3",
      image: "/images/dashboard/woman-black-coat-hat.jpg",
      title: "Abrigo negro y sombrero",
      user: postUser,
      likes: 0,
      comments: 0,
      height: 400,
      category: "Moda",
      isLiked: false,
      isSaved: false,
      type: "photo",
      userId: profileUser.id,
      description: "Abrigo negro elegante con sombrero.",
    },
    {
      id: "mock4",
      image: "/images/dashboard/yellow-gingham-skirt-white-top.jpg",
      title: "Falda cuadros amarilla",
      user: postUser,
      likes: 0,
      comments: 0,
      height: 400,
      category: "Retro",
      isLiked: false,
      isSaved: false,
      type: "photo",
      userId: profileUser.id,
      description: "Falda retro amarilla con top blanco.",
    },
    {
      id: "mock5",
      image: "/images/dashboard/woman-white-top-black-skirt-urban.jpg",
      title: "Top blanco y falda negra",
      user: postUser,
      likes: 0,
      comments: 0,
      height: 400,
      category: "Urbano",
      isLiked: false,
      isSaved: false,
      type: "photo",
      userId: profileUser.id,
      description: "Look urbano con top blanco y falda negra.",
    },
    {
      id: "mock6",
      image: "/images/dashboard/striped-retro-pants.jpg",
      title: "Pantalón retro a rayas",
      user: postUser,
      likes: 0,
      comments: 0,
      height: 400,
      category: "Retro",
      isLiked: false,
      isSaved: false,
      type: "photo",
      userId: profileUser.id,
      description: "Pantalón a rayas estilo retro.",
    },
    {
      id: "mock7",
      image: "/images/dashboard/beige-casual-chic.jpg",
      title: "Beige Casual Chic",
      user: postUser,
      likes: 0,
      comments: 0,
      height: 400,
      category: "Chic",
      isLiked: false,
      isSaved: false,
      type: "photo",
      userId: profileUser.id,
      description: "Estilo casual chic en beige.",
    },
  ]
  const userPosts: Post[] = userCreations.length > 0 ? userCreations : mockPosts

  // Mejorar el botón de me gusta para que funcione y cambie de color
  const handleMockLike = (id: string) => {
    if (!userCreations.length) {
      const idx = mockPosts.findIndex((p) => p.id === id)
      if (idx !== -1) {
        mockPosts[idx].isLiked = !mockPosts[idx].isLiked
        mockPosts[idx].likes += mockPosts[idx].isLiked ? 1 : -1
      }
    } else {
      toggleLike(id)
    }
  }

  if (!user) return <div className="text-center py-20 text-gray-500">Cargando perfil...</div>

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Portada de fondo y foto de perfil superpuesta y centrada */}
            <div className="relative w-full mb-0">
              {/* Portada */}
              <div className="w-full h-48 md:h-56 rounded-t-2xl overflow-hidden bg-gray-100 group">
                <Image
                  src={coverToShow}
                  alt="Portada"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Botón para cambiar portada (solo visible al hacer hover) */}
                <button
                  className="absolute top-4 right-4 z-20 bg-white bg-opacity-80 rounded-full px-3 py-1 text-xs font-medium shadow hover:bg-opacity-100 opacity-0 group-hover:opacity-100 transition"
                  onClick={() => coverInputRef.current?.click()}
                  title="Cambiar portada"
                >
                  Cambiar portada
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={coverInputRef}
                  className="hidden"
                  onChange={handleCoverChange}
                />
              </div>
              {/* Foto de perfil superpuesta */}
              <div className="absolute left-1/2 top-40 md:top-44 transform -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white group">
                  <Image
                    src={avatarToShow}
                    alt={profileUser.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Botón para cambiar avatar (solo visible al hacer hover) */}
                  <button
                    className="absolute right-2 bottom-2 bg-white bg-opacity-80 rounded-full px-2 py-1 text-xs font-medium shadow hover:bg-opacity-100 opacity-0 group-hover:opacity-100 transition"
                    onClick={() => fileInputRef.current?.click()}
                    title="Cambiar foto de perfil"
                  >
                    Cambiar foto
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>
            </div>
            {/* Info alineada a la izquierda y contadores */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between px-2">
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{profileUser.name}</h1>
                <p className="text-gray-600 text-lg mb-1">{profileUser.username}</p>
                <p className="text-gray-700 leading-relaxed mb-2 max-w-xl">{profileUser.bio}</p>
                <a
                  href={`https://${profileUser.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline text-sm font-medium"
                >
                  {profileUser.website}
                </a>
                <div className="flex space-x-8 mt-4">
                  <div>
                    <p className="text-xl font-bold text-gray-900">{profileUser.postsCount}</p>
                    <p className="text-sm text-gray-600">Publicaciones</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">{profileUser.followers}</p>
                    <p className="text-sm text-gray-600">Seguidores</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">{profileUser.following}</p>
                    <p className="text-sm text-gray-600">Siguiendo</p>
                  </div>
                </div>
              </div>
              {/* Botones a la derecha */}
              <div className="flex flex-col items-end space-y-3 mt-6 md:mt-0">
                <div className="flex space-x-3">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center">
                    <Plus className="w-4 h-4 mr-2" /> Seguir
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4 py-2 rounded-full text-sm font-medium flex items-center bg-transparent"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" /> Mensaje
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full bg-transparent hover:bg-purple-100 active:bg-purple-200 transition" onClick={() => setIsConfigOpen(true)}>
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Content */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "creations"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("creations")}
          >
            Creaciones
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "favorites"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            Favoritos
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "my-purchases"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("my-purchases")}
          >
            Mis compras
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "videos"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("videos")}
          >
            Videos
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "articles"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("articles")}
          >
            Artículos
          </button>
        </div>

        {/* Botón Nueva publicación alineado derecha */}
        <div className="flex justify-end mb-6 mt-4">
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center"
            onClick={() => setIsNewPublicationModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> Nueva publicación
          </Button>
        </div>

        {/* Content Grid based on activeTab */}
        {activeTab === "creations" && renderPostGrid(userPosts)}
        {activeTab === "favorites" && renderPostGrid(savedPosts)}
        {activeTab === "my-purchases" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mis Compras Recientes</h3>
            {purchases.length === 0 ? (
              <div className="text-center text-gray-600 py-10">Aún no has realizado ninguna compra.</div>
            ) : (
              <div className="space-y-4">
                {purchases.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        Cantidad: {item.quantity} | Talla: {item.size}
                      </p>
                      <p className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver detalles
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === "videos" && (
          <div className="text-center py-10 text-gray-600">Contenido de videos estará disponible pronto.</div>
        )}
        {activeTab === "articles" && (
          <div className="text-center py-10 text-gray-600">Contenido de artículos estará disponible pronto.</div>
        )}
      </main>

      <NewPublicationModal isOpen={isNewPublicationModalOpen} onClose={() => setIsNewPublicationModalOpen(false)} />

      <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
        <DialogContent className="max-w-lg w-full z-[9999]">
          <DialogTitle>Configuración de perfil</DialogTitle>
          <Tabs value={configTab} onValueChange={setConfigTab} className="w-full mt-4">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="datos">Datos básicos</TabsTrigger>
              <TabsTrigger value="intereses">Intereses/Estilos</TabsTrigger>
              <TabsTrigger value="privacidad">Privacidad</TabsTrigger>
            </TabsList>
            <TabsContent value="datos">
              <div className="space-y-3">
                <label className="block text-sm font-medium">Nombre</label>
                <Input defaultValue={user?.name} />
                <label className="block text-sm font-medium">Usuario</label>
                <Input defaultValue={user?.email?.split("@")[0]} />
                <label className="block text-sm font-medium">Bio</label>
                <Input defaultValue={user?.bio || ""} />
                <label className="block text-sm font-medium">Sitio web</label>
                <Input defaultValue={user?.website || ""} />
              </div>
            </TabsContent>
            <TabsContent value="intereses">
              <div className="space-y-3">
                <label className="block text-sm font-medium">Intereses</label>
                <Input placeholder="Ej: Moda, Arte, Diseño..." />
                <label className="block text-sm font-medium">Estilos favoritos</label>
                <Input placeholder="Ej: Urbano, Retro, Minimalista..." />
              </div>
            </TabsContent>
            <TabsContent value="privacidad">
              <div className="space-y-3">
                <label className="block text-sm font-medium">Privacidad de perfil</label>
                <select className="w-full border rounded p-2">
                  <option>Público</option>
                  <option>Privado</option>
                </select>
                <label className="block text-sm font-medium">Seguridad</label>
                <Input type="password" placeholder="Cambiar contraseña" />
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex justify-end mt-6">
            <Button className="bg-purple-600 text-white">Guardar cambios</Button>
          </div>
        </DialogContent>
        {/* Fallback si el modal no se muestra */}
        {!isConfigOpen ? null : (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full">
              <h2 className="text-xl font-bold mb-4">Configuración de perfil (fallback)</h2>
              <p>Si ves esto, el modal principal no se está mostrando por un problema de estilos o provider.</p>
              <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded" onClick={() => setIsConfigOpen(false)}>Cerrar</button>
            </div>
          </div>
        )}
      </Dialog>

      <section className="max-w-5xl mx-auto mt-12 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-purple-600 rounded-full mr-3">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Recomendado para Ti</h2>
          </div>
          <p className="text-gray-600 mb-6">Descubre tendencias, estilos y productos personalizados especialmente para ti, basados en tu historial y preferencias de moda.</p>
          <AIRecommendations />
        </div>
      </section>
    </div>
  )
}
