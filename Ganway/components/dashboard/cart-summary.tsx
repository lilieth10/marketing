"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus, ChevronLeft } from "lucide-react"
import { useCartStore } from "@/store/cartStore" // Import useCartStore
import Swal from "sweetalert2" // Import SweetAlert2

export function CartSummary() {
  const { items: cartItems, updateQuantity, removeItem, clearCart } = useCartStore() // Use cart store

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0 // As per Figma
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-4 h-4 mr-2" /> Volver
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Carrito ({cartItems.length} items)</h2>
            <div className="space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-600 py-10">Tu carrito está vacío.</div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.brand} / Talla: {item.size}
                      </p>
                      <p className="text-lg font-bold text-gray-900 mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-lg font-medium text-gray-900 w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => {
                          Swal.fire({
                            title: "¿Estás seguro?",
                            text: `¿Quieres eliminar ${item.name} del carrito?`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#8B5CF6",
                            cancelButtonColor: "#EF4444",
                            confirmButtonText: "Sí, eliminar",
                            cancelButtonText: "Cancelar",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              removeItem(item.id)
                              Swal.fire("Eliminado!", "El artículo ha sido eliminado del carrito.", "success")
                            }
                          })
                        }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <Button
                variant="outline"
                className="w-full mt-4 text-red-600 hover:text-red-700 text-sm font-medium bg-transparent"
                onClick={() => {
                  Swal.fire({
                    title: "¿Estás seguro?",
                    text: "¿Quieres vaciar todo el carrito?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#8B5CF6",
                    cancelButtonColor: "#EF4444",
                    confirmButtonText: "Sí, vaciar",
                    cancelButtonText: "Cancelar",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      clearCart()
                      Swal.fire("Vaciado!", "Tu carrito ha sido vaciado.", "success")
                    }
                  })
                }}
              >
                Limpiar Carrito
              </Button>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen del pedido</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Envío</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-900 text-xl font-bold pt-4 border-t border-gray-100">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold rounded-lg">
              Finalizar pedido
            </Button>
            <Button variant="ghost" className="w-full mt-4 text-purple-600 hover:text-purple-700 text-sm font-medium">
              + Sumar artículo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
