"use client";

import { Search } from "lucide-react";
import { FC } from "react";

type BookSearchProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const BookSearch: FC<BookSearchProps> = ({
  searchQuery,
  setSearchQuery,
}: BookSearchProps) => {
  return (
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
          }}
        />
      </div>
    </div>
  );
};

export default BookSearch;
