"use client";

import { type FC} from "react";
import Header from "@/components/shared/Header";

const AdminBookings: FC = () => {
	return (
		<div className="mt-10">
			<Header text="Zoznam všetkých objednávok" />
		</div>
	);
};

export default AdminBookings;
