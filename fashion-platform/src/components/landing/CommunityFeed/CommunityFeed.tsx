import React from 'react';
import Image from 'next/image';
import { mockCommunityPosts } from '@/lib/mocks/community';
import { Button } from '@/components/ui/Button';

export function CommunityFeed() {
  return (
    <div className="space-y-8">
      {mockCommunityPosts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full object-cover mr-4"
            />
            <div>
              <p className="font-semibold text-gray-800">{post.author.name}</p>
              <p className="text-sm text-gray-500">{post.timestamp}</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{post.text}</p>
          {post.imageUrl && (
            <div className="relative w-full h-64 mb-4 rounded-md overflow-hidden">
              <Image
                src={post.imageUrl}
                alt="Post Image"
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex justify-between items-center text-gray-500 text-sm">
            <div className="flex space-x-4">
              <span>❤️ {post.likes}</span>
              <span>💬 {post.comments.length}</span>
              <span>📤 Compartir</span>
            </div>
            <Button variant="outline" size="sm">Ver Publicación</Button>
          </div>
        </div>
      ))}
    </div>
  );
} 