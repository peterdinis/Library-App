"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import { useToast } from "~/hooks/shared/use-toast";

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

const { toast } = useToast();

const utils = api.useUtils();
const deleteBooking = api.booking.deleteBooking.useMutation({
  onSuccess: () => {
    toast({
      title: "Podarilo sa zmazať objednávku",
      className: "bg-green-800 text-white font-bold text-xl",
      duration: 2000,
    });
    utils.booking.getAllBookings.invalidate();
  },
  onError: () => {
    toast({
      title: "Nepodarilo sa zmazať objednávku",
      className: "bg-red-800 text-white font-bold text-xl",
      duration: 2000,
    });
  },
});

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
      const form = useForm();
      return (
        <div className="flex items-center gap-2">
          <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogTrigger asChild>
              <Button size="icon" variant="outline">
                <Pencil className="h-4 w-4" />
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
                <Form {...form}>
                  <FormField
                    control={form.control}
                    name="book"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kniha</FormLabel>
                        <FormControl>
                          <Input value={booking.book?.title ?? "-"} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input value={booking.user?.email ?? "-"} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stav</FormLabel>
                        <FormControl>
                          <Input value={booking.status} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="borrowedDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Požičané od</FormLabel>
                        <FormControl>
                          <Input
                            value={
                              booking.borrowedDate
                                ? format(
                                    new Date(booking.borrowedDate),
                                    "dd.MM.yyyy",
                                    { locale: sk },
                                  )
                                : "-"
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Požičané do</FormLabel>
                        <FormControl>
                          <Input
                            value={
                              booking.dueDate
                                ? format(
                                    new Date(booking.dueDate),
                                    "dd.MM.yyyy",
                                    { locale: sk },
                                  )
                                : "-"
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Form>
              </div>
              <DialogFooter>
                <Button onClick={() => setOpenEdit(false)}>Uložiť</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogTrigger asChild>
              <Button size="icon" variant="destructive">
                <Trash2 className="h-4 w-4" />
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
                    deleteBooking.mutate({ id: booking.id });
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
