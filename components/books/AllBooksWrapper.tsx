"use client";

import { api } from "@/convex/_generated/api";
import type { Book } from "@/types/BookTypes";
import {
	Button,
	Card,
	CardHeader,
	Image,
	Input,
	Skeleton,
} from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import { usePaginatedQuery } from "convex/react";
import { Search } from "lucide-react";
import Link from "next/link";
import {
	type ChangeEvent,
	type FC,
	Suspense,
	useEffect,
	useState,
} from "react";
import AppPagination from "../shared/AppPagination";
import Empty from "../shared/Empty";
import Header from "../shared/Header";
import AuthorName from "./AuthorName";

const AllBooksWrapper: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
	const pageSize = 12;

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 300); // Increase debounce delay for better performance

		return () => {
			clearTimeout(handler);
		};
	}, [searchTerm]);

	const { results, status } = usePaginatedQuery(
		api.books.getPaginatedBooks,
		{
			paginationOpts: {
				page: currentPage,
				pageSize,
				searchTerm: debouncedSearchTerm,
			},
		},
		{ initialNumItems: pageSize },
	);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
		setCurrentPage(1); // Reset page to 1 when search term changes
	};

	if (status === "LoadingFirstPage") {
		return <CircularProgress label="Načítavam..." />;
	}

	// Calculate total pages based on results length
	const totalPages = Math.ceil(results?.length / pageSize);

	// Filter books based on availability and search term
	const filteredBooks = results?.filter(
		(book) =>
			book.isAvailable &&
			book.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
	);

	return (
		<>
			<Header text="Všetky knihy" />
			<div className="border-none outline-none mt-2">
				<Input
					startContent={<Search />}
					variant="underlined"
					placeholder="Hľadaj knihu..."
					value={searchTerm}
					onChange={handleSearchChange}
				/>
			</div>

			{filteredBooks && filteredBooks.length === 0 && (
				<Empty text="Žiadne knihy sa nenašli" />
			)}

			<Suspense
				fallback={
					<Skeleton className="rounded-lg">
						<div className="h-24 rounded-lg bg-default-300" />
					</Skeleton>
				}
			>
				<div className="max-w-full mx-auto mt-8 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 px-8">
					{filteredBooks?.map((book: Book) => (
						<Card key={book._id} className="h-[300px]">
							<CardHeader className="absolute z-10 top-1 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center text-center w-full h-full">
								<h1 className="text-4xl prose prose-h1: text-white font-bold uppercase">
									{book.name}
								</h1>
								<AuthorName authorId={book.authorId} />
								<Button variant="solid" color="success" className="mt-6">
									<Link href={`/books/${book._id}`}>Detail Knihy</Link>
								</Button>
							</CardHeader>
							<Image
								removeWrapper
								alt="Card background"
								className="z-0 w-full h-full object-cover"
								src={
									book.image ||
									"https://imgs.search.brave.com/K7TdjciLTAmvqtg6-fqKm20muPAAzRMj1OonJ6HIhME/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg5LzU1LzE1/LzM2MF9GXzg5NTUx/NTk2X0xkSEFaUnd6/M2k0RU00SjBOSE5I/eTJoRVVZRGZYYzBq/LmpwZw"
								}
							/>
						</Card>
					))}
				</div>
			</Suspense>

			<div className="flex justify-center items-center mt-20">
				<AppPagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
		</>
	);
};

export default AllBooksWrapper;
