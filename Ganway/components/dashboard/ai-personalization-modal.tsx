"use client"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Sparkles } from "lucide-react"
import Image from "next/image"

interface AIPersonalizationModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
}

export function AIPersonalizationModal({ isOpen, onClose, productName }: AIPersonalizationModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isOpen) {
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
      }, 500) // Start processing after 0.5 second delay

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const personalizedProducts = [
    {
      id: "p1",
      name: "Color Clásico Premium",
      image: "/placeholder.svg?height=150&width=100",
      price: "$120",
      confidence: 95,
      insights: ["Elegancia", "Versatilidad"],
    },
    {
      id: "p2",
      name: "Vestido Casual Elegante",
      image: "/placeholder.svg?height=150&width=100",
      price: "$235",
      confidence: 88,
      insights: ["Comodidad", "Estilo Directo"],
    },
    {
      id: "p3",
      name: "Vestido Floral de Verano",
      image: "/placeholder.svg?height=150&width=100",
      price: "$180",
      confidence: 92,
      insights: ["Fresco", "Vibrante"],
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-6 bg-white rounded-2xl shadow-lg">
        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">Personalización de Productos IA</DialogTitle>
          <DialogDescription className="text-gray-600">
            Crea tu selección perfecta con recomendaciones inteligentes.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white p-8 rounded-2xl shadow-lg text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-200" />
            <h3 className="text-xl font-bold mb-2">IA Personalizando Tu Producto</h3>
            <p className="text-purple-200 text-sm mb-4">Generando recomendaciones personalizadas...</p>
            <div className="w-full bg-purple-500 rounded-full h-2.5 mb-2">
              <div
                className="bg-purple-300 h-2.5 rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-purple-200 text-xs">Procesando con IA.Premium - Confianza: {progress}%</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Personalization Options */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Paleta de Colores</h4>
                <div className="flex flex-wrap gap-2">
                  {["Negro", "Blanco", "Rojo", "Azul"].map((color) => (
                    <Button key={color} variant="outline" size="sm" className="text-xs bg-transparent">
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Material</h4>
                <div className="flex flex-wrap gap-2">
                  {["Seda", "Algodón", "Lana"].map((material) => (
                    <Button key={material} variant="outline" size="sm" className="text-xs bg-transparent">
                      {material}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Estilo</h4>
                <div className="flex flex-wrap gap-2">
                  {["Casual", "Formal", "Boho", "Urbano"].map((style) => (
                    <Button key={style} variant="outline" size="sm" className="text-xs bg-transparent">
                      {style}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Ajuste</h4>
                <div className="flex flex-wrap gap-2">
                  {["Regular", "Slim", "Oversize"].map((fit) => (
                    <Button key={fit} variant="outline" size="sm" className="text-xs bg-transparent">
                      {fit}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Personalized Products */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Productos Personalizados</h3>
              <div className="grid grid-cols-2 gap-4">
                {personalizedProducts.map((product) => (
                  <div key={product.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="relative h-32 mb-2 rounded-md overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {product.confidence}%
                      </div>
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-1">{product.name}</h4>
                    <p className="text-gray-900 font-bold text-base mb-2">{product.price}</p>
                    <div className="flex flex-wrap gap-1">
                      {product.insights.map((insight, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                          {insight}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights */}
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                Insights de IA
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>- 95% de compatibilidad con tu estilo actual.</li>
                <li>- Sugerencias basadas en tus últimas compras.</li>
              </ul>
            </div>

            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-sm font-medium rounded-lg">
              Generar Prenda Personalizada
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
