"use client";

import { Book, Calendar, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { FC } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";
import BorrowBookModal from "../booking/BorrowBookModal";
import { useSession } from "next-auth/react";

const BookDetail: FC = () => {
  const { id } = useParams();
  const bookID = id![0] as unknown as string;
  const {
    data: book,
    isLoading,
    error,
  } = api.book.getBookDetail.useQuery(bookID, { enabled: !!id });
  const { data: session } = useSession();
  if (isLoading) return <Loader2 className="mx-auto h-8 w-8 animate-spin" />;
  if (error)
    return (
      <p className="text-center text-red-500">Error loading book details.</p>
    );
  if (!book) return <p className="text-center">Book not found.</p>;

  return (
    <div className="min-h-screen px-4 dark:bg-background">
      <main className="container mx-auto max-w-6xl py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-6">
            <div className="mx-auto w-full max-w-sm">
              <Image
                width={300}
                height={400}
                src={book.coverUrl}
                alt={`Cover of ${book.title}`}
                className="h-auto w-full rounded-lg object-cover shadow-md"
              />
            </div>
            <div className="rounded-xl p-6 text-center shadow-lg transition-all duration-300 dark:bg-stone-800">
              <span
                className={`text-lg font-semibold ${
                  book.isAvaible ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {book.isAvaible ? "Dostupná" : "Nedostupná"}
              </span>
            </div>
          </div>

          <div className="space-y-6 md:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-xl transition-shadow duration-300 hover:shadow-2xl dark:bg-stone-800">
              <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-orange-500 sm:text-4xl">
                {book.title}
              </h1>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg bg-indigo-50 p-4 text-indigo-700 dark:bg-stone-700">
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
                <div className="flex items-center gap-3 rounded-lg bg-indigo-50 p-4 text-indigo-700 dark:bg-stone-700">
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

              <div className="prose mt-6 max-w-none">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-sky-50">
                  Krátke info o knihe
                </h3>
                <p className="text-lg leading-relaxed text-gray-600 dark:text-sky-50">
                  {book.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row sm:justify-start sm:gap-6">
              {book.availableCopies > 0 && book.isAvaible && session?.user && (
                <BorrowBookModal bookId={bookID} />
              )}
              <Button size="lg" variant="link">
                <Link
                  href="/books"
                  className="text-blue-600 dark:text-orange-500"
                >
                  Návrat na všetky knihy
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetail;
