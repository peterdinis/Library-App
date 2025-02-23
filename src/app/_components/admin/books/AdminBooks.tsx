"use client";

import { Loader2 } from "lucide-react";
import { FC } from "react";
import { api } from "~/trpc/react";
import { columns } from "./columns";
import { Book } from "@prisma/client";
import { BooksTable } from "./BooksTable";
import AdminSharedComponent from "../shared/AdminSharedComponent";

const AdminBooks: FC = () => {
  const { data, isLoading } = api.book.getAllBooks.useQuery();

  if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

  return (
    <AdminSharedComponent showStats={false}>
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <h1 className="text-center text-5xl font-bold">Všetky Knihy</h1>
        <div className="mt-8">
          <BooksTable columns={columns} data={data as unknown as Book[]} />
        </div>
      </main>
    </AdminSharedComponent>
  );
};

export default AdminBooks;
