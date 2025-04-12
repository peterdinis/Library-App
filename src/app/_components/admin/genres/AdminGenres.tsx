"use client";

import type { Genre } from "@prisma/client";
import { type FC } from "react";
import { api } from "~/trpc/react";
import { GenresTable } from "./GenresTable";
import { genreColumns } from "./genreColumns";
import AdminSharedComponent from "../shared/AdminSharedComponent";
import Loader from "~/components/ui/loader";

const AdminGenres: FC = () => {
  const { data, isLoading } = api.genre.getAllGenres.useQuery();

  if (isLoading) return <Loader width={8} height={8} />;

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
