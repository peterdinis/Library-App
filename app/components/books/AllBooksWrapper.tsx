"use client";

import { FC } from "react";
import Header from "../shared/Header";
import BooksSearch from "./BooksSearch";
import { Button, Card, CardHeader, Image } from "@nextui-org/react";

const AllBooksWrapper: FC = () => {
  return (
    <>
      <Header text="Všetky knihy" />
      <BooksSearch />
      <div className="max-w-full mx-auto mt-8 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 px-8">
        {/* Card 1 */}
        <Card className="h-[300px]">
          <CardHeader className="absolute z-10 top-1 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center text-center w-full h-full">
            <h1 className="text-xl text-white font-bold uppercase">
              What to watch
            </h1>
            <h4 className="text-white font-medium text-large">
              Stream the Acme event
            </h4>
            <Button variant="solid" color="success" className="mt-6">
              DETAIL
            </Button>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-4.jpeg"
          />
        </Card>
      </div>
    </>
  );
};

export default AllBooksWrapper;
