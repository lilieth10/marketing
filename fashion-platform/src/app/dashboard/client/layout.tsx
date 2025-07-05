'use client';

import React from 'react';
import { ClientNav } from '@/components/modules/ClientNav';
import { Toaster } from 'sonner';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNav />
      <main className="py-6">
        {children}
      </main>
      <Toaster position="top-right" />
    </div>
  );
} 