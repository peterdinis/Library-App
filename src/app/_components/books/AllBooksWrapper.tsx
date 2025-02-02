"use client";

import { useState, useMemo, FC } from "react";
import { Search, BookOpen, SlidersHorizontal, X, Ghost } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Label } from "~/components/ui/label";

const initialBooks = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    genre: "Classic",
    coverUrl:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000",
    available: true,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    genre: "Science Fiction",
    coverUrl:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=1000",
    available: true,
  },
  {
    id: 3,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Non-Fiction",
    genre: "Science",
    coverUrl:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1000",
    available: false,
  },
];

const categories = ["All", "Fiction", "Non-Fiction"];
const genres = ["All", "Classic", "Science Fiction", "Science", "Biography"];

const AllBooksWrapper: FC = () => {
  const [books] = useState(initialBooks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || book.category === selectedCategory;
      const matchesGenre =
        selectedGenre === "All" || book.genre === selectedGenre;

      return matchesSearch && matchesCategory && matchesGenre;
    });
  }, [books, searchQuery, selectedCategory, selectedGenre]);

  return (
    <div className="min-h-screen bg-gradient-to-br dark:bg-background">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
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
                Kategória
              </Label>
              <select
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:bg-stone-600"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-gray-700 dark:text-sky-50">
                Žáner
              </Label>
              <select
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:bg-stone-600"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {(selectedCategory !== "All" || selectedGenre !== "All") && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedGenre("All");
                }}
                className="w-full rounded-lg px-4 py-2 text-sm text-indigo-600 transition-colors dark:text-sky-200"
              >
                Vyčistit filtre
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <BookOpen className="h-12 w-12 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50">
              Všetky knihy
            </h1>
          </div>
        </div>

        {/* Search and Filter Toggle */}
        <div className="mx-auto mb-12 flex max-w-3xl gap-4">
          <div className="flex-1 rounded-2xl bg-white/80 shadow-xl backdrop-blur-sm dark:bg-stone-800">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Hľadať knihu..."
                className="w-full rounded-xl border-0 bg-transparent py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 rounded-2xl bg-white/80 px-4 py-3 shadow-xl backdrop-blur-sm transition-colors hover:bg-white/90 dark:bg-background"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span className="hidden sm:inline">Filtre</span>
            {(selectedCategory !== "All" || selectedGenre !== "All") && (
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">
                {(selectedCategory !== "All" ? 1 : 0) +
                  (selectedGenre !== "All" ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Active Filters */}
        {(selectedCategory !== "All" || selectedGenre !== "All") && (
          <div className="mx-auto mb-8 flex max-w-3xl flex-wrap gap-2">
            {selectedCategory !== "All" && (
              <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800">
                {selectedCategory}
              </span>
            )}
            {selectedGenre !== "All" && (
              <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800">
                {selectedGenre}
              </span>
            )}
          </div>
        )}

        {/* Books Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book) => (
            <div key={book.id} className="group">
              <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  width={60}
                  height={60}
                  className="absolute inset-0 h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${book.available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                        }`}
                    >
                      {book.available ? "Available" : "Checked Out"}
                    </span>
                    <Button variant={"link"} className="text-blue-200">
                      <Link href="/books/123">Detail Knihy</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="px-2">
                <h3 className="mb-1 line-clamp-1 text-lg font-semibold text-gray-900 dark:text-sky-50">
                  {book.title}
                </h3>
                <p className="mb-2 text-sm text-gray-600 dark:text-sky-50">
                  by {book.author}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-indigo-600 dark:text-sky-500">
                    {book.genre}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-stone-400">
                    {book.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="py-16 text-center">
            <p className="ml-3 flex items-center justify-center text-xl text-gray-500 dark:text-white">
              <Ghost className="ml-3 h-8 w-8 animate-bounce" /> Žiadne knihy
              neboli nájdené
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooksWrapper;
