"use client";

import type { FC } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import GlobalErrorComponent from "@/components/shared/GlobalErrorComponent";
import { DataTable } from "@/components/shared/GlobalTable";
import Header from "@/components/shared/Header";
import { columns, Publisher } from "./columns";

const AdminPublishers: FC = () => {
	const data = useQuery(api.publishers.allSelectPublishers)

	if (!data) {
		return (
			<GlobalErrorComponent
				statusCode="404"
				message="Vydavateľstvá neboli najdené"
				linkHref="/admin"
				linkText="Načítať znova"
			/>
		);
	}

	return (
		<div className="mt-4">
			<Header text="Zoznam všetkých vydavateľstiev" />
			<DataTable columns={columns} data={data as unknown as Publisher[]} />
		</div>
	);
};

export default AdminPublishers;