import React from 'react';
import Image from 'next/image';
import { mockBlogPosts } from '@/lib/mocks/blog';
import { Button } from '@/components/ui/Button';

export function BlogPostList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {mockBlogPosts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <div className="relative w-full h-48">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="font-bold text-xl text-gray-900 mb-2">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-2">Por {post.author} el {post.date}</p>
            <p className="text-gray-700 text-base mb-4 flex-grow">{post.excerpt}</p>
            <Button variant="primary" className="w-full mt-auto">Leer Más</Button>
          </div>
        </div>
      ))}
    </div>
  );
} 