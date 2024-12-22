"use client";

import { Pagination } from "@nextui-org/react";
import type { FC } from "react";

const AppPagination: FC = () => {
	return <Pagination showShadow loop showControls initialPage={1} total={10} />;
};

export default AppPagination;
