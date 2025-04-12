"use client";

import { FC } from "react";
import { UsersTable } from "./UsersTable";
import AdminSharedComponent from "../shared/AdminSharedComponent";
import { api } from "~/trpc/react";
import { User } from "@prisma/client";
import { userColumns } from "./columns";
import Loader from "~/components/ui/loader";

const AdminUsers: FC = () => {
  const { data, isLoading } = api.user.getAllUsers.useQuery();

  if (isLoading) return <Loader width={8} height={8} />
  return (
    <AdminSharedComponent showStats={false}>
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <h1 className="text-center text-5xl font-bold">
          Všetci používatelia učitelia / študenti
        </h1>
        <div className="mt-4">
          <UsersTable columns={userColumns} data={data as unknown as User[]} />
        </div>
      </main>
    </AdminSharedComponent>
  );
};

export default AdminUsers;
