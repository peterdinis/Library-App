"use client";

import { X } from "lucide-react";
import { FC, useState } from "react";
import { useFilterStore } from "~/app/_store/bookSidebarStore";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
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

  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>();
  const [selectedAuthor, setSelectedAuthor] = useState<string | undefined>();

  console.log(selectedAuthor, selectedGenre, selectedCategory);
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters({ [filterType]: value });

    if (filterType === "categoryId") setSelectedCategory(value);
    if (filterType === "genreId") setSelectedGenre(value);
    if (filterType === "authorId") setSelectedAuthor(value);
  };

  const handleClearFilters = () => {
    clearFilters();

    setSelectedCategory(undefined);
    setSelectedGenre(undefined);
    setSelectedAuthor(undefined);
  };

  return (
    <div
      className={`dark:bg-background fixed top-0 right-0 z-50 h-full w-80 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button onClick={() => setIsSidebarOpen(false)} className="p-4">
        <X className="h-6 w-6" />
      </button>

      <div className="space-y-4 p-4">
        <Label htmlFor="category">Kategória</Label>
        <Select
          onValueChange={(value) => handleFilterChange("categoryId", value)}
          value={selectedCategory === undefined ? "" : selectedCategory}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Vyber kategóriu" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label htmlFor="genre">Žáner</Label>
        <Select
          onValueChange={(value) => handleFilterChange("genreId", value)}
          value={selectedGenre === undefined ? "" : selectedGenre}
        >
          <SelectTrigger id="genre">
            <SelectValue placeholder="Vyber žáner" />
          </SelectTrigger>
          <SelectContent>
            {genres?.map((genre) => (
              <SelectItem key={genre.id} value={genre.id}>
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label htmlFor="author">Autor</Label>
        <Select
          onValueChange={(value) => handleFilterChange("authorId", value)}
          value={selectedAuthor === undefined ? "" : selectedAuthor}
        >
          <SelectTrigger id="author">
            <SelectValue placeholder="Vyber autora" />
          </SelectTrigger>
          <SelectContent>
            {authors?.map((author) => (
              <SelectItem key={author.id} value={author.id}>
                {author.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          className="mt-6 w-full rounded-lg"
          onClick={handleClearFilters}
          variant="default"
          size="lg"
        >
          Vymazať filtre
        </Button>
      </div>
    </div>
  );
};

export default BookSidebar;
