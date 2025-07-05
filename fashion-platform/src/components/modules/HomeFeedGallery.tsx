'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AddToCartButton } from './AddToCartButton';
import { useProductsStore } from '@/store/products.store';
import { Product } from '@/types';
import { Bookmark, Share2 } from 'lucide-react';
import { useCategoryFilterStore } from '@/store/categoryFilter.store';
import { useSearchStore } from '@/store/search.store';
import { ProductCard } from './ProductCard';

export function HomeFeedGallery() {
  const { getAllProducts } = useProductsStore();
  const { selectedCategory } = useCategoryFilterStore();
  const { searchTerm } = useSearchStore();
  const [isClient, setIsClient] = useState(false);

  // Obtener todos los productos del store
  const allProducts = getAllProducts();

  // Filtrado por categoría y búsqueda (case-insensitive)
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      !selectedCategory || selectedCategory === 'Todos'
        ? true
        : product.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  // Prevenir problemas de hidratación
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-xl h-72 animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
} 