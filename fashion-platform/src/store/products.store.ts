import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockProducts } from '@/data/mockProducts';
import { Product, Review } from '@/types';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviews' | 'reviewSummary' | 'reviewsList' | 'aiSummary' | 'highlightedTopics'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByDesigner: (designerId: string) => Product[];
  getProductsByCategory: (category: string) => Product[];
  getAllProducts: () => Product[];
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: mockProducts,
      loading: false,
      error: null,

      fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
          // TODO: Reemplazar con llamada real a la API
          const response = await fetch('/api/products');
          if (response.ok) {
            const data = await response.json();
            set({ products: data, loading: false });
          } else {
            // Si no hay API, usar mock data
            set({ products: mockProducts, loading: false });
          }
        } catch (error) {
          // En caso de error, usar mock data
          set({ products: mockProducts, loading: false });
        }
      },

      addProduct: (productData) => {
        // Generar ID determinístico basado en el nombre y timestamp fijo
        const nameHash = productData.name.split('').reduce((hash, char) => 
          hash + char.charCodeAt(0), 0
        );
        const timestamp = Date.now();
        
        const newProduct: Product = {
          ...productData,
          id: `product-${timestamp}-${nameHash}`,
          rating: 0,
          reviews: 0,
          reviewSummary: {
            positive: 0,
            neutral: 0,
            negative: 0
          },
          aiSummary: 'Nuevo producto agregado recientemente',
          highlightedTopics: productData.tags || [],
          reviewsList: [],
          createdAt: new Date(timestamp).toISOString(),
          updatedAt: new Date(timestamp).toISOString()
        };

        set((state) => ({
          products: [newProduct, ...state.products]
        }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id
              ? { ...product, ...updates, updatedAt: new Date().toISOString() }
              : product
          )
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id)
        }));
      },

      getProductById: (id) => {
        return get().products.find((product) => product.id === id);
      },

      getProductsByDesigner: (designerId) => {
        return get().products.filter((product) => product.designerId === designerId);
      },

      getProductsByCategory: (category) => {
        return get().products.filter((product) => product.category === category);
      },

      getAllProducts: () => {
        return get().products;
      },
    }),
    {
      name: 'products-storage',
    }
  )
); 