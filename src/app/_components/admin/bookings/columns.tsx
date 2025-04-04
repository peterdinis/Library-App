"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

type Book = {
  title: string;
};

type User = {
  email: string;
};

export type Booking = {
  id: string;
  book?: Book;
  user?: User;
  status: string;
  dueDate: string;
  borrowedDate: string;
};

export const bookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: "bookName",
    header: "Názov knihy",
    accessorFn: (row) => row.book?.title,
  },
  {
    accessorKey: "userEmail",
    header: "Email osoby ktorá má požičanú knihu",
    accessorFn: (row) => row.user?.email,
  },
  {
    accessorKey: "status",
    header: "Stav objednávky",
  },
  {
    accessorKey: "borrowedDate",
    header: "Požičané od",
    cell: ({ getValue }) => {
      const date = getValue() as string;
      return date ? format(new Date(date), "dd.MM.yyyy", { locale: sk }) : "-";
    },
  },
  {
    accessorKey: "dueDate",
    header: "Požičané do",
    cell: ({ getValue }) => {
      const date = getValue() as string;
      return date ? format(new Date(date), "dd.MM.yyyy", { locale: sk }) : "-";
    },
  },
  {
    id: "actions",
    header: "Akcie",
    cell: ({ row }) => {
      const booking = row.original;
      const [openEdit, setOpenEdit] = useState(false);
      const [openDelete, setOpenDelete] = useState(false);

      return (
        <div className="flex items-center gap-2">
          {/* Edit Dialog */}
          <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogTrigger asChild>
              <Button size="icon" variant="outline">
                <Pencil className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upraviť objednávku</DialogTitle>
                <DialogDescription>
                  Tu môžeš upraviť detaily objednávky.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <p><strong>Kniha:</strong> {booking.book?.title ?? "-"}</p>
                <p><strong>Email:</strong> {booking.user?.email ?? "-"}</p>
                <p><strong>Stav:</strong> {booking.status}</p>
                <p><strong>Požičané od:</strong> {booking.borrowedDate ? format(new Date(booking.borrowedDate), "dd.MM.yyyy", { locale: sk }) : "-"}</p>
                <p><strong>Požičané do:</strong> {booking.dueDate ? format(new Date(booking.dueDate), "dd.MM.yyyy", { locale: sk }) : "-"}</p>
              </div>
              <DialogFooter>
                <Button onClick={() => setOpenEdit(false)}>Uložiť</Button>
              </DialogFooter>
            </DialogContent>

          </Dialog>

          {/* Delete Dialog */}
          <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogTrigger asChild>
              <Button size="icon" variant="destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Zmazať objednávku</DialogTitle>
                <DialogDescription>
                  Naozaj chceš zmazať túto objednávku? Táto akcia je nezvratná.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDelete(false)}>
                  Zrušiť
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    // Tu môžeš volať svoje delete API
                    console.log("Zmazaná objednávka", booking.id);
                    setOpenDelete(false);
                  }}
                >
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