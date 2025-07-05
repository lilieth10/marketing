import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCategoryFilterStore } from '@/store/categoryFilter.store';

interface CategoryCardProps {
  image: string;
  label: string;
  href: string;
  selected?: boolean;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, label, href, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`group block w-full max-w-[140px] aspect-[4/5] bg-white rounded-xl shadow-md overflow-hidden border transition-all duration-200 ${selected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100 hover:shadow-lg hover:border-blue-200'}`}
    style={{ minWidth: 120 }}
  >
    <div className="w-full h-24 relative">
      <Image src={image} alt={label} fill className="object-cover group-hover:scale-105 transition-transform duration-200" />
    </div>
    <div className="p-2 flex flex-col items-center justify-center">
      <span className={`text-sm font-semibold text-center ${selected ? 'text-blue-700' : 'text-gray-800 group-hover:text-blue-700'}`}>{label}</span>
    </div>
  </button>
);

const categories = [
  { image: '/images/products/shirt1.jpg', label: 'Blusas', href: '#' },
  { image: '/images/products/dress1.jpg', label: 'Vestidos', href: '#' },
  { image: '/images/products/jeans1.jpg', label: 'Jeans', href: '#' },
  { image: '/images/products/blazer1.jpg', label: 'Blazers', href: '#' },
  { image: '/images/products/jeans1.jpg', label: 'Shorts', href: '#' },
  { image: '/images/products/blazer1.jpg', label: 'Tendencias de verano', href: '#' },
  { image: '/images/products/dress1.jpg', label: 'Tendencias de invierno', href: '#' },
  { image: '/images/products/shirt1.jpg', label: 'Tendencias de otoño', href: '#' },
  { image: '/images/products/jeans1.jpg', label: 'Streetwear', href: '#' },
  { image: '/images/products/blazer1.jpg', label: 'Moda sostenible', href: '#' },
  { image: '/images/products/dress1.jpg', label: 'Accesorios', href: '#' },
  { image: '/images/products/shirt1.jpg', label: 'Calzado', href: '#' },
];

const ALL_LABEL = 'Todos';

const AllCategoryCard: React.FC<{ selected: boolean; onClick: () => void }> = ({ selected, onClick }) => (
  <button
    onClick={onClick}
    className={`group block w-full max-w-[100px] aspect-[4/5] bg-white rounded-xl shadow-md overflow-hidden border transition-all duration-200 ${selected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100 hover:shadow-lg hover:border-blue-200'}`}
    style={{ minWidth: 80 }}
  >
    <div className="w-full h-24 flex items-center justify-center bg-gray-50">
      <span className={`text-lg font-bold ${selected ? 'text-blue-700' : 'text-gray-800 group-hover:text-blue-700'}`}>🌐</span>
    </div>
    <div className="p-2 flex flex-col items-center justify-center">
      <span className={`text-sm font-semibold text-center ${selected ? 'text-blue-700' : 'text-gray-800 group-hover:text-blue-700'}`}>{ALL_LABEL}</span>
    </div>
  </button>
);

export function ClientHomeButtons() {
  const { selectedCategory, setCategory } = useCategoryFilterStore();

  // Si no hay categoría seleccionada, 'Todos' está seleccionado
  const isAllSelected = !selectedCategory || selectedCategory === ALL_LABEL;

  return (
    <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
      <div className="flex gap-4 py-4 px-1 min-w-max">
        <AllCategoryCard
          selected={isAllSelected}
          onClick={() => setCategory(isAllSelected ? '' : ALL_LABEL)}
        />
        {categories.map((cat, index) => (
          <CategoryCard
            key={index}
            image={cat.image}
            label={cat.label}
            href={cat.href}
            selected={selectedCategory === cat.label}
            onClick={() => setCategory(selectedCategory === cat.label ? '' : cat.label)}
          />
        ))}
      </div>
    </div>
  );
} 