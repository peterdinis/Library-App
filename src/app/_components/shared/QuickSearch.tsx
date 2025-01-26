"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "~/components/ui/dialog";
import { Search } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "~/components/ui/button";
import { DialogHeader } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";

const QuickSearch: FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
          <Input placeholder="Hľadaj kihu/y" className="flex-1" />
          <Button>Hľadat</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickSearch;
