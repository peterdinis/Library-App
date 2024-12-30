"use client";

import type { FC } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import GlobalErrorComponent from "@/components/shared/GlobalErrorComponent";
import { DataTable } from "@/components/shared/GlobalTable";
import Header from "@/components/shared/Header";
import { Author, columns } from "./columns";

const AdminAuthors: FC = () => {
	const data = useQuery(api.authors.allAuthorsSelect)

	if (!data) {
		return (
			<GlobalErrorComponent
				statusCode="404"
				message="Spisovatelia neboli nájdený"
				linkHref="/admin"
				linkText="Načítať znova"
			/>
		);
	}

	return (
		<div className="mt-4">
			<Header text="Zoznam všetkých spisovateľov" />
			<DataTable columns={columns} data={data as unknown as Author[]} />
		</div>
	);
};

export default AdminAuthors;