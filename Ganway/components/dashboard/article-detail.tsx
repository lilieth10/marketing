"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Clock, User, Share2, Bookmark } from "lucide-react"
import type { Article } from "@/store/postStore"

interface ArticleDetailProps {
  article: Article
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-4 h-4 mr-2" /> Volver
          </Button>
        </div>

        {/* Article Content */}
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-96">
            <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Meta Info */}
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
              <span>{article.date}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{article.title}</h1>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {article.content.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4 pt-6 border-t border-gray-100 mt-8">
              <Button variant="outline" className="bg-transparent">
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
              <Button variant="outline" className="bg-transparent">
                <Bookmark className="w-4 h-4 mr-2" />
                Guardar
              </Button>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Artículos relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {article.relatedArticles.map((related) => (
                <Link key={related.id} href={`/dashboard/client/content/${related.id}`}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                    <div className="relative h-48">
                      <Image
                        src={related.image || "/placeholder.svg"}
                        alt={related.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">{related.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
