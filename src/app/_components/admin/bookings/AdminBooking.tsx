"use client";

import { FC } from "react";
import AdminSharedComponent from "../shared/AdminSharedComponent";

const AdminBooking: FC = () => {
  return (
    <AdminSharedComponent showStats={false}>
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <h1 className="text-center text-5xl font-bold">Všetky objednávky</h1>
      </main>
    </AdminSharedComponent>
  );
};

export default AdminBooking;
