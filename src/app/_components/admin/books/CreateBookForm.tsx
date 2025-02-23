"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import GenresSelect from "./GenresSelect";
import CategoriesSelect from "./CategoriesSelect";
import { UploadButton } from "./UploadComponents";
import Navigation from "../../shared/Navigation";
import { Loader2 } from "lucide-react";

// Schéma validácie
const bookSchema = z.object({
  title: z.string().min(1, "Názov knihy je povinný"),
  authorId: z.string().min(1, "Autor je povinný"),
  genreId: z.string().min(1, "Žáner je povinný"),
  categoryId: z.string().min(1, "Kategória je povinná"),
  rating: z.number().min(0).max(5),
  coverUrl: z.string().url("Neplatná URL adresa"),
  description: z.string().min(10, "Popis musí mať aspoň 10 znakov"),
  totalCopies: z.number().min(1, "Musí byť aspoň 1 kópia"),
  availableCopies: z.number().min(0),
  summary: z.string().min(10, "Zhrnutie musí mať aspoň 10 znakov"),
});

const CreateBookForm = () => {
  const router = useRouter();
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  
  const { mutate, isPening} = api.book.createBook.useMutation({
    onSuccess: () => {
      alert("Kniha bola úspešne vytvorená!");
      router.push("/admin");
    },
    onError: (error) => {
      alert(`Chyba pri vytváraní knihy: ${error.message}`);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookSchema),
  });

  const onSubmit = (data: any) => {
    mutate({ ...data, coverUrl: coverUrl! });
  };

  return (
    <>
      <Navigation />
      <h1 className="mt-10 text-center text-4xl font-bold">Vytvorenie novej knihy</h1>
      <div className="mt-3">
        <Button variant="link" onClick={() => router.push("/admin")}>
          Návrat na admin časť
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto mt-6 space-y-4">
        <div>
          <label className="font-medium">Názov knihy</label>
          <Input {...register("title")} placeholder="Zadajte názov" />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <label className="font-medium">Autor</label>
          <Input {...register("authorId")} placeholder="Zadajte ID autora" />
          {errors.authorId && <p className="text-red-500">{errors.authorId.message}</p>}
        </div>

        <GenresSelect onSelect={(value) => setValue("genreId", value)} />
        {errors.genreId && <p className="text-red-500">{errors.genreId.message}</p>}

        <CategoriesSelect onSelect={(value) => setValue("categoryId", value)} />
        {errors.categoryId && <p className="text-red-500">{errors.categoryId.message}</p>}

        <div>
          <label className="font-medium">Hodnotenie (0-5)</label>
          <Input type="number" {...register("rating", { valueAsNumber: true })} min="0" max="5" />
          {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
        </div>

        <div>
          <label className="font-medium">Popis</label>
          <Textarea {...register("description")} placeholder="Krátky popis knihy" />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        <div>
          <label className="font-medium">Celkový počet kópií</label>
          <Input type="number" {...register("totalCopies", { valueAsNumber: true })} min="1" />
          {errors.totalCopies && <p className="text-red-500">{errors.totalCopies.message}</p>}
        </div>

        <div>
          <label className="font-medium">Dostupné kópie</label>
          <Input type="number" {...register("availableCopies", { valueAsNumber: true })} min="0" />
          {errors.availableCopies && <p className="text-red-500">{errors.availableCopies.message}</p>}
        </div>

        <div>
          <label className="font-medium">Zhrnutie</label>
          <Textarea {...register("summary")} placeholder="Stručné zhrnutie" />
          {errors.summary && <p className="text-red-500">{errors.summary.message}</p>}
        </div>

        <div>
          <label className="font-medium">Obálka knihy</label>
          <UploadButton
            endpoint="coverUpload"
            onClientUploadComplete={(res) => {
              setCoverUrl(res?.[0]?.url || "");
              setValue("coverUrl", res?.[0]?.url || "");
            }}
            onUploadError={(error) => alert(`Chyba pri nahrávaní: ${error.message}`)}
          />
          {coverUrl && <img src={coverUrl} alt="Náhľad obálky" className="mt-2 h-40 object-cover" />}
          {errors.coverUrl && <p className="text-red-500">{errors.coverUrl.message}</p>}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isPening? <Loader2 className="h-5 w-5 animate-spin" /> : "Vytvoriť knihu"}
        </Button>
      </form>
    </>
  );
};

export default CreateBookForm;
