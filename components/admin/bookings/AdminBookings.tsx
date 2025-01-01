"use client";

import Admin from "@/components/auth/Admin";
import Header from "@/components/shared/Header";
import type { FC } from "react";

const AdminBookings: FC = () => {
	return (
		<Admin>
			<div className="mt-10">
				<Header text="Zoznam všetkých objednávok" />
			</div>
		</Admin>
	);
};

export default AdminBookings;
