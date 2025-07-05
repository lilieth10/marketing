'use client';

import React from 'react';
import { Cart } from '@/components/modules/Cart';
import { useCartStore } from '@/store/cart.store';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, getTotal } = useCartStore();
  const router = useRouter();

  const handleCheckout = () => {
    // TODO: Implementar el proceso de checkout
    router.push('/dashboard/client/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Mi Carrito</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Cart />
        </div>
        <aside className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col gap-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Resumen del Pedido</h2>
          <div className="flex flex-col gap-3 text-base">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Envío</span>
              <span className="text-gray-400">Calculado al finalizar</span>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-lg font-bold">
              <span>Total Estimado</span>
              <span className="text-2xl text-violet-700">${getTotal().toFixed(2)}</span>
            </div>
          </div>
          <Button
            variant="primary"
            className="w-full mt-2 bg-violet-700 hover:bg-violet-800 text-white text-lg font-semibold py-3 rounded-xl shadow-md"
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            Proceder al Pago
          </Button>
        </aside>
      </div>
    </div>
  );
} 