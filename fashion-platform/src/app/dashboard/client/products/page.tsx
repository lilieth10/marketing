'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/store/cart.store';
import { toast } from 'sonner';

// Mock products
const mockProducts = [
  {
    id: 1,
    name: 'Blazer Sostenible Premium',
    brand: 'EcoLux',
    price: 189.99,
    image: '/images/verano.jpg',
    rating: 4.8,
    reviews: 234,
    tags: ['sustentable', 'premium', 'oficina']
  },
  {
    id: 2,
    name: 'Accesorios Minimalistas',
    brand: 'MinimalChic',
    price: 79.99,
    image: '/images/accesosrios.png',
    rating: 4.6,
    reviews: 156,
    tags: ['minimalista', 'elegante']
  },
  {
    id: 3,
    name: 'Conjunto Urbano',
    brand: 'StreetStyle',
    price: 159.99,
    image: '/images/hombres.webp',
    rating: 4.7,
    reviews: 189,
    tags: ['urbano', 'casual']
  }
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const urlSearchTerm = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);

  useEffect(() => {
    setSearchTerm(urlSearchTerm);
  }, [urlSearchTerm]);

  const filteredProducts = mockProducts.filter(product => 
    searchTerm === '' || 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const { addToCart } = useCartStore();

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      images: [product.image],
      designerId: 'mock-designer',
      description: `${product.brand} - ${product.name}`,
      category: 'fashion',
      sizes: ['S', 'M', 'L'],
      rating: product.rating,
      reviews: product.reviews,
      reviewSummary: {
        positive: 80,
        neutral: 15,
        negative: 5
      },
      aiSummary: 'Producto recomendado por IA',
      highlightedTopics: product.tags,
      reviewsList: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    toast.success(`${product.name} agregado al carrito`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Productos
          </h1>

          {/* Search */}
          <div className="relative max-w-md mb-4">
            <Search size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {urlSearchTerm && (
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl">
              <p className="text-purple-700">
                Resultados para: <strong>"{urlSearchTerm}"</strong>
                ({filteredProducts.length} productos)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Search size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
            <p className="text-gray-500">Intenta con otro término de búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <div className="relative h-64 bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                    <Heart size={16} className="text-gray-600" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{product.brand}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="text-sm">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-purple-600">${product.price}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => window.location.href = `/dashboard/client/products/${product.id}`}
                      className="flex-1 py-2 px-4 border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye size={16} />
                      Ver
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 