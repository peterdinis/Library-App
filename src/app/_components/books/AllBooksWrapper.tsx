"use client";

import { Ghost, Loader2, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { api } from "~/trpc/react";
import BookSearch from "./BookSearch";
import BookSidebar from "./BookSidebar";
import BooksHeader from "./BooksHeader";
import { useFilterStore } from "~/app/_store/bookSidebarStore";

const AllBooksWrapper = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const filters = useFilterStore((state) => state.filters());
  const { data: searchResults, isLoading: isSearching } =
    api.book.quickSearchBook.useQuery(searchQuery, {
      enabled: searchQuery.length > 0,
    });

  const { data: paginatedData, isLoading: isLoadingPaginated } =
    api.book.getPaginatedBooks.useQuery(
      {
        page: currentPage,
        pageSize: 6,
        categoryId: filters?.categoryId || undefined,
        genreId: filters?.genreId || undefined,
        authorId: filters?.authorId || undefined,
      },
      {
        enabled: searchQuery.length === 0,
      },
    );

  const books =
    searchQuery.length > 0 ? searchResults : paginatedData?.books || [];
  const isLoading = searchQuery.length > 0 ? isSearching : isLoadingPaginated;
  const totalPages = paginatedData?.totalPages || 1;

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

          <Button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 rounded-2xl bg-white/80 px-4 py-3 shadow-xl backdrop-blur-sm transition-colors hover:bg-white/90 dark:bg-background"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span className="hidden sm:inline">Filtre</span>
          </Button>
        </div>

        {isLoading ? (
          <Loader2 className="h-8 w-8 animate-spin" />
        ) : books!.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books!.map((book) => (
              <div key={book.id} className="group">
                <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    width={60}
                    height={60}
                    className="absolute inset-0 h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      {book.isAvaible ? (
                        <Badge variant={"success"}>Dostupná</Badge>
                      ) : (
                        <Badge variant={"destructive"}>Nedostupná</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="mb-1 line-clamp-1 text-lg font-semibold text-gray-900 dark:text-sky-50">
                    {book.title}
                  </h3>
                  <Button variant={"link"} className="text-sky-600 dark:text-sky-200">
                    <Link href={`/books/${book.id}`}>Detail Knihy</Link>
                  </Button>
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

        {searchQuery.length === 0 && (
          <div className="mt-14">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">{currentPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooksWrapper;
