"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { FC } from "react";


const BookDetail: FC = () => {
    const { id } = useParams();
    const bookId = id![0] as unknown as Id<'books'>;

    const data = useQuery(api.books.getBookById, {
        id: bookId
    })

    console.log("D", data)

    return (
        <>
            prpr
        </>
    )
}

export default BookDetail