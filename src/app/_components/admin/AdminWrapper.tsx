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
import { api } from "~/trpc/react";
import { bookingColumns } from "./bookings/columns";
import { UsersTable } from "./users/UsersTable";
import { User } from "@prisma/client";
import { userColumns } from "./users/columns";
import Loader from "~/components/ui/loader";

const AdminWrapper: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const admin = useAdmin();
  const { data, isLoading } = api.booking.getAllBookings.useQuery();
  const { data: usersData, isLoading: userLoading } =
    api.user.getAllUsers.useQuery();

  const teacher = useTeacher();

  if (isLoading || userLoading) return <Loader width={8} height={8} />;

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
      <div className="dark:bg-background mt-8 overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="border-b border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg font-semibold">
            Nový prihlasení používatelia
          </h2>
        </div>
        <UsersTable data={usersData as any} columns={userColumns} />
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
