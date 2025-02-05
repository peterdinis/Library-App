"use client"

import { FC } from "react";
import { useParams} from "next/navigation";
import { Book, Calendar, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import BorrowBookModal from "../booking/BorrowBookModal";
import { api } from "~/trpc/react";

const BookDetail: FC = () => {
  const {id} = useParams()
  const bookID = id![0] as unknown as string;
  const { data: book, isLoading, error } =api.book.getBookDetail.useQuery(
    bookID,
    { enabled: !!id }
  );

  if (isLoading) return <Loader2 className="animate-spin w-8 h-8" />
  if (error) return <p>Error loading book details.</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="min-h-screen dark:bg-background">
      <main className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-6 md:col-span-1">
            <div>
              <Image
                width={70}
                height={70}
                src={book.coverUrl}
                alt={`Cover of ${book.title}`}
                className="h-auto w-full rounded-lg object-cover"
              />
            </div>
            <div className="rounded-xl p-6 shadow-lg transition-all duration-300 dark:bg-stone-800">
              <div className="flex items-center justify-between">
                <span
                  className={`text-lg font-semibold ${book.availableCopies > 0 ? "text-emerald-700" : "text-rose-700"}`}
                >
                  {book.availableCopies > 0 ? "Dostupná" : "Nedostupná"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-8 md:col-span-2">
            <div className="rounded-2xl bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl dark:bg-stone-800">
              <h1 className="mb-3 text-4xl font-bold leading-tight text-gray-900 dark:text-orange-500">
                {book.title}
              </h1>
              <div className="mb-8 grid gap-6 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg bg-indigo-50 p-4 text-indigo-700 dark:bg-zinc-500">
                  <Book
                    size={24}
                    className="text-indigo-500 dark:text-orange-500"
                  />
                  <div>
                    <Label className="text-lg font-medium text-indigo-600 dark:text-orange-500">
                      Počet kusov
                    </Label>
                    <span className="ml-3 font-semibold dark:text-orange-500">
                      {book.totalCopies} ks
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-indigo-50 p-4 text-indigo-700 dark:bg-zinc-500">
                  <Calendar
                    size={24}
                    className="text-indigo-500 dark:text-orange-500"
                  />
                  <div>
                    <Label className="text-lg font-medium text-indigo-600 dark:text-orange-500">
                      Dostupné kusy
                    </Label>
                    <span className="ml-3 font-semibold dark:text-orange-500">
                      {book.availableCopies} ks
                    </span>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <h3 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-sky-50">
                  Krátke info o knihe
                </h3>
                <p className="text-lg leading-relaxed text-gray-600 dark:text-sky-50">
                  {book.description}
                </p>
              </div>
            </div>

            <div className="flex flex-1 transform gap-6 rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105">
              <BorrowBookModal />
              <Button size={"lg"} variant={"link"}>
                <Link href="/books">Návrat na všetky knihy</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetail;