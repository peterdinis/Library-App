import { create } from "zustand";

type FilterState = {
  selectedCategory: string;
  selectedGenre: string;
  selectedAuthor: string;
  setFilters: (category: string, genre: string, author: string) => void;
  clearFilters: () => void;
  getFilters: () => { category: string; genre: string; author: string };
};

export const useFilterStore = create<FilterState>((set, get) => ({
  selectedCategory: "",
  selectedGenre: "",
  selectedAuthor: "",
  setFilters: (category, genre, author) =>
    set({
      selectedCategory: category,
      selectedGenre: genre,
      selectedAuthor: author,
    }),
  clearFilters: () =>
    set({ selectedCategory: "", selectedGenre: "", selectedAuthor: "" }),
  getFilters: () => {
    const { selectedCategory, selectedGenre, selectedAuthor } = get();
    return {
      category: selectedCategory,
      genre: selectedGenre,
      author: selectedAuthor,
    };
  },
}));
