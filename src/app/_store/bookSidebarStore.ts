import { create } from "zustand";

interface BookSidebarStoreInterface {
  selectedCategory?: string;
  selectedGenre?: string;
  selectedAuthor?: string;
  categoryId?: string;
  genreId?: string;
  authorId?: string;
  setFilters: (filters: Partial<BookSidebarStoreInterface>) => void;
  clearFilters: () => void;
  filters: () => Partial<BookSidebarStoreInterface>;
}

export const useBookSidebarStore = create<BookSidebarStoreInterface>((set, get) => ({
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
