import { create } from "zustand";

interface FilterState {
  selectedCategory?: string;
  selectedGenre?: string;
  selectedAuthor?: string;
  categoryId?: string;
  genreId?: string;
  authorId?: string;
  setFilters: (filters: Partial<FilterState>) => void;
  clearFilters: () => void;
  filters: () => Partial<FilterState>;
}

export const useFilterStore = create<FilterState>((set, get) => ({
  selectedCategory: undefined,
  selectedGenre: undefined,
  selectedAuthor: undefined,

  setFilters: (filters) => set((state) => ({ ...state, ...filters })),

  clearFilters: () =>
    set({
      selectedCategory: undefined,
      selectedGenre: undefined,
      selectedAuthor: undefined,
      categoryId: undefined,
      genreId: undefined,
      authorId: undefined,
    }),

  filters: () => get(),
}));
