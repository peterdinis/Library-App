"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useEffect } from "react";
import MyBorrowedBooks from "./MyBorrowedBooks";
import Settings from "./Settings";

const MyBookings: FC = () => {
	const { user } = useUser();
	const router = useRouter();

	return (
		<div className="grid md:grid-cols-2 md:gap-6 ml-4 mr-4">
			<div className="space-y-6 mt-5">
				<Settings />
			</div>
			<div className="mt-5">
				<MyBorrowedBooks />
			</div>
		</div>
	);
};

export default MyBookings;
