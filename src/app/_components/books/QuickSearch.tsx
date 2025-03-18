"use client";

import { Frown, Ghost, Loader2, Search } from "lucide-react";
import Link from "next/link";
import { type ChangeEvent, type FC, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { DialogHeader } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

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
    staleTime: Number.POSITIVE_INFINITY,
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
          className="hover:bg-accent h-9 w-9 lg:h-10 lg:w-10"
        >
          <Search className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rýchle vyhľadávanie Kníh</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 py-4">
          <Input
            placeholder="Hľadaj knihu"
            className="flex-1"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="py-4">
          {isLoading && <Loader2 className="animate-spin" />}
          {isError && !isLoading && (
            <p className="mt-4 text-2xl font-bold text-red-600">
              <Frown /> Nastala chyba na strane applikácie
            </p>
          )}
          {!isError && books && books.length > 0 && (
            <ul className="space-y-3">
              {books.map((book) => (
                <li
                  key={book.id}
                  className="cursor-pointer rounded-md border p-3 transition-all hover:bg-gray-100"
                >
                  <p className="text-lg font-semibold text-blue-600">
                    <Link
                      href={`/books/${book.id}`}
                      onClick={() => {
                        setSearchQuery("");
                        setIsSearchOpen(false);
                      }}
                    >
                      {book.title}
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickSearch;
