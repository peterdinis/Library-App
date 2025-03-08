"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { booleanColumnHelper } from "~/utils/booleanTableColumn";

export type Book = {
  id: string;
  title: string;
  availableCopies: number;
  isAvaible: boolean;
  rating: number
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
    cell: ({ getValue }) => booleanColumnHelper(getValue() as boolean),
  },

  {
    accessorKey: "rating",
    header: "Hodnotenie"
  }
];
