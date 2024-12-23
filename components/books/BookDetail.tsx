"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { FC } from "react";
import {CircularProgress} from "@nextui-org/react";

const BookDetail: FC = () => {
  const { id } = useParams();

  const bookID = id as unknown as string;

  const data = useQuery(api.books.getBookById, {
    id: bookID,
  });

  if (!id) {
    return <p>Error: Missing or invalid book ID.</p>;
  }

  if (!data) {
    return <CircularProgress label="Loading..." />
  }

  return (
    <div>
    </div>
  );
};

export default BookDetail;
