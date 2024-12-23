"use client";

import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Image,
	Link,
} from "@nextui-org/react";
import type { FC } from "react";
import AppPagination from "../shared/AppPagination";
import Header from "../shared/Header";
import CategoriesSearch from "./CategoriesSearch";

const AllCategoriesWrapper: FC = () => {
	return (
		<>
			<Header text="Všetky kategórie" />
			<CategoriesSearch />
			<div className="mt-4 max-w-full mx-auto gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 px-8">
				<Card className="max-w-[400px]">
					<CardHeader className="flex gap-3">
						<Image
							alt="nextui logo"
							height={40}
							radius="sm"
							src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
							width={40}
						/>
						<div className="flex flex-col">
							<p className="text-md">NextUI</p>
							<p className="text-small text-default-500">nextui.org</p>
						</div>
					</CardHeader>
					<Divider />
					<CardBody>
						<p>Make beautiful websites regardless of your design experience.</p>
					</CardBody>
					<Divider />
					<CardFooter>
						<Link
							isExternal
							showAnchorIcon
							href="https://github.com/nextui-org/nextui"
						>
							Visit source code on GitHub.
						</Link>
					</CardFooter>
				</Card>
			</div>
			<div className="flex justify-center items-center mt-20">
				<AppPagination />
			</div>
		</>
	);
};

export default AllCategoriesWrapper;
