"use client";

import { api } from "@/convex/_generated/api";
import type { AuthorType } from "@/types/AuthorTypes";
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

const AllAuthorsWrapper: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
	const pageSize = 12;

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 100);

		return () => {
			clearTimeout(handler);
		};
	}, [searchTerm]);

	const { results, status } = usePaginatedQuery(
		api.authors.getPaginatedAuthors,
		{
			paginationOpts: {
				page: currentPage,
				pageSize,
				searchTerm: debouncedSearchTerm,
			},
		},
		{ initialNumItems: pageSize },
	);

	const authors = results ?? [];
	const totalPages = Math.ceil((authors.length * currentPage) / pageSize);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
		setCurrentPage(1);
	};

	if (status === "LoadingFirstPage")
		return <CircularProgress label="Načítavam..." />;

	return (
		<>
			<Header text="Všetci spisovatelia" />
			<div className="border-none outline-none mt-2">
				<Input
					startContent={<Search />}
					variant="underlined"
					placeholder="Hľadaj spisovateľa/ku..."
					value={searchTerm}
					onChange={handleSearchChange}
				/>
			</div>

			{results && results.length === 0 && (
				<Empty text="Žiadny spisovatelia sa nenašli" />
			)}

			<Suspense
				fallback={
					<>
						<div>
							<Skeleton className="flex rounded-full w-12 h-12" />
						</div>
					</>
				}
			>
				<div className="max-w-full mx-auto mt-8 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 px-8">
					{results &&
						results.map((author: AuthorType) => {
							return (
								<Card key={author._id} className="h-[300px]">
									<CardHeader className="absolute z-10 top-1 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center text-center w-full h-full">
										<h1 className="text-4xl prose prose-h1: text-white font-bold uppercase">
											{author.name}
										</h1>
										<p className="text-white font-medium text-large">
											{author.litPeriod}
										</p>
										<Button variant="solid" color="success" className="mt-6">
											<Link href={`/authors/${author._id}`}>
												Detail o spisovateľovi
											</Link>
										</Button>
									</CardHeader>
									<Image
										removeWrapper
										alt="Card background"
										className="z-0 w-full h-full object-cover"
										src={
											author.image ||
											"https://imgs.search.brave.com/K7TdjciLTAmvqtg6-fqKm20muPAAzRMj1OonJ6HIhME/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg5LzU1LzE1/LzM2MF9GXzg5NTUx/NTk2X0xkSEFaUnd6/M2k0RU00SjBOSE5I/eTJoRVVZRGZYYzBq/LmpwZw"
										}
									/>
								</Card>
							);
						})}
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

export default AllAuthorsWrapper;
