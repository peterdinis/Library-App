"use client";

import { api } from "@/convex/_generated/api";
import { Button, Chip, CircularProgress, Link } from "@nextui-org/react";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import {FC, Key, useMemo } from "react";
import Empty from "../shared/Empty";
import Header from "../shared/Header";

const CategoryDetail: FC = () => {
    const { id } = useParams();
    const categoryID = id as unknown as string

    const data = useQuery(api.categories.)
    return (
        <>
            category detail
        </>
    )
}

export default CategoryDetail