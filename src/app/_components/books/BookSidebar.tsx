"use client";

import { X } from "lucide-react";
import { FC } from "react";
import { useFilterStore } from "~/app/_store/bookSidebarStore";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";

type BookSidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
};

const BookSidebar: FC<BookSidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const { setFilters, clearFilters } = useFilterStore();
  const { data: categories } = api.category.getAllCategories.useQuery();
  const { data: genres } = api.genre.getAllGenres.useQuery();
  const { data: authors } = api.author.getAllAuthors.useQuery();

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters({ [filterType]: value });
  };

  return (
    <div
      className={`fixed right-0 top-0 z-50 h-full w-80 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-background ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button onClick={() => setIsSidebarOpen(false)} className="p-4">
        <X className="h-6 w-6" />
      </button>

      <div className="space-y-4 p-4">
        <Label>Kategória</Label>
        {categories?.map((category) => (
          <button
            key={category.id}
            onClick={() => handleFilterChange("categoryId", category.id)}
            className="block"
          >
            {category.name}
          </button>
        ))}

        <Label>Žáner</Label>
        {genres?.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleFilterChange("genreId", genre.id)}
            className="block"
          >
            {genre.name}
          </button>
        ))}

        <Label>Autor</Label>
        {authors?.map((author) => (
          <button
            key={author.id}
            onClick={() => handleFilterChange("authorId", author.id)}
            className="block"
          >
            {author.name}
          </button>
        ))}

        <button onClick={clearFilters} className="mt-4 text-red-500">
          Vymazať filtre
        </button>
      </div>
    </div>
  );
};

export default BookSidebar;
