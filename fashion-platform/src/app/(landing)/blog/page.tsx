'use client';

import React from 'react';
import { BlogPostList } from '@/components/landing/Blog/BlogPostList';

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Blog de Moda</h1>
      <p className="text-gray-600 mb-8">Aquí encontrarás los últimos artículos y tendencias del mundo de la moda.</p>
      <BlogPostList />
    </div>
  );
} 