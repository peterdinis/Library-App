"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, Ghost } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
import BooksHeader from "./BooksHeader";
import BookSearch from "./BookSearch";

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

const ITEMS_PER_PAGE = 6;

const AllBooksWrapper = () => {
  const [books] = useState(initialBooks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory] = useState("All");
  const [selectedGenre] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBooks, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br dark:bg-background">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <BookSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <BooksHeader />
        <div className="mx-auto mb-12 flex max-w-3xl gap-4">
          <BookSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

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
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                          book.available
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
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
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
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
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
