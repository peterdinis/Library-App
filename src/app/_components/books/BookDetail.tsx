import { FC } from 'react';
import { Book, User, Calendar, BookOpen} from 'lucide-react';
import Image from 'next/image';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import Link from 'next/link';

const BookDetail: FC = () => {
  // In a real app, this would come from an API or props
  const book = {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    isbn: "978-0743273565",
    published: "April 10, 1925",
    genre: "Classic Literature",
    pages: 180,
    available: true,
    dueDate: "March 25, 2024",
    description: "Set in the summer of 1922 on Long Island, New York, this classic novel follows the mysterious millionaire Jay Gatsby and his obsessive love for the beautiful Daisy Buchanan. This exploration of the American Dream is considered Fitzgerald's masterpiece.",
    location: "Floor 2, Section C, Shelf 15"
  };

  return (
    <div className="min-h-screen dark:bg-background">
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Book Cover */}
          <div className="md:col-span-1 space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-[1.02] bg-white dark:bg-stone-800 p-3">
              <Image
                width={70}
                height={70}
                src={book.cover} 
                alt={`Cover of ${book.title}`}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div 
              className={`p-6 rounded-xl shadow-lg dark:bg-stone-800 transition-all duration-300 
              `}
            >
              <div className="flex items-center justify-between">
                <span className={`font-semibold text-lg ${book.available ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {book.available ? 'Dostupná' : 'Nedostupná'}
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
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-orange-500 mb-3 leading-tight">{book.title}</h1>
              <h2 className="text-2xl text-indigo-600 dark:text-sky-100 mb-8">by {book.author}</h2>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-indigo-50 dark:bg-zinc-500 text-indigo-700">
                  <Book size={24} className="text-indigo-500 dark:text-orange-500" />
                  <div>
                    <Label className="text-lg text-indigo-600 dark:text-orange-500 font-medium">ISBN</Label>
                    <span className="ml-3 font-semibold dark:text-orange-500">{book.isbn}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-indigo-50 dark:bg-zinc-500 dark:text-orange-500 text-indigo-700">
                  <Calendar size={24} className="text-indigo-500 dark:text-orange-500" />
                  <div>
                    <Label className="text-lg dark:text-orange-500 text-indigo-600 font-medium">Vydaná</Label>
                    <span className="ml-3 font-semibold dark:text-orange-500">{book.published}</span>
                  </div>
                </div>
                <div className="flex dark:text-orange-500 items-center gap-3 p-4 rounded-lg bg-indigo-50 dark:bg-zinc-500 text-indigo-700">
                  <BookOpen size={24} className="text-indigo-500 dark:text-orange-500" />
                  <div>
                    <Label className="text-lg text-indigo-600 dark:text-orange-500 font-medium dark:bg-zinc-500">Počet strán</Label>
                    <span className="ml-3 font-semibold dark:text-orange-500 ">{book.pages} pages</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg dark:text-orange-500 dark:bg-zinc-500 bg-indigo-50 text-indigo-700">
                  <User size={24} className="text-indigo-500 dark:text-orange-500" />
                  <div>
                    <Label className="text-lg text-indigo-600  dark:text-orange-500 font-medium">Žáner</Label>
                    <span className="ml-3 font-semibold dark:text-orange-500">{book.genre}</span>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-sky-50">Krátke info o knihe</h3>
                <p className="text-gray-600 dark:text-sky-50 leading-relaxed text-lg">{book.description}</p>
              </div>
            </div>

            <div className="flex gap-6 flex-1 py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              <Button size={"lg"} variant={"default"}>
                Požičat knihu
              </Button>
              <Button size={"lg"} variant={"link"}>
                <Link href="/books">Návrat na všetky knihy</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookDetail