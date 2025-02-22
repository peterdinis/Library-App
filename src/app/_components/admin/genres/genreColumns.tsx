"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type Genre = {
	id: string;
	name: string;
};

export const genreColumns: ColumnDef<Genre>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "name",
		header: "Názov žánru",
	},
];
