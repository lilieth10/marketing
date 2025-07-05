'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AddToCartButton } from './AddToCartButton';
import { Product } from '@/store/products.store';
import { Bookmark, Share2, Star, Smile } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  darkMode?: boolean;
  from?: string; // Para saber de dónde viene el usuario
}

export function ProductCard({ product, darkMode = false, from = 'home' }: ProductCardProps) {
  const cardClasses = darkMode 
    ? "group relative flex flex-col h-full bg-white/90 backdrop-blur-sm border border-purple-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-purple-400"
    : "group relative flex flex-col h-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-purple-300";

  return (
    <div className={cardClasses}>
      <Link href={`/dashboard/client/products/${product.id}?from=${from}`} className="block w-full h-full absolute top-0 left-0 z-10" aria-label={`Ver detalles de ${product.name}`} />
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="relative z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
            <Bookmark size={18} className="text-gray-700" />
          </button>
          <button className="relative z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
            <Share2 size={18} className="text-gray-700" />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className={`text-sm font-semibold mb-1 truncate ${
          darkMode ? 'text-purple-500 font-bold group-hover:text-purple-400' : 'text-gray-800 group-hover:text-purple-600'
        }`}>
          {product.name}
        </h3>
        <p className={`text-xs mb-2 ${darkMode ? 'text-slate-700 font-medium' : 'text-gray-500'}`}>
          {product.category}
        </p>

        <div className="flex items-center gap-3 mb-3 text-xs">
          <div className="flex items-center">
            <Star size={14} className={darkMode ? 'text-purple-400 fill-current' : 'text-yellow-400 fill-current'} />
            <span className={`font-bold ml-1 ${darkMode ? 'text-purple-400' : 'text-gray-700'}`}>
              {product.rating}
            </span>
          </div>
          <div className="flex items-center text-sentiment-positive font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
            <Smile size={14} className="mr-1"/>
            <span>{product.reviewSummary.positive}%</span>
          </div>
        </div>
        
        <div className="mt-auto relative z-20">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className={`text-xl font-bold ${darkMode ? 'text-pink-400' : 'text-gray-900'}`}>
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
} 