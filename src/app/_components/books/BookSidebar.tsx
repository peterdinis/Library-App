"use client";

import { X } from "lucide-react";
import { FC, useState } from "react";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";

type BookSidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
};

const BookSidebar: FC<BookSidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: BookSidebarProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  const { data: categories } = api.category.getAllCategories.useQuery();
  const { data: genres } = api.genre.getAllGenres.useQuery();
  const { data: author } = api.author.getAllAuthors.useQuery()
  return (
    <>
      <div
        className={`fixed right-0 top-0 z-50 h-full w-80 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-background ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-sky-50">
              Filtre
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-full p-2 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <Label className="mb-2 block text-sm font-medium text-gray-700 dark:text-sky-50">
                Žáner
              </Label>
              <select
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:bg-stone-600"
                value={selectedGenre}
                onChange={(e) => {
                  setSelectedGenre(e.target.value);
                }}
              >
                {genres?.map((item, index) => {
                  return (
                    <option key={index}>
                      {item.name}
                    </option>
                  )
                })}
              </select>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-gray-700 dark:text-sky-50">
                Spisovateľ/ka
              </Label>
              <select
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:bg-stone-600"
                value={selectedAuthor}
                onChange={(e) => {
                  setSelectedAuthor(e.target.value);
                }}
              >
                {author?.map((item, index) => {
                  return (
                    <option key={index}>
                      {item.name}
                    </option>
                  )
                })}
              </select>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-gray-700 dark:text-sky-50">
                Kategória
              </Label>
              <select
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:bg-stone-600"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
              >
                {categories?.map((item, index) => {
                  return (
                    <option key={index}>
                      {item.name}
                    </option>
                  )
                })}
              </select>
            </div>

            {(selectedCategory !== "" || selectedGenre !== "" || selectedAuthor !== "") && (
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedGenre("");
                  setSelectedAuthor("")
                }}
                className="w-full rounded-lg px-4 py-2 text-sm text-indigo-600 transition-colors dark:text-sky-200"
              >
                Vyčistit filtre
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookSidebar;
