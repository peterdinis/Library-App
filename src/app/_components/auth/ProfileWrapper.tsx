"use client";

import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock } from "lucide-react";
import { FC, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

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

function getStatusColor(status: any) {
  switch (status) {
    case "overdue":
      return "text-red-500";
    case "soon":
      return "text-yellow-500";
    default:
      return "text-green-500";
  }
}

function getStatusBadge(status: any) {
  switch (status) {
    case "overdue":
      return <Badge variant="destructive">Po termíne</Badge>;
    case "soon":
      return <Badge className="bg-yellow-500">Čoskoro vyprší</Badge>;
    default:
      return <Badge variant="secondary">V poriadku</Badge>;
  }
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Predchádzajúca
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            className="w-10"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Nasledujúca
      </Button>
    </div>
  );
}

function BookGrid({
  books,
  animate = true,
}: {
  books: any;
  animate?: boolean;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book: any, index: number) => (
        <motion.div
          key={book.id}
          initial={animate ? { opacity: 0, y: 20 } : false}
          animate={animate ? { opacity: 1, y: 0 } : false}
          transition={{ delay: 0.1 * (index % 6), duration: 0.5 }}
        >
          <Card className="group overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="relative p-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative aspect-[3/4] overflow-hidden rounded-md bg-muted"
              >
                <Image
                  width={60}
                  height={60}
                  src={book.coverUrl || "/placeholder.svg"}
                  alt={book.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </motion.div>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div className="space-y-2">
                <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {book.author}
                </CardDescription>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar
                    className={`h-4 w-4 ${getStatusColor(book.status)}`}
                  />
                  <span className={getStatusColor(book.status)}>
                    {new Date(book.dueDate).toLocaleDateString()}
                  </span>
                </div>
                {getStatusBadge(book.status)}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

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
              <h1 className="text-2xl font-bold">Ján Novák</h1>

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
