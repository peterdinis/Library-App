"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type Author = {
  id: string;
  name: string;
};

export const authorsColumns: ColumnDef<Author>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Meno spisovateľa/ky",
  },
];
