"use client";

import { Role } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { toast } from "~/hooks/shared/use-toast";
import { api } from "~/trpc/react";

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: Role;
};

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "fullName",
    header: "Celé meno",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Rola",
  },
  {
    id: "actions",
    header: "Akcie",
    cell: ({ row }) => {
      const user = row.original;
      const [open, setOpen] = useState(false);

      const utils = api.useUtils();
      const deleteUser = api.user.deleteUserById.useMutation({
        onSuccess: async () => {
          toast({
            title: "Používateľ úspešne zmazaný"
          })
          await utils.user.getAllUsers.invalidate();
          setOpen(false);
        },
        onError: (err) => {
          toast({
            title: "Chyba pri mazání používateľa"
          })
        },
      });

      const handleDelete = () => {
        deleteUser.mutate({ id: user.id });
      };

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm">
              Zmazať
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Si si istý?</DialogTitle>
              <DialogDescription>
                Tento krok nenávratne odstráni používateľa <strong>{user.fullName}</strong>.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Zrušiť
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={deleteUser.isPending}>
                {deleteUser.isPending ? "Mazanie..." : "Zmazať"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
