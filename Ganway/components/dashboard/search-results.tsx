"use client"
import { useState, useEffect } from "react"
import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageCircle, Share2, Bookmark, Filter, Grid, List } from "lucide-react"
import { usePostStore } from "@/store/postStore"
import Swal from "sweetalert2"

export function SearchResults() {
  const { posts, toggleLike, toggleSave } = usePostStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState(posts)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    if (searchQuery.trim()) {
      const filteredResults = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setResults(filteredResults)
    } else {
      setResults(posts)
    }
  }, [searchQuery, posts])

  const handleLike = (postId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleLike(postId)
  }

  const handleSave = (postId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleSave(postId)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    Swal.fire({
      icon: "success",
      title: "¡Enlace copiado!",
      text: "El enlace ha sido copiado al portapapeles.",
      confirmButtonColor: "#8B5CF6",
      timer: 2000,
      showConfirmButton: false,
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="space-y-6">
        {/* Search Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Resultados de búsqueda</h2>
            <p className="text-gray-600">
              {results.length} resultado{results.length !== 1 ? "s" : ""}
              {searchQuery && ` para "${searchQuery}"`}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        {/* Search Input */}
        <div className="max-w-2xl">
          <input
            type="text"
            placeholder="Buscar inspiración, tendencias, productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron resultados{searchQuery && ` para "${searchQuery}"`}</p>
            <p className="text-sm text-gray-400 mt-2">Intenta con otros términos de búsqueda o revisa la ortografía</p>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
          >
            {results.map((post) => (
              <Link href={`/dashboard/client/content/${post.id}`} key={post.id} className="block">
                <Card
                  className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 h-32" : "h-64 w-full"}`}>
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/80 hover:bg-white rounded-full"
                        onClick={(e) => handleSave(post.id, e)}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${post.isSaved ? "text-purple-600 fill-current" : "text-gray-600"}`}
                        />
                      </Button>
                    </div>
                  </div>
                  <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <Image
                        src={post.user.avatar || "/placeholder.svg"}
                        alt={post.user.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{post.user.name}</p>
                        <p className="text-xs text-gray-500">{post.user.username}</p>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 hover:text-red-500 p-0"
                          onClick={(e) => handleLike(post.id, e)}
                        >
                          <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? "text-red-500 fill-current" : ""}`} />
                          <span className="text-xs">{post.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-500 p-0">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          <span className="text-xs">{post.comments}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600 hover:text-green-500 p-0"
                          onClick={handleShare}
                        >
                          <Share2 className="w-4 h-4 mr-1" />
                          <span className="text-xs">Compartir</span>
                        </Button>
                      </div>
                      {post.category && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
