"use client"

import { useState, ChangeEvent, useRef } from "react"
import { useAuthStore } from "@/store/authStore"
import FashionCommunity from "./FashionCommunity"

const communities = [
  {
    name: "Cultura Creativa",
    members: 1800,
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    joined: false,
    lastActive: "12m",
    description: "Creatividad y arte para todos",
  },
  {
    name: "Estilo de Vida Moderno",
    members: 1900,
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    joined: true,
    lastActive: "24m",
    description: "Tendencias y bienestar",
  },
  {
    name: "Arte Urbano",
    members: 1700,
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    joined: false,
    lastActive: "1h",
    description: "Expresiones urbanas",
  },
  {
    name: "Tendencias de Moda",
    members: 2100,
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    joined: false,
    lastActive: "1h",
    description: "Lo último en moda",
  },
  {
    name: "Comunidad Creativa",
    members: 1600,
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    joined: false,
    lastActive: "2h",
    description: "Innovación y diseño",
  },
  {
    name: "Comunidad de Estilo",
    members: 1500,
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    joined: false,
    lastActive: "3h",
    description: "Estilo y elegancia",
  },
]

// Utilidad para generar IDs mock
const uuid = () => Math.random().toString(36).substring(2, 10)

type PostComment = {
  user: { name: string; avatar: string; description: string }
  time: string
  text: string
}

type PostType = {
  id: string
  user: { name: string; avatar: string; description: string }
  time: string
  content: string
  hashtags: string[]
  image: string
  comments: PostComment[]
}

const initialPosts: PostType[] = [
  {
    id: uuid(),
    user: {
      name: "Juan Pérez",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      description: "Fashion Blogger",
    },
    time: "hace 2 horas",
    content:
      "¡Descubre las últimas tendencias de moda! No te pierdas nuestras novedades y consejos para lucir espectacular.",
    hashtags: ["#Fashion", "#Estilo", "#Comunidad"],
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=600&q=80",
    comments: [
      {
        user: {
          name: "Sofia Martínez",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          description: "Diseñadora",
        },
        time: "hace 1 hora",
        text: "¡Me encanta ese look! La combinación de colores es perfecta para esta temporada.",
      },
      {
        user: {
          name: "Carlos Gómez",
          avatar: "https://randomuser.me/api/portraits/men/45.jpg",
          description: "Estilista",
        },
        time: "hace 1 hora",
        text: "Ese outfit es increíble, definitivamente lo necesito en mi armario!",
      },
      {
        user: { name: "Ana López", avatar: "https://randomuser.me/api/portraits/women/46.jpg", description: "Modelo" },
        time: "hace 1 hora",
        text: "¡Este look está ideal! Perfecto para una salida nocturna.",
      },
    ],
  },
  {
    id: uuid(),
    user: {
      name: "Ana Sainz",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      description: "Coolhunter",
    },
    time: "hace 3 horas",
    content: "Descubre las últimas tendencias en moda! No te pierdas lo que está de moda esta temporada.",
    hashtags: ["#Moda", "#Estilo", "#Tendencias", "#Fashion", "#Inspo"],
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
    comments: [
      {
        user: {
          name: "Javier Ruiz",
          avatar: "https://randomuser.me/api/portraits/men/46.jpg",
          description: "Fashionista",
        },
        time: "hace 2 horas",
        text: "Me encanta cómo lo llevas, ¡un verdadero statement!",
      },
      {
        user: {
          name: "Sofia Martínez",
          avatar: "https://randomuser.me/api/portraits/women/47.jpg",
          description: "Diseñadora",
        },
        time: "hace 2 horas",
        text: "¡Me encanta cómo combinaste esos colores! Definitivamente, el estilo vintage está de vuelta.",
      },
      {
        user: {
          name: "Carlos Gómez",
          avatar: "https://randomuser.me/api/portraits/men/47.jpg",
          description: "Estilista",
        },
        time: "hace 2 horas",
        text: "Ese outfit es perfecto para la temporada. ¡Los accesorios son clave!",
      },
    ],
  },
]

const SIDEBAR_WIDTH = 360; // Sidebar más ancha

const CommunityFeed = () => {
  const { user } = useAuthStore()
  const [posts, setPosts] = useState<PostType[]>(initialPosts)
  const [newPost, setNewPost] = useState("")
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({})
  const [likes, setLikes] = useState<Record<string, boolean>>({})
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [imageFile, setImageFile] = useState<string | null>(null)
  const [postType, setPostType] = useState<"foto" | "video" | "evento" | "articulo">("foto")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null)

  // Manejar selección de imagen
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setImageFile(ev.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Extraer hashtags del texto
  const extractHashtags = (text: string) => {
    return text.match(/#[\wáéíóúÁÉÍÓÚñÑ]+/g) || []
  }

  // Publicar un nuevo post
  const handlePublish = () => {
    if (!user || !newPost.trim()) return
    const hashtags = extractHashtags(newPost)
    const post: PostType = {
      id: uuid(),
      user: {
        name: user.name,
        avatar: user.avatar || "/placeholder.svg",
        description: user.role === "admin" ? "Administrador" : user.role === "designer" ? "Diseñador" : "Cliente",
      },
      time: "ahora",
      content: newPost,
      hashtags,
      image: postType === "foto" && imageFile ? imageFile : "",
      comments: [],
    }
    setPosts([post, ...posts])
    setNewPost("")
    setImageFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // Comentar en un post
  const handleComment = (postId: string) => {
    if (!user || !commentInputs[postId]?.trim()) return
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: [
              ...post.comments,
              {
                user: {
                  name: user.name,
                  avatar: user.avatar || "/placeholder.svg",
                  description: user.role === "admin" ? "Administrador" : user.role === "designer" ? "Diseñador" : "Cliente",
                },
                time: "ahora",
                text: commentInputs[postId],
              },
            ],
          }
        : post
    ))
    setCommentInputs({ ...commentInputs, [postId]: "" })
  }

  // Like a un post
  const handleLike = (postId: string) => {
    setLikes((prev) => ({ ...prev, [postId]: !prev[postId] }))
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay para móvil */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar de Comunidades */}
      <div
        className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30
          bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          lg:transform-none overflow-y-auto lg:shadow-none shadow-lg
        `}
        style={{ width: SIDEBAR_WIDTH }}
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-bold">Comunidades</h2>
          <button className="text-gray-600 hover:text-purple-600 lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button className="text-gray-600 hover:text-purple-600 hidden lg:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
        {/* Barra de búsqueda */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Buscar comunidad"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-gray-50 text-sm focus:outline-none focus:border-purple-500"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
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
        {/* Lista de Comunidades */}
        <div className="space-y-2">
          {communities.map((c, idx) => (
            <div
              key={c.name}
              className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-100"
              onClick={() => setSelectedCommunity(c.name)}
            >
              <img src={c.avatar || "/placeholder.svg"} alt={c.name} className="w-14 h-14 rounded-full object-cover mt-1" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate text-base">{c.name}</p>
                <p className="text-xs text-gray-500 truncate">{c.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">{c.members} miembros</span>
                  <span className="text-xs text-gray-400">• {c.lastActive}</span>
                </div>
                <div className="mt-2">
                  {c.joined ? (
                    <button className="w-full px-2 py-1 text-xs rounded border font-medium border-purple-600 text-purple-700 bg-purple-100 hover:bg-purple-200 transition-colors">
                      Salir del grupo
                    </button>
                  ) : (
                    <button className="w-full px-2 py-1 text-xs rounded border font-medium border-purple-600 text-purple-700 bg-white hover:bg-purple-100 transition-colors">
                      Unirse al grupo
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header móvil */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between w-full">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600 hover:text-purple-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Feed</h1>
          <div className="w-6 h-6"></div>
        </div>

        {/* Renderizado condicional: si hay comunidad seleccionada, mostrar FashionCommunity, si no, el feed general */}
        {selectedCommunity ? (
          <div className="w-full px-4 py-4 sm:py-6 lg:py-8">
            {/* Botón para volver */}
            <button
              className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 border border-gray-200"
              onClick={() => setSelectedCommunity(null)}
            >
              ← Volver al feed
            </button>
            <div className="w-full">
              <FashionCommunity />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-screen w-full px-4 py-4 sm:py-6 lg:py-8 lg:ml-36">
            {/* Crear nuevo post */}
            <aside className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
              <div className="flex flex-col gap-2 p-4 pb-2">
                <div className="flex items-start">
                  <img
                    className="h-10 w-10 rounded-full object-cover mt-1 flex-shrink-0"
                    src={user?.avatar || "/placeholder.svg"}
                    alt="Avatar"
                  />
                  <div className="flex-1 ml-3">
                    <textarea
                      className="bg-transparent text-gray-700 font-medium text-base w-full resize-none focus:outline-none placeholder-gray-400"
                      rows={2}
                      placeholder="Escribe un post"
                      value={newPost}
                      onChange={e => setNewPost(e.target.value)}
                    />
                    {/* Vista previa de imagen si es tipo foto */}
                    {postType === "foto" && imageFile && (
                      <img src={imageFile} alt="preview" className="h-20 w-20 object-cover rounded-lg border mt-2" />
                    )}
                  </div>
                </div>
                {/* Botones de tipo de post */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <button
                    type="button"
                    className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${postType === "foto" ? "bg-purple-100 text-purple-700 border-purple-400" : "bg-purple-50 text-purple-600 border-transparent"}`}
                    onClick={() => {
                      setPostType("foto");
                      fileInputRef.current?.click();
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Foto
                  </button>
                  <button
                    type="button"
                    className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${postType === "video" ? "bg-purple-100 text-purple-700 border-purple-400" : "bg-purple-50 text-purple-600 border-transparent"}`}
                    onClick={() => {
                      setPostType("video");
                      fileInputRef.current?.click();
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Video
                  </button>
                  <button
                    type="button"
                    className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${postType === "evento" ? "bg-purple-100 text-purple-700 border-purple-400" : "bg-purple-50 text-purple-600 border-transparent"}`}
                    onClick={() => setPostType("evento")}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Evento
                  </button>
                  <button
                    type="button"
                    className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${postType === "articulo" ? "bg-purple-100 text-purple-700 border-purple-400" : "bg-purple-50 text-purple-600 border-transparent"}`}
                    onClick={() => setPostType("articulo")}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Artículo
                  </button>
                  {/* Input de imagen/video oculto */}
                  <input
                    type="file"
                    accept={postType === "video" ? "video/*" : "image/*"}
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                  <div className="flex-1" />
                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm shadow-sm transition-colors"
                    onClick={handlePublish}
                    disabled={!user || !newPost.trim()}
                  >
                    Publicar
                  </button>
                </div>
              </div>
            </aside>
            {/* Lista de posts */}
            <div className="space-y-6">
              {posts.map((post, idx) => (
                <article key={post.id || idx} className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-start p-4 pb-2">
                    <img
                      className="h-10 w-10 rounded-full object-cover mt-1 flex-shrink-0"
                      src={post.user.avatar || "/placeholder.svg"}
                      alt="avatar"
                    />
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 text-sm">{post.user.name}</span>
                        {/* Badge de tipo de post */}
                        {(postType === "evento" || postType === "articulo") && idx === 0 && (
                          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${postType === "evento" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                            {postType === "evento" ? "Evento" : "Artículo"}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500">{post.user.description}</span>
                        <span className="text-xs text-gray-400">• {post.time}</span>
                      </div>
                      <p className="text-gray-700 text-base mt-1">
                        {post.content}
                      </p>
                      {post.hashtags.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-2">
                          {post.hashtags.map((tag, i) => (
                            <span key={i} className="text-purple-600 font-medium">{tag}</span>
                          ))}
                        </div>
                      )}
                      {post.image && (
                        <img
                          className="rounded-lg mt-3 w-full max-h-64 object-cover"
                          src={post.image}
                          alt="post"
                        />
                      )}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-3 text-gray-400 text-sm">
                        <button
                          className={`flex items-center gap-1 hover:text-purple-600 transition-colors ${likes[post.id] ? "text-purple-600" : ""}`}
                          onClick={() => handleLike(post.id)}
                        >
                          <svg
                            className="w-6 h-6 sm:w-7 sm:h-7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            style={{ minWidth: 24, minHeight: 24, display: 'block' }}
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke={likes[post.id] ? "#9333ea" : "currentColor"} fill={likes[post.id] ? "#9333ea" : "none"} />
                          </svg>
                          <span className="text-xs sm:text-sm">{likes[post.id] ? 11 : 10}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z" />
                          </svg>
                          <span className="text-xs sm:text-sm">{post.comments.length}</span>
                          <span className="hidden sm:inline text-xs sm:text-sm">Comentarios</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2" />
                            <path d="M12 15v-6" />
                            <path d="M9 12h6" />
                          </svg>
                          <span className="hidden sm:inline text-xs sm:text-sm">Compartir</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path d="M22 2L11 13" />
                            <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                          </svg>
                          <span className="hidden sm:inline text-xs sm:text-sm">Enviar</span>
                        </button>
                      </div>

                      {/* Comentarios */}
                      <div className="mt-4 bg-gray-50 rounded-lg p-3">
                        {post.comments.map((c, i) => (
                          <div key={i} className={`flex items-start ${i < post.comments.length - 1 ? "mb-3" : ""}`}>
                            <img
                              className="h-8 w-8 rounded-full object-cover mt-1 flex-shrink-0"
                              src={c.user.avatar || "/placeholder.svg"}
                              alt="avatar"
                            />
                            <div className="ml-2 flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                <span className="font-semibold text-gray-900 text-xs">{c.user.name}</span>
                                <span className="text-xs text-gray-400">
                                  • {c.time} • {c.user.description}
                                </span>
                              </div>
                              <p className="text-gray-700 text-sm mt-1">{c.text}</p>
                            </div>
                          </div>
                        ))}
                        {/* Input para comentar */}
                        {user && (
                          <div className="flex items-start mt-4">
                            <img
                              className="h-8 w-8 rounded-full object-cover mt-1 flex-shrink-0"
                              src={user.avatar || "/placeholder.svg"}
                              alt="avatar"
                            />
                            <div className="ml-2 flex-1 min-w-0">
                              <input
                                type="text"
                                placeholder="Agregar un comentario..."
                                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                                value={commentInputs[post.id] || ""}
                                onChange={e => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                                onKeyDown={e => {
                                  if (e.key === "Enter") handleComment(post.id)
                                }}
                              />
                            </div>
                            <button
                              className="ml-2 px-3 py-2 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-700 transition-colors"
                              onClick={() => handleComment(post.id)}
                              disabled={!commentInputs[post.id]?.trim()}
                            >
                              Comentar
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommunityFeed
