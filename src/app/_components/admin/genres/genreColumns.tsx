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
import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";

export type Genre = {
  id: string;
  name: string;
};

export const genreColumns: ColumnDef<Genre>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Názov žánru",
  },
  {
    id: "actions",
    header: "Akcie",
    cell: ({ row }) => {
      const genre = row.original;
      const [openEdit, setOpenEdit] = useState(false);
      const [oepnSearchModal, setOpenSearchModal] = useState(false)
      const [openDelete, setOpenDelete] = useState(false);
      const [newName, setNewName] = useState(genre.name);
      const utils = api.useUtils();
      const {toast} = useToast()
      
      const updateGenre = api.genre.updateGenre.useMutation({
        onSuccess: () => {
          setOpenEdit(false);
          toast({
            title: "Žáner bol upravený",
            duration: 2000,
            className: "bg-green-800 text-white font-bold text-xl"
          })
          utils.genre.invalidate()
        },
      });

      const deleteGenre = api.genre.deleteGenre.useMutation({
        onSuccess: () => {
          setOpenDelete(false);
          toast({
            title: "Žáner nebol upravený",
            duration: 2000,
            className: "bg-red-800 text-white font-bold text-xl"
          })
          utils.genre.invalidate()
        },
      });

      return (
        <div className="flex gap-3">
          <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-green-600 hover:bg-green-800">Vyhľadať žáner</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upraviť žáner</DialogTitle>
                <DialogDescription>
                  Upravte názov žánru a potvrďte zmeny.
                </DialogDescription>
              </DialogHeader>
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
              <Button
                onClick={() => updateGenre.mutate({ id: genre.id, name: newName })}
                disabled={updateGenre.isPending}
              >
                Uložiť zmeny
              </Button>
            </DialogContent>
          </Dialog>

          <Dialog open={oepnSearchModal} onOpenChange={setOpenSearchModal}>
            <DialogTrigger asChild>
              <Button variant="outline">Upraviť</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upraviť žáner</DialogTitle>
                <DialogDescription>
                  Upravte názov žánru a potvrďte zmeny.
                </DialogDescription>
              </DialogHeader>
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
              <Button
                onClick={() => updateGenre.mutate({ id: genre.id, name: newName })}
                disabled={updateGenre.isPending}
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
                  Táto akcia je nezvratná. Žáner bude odstránený.
                </DialogDescription>
              </DialogHeader>
              <Button
                variant="destructive"
                onClick={() => deleteGenre.mutate(genre.id)}
                disabled={deleteGenre.isPending}
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
