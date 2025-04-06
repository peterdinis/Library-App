"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { booleanColumnHelper } from "~/utils/booleanTableColumn";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";
import { api } from "~/trpc/react";
import { useToast } from "~/hooks/shared/use-toast";

export type Book = {
  id: string;
  title: string;
  availableCopies: number;
  isAvaible: boolean;
  rating: number;
};

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: "Názov",
  },
  {
    accessorKey: "availableCopies",
    header: "Počet kopií",
  },
  {
    accessorKey: "isAvaible",
    header: "Dostupnosť",
    cell: ({ getValue }) => booleanColumnHelper(getValue() as boolean),
  },
  {
    accessorKey: "rating",
    header: "Hodnotenie",
  },
  {
    id: "actions",
    header: "Akcie",
    cell: ({ row }) => {
      const book = row.original;
      const [deleteOpen, setDeleteOpen] = useState(false);
      const [editOpen, setEditOpen] = useState(false);
      const [formData, setFormData] = useState({
        title: book.title,
        rating: book.rating,
        availableCopies: book.availableCopies,
      });

      const { toast } = useToast();
      const utils = api.useUtils();

      const deleteBookMutation = api.book.deleteBook.useMutation({
        onSuccess: () => {
          toast({ title: `Kniha „${book.title}“ bola zmazaná.` });
          utils.book.getAllBooks.invalidate();
        },
        onError: () => {
          toast({ title: "Zmazanie knihy sa nepodarilo" });
        },
      });

      const updateBookMutation = api.book.updateBook.useMutation({
        onSuccess: () => {
          toast({ title: `Kniha „${formData.title}“ bola aktualizovaná.` });
          utils.book.getAllBooks.invalidate();
          setEditOpen(false);
        },
        onError: () => {
          toast({ title: "Úprava knihy sa nepodarila" });
        },
      });

      const handleDelete = () => {
        deleteBookMutation.mutate(book.id);
        setDeleteOpen(false);
      };

      const handleUpdate = () => {
        updateBookMutation.mutate({
          id: book.id,
          ...formData,
        });
      };

      return (
        <div className="flex items-center gap-2">
          {/* Update Dialog */}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Upraviť
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upraviť knihu</DialogTitle>
                <DialogDescription>
                  Zmeň informácie o knihe <strong>{book.title}</strong>.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-medium">Názov</label>
                  <input
                    className="mt-1 w-full rounded border px-3 py-2"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Hodnotenie
                  </label>
                  <input
                    type="number"
                    className="mt-1 w-full rounded border px-3 py-2"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rating: Number(e.target.value),
                      })
                    }
                    min={0}
                    max={5}
                    step={0.1}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Dostupné kópie
                  </label>
                  <input
                    type="number"
                    className="mt-1 w-full rounded border px-3 py-2"
                    value={formData.availableCopies}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availableCopies: Number(e.target.value),
                      })
                    }
                    min={0}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setEditOpen(false)}>
                  Zrušiť
                </Button>
                <Button onClick={handleUpdate}>Uložiť</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Dialog */}
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Zmazať
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Si si istý?</DialogTitle>
                <DialogDescription>
                  Tento krok nenávratne odstráni knihu{" "}
                  <strong>{book.title}</strong>.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setDeleteOpen(false)}>
                  Zrušiť
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Zmazať
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
