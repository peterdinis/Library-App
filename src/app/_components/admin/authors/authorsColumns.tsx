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
import { useToast } from "~/hooks/shared/use-toast";

export type Author = {
  id: string;
  name: string;
};

export const authorsColumns: ColumnDef<Author>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Meno spisovateľa/ky",
  },
  {
    id: "actions",
    header: "Akcie",
    cell: ({ row }) => {
      const author = row.original;
      const [openEdit, setOpenEdit] = useState(false);
      const [openDelete, setOpenDelete] = useState(false);
      const [newName, setNewName] = useState(author.name);
      const utils = api.useUtils();
      const { toast } = useToast();

      const updateAuthor = api.author.updateAuthor.useMutation({
        onSuccess: () => {
          setOpenEdit(false);
          toast({
            title: "Spisovateľ/ka bol/a upravený/á",
            duration: 2000,
            className: "bg-green-800 text-white font-bold text-xl",
          });
          utils.author.invalidate();
        },
      });

      const deleteAuthor = api.author.deleteAuthor.useMutation({
        onSuccess: () => {
          setOpenDelete(false);
          toast({
            title: "Spisovateľ/ka nebol/a upravený/á",
            duration: 2000,
            className: "bg-red-800 text-white font-bold text-xl",
          });
          utils.author.invalidate();
        },
      });

      return (
        <div className="flex gap-2">
          <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogTrigger asChild>
              <Button variant="outline">Upraviť</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upraviť autora</DialogTitle>
                <DialogDescription>
                  Upravte meno autora a potvrďte zmeny.
                </DialogDescription>
              </DialogHeader>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <Button
                onClick={() =>
                  updateAuthor.mutate({ id: author.id, name: newName })
                }
                disabled={updateAuthor.isPending}
              >
                Uložiť zmeny
              </Button>
            </DialogContent>
          </Dialog>

          <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogTrigger asChild>
              <Button variant="destructive">Zmazať</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ste si istí?</DialogTitle>
                <DialogDescription>
                  Táto akcia je nezvratná. Autor bude odstránený.
                </DialogDescription>
              </DialogHeader>
              <Button
                variant="destructive"
                onClick={() => deleteAuthor.mutate(author.id)}
                disabled={deleteAuthor.isPending}
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
