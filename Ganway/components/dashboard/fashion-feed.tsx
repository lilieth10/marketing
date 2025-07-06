"use client"
import Image from "next/image"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { usePostStore } from "@/store/postStore"

export function FashionFeed() {
  const { posts, toggleLike, toggleSave } = usePostStore()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Categorías visuales tipo Figma */}
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg overflow-hidden mb-1">
            <Image src="/images/dashboard/colorful-avant-garde.jpg" alt="Arte Abstracto" width={48} height={48} className="object-cover w-full h-full" />
          </div>
          <span className="text-xs font-medium text-gray-900">Arte Abstracto</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg overflow-hidden mb-1">
            <Image src="/images/dashboard/blue-denim-urban.jpg" alt="Denim Urbano" width={48} height={48} className="object-cover w-full h-full" />
          </div>
          <span className="text-xs font-medium text-gray-900">Denim Urbano</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg overflow-hidden mb-1">
            <Image src="/images/dashboard/beige-elegant-blazer.jpg" alt="Blazer Elegante" width={48} height={48} className="object-cover w-full h-full" />
          </div>
          <span className="text-xs font-medium text-gray-900">Blazer Elegante</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg overflow-hidden mb-1">
            <Image src="/images/dashboard/yellow-gingham-skirt-white-top.jpg" alt="Verano" width={48} height={48} className="object-cover w-full h-full" />
          </div>
          <span className="text-xs font-medium text-gray-900">Verano</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg overflow-hidden mb-1">
            <Image src="/images/dashboard/black-grunge-style.jpg" alt="Grunge" width={48} height={48} className="object-cover w-full h-full" />
          </div>
          <span className="text-xs font-medium text-gray-900">Grunge</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg overflow-hidden mb-1">
            <Image src="/images/dashboard/grey-night-jumpsuit.jpg" alt="Nocturno" width={48} height={48} className="object-cover w-full h-full" />
          </div>
          <span className="text-xs font-medium text-gray-900">Nocturno</span>
        </div>
      </div>

      {/* Masonry Grid - EXACTAMENTE COMO ESTABA ANTES */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {posts.map((post) => {
          const linkHref = `/dashboard/client/content/${post.id}`

          return (
            <div key={post.id} className="break-inside-avoid mb-4 block">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                {/* Image and Title wrapped in Link */}
                <Link href={linkHref} className="block">
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
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleSave(post.id)
                        }}
                        className="bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${post.isSaved ? "text-purple-600 fill-current" : "text-gray-600"}`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 mb-3">
                      <Image
                        src={post.user.avatar || "/placeholder.svg"}
                        alt={post.user.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1">
                          <p className="text-sm font-medium text-gray-900 truncate">{post.user.name}</p>
                          {post.user.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{post.user.username}</p>
                      </div>
                      <button onClick={(e) => e.preventDefault()} className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                  </div>
                </Link>
                {/* Category (outside Link) */}
                <div className="px-4 mb-3">
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                {/* Actions (outside Link) */}
                <div className="flex items-center justify-between px-4 pb-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleLike(post.id)
                    }}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? "text-red-500 fill-current" : ""}`} />
                    <span className="text-xs">{post.likes}</span>
                  </button>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{post.comments}</span>
                  </button>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
