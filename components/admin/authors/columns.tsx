"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type Author = {
    id: string;
    name: string;
    description: string;
    litPeriod: string;
}

export const columns: ColumnDef<Author>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Meno autora/ky",
        enableSorting: true,
        enableGlobalFilter: true,
    },
    {
        accessorKey: "description",
        header: "Popis",
        enableSorting: true,
        enableGlobalFilter: true,
    },
    {
        accessorKey: "litPeriod",
        header: "Literárne obdobie",
        enableSorting: true,
        enableGlobalFilter: true,
    },
];