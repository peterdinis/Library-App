"use client";

import { FC, useState } from "react";
import AdminSharedComponent from "./shared/AdminSharedComponent";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "~/components/ui/pagination";
import { AdminTable } from "./AdminTable";
import useTeacher from "~/hooks/auth/useTeacher";
import useAdmin from "~/hooks/auth/useAdmin";
import { adminColumns } from "./adminColumns";
import { api } from "~/trpc/react";
import { Loader2 } from "lucide-react";
import { bookingColumns } from "./bookings/columns";

const AdminWrapper: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const admin = useAdmin();
  const { data, isLoading } = api.booking.getAllBookings.useQuery();
  const teacher = useTeacher();

  if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

  if (!admin || !teacher) {
    window.location.replace("/");
  }
  return (
    <AdminSharedComponent showStats={true}>
      <div className="dark:bg-background overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="border-b border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg font-semibold">Posledné objednávky kníh</h2>
        </div>
        <AdminTable data={data as any} columns={bookingColumns} />
      </div>

      <div className="mt-14">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 6))}
                disabled={currentPage === 6}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </AdminSharedComponent>
  );
};

export default AdminWrapper;
