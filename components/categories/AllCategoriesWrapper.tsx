"use client";

import {
  Card,
  CardFooter,
  CardHeader,
  CircularProgress,
  Divider,
  Input,
  Link,
} from "@nextui-org/react";
import { FC, useState, ChangeEvent } from "react";
import Header from "../shared/Header";
import { usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Search } from "lucide-react";
import Empty from "../shared/Empty";
import AppPagination from "../shared/AppPagination";
import { Category } from "@/types/CategoryTypes";

const AllCategoriesWrapper: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 12;

  const { results, status } = usePaginatedQuery(
    api.categories.getPaginatedCategories,
    { paginationOpts: { page: currentPage, pageSize, searchTerm } },
    { initialNumItems: pageSize }
  );

  const categories = results ?? [];
  const totalPages = Math.ceil((categories.length * currentPage) / pageSize);

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
      <Header text="Všetky kategórie" />
      <div className="border-none outline-none mt-2">
        <Input
          startContent={<Search />}
          variant="underlined"
          placeholder="Hľadaj kategóriu..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {results && results.length === 0 && (
        <Empty text="Žiadne katrgórie sa nenašli" />
      )}

      <div className="mt-4 max-w-full mx-auto gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 px-8">
        {results &&
          results.map((category: Category) => {
            return (
              <Card className="max-w-[400px]" key={category.id}>
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">{category.name}</p>
                    <p className="text-small text-default-500">
						{category.description}
					</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardFooter>
                  <Link
                    href={`/categories/${category.id}`}
                  >
                    Detail
                  </Link>
                </CardFooter>
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

export default AllCategoriesWrapper;
