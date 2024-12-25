"use client";

import { api } from "@/convex/_generated/api";
import { Button, CircularProgress, Link } from "@nextui-org/react";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { type FC, type Key, useMemo } from "react";
import Empty from "../shared/Empty";
import Header from "../shared/Header";

const CategoryDetail: FC = () => {
  const { id } = useParams();
  const categoryID = id as unknown as string;

  const data = useQuery(api.categories.getCategoryById, {
    id: categoryID,
  });

  const categoryDetail = useMemo(() => {
    return (
      <div
        className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10"
        key={id as unknown as Key}
      >
        <div>
          <h1 className="title-font mb-1 text-4xl font-medium dark:text-blue-50 text-gray-900">
            <span className="font-bold">Názov</span>:{" "}
            <span>{data && data.categoryInfo.name}</span>
          </h1>
        </div>

        <div className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
          <div className="font-bold">Krátky popis: </div>
          <span>{data && data.categoryInfo.description}</span>
        </div>

        <div className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
          <div className="font-bold">Počet kníh: </div>
          <p>
            {data && data?.books.length > 0 ? (
              data.books.map((item) => item.name).join(", ")
            ) : (
              <Empty text="Pod túto kategóriu nepatria žiadne knihy" />
            )}
          </p>
        </div>
        <div>
          <hr className="w-full" />
          <div className="mb-4 mt-3 text-2xl font-light dark:text-blue-50 leading-relaxed">
            <div className="flex">
              <Button variant="faded" size="lg" className="mt-5">
                <Link href="/categories">Návrat na kategórie</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [data]);

  if (!id) {
    return <Empty text="Kniha neexistuje" />;
  }

  if (!data) {
    return <CircularProgress label="Načítavam..." />;
  }

  return (
    <>
      <Header text="Detail kategórie" />
      {categoryDetail}
    </>
  );
};

export default CategoryDetail;
