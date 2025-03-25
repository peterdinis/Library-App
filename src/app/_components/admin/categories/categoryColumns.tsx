"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { api } from "~/trpc/react";

export type Category = {
  id: string;
  name: string;
};

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Názov kategórie",
  },
  {
    id: "actions",
    header: "Akcie",
    cell: ({ row }) => {
      const category = row.original;
      const [openEdit, setOpenEdit] = useState(false);
      const [openDelete, setOpenDelete] = useState(false);
      const [newName, setNewName] = useState(category.name);

      // tRPC Mutácie
      const updateCategory = api.category.updateCategory.useMutation({
        onSuccess: () => {
          setOpenEdit(false);
        },
      });

      const deleteCategory = api.category.deleteCategory.useMutation({
        onSuccess: () => {
          setOpenDelete(false);
        },
      });

      return (
        <div className="flex gap-2">
          {/* Dialog na úpravu */}
          <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogTrigger asChild>
              <Button variant="outline">Upraviť</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upraviť kategóriu</DialogTitle>
                <DialogDescription>
                  Upravte názov kategórie a potvrďte zmeny.
                </DialogDescription>
              </DialogHeader>
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
              <Button
                onClick={() => updateCategory.mutate({ id: category.id, name: newName })}
                disabled={updateCategory.isPending}
              >
                Uložiť zmeny
              </Button>
            </DialogContent>
          </Dialog>

          {/* Dialog na zmazanie */}
          <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogTrigger asChild>
              <Button variant="destructive">Zmazať</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ste si istí?</DialogTitle>
                <DialogDescription>
                  Táto akcia je nezvratná. Kategória bude odstránená.
                </DialogDescription>
              </DialogHeader>
              <Button
                variant="destructive"
                onClick={() => deleteCategory.mutate(category.id)}
                disabled={deleteCategory.isPending}
              >
                Potvrdiť vymazanie
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
