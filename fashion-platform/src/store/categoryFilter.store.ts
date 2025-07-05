import { create } from 'zustand';

interface CategoryFilterState {
  selectedCategory: string;
  setCategory: (category: string) => void;
}

export const useCategoryFilterStore = create<CategoryFilterState>((set) => ({
  selectedCategory: '',
  setCategory: (category) => set({ selectedCategory: category }),
})); 