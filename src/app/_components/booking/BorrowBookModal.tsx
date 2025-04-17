"use client";

import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useToast } from "~/hooks/shared/use-toast";
import { api } from "~/trpc/react";

type BorrowBookModalProps = {
  bookId: string;
};

const BorrowBookModal: FC<BorrowBookModalProps> = ({ bookId }) => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const createBooking = api.booking.createBooking.useMutation();

  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  const borrowedBookEmailInfo = api.email.sendAfterBorrowed.useMutation({
    onSuccess: () => {
      toast({
        title: "Požičanie knihy bolo úšpené. Na email váš prišla objednávka",
        duration: 3000,
        className: "bg-green-600 text-white font-semibold text-base",
      });
    },

    onError: () => {
      toast({
        title: "Požičat knihu sa nepodarilo.",
        duration: 3000,
        className: "bg-red-600 text-white font-semibold text-base",
      });
    },
  });
  const { data: book } = api.book.getBookDetail.useQuery(bookId, {
    enabled: !!bookId,
  });

  const handleSubmit = async () => {
    if (!name || !className || !fromDate || !toDate) {
      toast({
        title: "Vyplň všetky polia!",
        className: "bg-red-800 text-white font-bold",
      });
      return;
    }

    if (!session?.user?.id) {
      toast({
        title: "Musíš být přihlášen!",
        className: "bg-red-800 text-white font-bold",
      });
      return;
    }

    try {
      await createBooking.mutateAsync({
        userId: session.user.id,
        bookId,
        dueDate: toDate.toISOString(),
        className,
      });
      borrowedBookEmailInfo.mutate({
        email: session.user.email!,
        dueDate: toDate.toISOString(),
        bookTitle: book?.title!,
      });

      toast({
        title: "Kniha bola úspešne požičaná!",
        className: "bg-green-800 text-white font-bold",
      });

      setOpen(false);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Neznámá chyba";
      toast({
        title: "Chyba pri požičiavaní knihy",
        description: errorMessage,
        className: "bg-red-800 text-white font-bold",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Požičať knihu
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] w-full max-w-[650px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Požičať knihu</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {[
            { id: "name", label: "Meno", value: name, setValue: setName },
            {
              id: "class",
              label: "Trieda",
              value: className,
              setValue: setClassName,
            },
          ].map(({ id, label, value, setValue }) => (
            <div
              key={id}
              className="flex flex-col items-center gap-2 sm:grid sm:grid-cols-4 sm:gap-4"
            >
              <Label htmlFor={id} className="w-full text-left sm:text-right">
                {label}
              </Label>
              <Input
                id={id}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="col-span-3 w-full"
              />
            </div>
          ))}
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex w-full flex-col items-center">
              <Label htmlFor="from" className="mb-2">
                Od
              </Label>
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={setFromDate}
              />
            </div>
            <div className="flex w-full flex-col items-center">
              <Label htmlFor="to" className="mb-2">
                Do
              </Label>
              <Calendar selected={toDate} mode="single" onSelect={setToDate} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Požičať knihu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookModal;
