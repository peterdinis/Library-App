"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "~/components/ui/pagination";

interface BooksTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function BooksTable<TData, TValue>({
  columns,
  data,
}: BooksTableProps<TData, TValue>) {
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
      <Button variant={"default"}>
        <Link href="/admin/books/create">Pridať novú knihu</Link>
      </Button>
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
      <Pagination className="mt-4 flex items-center justify-between sm:justify-center gap-2 sm:gap-4">
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      />
    </PaginationItem>
    <PaginationItem className="hidden sm:inline-block font-semibold">
      Strana {currentPage} z {totalPages}
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
