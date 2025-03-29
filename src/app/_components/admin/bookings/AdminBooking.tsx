"use client";

import { FC } from "react";
import AdminSharedComponent from "../shared/AdminSharedComponent";
import { api } from "~/trpc/react";
import { Loader2 } from "lucide-react";
import { BookingTable } from "./BookingsTable";
import { Booking, columns } from "./columns";

const AdminBooking: FC = () => {
  const { data, isLoading } = api.booking.getAllBookings.useQuery();

  console.log("D", data)

  if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;
  return (
    <AdminSharedComponent showStats={false}>
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <h1 className="text-center text-5xl font-bold">Všetky objednávky</h1>
        <div className="mt-8">
          <BookingTable columns={columns} data={data as unknown as Booking[]} />
        </div>
      </main>
    </AdminSharedComponent>
  );
};

export default AdminBooking;
