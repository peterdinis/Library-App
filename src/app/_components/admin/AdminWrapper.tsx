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
import { WrapperTable } from "./WrapperTable";
import useTeacher from "~/hooks/useTeacher";
import useAdmin from "~/hooks/useAdmin";
import { adminColumns } from "./adminColumns";

const AdminWrapper: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const admin = useAdmin();
  const teacher = useTeacher();

  if (!admin || !teacher) {
    window.location.replace("/");
  }
  return (
    <AdminSharedComponent showStats={true}>
      <div className="dark:bg-background overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="border-b border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg font-semibold">Posledné objednávky kníh</h2>
        </div>
        <WrapperTable data={[]} columns={adminColumns} />
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
