"use client";

import { Frown, Search } from "lucide-react";
import Link from "next/link";
import { type ChangeEvent, type FC, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Loader from "~/components/ui/loader";
import { api } from "~/trpc/react";

const AdminQuickSearch: FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchMutation = api.admin.searchAll.useMutation();

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 2) {
      searchMutation.mutate({ query: value });
    }
  };

  const handleClick = () => {
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const { data: results, isPending, isError } = searchMutation;

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
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Rýchle vyhľadávanie v Adminovi
          </DialogTitle>
          <Label className="mt-4">
            Minimálny počet znakov pre vyhľadávanie je 3
          </Label>
        </DialogHeader>
        <div className="flex gap-2 py-4">
          <Input
            placeholder="Hľadaj..."
            className="flex-1"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>

        <div className="space-y-6 py-4">
          {isPending && <Loader width={8} height={8} />}
          {isError && !isPending && (
            <p className="mt-4 flex items-center gap-2 text-2xl font-bold text-red-600">
              <Frown /> Nastala chyba na strane aplikácie
            </p>
          )}

          {!isPending && results && (
            <>
              {Object.entries(results).map(([type, items]) =>
                items.length > 0 ? (
                  <div key={type}>
                    <h3 className="text-lg font-bold capitalize">{type}</h3>
                    <ul className="mt-2 space-y-2">
                      {items.map((item: any) => (
                        <li
                          key={item.id}
                          className="cursor-pointer rounded-md border p-3 transition-all hover:bg-gray-100"
                        >
                          <Link
                            href={`/${type}/${item.id}`}
                            onClick={handleClick}
                          >
                            <p className="text-md font-semibold text-blue-600">
                              {item.title ||
                                item.fullName ||
                                item.name ||
                                item.className ||
                                "Detail"}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null,
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminQuickSearch;
