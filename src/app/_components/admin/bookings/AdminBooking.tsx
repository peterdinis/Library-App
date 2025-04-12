"use client";

import { FC } from "react";
import AdminSharedComponent from "../shared/AdminSharedComponent";
import { api } from "~/trpc/react";
import { BookingTable } from "./BookingsTable";
import { Booking, bookingColumns } from "./columns";
import Loader from "~/components/ui/loader";

const AdminBooking: FC = () => {
  const { data, isLoading } = api.booking.getAllBookings.useQuery();

  if (isLoading) return <Loader width={8} height={8} />
  return (
    <AdminSharedComponent showStats={false}>
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <h1 className="text-center text-5xl font-bold">Všetky objednávky</h1>
        <div className="mt-8">
          <BookingTable
            columns={bookingColumns}
            data={data as unknown as Booking[]}
          />
        </div>
      </main>
    </AdminSharedComponent>
  );
};

export default AdminBooking;
