'use client';

import React from 'react';
import { useCartStore } from '@/store/cart.store';
import type { CartItem } from '@/store/cart.store';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export function Cart() {
  const { items, removeItem, updateQuantity } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg mb-4">Tu carrito está vacío</p>
        {/* Aquí podrías agregar un botón para volver a la tienda si lo deseas */}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-white">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Producto</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Cantidad</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Precio</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Total</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-4 flex items-center gap-4 min-w-[220px]">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  <Image src={item.images?.[0] || '/images/placeholder.png'} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.category}</div>
                </div>
              </td>
              <td className="px-4 py-4 text-center">
                <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <button
                    className="px-2 py-1 text-lg text-gray-500 hover:text-violet-700 disabled:opacity-40"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >-</button>
                  <span className="px-3 text-base font-medium text-gray-800">{item.quantity}</span>
                  <button
                    className="px-2 py-1 text-lg text-gray-500 hover:text-violet-700"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >+</button>
                </div>
              </td>
              <td className="px-4 py-4 text-center">
                <span className="text-base text-gray-700 font-medium">${item.price.toFixed(2)}</span>
              </td>
              <td className="px-4 py-4 text-center">
                <span className="text-base font-bold text-violet-700">${(item.price * item.quantity).toFixed(2)}</span>
              </td>
              <td className="px-4 py-4 text-center">
                <button
                  className="text-xs text-red-500 hover:text-red-700 transition-colors"
                  onClick={() => removeItem(item.id)}
                  title="Eliminar"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 