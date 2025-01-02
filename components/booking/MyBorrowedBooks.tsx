"use client";

import { useUser } from "@clerk/nextjs";
import { Button, Card, CardBody, CardHeader, CircularProgress } from "@nextui-org/react";
import type { FC, Key } from "react";
import { useToast } from "@/hooks/useToast";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BookingType } from "@/types/BookingTypes";

const MyBorrowedBooks: FC = () => {
	const { user } = useUser();	
	const {toast} = useToast();

	const data = useQuery(api.bookings.getBookingsByEmail, {
		userEmail: user?.emailAddresses[0].emailAddress!,
	});

	const returnBook = useMutation(api.bookings.returnBook);

	const handleReturnBook = async(bookingId: string) => {
		try {
		  await returnBook({
			bookingId,
			userEmail: user?.emailAddresses[0]?.emailAddress!, // Ensure this is not undefined or null
		  });
		  toast({
			title: "Kniha bola vrátená",
			duration: 2000,
			className: "bg-green-800 text-white font-bold text-xl"
		  });
		} catch (error) {
		  toast({
			title: "Chyba pri vrátení knihy",
			duration: 2000,
			className: "bg-red-800 text-white font-bold text-xl"
		  });
		}
	  };

	if(!data) return <CircularProgress />;

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<h2 className="text-xl font-bold">Moje požičané knihy</h2>
				</CardHeader>
				<CardBody>
					<div className="grid gap-4">
						{data && data.map((item: BookingType) => {
							return (
								<div key={item._id} className="flex items-center space-x-4">
									<div className="grid gap-1.5">
										<h3 className="text-lg font-bold">{item.bookName}</h3>
										<p className="text-sm font-medium leading-none">
											Od: {item.from}
										</p>
										<p className="text-sm font-medium leading-none">
											Do: {item.to}
										</p>
									</div>
									<Button onPress={() => handleReturnBook(item._id)} size="sm" className="ml-5" variant="solid">
										Vrátiť knihu
									</Button>
								</div>
							)
						})}
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default MyBorrowedBooks;
