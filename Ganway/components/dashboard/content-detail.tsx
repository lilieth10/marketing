"use client"
import { usePostStore } from "@/store/postStore"
import { ProductDetail } from "./product-detail"
import { ArticleDetail } from "./article-detail"
import { PostDetail } from "./post-detail"

interface ContentDetailProps {
  contentId: string
}

export function ContentDetail({ contentId }: ContentDetailProps) {
  const { getPostById, getProductById, getArticleById } = usePostStore()

  // Primero verificar si es un producto
  const product = getProductById(contentId)
  if (product) {
    return <ProductDetail product={product} />
  }

  // Luego verificar si es un artículo
  const article = getArticleById(contentId)
  if (article) {
    return <ArticleDetail article={article} />
  }

  // Finalmente verificar si es un post
  const post = getPostById(contentId)
  if (post) {
    return <PostDetail post={post} />
  }

  // Si no se encuentra nada, mostrar mensaje de error
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Contenido no encontrado</h1>
        <p className="text-gray-600 mb-4">El contenido que buscas no existe o ha sido eliminado.</p>
        <p className="text-sm text-gray-500">ID buscado: {contentId}</p>
        <button
          onClick={() => window.history.back()}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Volver
        </button>
      </div>
    </div>
  )
}
