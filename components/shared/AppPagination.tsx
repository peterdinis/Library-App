"use client";

import { Pagination } from "@nextui-org/react";
import type { FC } from "react";

interface AppPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const AppPagination: FC<AppPaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	return (
		<div className="w-full flex justify-center px-4 sm:px-8">
			<Pagination
				showShadow
				loop
				showControls
				initialPage={currentPage}
				total={totalPages}
				onChange={onPageChange}
				className="w-full sm:w-auto"
			/>
		</div>
	);
};

export default AppPagination;
