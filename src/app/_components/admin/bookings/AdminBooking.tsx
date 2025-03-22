"use client";

import { FC } from "react";
import AdminSharedComponent from "../shared/AdminSharedComponent";
import { api } from "~/trpc/react";
import { Loader2 } from "lucide-react";

const AdminBooking: FC = () => {
  const { data, isLoading } = api.booking.getAllBookings.useQuery();

  if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

  console.log("D", data);
  return (
    <AdminSharedComponent showStats={false}>
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <h1 className="text-center text-5xl font-bold">Všetky objednávky</h1>
      </main>
    </AdminSharedComponent>
  );
};

export default AdminBooking;
