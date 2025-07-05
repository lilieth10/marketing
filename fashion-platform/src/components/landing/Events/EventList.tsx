import React from 'react';
import Image from 'next/image';
import { mockEvents } from '@/lib/mocks/events';
import { Button } from '@/components/ui/Button';

export function EventList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {mockEvents.map((event) => (
        <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative w-full h-48">
            <Image
              src={event.imageUrl}
              alt={event.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="font-bold text-xl text-gray-900 mb-2">{event.name}</h3>
            <p className="text-gray-600 text-sm mb-2">🗓️ {event.date}</p>
            <p className="text-gray-600 text-sm mb-4">📍 {event.location}</p>
            <p className="text-gray-700 text-base mb-4">{event.description}</p>
            <Button variant="primary" className="w-full">Ver Detalles</Button>
          </div>
        </div>
      ))}
    </div>
  );
} 