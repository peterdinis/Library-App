"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon, Ghost } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button, Table, TableBody, TableCell, TableHeader, TableRow } from "@nextui-org/react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize] = useState(10);

    const table = useReactTable({
        data,
        columns,
        state: {
            pagination: {
                pageIndex,
                pageSize,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
            <Link href="/admin/profile" passHref>
                <Button variant="solid" color="success" size="lg">
                    Späť na admin profil
                </Button>
            </Link>
            <div className="rounded-md border mt-5">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHeader key={header.id}>
                                        <>
                                            {!header.isPlaceholder &&
                                                flexRender(header.column.columnDef.header, header.getContext())}
                                        </>
                                    </TableHeader>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected()
                                            ? "selected"
                                            : undefined
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    <Ghost className="h-8 w-8 mx-auto" />
                                    Nič nebolo nájdené
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="mt-5">
                    <div className="flex items-center justify-between border-t border-gray-200 dark:bg-background px-4 py-3 sm:px-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <button
                                onClick={() =>
                                    setPageIndex(Math.max(0, pageIndex - 1))
                                }
                                disabled={pageIndex === 0}
                                className="relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() =>
                                    setPageIndex(
                                        Math.min(
                                            pageIndex + 1,
                                            table.getPageCount() - 1,
                                        ),
                                    )
                                }
                                disabled={pageIndex >= table.getPageCount() - 1}
                                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm dark:text-blue-50 text-gray-700">
                                    Stránka{" "}
                                    <span className="font-medium">
                                        {pageIndex + 1}
                                    </span>{" "}
                                    z{" "}
                                    <span className="font-medium">
                                        {table.getPageCount()}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <nav
                                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                                    aria-label="Pagination"
                                >
                                    <button
                                        onClick={() =>
                                            setPageIndex(
                                                Math.max(0, pageIndex - 1),
                                            )
                                        }
                                        disabled={pageIndex === 0}
                                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    >
                                        <span className="sr-only">
                                            Previous
                                        </span>
                                        <ChevronLeftIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </button>
                                    <span
                                        aria-current="page"
                                        className="relative z-10 dark:text-blue-50 inline-flex items-center px-4 py-2 text-sm font-semibold text-black focus:z-20"
                                    >
                                        {pageIndex + 1}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setPageIndex(
                                                Math.min(
                                                    pageIndex + 1,
                                                    table.getPageCount() - 1,
                                                ),
                                            )
                                        }
                                        disabled={
                                            pageIndex >=
                                            table.getPageCount() - 1
                                        }
                                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    >
                                        <span className="sr-only">Next</span>
                                        <ChevronRightIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
