"use client";

import type { FC } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import GlobalErrorComponent from "@/components/shared/GlobalErrorComponent";
import { DataTable } from "@/components/shared/GlobalTable";
import Header from "@/components/shared/Header";
import { columns } from "./columns";
import { Category } from "@/types/CategoryTypes";

const AdminCategories: FC = () => {
	const data = useQuery(api.categories.allSelectCategories)

	if (!data) {
		return (
			<GlobalErrorComponent
				statusCode="404"
				message="Kategórie neboli nájdené"
				linkHref="/admin"
				linkText="Načítať znova"
			/>
		);
	}

	return (
		<div className="mt-4">
			<Header text="Zoznam všetkých kategórií" />
			<DataTable columns={columns} data={data as unknown as Category[]} />
		</div>
	);
};

export default AdminCategories;