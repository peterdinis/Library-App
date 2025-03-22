import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
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

// Typy

type Book = {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  dueDate: string;
  status: "overdue" | "soon" | "ok";
  borrowDate: string | Date;
};

export type BooksData = {
  books: Book[];
  bookings: Booking[];
};

function getStatusColor(status: string) {
  switch (status) {
    case "overdue":
      return "text-red-500";
    case "soon":
      return "text-yellow-500";
    default:
      return "text-green-500";
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "overdue":
      return <Badge variant="destructive">Po termíne</Badge>;
    case "soon":
      return <Badge className="bg-yellow-500">Čoskoro vyprší</Badge>;
    default:
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

  const returnBookingMutation = api.booking.returnBooking.useMutation();

  const handleReturnBook = async () => {
    if (!selectedBook) return;
    await returnBookingMutation.mutateAsync({
      bookingId: selectedBook.id,
      returnDate: new Date().toISOString(),
    });
    setOpenDialog(false);
  };

  const mergedBooks = useMemo(() => {
    return books.bookings
      .map((booking) => {
        const book = books.books.find((b) => b.id === booking.bookId);
        return book ? { ...book, borrowDate: booking.borrowDate } : null;
      })
      .filter(Boolean) as Book[];
  }, [books]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mergedBooks.map((book, index) => (
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
                      className={`h-4 w-4 ${getStatusColor(book.status)}`}
                    />
                    <span className={getStatusColor(book.status)}>
                      {typeof book.borrowDate === "string"
                        ? book.borrowDate
                        : book.borrowDate.toISOString().split("T")[0]}
                    </span>
                  </div>
                  {getStatusBadge(book.status)}
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

      {/* Dialog na potvrdenie vrátenia knihy */}
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
