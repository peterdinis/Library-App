"use client";

import { Role } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: Role
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },

  {
    accessorKey: "name",
    header: "Meno"
  },

  {
    accessorKey: "lastName",
    header: "Priezvisko"
  },

  {
    accessorKey: "email",
    header: "Email"
  },

  {
    accessorKey: "role",
    header: "Rola"
  }
];
