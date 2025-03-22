"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type Booking = {
  id: string;
  bookName: string;
  userEmail: string;
  status: string;
  dueDate: string;
  borrowedDate: string;
};

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "bookName",
    header: "Názov knihy",
  },

  {
    accessorKey: "userEmail",
    header: "Email osoby ktorá ma požičanú knihu",
  },

  {
    accessorKey: "status",
    header: "Stav obejdnávky",
  },

  {
    accessorKey: "borrowedDate",
    header: "Požičané od",
  },

  {
    accessorKey: "dueDate",
    header: "Požičané do",
  },
];
