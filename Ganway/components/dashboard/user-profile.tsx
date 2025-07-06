"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Settings, Share2, MessageCircle, Plus, Heart, Trash2 } from "lucide-react"
import { useState } from "react"
import { usePostStore } from "@/store/postStore" // Import usePostStore
import { useAuth } from "@/hooks/useAuth" // Import useAuth to get current user
import { NewPublicationModal } from "./new-publication-modal" // Import the new modal
import { useCartStore } from "@/store/cartStore" // Import useCartStore
import Swal from "sweetalert2" // Import SweetAlert2

export function UserProfile() {
  const { user } = useAuth() // Get current logged-in user
  const { posts, toggleLike, deletePost } = usePostStore() // Get posts and actions from store
  const { items: cartItems } = useCartStore() // Get cart items for "Mis compras"
  const [activeTab, setActiveTab] = useState("creations")
  const [isNewPublicationModalOpen, setIsNewPublicationModalOpen] = useState(false)

  // Filter posts by the current logged-in user
  const userCreations = posts.filter((post) => post.userId === user?.id)
  const savedPosts = posts.filter((post) => post.isSaved) // Filter saved posts

  // Mock user data (can be replaced with actual user data from auth store if needed)
  const profileUser = {
    id: user?.id || "mock-user-id",
    name: user?.name || "Alexia Rawles",
    username: user?.email.split("@")[0] || "@AlexiaRawles",
    avatar: user?.avatar || "/placeholder.svg?height=120&width=120",
    bio: "Apasionada por la moda y el arte, siempre busco la forma de expresar mi creatividad a través de mis diseños. Comparto mi viaje y mis looks diarios.",
    website: "www.alexiarawles.com",
    followers: "1.2M",
    following: "150",
    postsCount: userCreations.length.toString(), // Dynamic post count
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
                      toggleLike(post.id)
                    }}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`w-3 h-3 ${post.isLiked ? "text-red-500 fill-current" : ""}`} />
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

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-600 shadow-md">
              <Image
                src={profileUser.avatar || "/placeholder.svg"}
                alt={profileUser.name}
                fill
                className="object-cover"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{profileUser.name}</h1>
              <p className="text-gray-600 text-lg mb-3">{profileUser.username}</p>
              <p className="text-gray-700 leading-relaxed mb-4 max-w-xl mx-auto md:mx-0">{profileUser.bio}</p>
              <a
                href={`https://${profileUser.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline text-sm font-medium"
              >
                {profileUser.website}
              </a>
            </div>

            {/* Stats and Actions */}
            <div className="flex flex-col items-center md:items-end space-y-4">
              <div className="flex space-x-8 text-center">
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
                <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                  <Settings className="w-4 h-4" />
                </Button>
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

        {/* New Publication Button */}
        <div className="flex justify-end mb-6">
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center"
            onClick={() => setIsNewPublicationModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> Nueva publicación
          </Button>
        </div>

        {/* Content Grid based on activeTab */}
        {activeTab === "creations" && renderPostGrid(userCreations)}
        {activeTab === "favorites" && renderPostGrid(savedPosts)}
        {activeTab === "my-purchases" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mis Compras Recientes</h3>
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-600 py-10">Aún no has realizado ninguna compra.</div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
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
    </div>
  )
}
