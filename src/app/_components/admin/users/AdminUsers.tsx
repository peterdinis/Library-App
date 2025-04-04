"use client";

import { FC } from "react";
import { UsersTable } from "./UsersTable";
import AdminSharedComponent from "../shared/AdminSharedComponent";
import { columns } from "./columns";
import { api } from "~/trpc/react";
import { Loader2 } from "lucide-react";
import { User } from "@prisma/client";

const AdminUsers: FC = () => {
  const { data, isLoading } = api.user.getAllUsers.useQuery();

  console.log("D", data);

  if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;
  return (
    <AdminSharedComponent showStats={false}>
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <h1 className="text-center text-5xl font-bold">
          Všetci používatelia učitelia / študenti
        </h1>
        <div className="mt-4">
          <UsersTable columns={columns} data={data as unknown as User[]} />
        </div>
      </main>
    </AdminSharedComponent>
  );
};

export default AdminUsers;
