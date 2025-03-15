"use client";

import { motion } from "framer-motion";
import { type FC, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { BookGrid, Pagination } from "./ProfileHelpersComponents";
import { useSession } from "next-auth/react";

// For now static data later make this dynamic
const borrowedBooks: any = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Kniha ${i + 1}`,
  author: ["J.K. Rowling", "J.R.R. Tolkien", "Antoine de Saint-Exupéry"][i % 3],
  dueDate: new Date(Date.now() + i * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  coverUrl: `/placeholder.svg?height=200&width=150&text=Kniha${i + 1}`,
  status: ["ontime", "soon", "overdue"][i % 3] as any,
}));

const historyBooks: any = Array.from({ length: 15 }, (_, i) => ({
  id: i + 100,
  title: `Vrátená kniha ${i + 1}`,
  author: ["William Shakespeare", "Charles Dickens", "Jane Austen"][i % 3],
  dueDate: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  coverUrl: `/placeholder.svg?height=200&width=150&text=História${i + 1}`,
  status: "ontime",
}));

const ITEMS_PER_PAGE = 6;

const ProfileWrapper: FC = () => {
  const [activePage, setActivePage] = useState(1);
  const [historyPage, setHistoryPage] = useState(1);

  const activeBooks = borrowedBooks.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE,
  );

  const historyBooksPage = historyBooks.slice(
    (historyPage - 1) * ITEMS_PER_PAGE,
    historyPage * ITEMS_PER_PAGE,
  );

  const { data: session } = useSession();

  const activeTotalPages = Math.ceil(borrowedBooks.length / ITEMS_PER_PAGE);
  const historyTotalPages = Math.ceil(historyBooks.length / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-white p-6 dark:bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{session?.user.email}</h1>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="borrowed" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="borrowed">
              Aktívne výpožičky ({borrowedBooks.length})
            </TabsTrigger>
            <TabsTrigger value="history">
              História výpožičiek ({historyBooks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="borrowed" className="space-y-6">
            <BookGrid books={activeBooks} />
            {activeTotalPages > 1 && (
              <Pagination
                currentPage={activePage}
                totalPages={activeTotalPages}
                onPageChange={setActivePage}
              />
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <BookGrid books={historyBooksPage} animate={false} />
            {historyTotalPages > 1 && (
              <Pagination
                currentPage={historyPage}
                totalPages={historyTotalPages}
                onPageChange={setHistoryPage}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileWrapper;
