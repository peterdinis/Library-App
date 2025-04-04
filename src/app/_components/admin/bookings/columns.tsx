import { useForm, Controller } from "react-hook-form"; // import useForm and Controller
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { useState } from "react";

type Book = {
  title: string;
};

type User = {
  email: string;
};

export type Booking = {
  id: string;
  book?: Book;
  user?: User;
  status: string;
  dueDate: string;
  borrowedDate: string;
};

export const bookingColumns = [
  {
    accessorKey: "bookName",
    header: "Názov knihy",
    accessorFn: (row: Booking) => row.book?.title,
  },
  {
    accessorKey: "userEmail",
    header: "Email osoby ktorá má požičanú knihu",
    accessorFn: (row: Booking) => row.user?.email,
  },
  {
    accessorKey: "status",
    header: "Stav objednávky",
  },
  {
    accessorKey: "borrowedDate",
    header: "Požičané od",
    cell: ({ getValue }: { getValue: () => string }) => {
      const date = getValue();
      return date ? format(new Date(date), "dd.MM.yyyy", { locale: sk }) : "-";
    },
  },
  {
    accessorKey: "dueDate",
    header: "Požičané do",
    cell: ({ getValue }: { getValue: () => string }) => {
      const date = getValue();
      return date ? format(new Date(date), "dd.MM.yyyy", { locale: sk }) : "-";
    },
  },
  {
    id: "actions",
    header: "Akcie",
    cell: ({ row }: { row: { original: Booking } }) => {
      const booking = row.original;
      const [openEdit, setOpenEdit] = useState(false);
      const [openDelete, setOpenDelete] = useState(false);

      // Initialize useForm
      const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
          book: booking.book?.title ?? '',
          email: booking.user?.email ?? '',
          status: booking.status,
          borrowedDate: booking.borrowedDate,
          dueDate: booking.dueDate,
        }
      });

      // Function for form submission (if needed)
      const onSubmit = (data: any) => {
        console.log("Form data", data);
      };

      return (
        <div className="flex items-center gap-2">
          {/* Edit Dialog */}
          <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogTrigger asChild>
              <Button size="icon" variant="outline">
                <Pencil className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upraviť objednávku</DialogTitle>
                <DialogDescription>
                  Tu môžeš upraviť detaily objednávky.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormField name="book">
                    <FormItem>
                      <FormLabel>Kniha</FormLabel>
                      <FormControl>
                        <Controller
                          name="book"
                          control={control}
                          render={({ field }) => (
                            <Input {...field} readOnly />
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  </FormField>

                  <FormField name="email">
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <Input {...field} readOnly />
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  </FormField>

                  <FormField name="status">
                    <FormItem>
                      <FormLabel>Stav</FormLabel>
                      <FormControl>
                        <Controller
                          name="status"
                          control={control}
                          render={({ field }) => (
                            <Input {...field} readOnly />
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  </FormField>

                  <FormField name="borrowedDate">
                    <FormItem>
                      <FormLabel>Požičané od</FormLabel>
                      <FormControl>
                        <Controller
                          name="borrowedDate"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              value={
                                booking.borrowedDate
                                  ? format(new Date(booking.borrowedDate), "dd.MM.yyyy", { locale: sk })
                                  : "-"
                              }
                              readOnly
                            />
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  </FormField>

                  <FormField name="dueDate">
                    <FormItem>
                      <FormLabel>Požičané do</FormLabel>
                      <FormControl>
                        <Controller
                          name="dueDate"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              value={
                                booking.dueDate
                                  ? format(new Date(booking.dueDate), "dd.MM.yyyy", { locale: sk })
                                  : "-"
                              }
                              readOnly
                            />
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  </FormField>

                  <DialogFooter>
                    <Button type="submit" onClick={() => setOpenEdit(false)}>
                      Uložiť
                    </Button>
                  </DialogFooter>
                </form>
              </div>
            </DialogContent>
          </Dialog>

          {/* Delete Dialog */}
          <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogTrigger asChild>
              <Button size="icon" variant="destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Zmazať objednávku</DialogTitle>
                <DialogDescription>
                  Naozaj chceš zmazať túto objednávku? Táto akcia je nezvratná.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDelete(false)}>
                  Zrušiť
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    // Tu môžeš volať svoje delete API
                    console.log("Zmazaná objednávka", booking.id);
                    setOpenDelete(false);
                  }}
                >
                  Zmazať
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
