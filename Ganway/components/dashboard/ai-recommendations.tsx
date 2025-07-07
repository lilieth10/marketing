"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Sparkles, TrendingUp, Heart, ShoppingBag, Eye, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useCartStore } from "@/store/cartStore"
import { usePostStore } from "@/store/postStore"

interface AIRecommendation {
  id: string
  type: "trend" | "style" | "product"
  title: string
  description: string
  image: string
  confidence: number
  tags: string[]
}

const aiRecommendations: AIRecommendation[] = [
  {
    id: "ai-1",
    type: "trend",
    title: "Tendencia: Colores Vibrantes 2024",
    description: "Los colores neón y vibrantes están dominando las pasarelas. Perfecto para tu estilo audaz.",
    image: "/images/dashboard/colorful-avant-garde.jpg",
    confidence: 94,
    tags: ["Tendencia", "Colores", "2024"],
  },
  {
    id: "ai-2",
    type: "style",
    title: "Estilo Recomendado: Minimalismo Elegante",
    description: "Basado en tus preferencias, el minimalismo elegante complementará tu guardarropa.",
    image: "/images/dashboard/beige-elegant-blazer.jpg",
    confidence: 89,
    tags: ["Minimalista", "Elegante", "Versátil"],
  },
  {
    id: "p3", // Changed to match product ID
    type: "product",
    title: "Producto Sugerido: Jumpsuit Turquesa",
    description: "Este jumpsuit combina perfectamente con tu estilo profesional y moderno.",
    image: "/images/dashboard/turquoise-jumpsuit.jpg",
    confidence: 92,
    tags: ["Formal", "Versátil", "Moderno"],
  },
  {
    id: "ai-4",
    type: "trend",
    title: "Tendencia: Streetwear Urbano",
    description: "El streetwear sigue siendo una tendencia fuerte. Ideal para looks casuales con personalidad.",
    image: "/images/dashboard/yellow-sportwear-outfit.jpg",
    confidence: 87,
    tags: ["Streetwear", "Urbano", "Casual"],
  },
  {
    id: "p5", // Changed to match product ID
    type: "product",
    title: "Producto Sugerido: Mono Gris de Noche",
    description: "Mono elegante en tono gris oscuro, ideal para eventos nocturnos.",
    image: "/images/dashboard/grey-night-jumpsuit.jpg",
    confidence: 85,
    tags: ["Nocturno", "Elegante", "Fiesta"],
  },
  {
    id: "ai-6",
    type: "style",
    title: "Estilo Recomendado: Comfy Chic",
    description: "La comodidad se une al estilo en esta tendencia perfecta para el día a día.",
    image: "/placeholder.svg?height=400&width=300", // Placeholder for a style
    confidence: 91,
    tags: ["Comfy", "Chic", "Casual"],
  },
]

export function AIRecommendations() {
  const [activeTab, setActiveTab] = useState<"all" | "trends" | "styles" | "products">("all")
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const { addItem } = useCartStore()
  const { getProductById } = usePostStore()

  useEffect(() => {
    setIsLoading(true)
    setProgress(0)
    const timer = setTimeout(() => {
      let currentProgress = 0
      const interval = setInterval(() => {
        currentProgress += 10
        setProgress(currentProgress)
        if (currentProgress >= 100) {
          clearInterval(interval)
          setIsLoading(false)
        }
      }, 100)
    }, 1000)

    return () => clearTimeout(timer)
  }, [activeTab])

  const filteredRecommendations =
    activeTab === "all"
      ? aiRecommendations
      : aiRecommendations.filter((rec) => {
          if (activeTab === "trends") return rec.type === "trend"
          if (activeTab === "styles") return rec.type === "style"
          if (activeTab === "products") return rec.type === "product"
          return true
        })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "trend":
        return <TrendingUp className="w-4 h-4" />
      case "style":
        return <Heart className="w-4 h-4" />
      case "product":
        return <ShoppingBag className="w-4 h-4" />
      default:
        return <Sparkles className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "trend":
        return "bg-blue-100 text-blue-700"
      case "style":
        return "bg-pink-100 text-pink-700"
      case "product":
        return "bg-green-100 text-green-700"
      default:
        return "bg-purple-100 text-purple-700"
    }
  }

  return (
    <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-12 mt-12 rounded-2xl shadow-sm border border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-2 bg-purple-600 rounded-full">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Recomendado para Ti</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre tendencias, estilos y productos personalizados especialmente para ti, basados en tu historial y
            preferencias de moda.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "all" ? "bg-purple-600 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Todo
            </button>
            <button
              onClick={() => setActiveTab("trends")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "trends" ? "bg-purple-600 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Tendencias
            </button>
            <button
              onClick={() => setActiveTab("styles")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "styles" ? "bg-purple-600 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Estilos
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "products" ? "bg-purple-600 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Productos
            </button>
          </div>
        </div>

        {/* AI Recommendations Grid or Loading State */}
        {isLoading ? (
          <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white p-8 rounded-2xl shadow-lg text-center max-w-2xl mx-auto">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-200" />
            <h3 className="text-xl font-bold mb-2">IA Creando Tu Selección Perfecta</h3>
            <p className="text-purple-200 text-sm mb-4">Generando insights de estilo y combinaciones...</p>
            <div className="w-full bg-purple-500 rounded-full h-2.5 mb-2">
              <div
                className="bg-purple-300 h-2.5 rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-purple-200 text-xs">Procesando con IA.Premium - Confianza: {progress}%</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {filteredRecommendations.map((recommendation) => {
              const productData = recommendation.type === "product" ? getProductById(recommendation.id) : undefined
              return (
                <div
                  key={recommendation.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={recommendation.image || "/placeholder.svg"}
                      alt={recommendation.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {/* Type Badge */}
                    <div
                      className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getTypeColor(recommendation.type)}`}
                    >
                      {getTypeIcon(recommendation.type)}
                      <span className="capitalize">{recommendation.type}</span>
                    </div>
                    {/* Confidence Score */}
                    <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {recommendation.confidence}% match
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{recommendation.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{recommendation.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {recommendation.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2">
                      {/* "Ver más" button */}
                      <Link
                        href={`/dashboard/client/content/${recommendation.id}`} // Link to generic content detail
                      >
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          <Eye className="w-3 h-3 mr-1" />
                          Ver más
                        </Button>
                      </Link>
                      {/* "Comprar" button only for products */}
                      {recommendation.type === "product" && productData && (
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-xs px-3 py-1.5" // Adjusted padding for better fit
                          onClick={() =>
                            addItem({
                              id: productData.id,
                              name: productData.name,
                              brand: productData.features[0] || "Marca", // Use first feature as brand mock
                              size: productData.sizes[0] || "M", // Default size
                              price: Number.parseFloat(productData.price.replace("$", "") || "0"),
                              image: productData.image,
                            })
                          }
                        >
                          <ShoppingBag className="w-3 h-3 mr-1" />
                          Comprar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
