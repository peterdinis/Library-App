"use client";

import type { FC } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import GlobalErrorComponent from "@/components/shared/GlobalErrorComponent";
import Header from "@/components/shared/Header";

const AdminBooks: FC = () => {
	const data = useQuery(api.books.allSelectBooks)

	if (!data) {
		return (
			<GlobalErrorComponent
				statusCode="404"
				message="Knihy neboli nájdené"
				linkHref="/admin/books"
				linkText="Načítať znova"
			/>
		);
	}

	return (
		<div className="mt-4">
			<Header text="Zoznam všetkých kníh" />
			
		</div>
	);
};

export default AdminBooks;