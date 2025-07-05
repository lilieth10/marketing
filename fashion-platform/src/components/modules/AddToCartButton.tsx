'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cart.store';
import { useGamificationStore } from '@/store/gamification.store';
import { toast } from 'sonner';
import { ShoppingCart, CheckCircle, XCircle } from 'lucide-react';
import { Product } from '@/store/products.store';

interface AddToCartButtonProps {
  product: Product;
  fullWidth?: boolean;
}

export function AddToCartButton({ product, fullWidth = false }: AddToCartButtonProps) {
  const { addToCart, removeItem, isProductInCart } = useCartStore();
  const { addPoints } = useGamificationStore();
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(isProductInCart(product.id));
  }, [isProductInCart, product.id, useCartStore.getState().items]);

  const handleToggleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (inCart) {
      removeItem(product.id);
      setInCart(false);
    } else {
      addToCart(product);
      
      // Reward points for adding to cart
      addPoints(10, 'add_to_cart');
      
      setInCart(true);
    }
  };

  const buttonClasses = `
    flex items-center justify-center px-4 py-3 text-sm font-bold rounded-lg 
    transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2
    ${fullWidth ? 'w-full' : ''}
    ${inCart 
      ? 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500' 
      : 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500'
    }
  `;

  return (
    <button
      onClick={handleToggleCart}
      className={buttonClasses}
      aria-label={inCart ? 'Quitar del carrito' : 'Añadir al carrito'}
    >
      {inCart ? (
        <>
          <XCircle size={18} className="mr-2" />
          Quitar del carrito
        </>
      ) : (
        <>
          <ShoppingCart size={18} className="mr-2" />
          Añadir al carrito
        </>
      )}
    </button>
  );
} 