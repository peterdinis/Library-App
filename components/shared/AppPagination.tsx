"use client";

import { Pagination } from "@nextui-org/react";
import type { FC } from "react";

const AppPagination: FC = () => {
	return (
		<div className="w-full flex justify-center px-4 sm:px-8">
			<Pagination
				showShadow
				loop
				showControls
				initialPage={1}
				total={10}
				className="w-full sm:w-auto"
			/>
		</div>
	);
};

export default AppPagination;
