"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type Category = {
  id: string;
  name: string;
};

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Názov kategórie",
  },
];
