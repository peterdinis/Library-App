"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type Publisher = {
    id: string;
    name: string;
    description: string;
}

export const columns: ColumnDef<Publisher>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "name",
		header: "Meno vydavateľstva",
		enableSorting: true,
		enableGlobalFilter: true,
	},
	{
		accessorKey: "description",
		header: "Popis vydavateľstva",
		enableSorting: true,
		enableGlobalFilter: true,
	},
];