"use client";

import { api } from "@/convex/_generated/api";
import type { Category } from "@/types/CategoryTypes";
import {
	Card,
	CardFooter,
	CardHeader,
	CircularProgress,
	Divider,
	Input,
	Skeleton,
} from "@nextui-org/react";
import { usePaginatedQuery } from "convex/react";
import { Search } from "lucide-react";
import { type ChangeEvent, type FC, Suspense, useEffect, useState } from "react";
import AppPagination from "../shared/AppPagination";
import Empty from "../shared/Empty";
import Header from "../shared/Header";
import Link from "next/link";

const AllCategoriesWrapper: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
	const pageSize = 12;

	// Debounced search term for better performance
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 300); // Delay for debouncing search input

		return () => {
			clearTimeout(handler);
		};
	}, [searchTerm]);

	const { results, status } = usePaginatedQuery(
		api.categories.getPaginatedCategories,
		{ paginationOpts: { page: currentPage, pageSize, searchTerm: debouncedSearchTerm } },
		{ initialNumItems: pageSize }
	);

	const categories = results ?? [];
	const totalPages = Math.ceil((categories.length * currentPage) / pageSize);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
		setCurrentPage(1); // Reset to first page when search term changes
	};

	if (status === "LoadingFirstPage")
		return <CircularProgress label="Načítavam..." />;

	return (
		<>
			<Header text="Všetky kategórie" />
			<div className="border-none outline-none mt-2">
				<Input
					startContent={<Search />}
					variant="underlined"
					placeholder="Hľadaj kategóriu..."
					value={searchTerm}
					onChange={handleSearchChange}
				/>
			</div>
			{results && results.length === 0 && (
				<Empty text="Žiadne kategórie sa nenašli" />
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
				<div className="mt-4 max-w-full mx-auto gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 px-8">
					{results &&
						results.map((category: Category) => {
							return (
								<Card className="max-w-[400px]" key={category._id}>
									<CardHeader className="flex gap-3">
										<div className="flex flex-col">
											<p className="text-md">{category.name}</p>
											<p className="text-small text-default-500">
												{category.description}
											</p>
										</div>
									</CardHeader>
									<Divider />
									<CardFooter>
										<Link href={`/categories/${category._id}`}>
											Detail kategórie
										</Link>
									</CardFooter>
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

export default AllCategoriesWrapper;
