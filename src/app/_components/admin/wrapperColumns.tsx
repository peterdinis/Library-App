"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Booking = {
  id: string;
  bookName: string;
  email: number;
  from: Date | string;
  to: Date | string;
  status: string;
};

export const wrapperColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "bookName",
    header: "Názov knihy",
  },
  {
    accessorKey: "email",
    header: "Email žiaka/učiteľa",
  },

  {
    accessorKey: "from",
    header: "Požičaná od",
  },

  {
    accessorKey: "to",
    header: "Požičaná do",
  },

  {
    accessorKey: "status",
    header: "Stav",
  },
];
