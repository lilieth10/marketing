'use client';

import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cart.store';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    // Redirigir si el carrito está vacío
    if (items.length === 0 && !isProcessing && paymentSuccess === null) {
      router.push('/dashboard/client/cart');
    }
  }, [items, isProcessing, paymentSuccess, router]);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setPaymentSuccess(null);
    try {
      // Simular un procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simula 2 segundos de procesamiento

      // Aquí podrías agregar lógica para enviar la orden a un API real
      // Por ahora, simulamos éxito
      setPaymentSuccess(true);
      clearCart(); // Limpiar el carrito después de la "compra"
    } catch (error) {
      console.error("Error al procesar el pago mockeado:", error);
      setPaymentSuccess(false);
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && paymentSuccess === null) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <p className="text-xl text-gray-600">Redirigiendo al carrito...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Finalizar Compra</h1>

      {paymentSuccess === true && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg shadow-md mb-8 text-center">
          <p className="font-semibold text-xl mb-2">¡Compra Realizada con Éxito!</p>
          <p>Tu pedido ha sido procesado. ¡Gracias por tu compra!</p>
          <Button onClick={() => router.push('/dashboard/client/orders')} className="mt-4">Ver Mis Pedidos</Button>
        </div>
      )}

      {paymentSuccess === false && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg shadow-md mb-8 text-center">
          <p className="font-semibold text-xl mb-2">¡Error al Procesar el Pago!</p>
          <p>Lo sentimos, hubo un problema al procesar tu compra. Por favor, inténtalo de nuevo.</p>
          <Button onClick={handlePlaceOrder} className="mt-4">Reintentar Pago</Button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Resumen del Pedido</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-2 border-b last:border-b-0 border-gray-100">
              <Image 
                src={item.images?.[0] || '/images/placeholder.png'} 
                alt={item.name} 
                width={64} 
                height={64} 
                className="rounded-md object-cover flex-shrink-0" 
              />
              <div className="flex-grow">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
              </div>
              <span className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 pt-4 mt-6 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">Total:</span>
          <span className="text-3xl font-extrabold text-blue-600">${getTotal().toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Método de Pago</h2>
        <form onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }} className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-6 py-4 rounded-lg shadow-sm text-center">
            <p className="font-semibold text-lg mb-2">Simulación de Pago</p>
            <p>Este es un entorno de demostración. El pago se simulará al hacer clic en "Pagar y Finalizar Compra".</p>
            <p className="text-sm mt-2">En un entorno real, aquí se integrarían los campos de pago de Stripe u otra pasarela.</p>
          </div>
          {/* Aquí se integrarían los componentes de Stripe Elements en un entorno real */}
          {/* <PaymentElement /> */}

          <Button
            type="submit"
            className="w-full py-3 text-lg font-semibold"
            disabled={isProcessing || items.length === 0}
          >
            {isProcessing ? 'Procesando...' : 'Pagar y Finalizar Compra'}
          </Button>
        </form>
      </div>
    </div>
  );
} 