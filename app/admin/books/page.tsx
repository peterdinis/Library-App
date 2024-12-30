"use client"

import Empty from "@/components/shared/Empty";
import Header from "@/components/shared/Header";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { NextPage } from "next";

const AdminBooksPage: NextPage = () => {
    const data = useQuery(api.books.allSelectBooks);

    if(!data) return <Empty text="Knihy sa nenašli" />
    return (
        <>
            <Header text="Všetky knihy" />
        </>
    )
}

export default AdminBooksPage