"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import GenresSelect from "./GenresSelect";
import CategoriesSelect from "./CategoriesSelect";
import Navigation from "../../shared/Navigation";
import { UploadButton } from "~/lib/uploadthing/uploadthing";
import AuthorsSelect from "./AuthorsSelect";
import AppEditor from "../../shared/AppEditor";
import { EditorState } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import Loader from "~/components/ui/loader";

const bookSchema = z.object({
  title: z.string().min(1, "Názov knihy je povinný"),
  authorId: z.string().min(1, "Autor je povinný"),
  genreId: z.string().min(1, "Žáner je povinný"),
  categoryId: z.string().min(1, "Kategória je povinná"),
  rating: z.number().min(0).max(5, "Hodnotenie musí byť medzi 0 a 5"),
  coverUrl: z.string().url("Neplatná URL adresa").optional(),
  description: z.string().min(10, "Popis musí mať aspoň 10 znakov"),
  totalCopies: z.number().min(1, "Musí byť aspoň 1 kópia"),
  availableCopies: z.number().min(0, "Dostupné kópie musia byť 0 alebo viac"),
  summary: z.string().min(10, "Zhrnutie musí mať aspoň 10 znakov"),
});

type FormData = z.infer<typeof bookSchema>;

const CreateBookForm = () => {
  const router = useRouter();
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<EditorState | null>(null);
  const [summary, setSummary] = useState<EditorState | null>(null);

  const { mutate, isPending } = api.book.createBook.useMutation({
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
  } = useForm<FormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      rating: 0,
      totalCopies: 1,
      availableCopies: 0,
    },
  });

  const onSubmit = (data: FormData) => {
    mutate({
      ...data,
      coverUrl: coverUrl || "",
      rating: Number(data.rating),
      totalCopies: Number(data.totalCopies),
      availableCopies: Number(data.availableCopies),
      genreId: data.genreId,
      authorId: data.authorId,
      categoryId: data.categoryId,
      genre: "",
      author: "",
      description: JSON.stringify(
        convertToRaw(description!.getCurrentContent()),
      ),
      summary: JSON.stringify(convertToRaw(summary!.getCurrentContent())),
    });
  };

  return (
    <>
      <Navigation />
      <h1 className="mt-10 text-center text-4xl font-bold">
        Vytvorenie novej knihy
      </h1>
      <div className="mt-3">
        <Button variant="link" onClick={() => router.push("/admin")}>
          Návrat na admin časť
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-6 max-w-xl space-y-4"
      >
        <div>
          <label className="font-medium">Názov knihy</label>
          <Input {...register("title")} placeholder="Zadajte názov" />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <GenresSelect onSelect={(value) => setValue("genreId", value)} />
        {errors.genreId && (
          <p className="text-red-500">{errors.genreId.message}</p>
        )}

        <CategoriesSelect onSelect={(value) => setValue("categoryId", value)} />
        {errors.categoryId && (
          <p className="text-red-500">{errors.categoryId.message}</p>
        )}

        <AuthorsSelect onSelect={(value) => setValue("authorId", value)} />
        {errors.authorId && (
          <p className="text-red-500">{errors.authorId.message}</p>
        )}

        <div>
          <label className="font-medium">Hodnotenie (0-5)</label>
          <Input
            type="number"
            {...register("rating", { valueAsNumber: true })}
            min="0"
            max="5"
          />
          {errors.rating && (
            <p className="text-red-500">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Popis</label>
          <AppEditor
            editorState={description!}
            setEditorState={setDescription!}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Celkový počet kópií</label>
          <Input
            type="number"
            {...register("totalCopies", { valueAsNumber: true })}
            min="1"
          />
          {errors.totalCopies && (
            <p className="text-red-500">{errors.totalCopies.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Dostupné kópie</label>
          <Input
            type="number"
            {...register("availableCopies", { valueAsNumber: true })}
            min="0"
          />
          {errors.availableCopies && (
            <p className="text-red-500">{errors.availableCopies.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Zhrnutie</label>
          <AppEditor editorState={summary} setEditorState={setSummary} />
          {errors.summary && (
            <p className="text-red-500">{errors.summary.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Obálka knihy</label>
          <UploadButton
            className="text-black dark:text-white"
            onClientUploadComplete={(res) => {
              const uploadedUrl = res?.[0]?.url || "";
              setCoverUrl(uploadedUrl);
              setValue("coverUrl", uploadedUrl);
            }}
            onUploadError={(error) =>
              alert(`Chyba pri nahrávaní: ${error.message}`)
            }
            endpoint={"imageUploader"}
          />
          {watch("coverUrl") && (
            <img
              src={watch("coverUrl")}
              alt="Náhľad obálky"
              className="mt-2 h-40 object-cover"
            />
          )}
          {errors.coverUrl && (
            <p className="text-red-500">{errors.coverUrl.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <Loader width={8} height={8} />
          ) : (
            "Vytvoriť knihu"
          )}
        </Button>
      </form>
    </>
  );
};

export default CreateBookForm;
