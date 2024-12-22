"use client"

import { FC } from "react";
import {Pagination} from "@nextui-org/react";

const AppPagination: FC = () => {
    return <Pagination showShadow loop showControls initialPage={1} total={10} />;
}

export default AppPagination