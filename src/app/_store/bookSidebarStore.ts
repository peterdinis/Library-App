import {create} from "zustand"

type FilterState = {
  selectedCategory: string;
  selectedGenre: string;
  selectedAuthor: string;
  setFilters: (category: string, genre: string, author: string) => void;
  clearFilters: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  selectedCategory: "",
  selectedGenre: "",
  selectedAuthor: "",
  setFilters: (category, genre, author) =>
    set({ selectedCategory: category, selectedGenre: genre, selectedAuthor: author }),
  clearFilters: () => set({ selectedCategory: "", selectedGenre: "", selectedAuthor: "" }),
}));
