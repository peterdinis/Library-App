"use client";

import { FC } from "react";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
        <Button variant="outline">Požičat knihu</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Požičat knihu</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Meno
            </Label>
            <Input id="name" placeholder="Meno" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Trieda
            </Label>
            <Input id="username" placeholder="Trieda" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Názov knihy
            </Label>
            <Input
              id="username"
              placeholder="Názov knihy"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="flex flex-col items-center">
              <Label htmlFor="from" className="text-right">
                Od
              </Label>
              <Calendar id="from" />
            </div>
            <div className="ml-8 flex flex-col items-center">
              <Label htmlFor="to" className="text-right">
                Do
              </Label>
              <Calendar id="to" />
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
