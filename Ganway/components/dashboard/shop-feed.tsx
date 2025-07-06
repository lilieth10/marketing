"use client"
import Image from "next/image"
import { ShoppingBag, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePostStore } from "@/store/postStore"
import { useCartStore } from "@/store/cartStore"
import Swal from "sweetalert2" // Import SweetAlert2

export function ShopFeed() {
  const { products } = usePostStore()
  const { addItem } = useCartStore()

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      brand: product.features[0] || "Marca Genérica",
      size: product.sizes[0] || "M", // Default to first size or 'M'
      price: Number.parseFloat(product.price.replace("$", "")),
      image: product.image,
    })
    Swal.fire({
      icon: "success",
      title: "Añadido al carrito!",
      text: `${product.name} ha sido añadido a tu carrito.`,
      confirmButtonColor: "#8B5CF6",
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explora Nuestros Productos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 border border-gray-100"
          >
            <Link href={`/dashboard/client/content/${product.id}`} className="block">
              {" "}
              {/* Updated link */}
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-gray-900 font-bold text-lg mb-2">{product.price}</p>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span>
                    {product.rating} ({product.reviews})
                  </span>
                </div>
              </div>
            </Link>
            <div className="px-4 pb-4">
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 text-sm font-medium rounded-lg"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Añadir al carrito
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
