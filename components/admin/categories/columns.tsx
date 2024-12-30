"use client";

import { Category } from "@/types/CategoryTypes";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Category>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "name",
		header: "Meno kategórie",
		enableSorting: true,
		enableGlobalFilter: true,
	},
	{
		accessorKey: "description",
		header: "Popis kategórie",
		enableSorting: true,
		enableGlobalFilter: true,
	},
];