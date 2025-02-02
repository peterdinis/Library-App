"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "~/components/ui/dialog";
import { Loader2, Search, Frown, Ghost } from "lucide-react";
import { FC, useState, ChangeEvent } from "react";
import { Button } from "~/components/ui/button";
import { DialogHeader } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import Link from "next/link";

const QuickSearch: FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: books,
    isLoading,
    isError,
  } = api.book.quickSearchBook.useQuery(searchQuery, {
    enabled: searchQuery.length > 2,
    retry: 1,
    staleTime: Infinity,
  });

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-accent lg:h-10 lg:w-10"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rýchle vyhľadávanie</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 py-4">
          <Input
            placeholder="Hľadaj knihu"
            className="flex-1"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <Button>Hľadať</Button>
        </div>
        <div className="py-4">
          {isLoading && <Loader2 className="animate-spin" />}
          {isError && !isLoading && (
            <p className="mt-4 text-2xl font-bold text-red-600">
              <Frown /> Nastala chyba na strane applikácie
            </p>
          )}
          {!isError && books && books.length > 0 ? (
            <ul className="space-y-3">
              {books.map((book) => (
                <li
                  key={book.id}
                  className="cursor-pointer rounded-md border p-3 transition-all hover:bg-gray-100"
                >
                  <p className="text-lg font-semibold text-blue-600">
                    <Link href={`/books/${book.id}`}>{book.title}</Link>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            searchQuery.length > 2 && (
              <p className="text-center text-xl font-bold text-gray-500">
                <Ghost className="animate-bounce" /> Kniha sa nenašla
              </p>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickSearch;
