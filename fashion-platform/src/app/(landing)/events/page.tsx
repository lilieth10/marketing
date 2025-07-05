'use client';

import React from 'react';
import { EventList } from '@/components/landing/Events/EventList';

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Eventos</h1>
      <p className="text-gray-600 mb-8">Descubre los próximos eventos y desfiles de moda.</p>
      <EventList />
    </div>
  );
} 