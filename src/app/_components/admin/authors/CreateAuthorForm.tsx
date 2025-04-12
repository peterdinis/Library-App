"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import Loader from "~/components/ui/loader";
import { useToast } from "~/hooks/shared/use-toast";
import { api } from "~/trpc/react";

const authorSchema = z.object({
  name: z.string().min(3, "Názov musí mať aspoň 3 znaky"),
});

type AuthorFormValues = z.infer<typeof authorSchema>;

const CreateGenreForm: FC = () => {
  const { register, handleSubmit, reset } = useForm<AuthorFormValues>({
    resolver: zodResolver(authorSchema),
  });

  const { toast } = useToast();
  const utils = api.useUtils();
  const createAuthorMut = api.author.createAuthor.useMutation({
    onSuccess: () => {
      reset();
      utils.author.getAllAuthors.invalidate();
      toast({
        title: "Spisovateľ/ka bol/a pridaný/á",
        duration: 2000,
        className: "bg-green-800 text-white font-bold",
      });
    },

    onError: () => {
      toast({
        title: "Spisovateľ/ka nebol/a pridaný/á",
        duration: 2000,
        className: "bg-red-800 text-white font-bold",
      });
    },
  });

  const onSubmit = (data: AuthorFormValues) => {
    createAuthorMut.mutate(data);
  };

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-lg border p-6 shadow-sm">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Vytvor nového spisovateľa/ku
      </h1>
      <Button variant={"link"}>
        <Link href="/admin">Vrátiť sa na admina</Link>
      </Button>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input {...register("name")} placeholder="Zadajte názov..." />
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600"
          disabled={createAuthorMut.isPending}
        >
          {createAuthorMut.isPending ? (
            <Loader width={8} height={8} />
          ) : (
            "Vytvoriť spisovateľa"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateGenreForm;
