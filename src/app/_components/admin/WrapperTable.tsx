"use client";

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "~/components/ui/pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";

interface WrapperTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function WrapperTable<TData, TValue>({
	columns,
	data,
}: WrapperTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		pageCount: Math.ceil(data.length / 10),
	});

	const currentPage = table.getState().pagination.pageIndex + 1;
	const totalPages = table.getPageCount();

	return (
		<div className="rounded-md border p-4">
			<Table className="mt-6">
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<Pagination className="mt-4 flex items-center justify-center gap-4">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						/>
					</PaginationItem>
					<PaginationItem className="font-semibold">
						{totalPages}
					</PaginationItem>
					<PaginationItem>
						<PaginationNext
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
