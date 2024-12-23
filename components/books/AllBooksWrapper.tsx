"use client";

import { api } from "@/convex/_generated/api";
import { Button, Card, CardHeader, Image } from "@nextui-org/react";
import { usePaginatedQuery } from "convex/react";
import { FC, useState } from "react";
import Header from "../shared/Header";
import BooksSearch from "./BooksSearch";
import { CircularProgress } from "@nextui-org/react";
import { Book } from "@/types/BookTypes";
import AppPagination from "../shared/AppPagination";
import Link from "next/link";
import Empty from "../shared/Empty";

const AllBooksWrapper: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const { results, status } = usePaginatedQuery(
    api.books.getPaginatedBooks,
    { paginationOpts: { page: currentPage, pageSize: pageSize } },
    { initialNumItems: pageSize }
  );

  const books = results ?? [];
  const totalPages = Math.ceil((books.length * currentPage) / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (status === "LoadingFirstPage")
    return <CircularProgress label="Načítavam." />;

  return (
    <>
      <Header text="Všetky knihy" />
      <BooksSearch />
      {results && results.length === 0 && <Empty text="Žiadne knihy sa nenašli" />}
      <div className="max-w-full mx-auto mt-8 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 px-8">
        {results &&
          results.map((book: Book) => {
            return (
              <Card key={book.id} className="h-[300px]">
                <CardHeader className="absolute z-10 top-1 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center text-center w-full h-full">
                  <h1 className="text-4xl prose prose-h1: text-white font-bold uppercase">
                    {book.name}
                  </h1>
                  <p className="text-white font-medium text-large">
                    {book.description} {/* TODO Author */}
                  </p>
                  <Button variant="solid" color="success" className="mt-6">
                    <Link href={`/books/${book.id}`}>Detail Knihy</Link>
                  </Button>
                </CardHeader>
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-cover"
                  src={
                    book.image ||
                    "https://nextui.org/images/card-example-4.jpeg"
                  }
                />
              </Card>
            );
          })}
      </div>
      <div className="flex justify-center items-center mt-20">
        <AppPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default AllBooksWrapper;
