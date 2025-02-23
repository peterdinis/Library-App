"use client";

import type { Genre } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { type FC } from "react";
import { api } from "~/trpc/react";
import { GenresTable } from "./GenresTable";
import { genreColumns } from "./genreColumns";
import AdminSharedComponent from "../shared/AdminSharedComponent";

const AdminGenres: FC = () => {
  const { data, isLoading } = api.genre.getAllGenres.useQuery();

  if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

  return (
    <AdminSharedComponent showStats={false}>
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <h1 className="text-center text-5xl font-bold">Všetky žánre</h1>
        <GenresTable data={data as unknown as Genre[]} columns={genreColumns} />
      </main>
    </AdminSharedComponent>
  );
};

export default AdminGenres;
