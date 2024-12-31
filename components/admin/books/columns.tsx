"use client";

import { booleanCellRenderer } from "@/lib/booleanColumn";
import type { Book } from "@/types/BookTypes";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Book>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "name",
		header: "Meno knihy",
		enableSorting: true,
		enableGlobalFilter: true,
	},
	{
		accessorKey: "description",
		header: "Popis knihy",
		enableSorting: true,
		enableGlobalFilter: true,
	},
	{
		accessorKey: "isAvaiable",
		header: "Je dostupná",
		enableSorting: true,
		enableGlobalFilter: true,
		cell: ({ getValue }) => booleanCellRenderer(getValue<boolean>()),
	},
	{
		accessorKey: "itemsInStock",
		header: "Počet kusov",
		enableSorting: true,
		enableGlobalFilter: true,
	},
];
