"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Book = {
  id: string;
  title: string;
  avaiableCopies: number
  isAvaiable: boolean
};

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: "Názov",
  },
  {
    accessorKey: "avaiableCopies",
    header: "Počet kopií"
  },

  {
    accessorKey: "isAvaiable",
    header: "Dostupnosť"
  }
];
