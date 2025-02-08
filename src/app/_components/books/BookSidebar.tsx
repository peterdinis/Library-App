"use client";

import { X } from "lucide-react";
import type { FC } from "react";
import { useFilterStore } from "~/app/_store/bookSidebarStore";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";

type BookSidebarProps = {
	isSidebarOpen: boolean;
	setIsSidebarOpen: (isSidebarOpen: boolean) => void;
};

const BookSidebar: FC<BookSidebarProps> = ({
	isSidebarOpen,
	setIsSidebarOpen,
}) => {
	const { setFilters, clearFilters } = useFilterStore();
	const { data: categories } = api.category.getAllCategories.useQuery();
	const { data: genres } = api.genre.getAllGenres.useQuery();
	const { data: authors } = api.author.getAllAuthors.useQuery();

	const handleFilterChange = (filterType: string, value: string) => {
		setFilters({ [filterType]: value });
	};

	return (
		<div
			className={`fixed right-0 top-0 z-50 h-full w-80 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-background ${
				isSidebarOpen ? "translate-x-0" : "translate-x-full"
			}`}
		>
			<button onClick={() => setIsSidebarOpen(false)} className="p-4">
				<X className="h-6 w-6" />
			</button>

			<div className="space-y-4 p-4">
				<Label htmlFor="category">Kategória</Label>
				<select
					id="category"
					className="w-full p-2 border rounded"
					onChange={(e) => handleFilterChange("categoryId", e.target.value)}
				>
					<option value="">Vyber kategóriu</option>
					{categories?.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>

				<Label htmlFor="genre">Žáner</Label>
				<select
					id="genre"
					className="w-full p-2 border rounded"
					onChange={(e) => handleFilterChange("genreId", e.target.value)}
				>
					<option value="">Vyber žáner</option>
					{genres?.map((genre) => (
						<option key={genre.id} value={genre.id}>
							{genre.name}
						</option>
					))}
				</select>

				<Label htmlFor="author">Autor</Label>
				<select
					id="author"
					className="w-full p-2 border rounded"
					onChange={(e) => handleFilterChange("authorId", e.target.value)}
				>
					<option value="">Vyber autora</option>
					{authors?.map((author) => (
						<option key={author.id} value={author.id}>
							{author.name}
						</option>
					))}
				</select>

				<button
					onClick={clearFilters}
					className="mt-4 w-full p-2 bg-red-500 text-white rounded"
				>
					Vymazať filtre
				</button>
			</div>
		</div>
	);
};

export default BookSidebar;
