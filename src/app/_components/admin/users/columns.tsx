"use client";

import { Role } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: Role;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },

  {
    accessorKey: "fullName",
    header: "Celé meno",
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "role",
    header: "Rola",
  },
];
