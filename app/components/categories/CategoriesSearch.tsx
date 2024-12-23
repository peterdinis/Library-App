"use client";

import { Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import type { FC } from "react";

const CategoriesSearch: FC = () => {
	return (
		<div className="border-none outline-none mt-2">
			<Input
				startContent={<Search />}
				variant="underlined"
				placeholder="Hľadaj kategóriu..."
			/>
		</div>
	);
};

export default CategoriesSearch;
