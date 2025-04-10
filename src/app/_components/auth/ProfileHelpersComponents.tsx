"use client";

import { motion } from "framer-motion";
import { Calendar, Ghost } from "lucide-react";
import { differenceInDays } from "date-fns";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Booking } from "@prisma/client";
import { api } from "~/trpc/react";
import { useToast } from "~/hooks/shared/use-toast";

type Book = {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  status: "NOT_RETURNED" | "BORROWED";
  borrowDate: string | Date;
  dueDate: string | Date;
};

export type BooksData = {
  books: Book[];
  bookings: Booking[];
};

function getStatusColor(dueDate: string | Date) {
  const today = new Date();
  const due = typeof dueDate === "string" ? new Date(dueDate) : dueDate;
  const daysLeft = differenceInDays(due, today);

  if (daysLeft <= 0) return "text-red-500";
  if (daysLeft <= 3) return "text-orange-500";
  return "text-green-500";
}

function getStatusBadge(dueDate: string | Date) {
  const today = new Date();
  const due = typeof dueDate === "string" ? new Date(dueDate) : dueDate;
  const daysLeft = differenceInDays(due, today);

  if (daysLeft <= 0) {
    return <Badge variant="destructive">Po termíne</Badge>;
  } else if (daysLeft <= 3) {
    return <Badge className="bg-orange-500 text-white">Blíži sa termín</Badge>;
  } else {
    return <Badge variant="secondary">V poriadku</Badge>;
  }
}

export function BookGrid({
  books,
  animate = true,
}: {
  books: BooksData;
  animate?: boolean;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { toast } = useToast();
  const returnBookingMutation = api.booking.returnBooking.useMutation();

  const handleReturnBook = async () => {
    if (!selectedBook) return;

    try {
      await returnBookingMutation.mutateAsync({
        bookId: selectedBook.id,
        returnDate: new Date().toISOString(),
      });

      toast({
        title: "Kniha bola vrátená",
        duration: 2000,
        className: "bg-green-700 text-white font-bold text-xl",
      });
    } catch (error) {
      toast({
        title: "Chyba pri vracaní knihy",
        description: "Skúste to znova.",
        duration: 2000,
        className: "bg-red-700 text-white font-bold text-xl",
      });
    } finally {
      setOpenDialog(false);
      setSelectedBook(null);
    }
  };

  const mergedBooks = useMemo(() => {
    if (!books || !books.bookings || !books.books) return [];
    
    return books.bookings
      .map((booking) => {
        const book = books.books.find((b) => b.id === booking.bookId);
        return book
          ? {
              ...book,
              status: booking.status,
              dueDate: booking.dueDate,
              borrowDate: booking.borrowDate,
            }
          : null;
      })
      .filter(Boolean) as Book[];
  }, [books]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mergedBooks && mergedBooks.length === 0 && (
          <div className="mt-10 flex items-center justify-center text-xl font-bold">
            <Ghost className="h-12 w-12 animate-bounce" />{" "}
            <span className="ml-3">Žiadne požičané knihy</span>
          </div>
        )}
        {mergedBooks && mergedBooks.map((book, index) => (
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
                  className="bg-muted relative aspect-3/4 overflow-hidden rounded-md"
                >
                  <Image
                    width={60}
                    height={60}
                    src={book.coverUrl ?? ""}
                    alt={book.title}
                    priority={true}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </motion.div>
              </CardHeader>
              <CardContent className="space-y-3 p-4">
                <div className="space-y-2">
                  <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    {book.author}
                  </CardDescription>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar
                      className={`h-4 w-4 ${getStatusColor(book.dueDate)}`}
                    />
                    <span className={getStatusColor(book.dueDate)}>
                      {typeof book.borrowDate === "string"
                        ? book.borrowDate
                        : book.borrowDate.toISOString().split("T")[0]}
                    </span>

                    <span className={getStatusColor(book.dueDate)}>
                      {typeof book.dueDate === "string"
                        ? book.dueDate
                        : book.dueDate.toISOString().split("T")[0]}
                    </span>
                  </div>
                  {getStatusBadge(book.dueDate)}
                </div>
              </CardContent>
              <CardFooter className="mt-4">
                <Button
                  size="lg"
                  onClick={() => {
                    setSelectedBook(book);
                    setOpenDialog(true);
                  }}
                >
                  Vrátit knihu
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Potvrdiť vrátenie knihy</DialogTitle>
          </DialogHeader>
          <p>
            Naozaj chcete vrátiť knihu <strong>{selectedBook?.title}</strong>?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Zrušiť
            </Button>
            <Button
              onClick={handleReturnBook}
              disabled={returnBookingMutation.isPending}
            >
              Potvrdiť
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
