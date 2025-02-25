"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type Book = {
  id: string;
  title: string;
  availableCopies: number;
  isAvaible: boolean;
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
  },
];
