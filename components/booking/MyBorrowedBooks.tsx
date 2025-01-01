"use client";

import { useUser } from "@clerk/nextjs";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import type { FC } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const MyBorrowedBooks: FC = () => {
	const {user} = useUser();
	
	const data = useQuery(api.bookings.getBookingsByEmail, {
		userEmail: user?.emailAddresses[0].emailAddress!
	});

	console.log("D", data);

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<h2 className="text-xl font-bold">Moje požičané knihy</h2>
				</CardHeader>
				<CardBody>
					<div className="grid gap-4">
						<div className="flex items-center space-x-4">
							<div className="grid gap-1.5">
								<h3 className="text-lg font-bold">aaaa</h3>
								<p className="text-sm font-medium leading-none">
									Od: 11.11.2001
								</p>
								<p className="text-sm font-medium leading-none">
									Do: 22.11.2001
								</p>
							</div>
							<Button size="sm" className="ml-5" variant="solid">
								Return booking modal
							</Button>
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default MyBorrowedBooks;
