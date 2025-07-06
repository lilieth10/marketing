"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ShoppingBag, Sparkles, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { AIProductAnalysis } from "./ai-product-analysis"
import { AIPersonalizationModal } from "./ai-personalization-modal"
import { useCartStore } from "@/store/cartStore"
import { LuxuryHistoryModal } from "./luxury-history-modal"
import type { ProductData } from "@/store/postStore"
import Swal from "sweetalert2"

interface ProductDetailProps {
  product: ProductData
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isPersonalizationModalOpen, setIsPersonalizationModalOpen] = useState(false)
  const [isLuxuryHistoryModalOpen, setIsLuxuryHistoryModalOpen] = useState(false)
  const [isSentimentLoading, setIsSentimentLoading] = useState(true)
  const [sentimentProgress, setSentimentProgress] = useState(0)
  const { addItem } = useCartStore()

  useEffect(() => {
    setIsSentimentLoading(true)
    setSentimentProgress(0)
    const timer = setTimeout(() => {
      let currentProgress = 0
      const interval = setInterval(() => {
        currentProgress += 10
        setSentimentProgress(currentProgress)
        if (currentProgress >= 100) {
          clearInterval(interval)
          setIsSentimentLoading(false)
        }
      }, 100)
    }, 1500)

    return () => clearTimeout(timer)
  }, [product.id])

  const handleAddToCart = () => {
    if (!selectedSize) {
      Swal.fire({
        icon: "warning",
        title: "Talla Requerida",
        text: "Por favor, selecciona una talla antes de añadir al carrito.",
        confirmButtonColor: "#8B5CF6",
      })
      return
    }
    addItem({
      id: product.id,
      name: product.name,
      brand: product.features[0] || "Marca Genérica",
      size: selectedSize,
      price: Number.parseFloat(product.price.replace("$", "")),
      image: product.image,
    })
    Swal.fire({
      icon: "success",
      title: "Añadido al carrito!",
      text: `${product.name} (Talla: ${selectedSize}) ha sido añadido a tu carrito.`,
      confirmButtonColor: "#8B5CF6",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-4 h-4 mr-2" /> Volver
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Product Image */}
          <div className="relative h-96 rounded-xl overflow-hidden">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              Edición Limitada
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span>
                    {product.rating} ({product.reviews} reseñas)
                  </span>
                </div>
              </div>
              <p className="text-gray-900 text-3xl font-bold mb-4">{product.price}</p>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* AI Style Analysis */}
            <AIProductAnalysis
              metrics={product.styleMetrics}
              onOpenLuxuryHistory={() => setIsLuxuryHistoryModalOpen(true)}
            />

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Características Premium</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Selecciona la talla</h3>
              <div className="flex gap-2">
                {product.sizes.map((size, index) => (
                  <Button
                    key={index}
                    variant={selectedSize === size ? "default" : "outline"}
                    className={`${
                      selectedSize === size
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Añadir al carrito
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3 text-lg font-semibold bg-transparent"
                onClick={() => setIsPersonalizationModalOpen(true)}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Personalizar prenda
              </Button>
            </div>
          </div>
        </div>

        {/* AI Sentiment Analysis */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Análisis de Sentimiento por IA</h2>
          <div className="space-y-6">
            {isSentimentLoading ? (
              <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white p-6 rounded-xl shadow-lg text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-purple-200" />
                <h3 className="text-lg font-bold mb-1">Procesando 1,247 reseñas con NLP avanzado...</h3>
                <p className="text-purple-200 text-xs">Procesando con IA.Premium - Confianza: {sentimentProgress}%</p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Métricas Clave</h3>
                    <div className="space-y-3">
                      {product.sentimentMetrics.map((metric, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center text-sm text-gray-700 mb-1">
                            <span>{metric.label}</span>
                            <span className="font-medium text-purple-600">{metric.value}%</span>
                          </div>
                          <div className="w-full bg-purple-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${metric.value}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Insights de Análisis Premium</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Destacado por su diseño y atención al detalle.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Más de 2000 clientes satisfechos con esta pieza.</span>
                      </li>
                      <li className="flex items-start">
                        <XCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0 mt-1" />
                        <span>Pocas reseñas negativas, pero algunas mencionan el ajuste.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Validación verificada por IA</h3>
                  <p className="text-sm text-gray-700 mb-4">"Ideal para eventos formales, recibe muchos cumplidos."</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                    <span>Análisis verificado</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AIPersonalizationModal
        isOpen={isPersonalizationModalOpen}
        onClose={() => setIsPersonalizationModalOpen(false)}
        productName={product.name}
      />
      <LuxuryHistoryModal
        isOpen={isLuxuryHistoryModalOpen}
        onClose={() => setIsLuxuryHistoryModalOpen(false)}
        productName={product.name}
      />
    </div>
  )
}
