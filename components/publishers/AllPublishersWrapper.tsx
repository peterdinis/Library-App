"use client";

import { api } from "@/convex/_generated/api";
import { AuthorType } from "@/types/AuthorTypes";
import { Button, Card, CardHeader, Image, Input } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import { usePaginatedQuery } from "convex/react";
import { Search } from "lucide-react";
import Link from "next/link";
import { type ChangeEvent, type FC, useEffect, useState } from "react";
import AppPagination from "../shared/AppPagination";
import Empty from "../shared/Empty";
import Header from "../shared/Header";
import { PublisherType } from "@/types/PublisherTypes";

const AllPublishersWrapper: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const pageSize = 12;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 100);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const { results, status } = usePaginatedQuery(
    api.publishers.getPaginatedPublishers,
    {
      paginationOpts: {
        page: currentPage,
        pageSize,
        searchTerm: debouncedSearchTerm,
      },
    },
    { initialNumItems: pageSize }
  );

  const publishers = results ?? [];
  const totalPages = Math.ceil((publishers.length * currentPage) / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  if (status === "LoadingFirstPage")
    return <CircularProgress label="Načítavam..." />;

  return (
    <>
      <Header text="Všetky vydavateľstvá" />
      <div className="border-none outline-none mt-2">
        <Input
          startContent={<Search />}
          variant="underlined"
          placeholder="Hľadaj vydavateľstvo..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {results && results.length === 0 && (
        <Empty text="Žiadne vydavateľstvá sa nenašli" />
      )}

      <div className="max-w-full mx-auto mt-8 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 px-8">
        {results &&
          results.map((publisher: PublisherType) => {
            return (
              <Card key={publisher._id} className="h-[300px]">
                <CardHeader className="absolute z-10 top-1 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center text-center w-full h-full">
                  <h1 className="text-4xl prose prose-h1: text-white font-bold uppercase">
                    {publisher.name}
                  </h1>
                  <Button variant="solid" color="success" className="mt-6">
                    <Link href={`/books/${publisher._id}`}>
                      Detail o vydavateľstve
                    </Link>
                  </Button>
                </CardHeader>
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-cover"
                  src={
                    publisher.image ||
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

export default AllPublishersWrapper;
