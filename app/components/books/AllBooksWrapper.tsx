"use client";

import { Button, Card, CardHeader, Image } from "@nextui-org/react";
import type { FC } from "react";
import AppPagination from "../shared/AppPagination";
import Header from "../shared/Header";
import BooksSearch from "./BooksSearch";

const AllBooksWrapper: FC = () => {
	return (
		<>
			<Header text="Všetky knihy" />
			<BooksSearch />
			<div className="max-w-full mx-auto mt-8 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 px-8">
				<Card className="h-[300px]">
					<CardHeader className="absolute z-10 top-1 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center text-center w-full h-full">
						<h1 className="text-xl prose prose-h1: text-white font-bold uppercase">
							What to watch
						</h1>
						<p className="text-white font-medium text-large">
							Stream the Acme event
						</p>
						<Button variant="solid" color="success" className="mt-6">
							DETAIL
						</Button>
					</CardHeader>
					<Image
						removeWrapper
						alt="Card background"
						className="z-0 w-full h-full object-cover"
						src="https://nextui.org/images/card-example-4.jpeg"
					/>
				</Card>
			</div>
			<div className="flex justify-center items-center mt-20">
				<AppPagination />
			</div>
		</>
	);
};

export default AllBooksWrapper;
