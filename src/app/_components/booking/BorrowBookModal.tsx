"use client";

import type { FC } from "react";
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
import { useToast } from "~/hooks/use-toast";

const BorrowBookModal: FC = () => {
  const { toast } = useToast();

  const borrowFnForNow = () => {
    toast({
      title: "Kniha bola požičaná",
      duration: 2000,
      className: "bg-green-800 text-white font-bold",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Požičať knihu</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] w-full max-w-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Požičat knihu</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {[
            { id: "name", label: "Meno", placeholder: "Meno" },
            { id: "class", label: "Trieda", placeholder: "Trieda" },
            { id: "book", label: "Názov knihy", placeholder: "Názov knihy" },
          ].map(({ id, label, placeholder }) => (
            <div
              key={id}
              className="flex flex-col items-center gap-2 sm:grid sm:grid-cols-4 sm:gap-4"
            >
              <Label htmlFor={id} className="w-full text-left sm:text-right">
                {label}
              </Label>
              <Input
                id={id}
                placeholder={placeholder}
                className="col-span-3 w-full"
              />
            </div>
          ))}

          {/* Calendar Section */}
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex w-full flex-col items-center">
              <Label htmlFor="from" className="mb-2">
                Od
              </Label>
              <Calendar id="from" className="w-full" />
            </div>
            <div className="flex w-full flex-col items-center">
              <Label htmlFor="to" className="mb-2">
                Do
              </Label>
              <Calendar id="to" className="w-full" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={borrowFnForNow} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookModal;
