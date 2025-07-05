'use client';

import React from 'react';

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Mis Pedidos</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">Aquí podrás ver el historial de tus pedidos y su estado actual.</p>
        {/* En un futuro, aquí se integraría el componente de lista de pedidos con datos mockeados */}
      </div>
    </div>
  );
} 