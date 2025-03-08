"use client";

import type { Category } from "@prisma/client";
import { FC } from "react";
import { categoryColumns } from "./categoryColumns";
import { CategoriesTable } from "./CategoriesTable";
import { api } from "~/trpc/react";
import { Loader2 } from "lucide-react";
import AdminSharedComponent from "../shared/AdminSharedComponent";

const AdminCategories: FC = () => {
  const { data, isLoading } = api.category.getAllCategories.useQuery();

  if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;
  return (
    <AdminSharedComponent>
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <h1 className="text-center text-5xl font-bold">Všetky kategórie</h1>
        <div className="mt-8">
          <CategoriesTable
            data={data as unknown as Category[]}
            columns={categoryColumns}
          />
        </div>
      </main>
    </AdminSharedComponent>
  );
};

export default AdminCategories;
