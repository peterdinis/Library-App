import { create } from "zustand";

interface FilterState {
  selectedCategory?: string;
  selectedGenre?: string;
  selectedAuthor?: string;
  setFilters: (filters: Partial<FilterState>) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedCategory: undefined,
  selectedGenre: undefined,
  selectedAuthor: undefined,
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
  clearFilters: () =>
    set({
      selectedCategory: undefined,
      selectedGenre: undefined,
      selectedAuthor: undefined,
    }),
}));