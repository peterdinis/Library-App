"use client";

import { FC } from "react";
import { useParams } from "next/navigation";
import { Book, Calendar, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import BorrowBookModal from "../booking/BorrowBookModal";
import { api } from "~/trpc/react";

const BookDetail: FC = () => {
  const { id } = useParams();
  const bookID = id![0] as unknown as string;
  const { data: book, isLoading, error } = api.book.getBookDetail.useQuery(
    bookID,
    { enabled: !!id }
  );

  if (isLoading) return <Loader2 className="animate-spin w-8 h-8 mx-auto" />;
  if (error) return <p className="text-center text-red-500">Error loading book details.</p>;
  if (!book) return <p className="text-center">Book not found.</p>;

  return (
    <div className="min-h-screen dark:bg-background px-4">
      <main className="container mx-auto max-w-6xl py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-6">
            <div className="w-full max-w-sm mx-auto">
              <Image
                width={300}
                height={400}
                src={book.coverUrl}
                alt={`Cover of ${book.title}`}
                className="w-full h-auto rounded-lg object-cover shadow-md"
              />
            </div>
            <div className="rounded-xl p-6 shadow-lg transition-all duration-300 dark:bg-stone-800 text-center">
              <span
                className={`text-lg font-semibold ${
                  book.availableCopies > 0 ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {book.availableCopies > 0 ? "Dostupná" : "Nedostupná"}
              </span>
            </div>
          </div>
          
          <div className="space-y-6 md:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-xl transition-shadow duration-300 hover:shadow-2xl dark:bg-stone-800">
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-gray-900 dark:text-orange-500">
                {book.title}
              </h1>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg bg-indigo-50 p-4 text-indigo-700 dark:bg-zinc-500">
                  <Book size={24} className="text-indigo-500 dark:text-orange-500" />
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
                  <Calendar size={24} className="text-indigo-500 dark:text-orange-500" />
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

              <div className="prose max-w-none mt-6">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-sky-50">
                  Krátke info o knihe
                </h3>
                <p className="text-lg leading-relaxed text-gray-600 dark:text-sky-50">
                  {book.description}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center sm:justify-start">
              <BorrowBookModal />
              <Button size="lg" variant="link">
                <Link href="/books" className="text-blue-600 dark:text-orange-500">
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
