"use client";

import { useState, useMemo } from "react";
import { Search, BookOpen, SlidersHorizontal, X, Ghost } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "~/components/ui/pagination";
import BookSidebar from "./BookSidebar";

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
  // Přidej další položky podle potřeby...
];

const categories = ["All", "Fiction", "Non-Fiction"];
const genres = ["All", "Classic", "Science Fiction", "Science", "Biography"];

const ITEMS_PER_PAGE = 6; // Počet knih na stránku

const AllBooksWrapper = () => {
  // Lokální stavy
  const [books] = useState(initialBooks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrování knih podle zadaných kritérií
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

  // Počet celkových stránek
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

  // Pokud se filtr nebo hledaný výraz změní, resetuj stránku na 1
  // (můžeš to doplnit pomocí useEffect, zde zjednodušeně nechat aktuální logiku)

  // Výpočet knih, které se mají vykreslit na aktuální stránce
  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBooks, currentPage]);

  // Handler pro změnu stránky
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br dark:bg-background">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <BookSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
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
        {paginatedBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedBooks.map((book) => (
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
        ) : (
          <div className="py-16 text-center">
            <p className="ml-3 flex items-center justify-center text-xl text-gray-500 dark:text-white">
              <Ghost className="ml-3 h-8 w-8 animate-bounce" /> Žiadne knihy
              neboli nájdené
            </p>
          </div>
        )}

        <div className="mt-14">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, idx) => {
                const page = idx + 1;
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default AllBooksWrapper;
