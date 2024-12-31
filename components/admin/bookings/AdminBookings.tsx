"use client";

import Header from "@/components/shared/Header";
import type { FC } from "react";

const AdminBookings: FC = () => {
	return (
		<div className="mt-10">
			<Header text="Zoznam všetkých objednávok" />
		</div>
	);
};

export default AdminBookings;
