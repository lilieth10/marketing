'use client';

import React from 'react';
import { CommunityFeed } from '@/components/landing/CommunityFeed/CommunityFeed';

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Comunidad</h1>
      <p className="text-gray-600 mb-8">Explora lo último de nuestra comunidad de moda.</p>
      <CommunityFeed />
    </div>
  );
} 