"use client";

import { api } from "@/convex/_generated/api";
import { Button, Card, CardHeader, Image } from "@nextui-org/react";
import { useQuery } from "convex/react";
import type { FC } from "react";
import Header from "../shared/Header";
import BooksSearch from "./BooksSearch";

const AllBooksWrapper: FC = () => {
	// Query the paginated books
	const data = useQuery(api.books.getPaginatedBooks, {
		page: 1, // Default page, you may make this dynamic later
		pageSize: 12, // Default page size
	});

	// Render the books
	return (
		<>
			<Header text="Všetky knihy" />
			<BooksSearch />
			<div className="max-w-full mx-auto mt-8 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 px-8">
				{data &&
					data.books.map((book) => (
						<Card key={book.id} className="h-[300px]">
							<CardHeader className="absolute z-10 top-1 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center text-center w-full h-full">
								<h1 className="text-xl prose prose-h1:text-white font-bold uppercase">
									{book.name}
								</h1>
								<p className="text-white font-medium text-large">
									{book.description} {/* TODO Author */}
								</p>
								<Button variant="solid" color="success" className="mt-6">
									DETAIL
								</Button>
							</CardHeader>
							<Image
								removeWrapper
								alt="Card background"
								className="z-0 w-full h-full object-cover"
								src={
									book.image || "https://nextui.org/images/card-example-4.jpeg"
								} // Fallback image URL
							/>
						</Card>
					))}
			</div>
			<div className="flex justify-center items-center mt-20">
				{/*  <AppPagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
        /> */}
			</div>
		</>
	);
};

export default AllBooksWrapper;
