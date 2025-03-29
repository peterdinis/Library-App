"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { sk } from "date-fns/locale"; 

type Book = {
  title: string
}

type User = {
  email: string
}

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
    accessorFn: (row) => row.book?.title
  },
  {
    accessorKey: "userEmail",
    header: "Email osoby ktorá má požičanú knihu",
    accessorFn: (row) => row.user?.email
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
];
