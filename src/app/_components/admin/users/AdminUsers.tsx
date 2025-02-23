"use client";

import { FC } from "react";
import { columns } from "../books/columns";
import { UsersTable } from "./UsersTable";
import AdminSharedComponent from "../shared/AdminSharedComponent";

const AdminUsers: FC = () => {
	return (
		<AdminSharedComponent showStats={false}>
			<main className="flex-1 overflow-auto p-4 sm:p-6">
				<h1 className="text-center text-5xl font-bold">
					Všetci používatelia učitelia / študenti
				</h1>
				<div className="mt-4">
					<UsersTable columns={columns} data={[]} />
				</div>
			</main>
		</AdminSharedComponent>
	)
}

export default AdminUsers