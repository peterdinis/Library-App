import { FC } from "react";
import { Book, User, Calendar, BookOpen } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import BorrowBookModal from "../borrowBook/BorrowBookModal";

const BookDetail: FC = () => {
  // In a real app, this would come from an API or props
  const book = {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    isbn: "978-0743273565",
    published: "April 10, 1925",
    genre: "Classic Literature",
    pages: 180,
    available: true,
    dueDate: "March 25, 2024",
    description:
      "Set in the summer of 1922 on Long Island, New York, this classic novel follows the mysterious millionaire Jay Gatsby and his obsessive love for the beautiful Daisy Buchanan. This exploration of the American Dream is considered Fitzgerald's masterpiece.",
    location: "Floor 2, Section C, Shelf 15",
  };

  return (
    <div className="min-h-screen dark:bg-background">
      <main className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Book Cover */}
          <div className="space-y-6 md:col-span-1">
            <div className="transform overflow-hidden rounded-2xl bg-white p-3 shadow-2xl transition-transform duration-300 hover:scale-[1.02] dark:bg-stone-800">
              <Image
                width={70}
                height={70}
                src={book.cover}
                alt={`Cover of ${book.title}`}
                className="h-auto w-full rounded-lg object-cover"
              />
            </div>
            <div
              className={`rounded-xl p-6 shadow-lg transition-all duration-300 dark:bg-stone-800`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-lg font-semibold ${book.available ? "text-emerald-700" : "text-rose-700"}`}
                >
                  {book.available ? "Dostupná" : "Nedostupná"}
                </span>
                {!book.available && (
                  <div className="text-sm font-medium text-rose-600">
                    Od: {book.dueDate}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-8 md:col-span-2">
            <div className="rounded-2xl bg-white p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl dark:bg-stone-800">
              <h1 className="mb-3 text-4xl font-bold leading-tight text-gray-900 dark:text-orange-500">
                {book.title}
              </h1>
              <h2 className="mb-8 text-2xl text-indigo-600 dark:text-sky-100">
                by {book.author}
              </h2>

              <div className="mb-8 grid gap-6 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg bg-indigo-50 p-4 text-indigo-700 dark:bg-zinc-500">
                  <Book
                    size={24}
                    className="text-indigo-500 dark:text-orange-500"
                  />
                  <div>
                    <Label className="text-lg font-medium text-indigo-600 dark:text-orange-500">
                      ISBN
                    </Label>
                    <span className="ml-3 font-semibold dark:text-orange-500">
                      {book.isbn}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-indigo-50 p-4 text-indigo-700 dark:bg-zinc-500 dark:text-orange-500">
                  <Calendar
                    size={24}
                    className="text-indigo-500 dark:text-orange-500"
                  />
                  <div>
                    <Label className="text-lg font-medium text-indigo-600 dark:text-orange-500">
                      Vydaná
                    </Label>
                    <span className="ml-3 font-semibold dark:text-orange-500">
                      {book.published}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-indigo-50 p-4 text-indigo-700 dark:bg-zinc-500 dark:text-orange-500">
                  <BookOpen
                    size={24}
                    className="text-indigo-500 dark:text-orange-500"
                  />
                  <div>
                    <Label className="text-lg font-medium text-indigo-600 dark:bg-zinc-500 dark:text-orange-500">
                      Počet strán
                    </Label>
                    <span className="ml-3 font-semibold dark:text-orange-500">
                      {book.pages} pages
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-indigo-50 p-4 text-indigo-700 dark:bg-zinc-500 dark:text-orange-500">
                  <User
                    size={24}
                    className="text-indigo-500 dark:text-orange-500"
                  />
                  <div>
                    <Label className="text-lg font-medium text-indigo-600 dark:text-orange-500">
                      Žáner
                    </Label>
                    <span className="ml-3 font-semibold dark:text-orange-500">
                      {book.genre}
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
