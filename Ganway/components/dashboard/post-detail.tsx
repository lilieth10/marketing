"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Heart, MessageCircle, Share2, Bookmark } from "lucide-react"
import { usePostStore } from "@/store/postStore"
import type { Post } from "@/store/postStore"

interface PostDetailProps {
  post: Post
}

export function PostDetail({ post }: PostDetailProps) {
  const { toggleLike, toggleSave } = usePostStore()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-4 h-4 mr-2" /> Volver
          </Button>
        </div>

        {/* Post Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Image */}
          <div className="relative h-96">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* User Info */}
            <div className="flex items-center space-x-4 mb-6">
              <Image
                src={post.user.avatar || "/placeholder.svg"}
                alt={post.user.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                <p className="text-sm text-gray-500">{post.user.username}</p>
              </div>
            </div>

            {/* Title and Category */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
              <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                {post.category}
              </span>
            </div>

            {/* Description */}
            {post.description && (
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">{post.description}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-4 pt-6 border-t border-gray-100">
              <Button
                variant="ghost"
                onClick={() => toggleLike(post.id)}
                className={`flex items-center space-x-2 ${post.isLiked ? "text-red-500" : "text-gray-600"}`}
              >
                <Heart className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""}`} />
                <span>{post.likes}</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2 text-gray-600">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2 text-gray-600">
                <Share2 className="w-5 h-5" />
                <span>Compartir</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => toggleSave(post.id)}
                className={`flex items-center space-x-2 ${post.isSaved ? "text-purple-600" : "text-gray-600"}`}
              >
                <Bookmark className={`w-5 h-5 ${post.isSaved ? "fill-current" : ""}`} />
                <span>Guardar</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
