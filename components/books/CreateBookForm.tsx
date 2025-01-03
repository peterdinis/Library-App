"use client";

import { Button, Input, Switch } from "@nextui-org/react";
import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "convex/react";  // Convex mutation hook
import Admin from "../auth/Admin";
import AuthorsSelect from "../authors/AuthorsSelect";
import CategoriesSelect from "../categories/CategoriesSelect";
import PublisherSelect from "../publishers/PublisherSelect";
import Editor from "../shared/Editor";
import Header from "../shared/Header";
import { api } from "@/convex/_generated/api";

interface BookFormData {
  name: string;
  description: string;
  image: File | null;
  year: number;
  pages: number;
  isAvailable: boolean;
  categoryId: string;
  authorId: string;
  publisherId: string;
}

const CreateBookForm: FC = () => {
  const { control, handleSubmit, setValue } = useForm<BookFormData>({
    defaultValues: {
      name: "",
      description: "",
      image: null,
      year: new Date().getFullYear(),
      pages: 0,
      isAvailable: true,
      categoryId: "",
      authorId: "",
      publisherId: "",
    },
  });

  // Use Convex's useMutation hook to call the createBook function
  const createBook = useMutation(api.books.createBook);

  const onSubmit = async (data: BookFormData) => {
    try {
      const { name, description, image, year, pages, isAvailable, categoryId, authorId, publisherId } = data;
      
      // Convert file to base64 or handle file upload if needed
      const imageFile = image ? await convertFileToBase64(image) : null;

      // Call the createBook mutation
      const result = await createBook({
        name,
        description,
        image: imageFile, // you can store image as base64 or implement file upload
        year,
        pages,
        isAvailable,
        categoryId,
        authorId,
        publisherId,
      });

      console.log("Book created:", result);
      // Handle success (e.g., reset form, show success message, etc.)
    } catch (error) {
      console.error("Error creating book:", error);
      // Handle error (e.g., show error message)
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setValue("image", file);
  };

  // Helper function to convert file to base64 (if necessary)
  const convertFileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  return (
    <Admin>
      <Header text="Nová kniha" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto space-y-4 p-4 rounded-md shadow-md"
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Názov knihy"
              placeholder="Zadajte názov"
              required
              fullWidth
            />
          )}
        />
        <Editor />
        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Rok vydania"
              type="number"
              required
              fullWidth
            />
          )}
        />
        <Controller
          name="pages"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Počet strán"
              type="number"
              required
              fullWidth
            />
          )}
        />
        <CategoriesSelect />
        <AuthorsSelect />
        <PublisherSelect />
        <Controller
          name="image"
          control={control}
          render={() => (
            <Input
              type="file"
              label="Obrázok knihy"
              accept="image/*"
              onChange={handleFileChange}
              required
              fullWidth
            />
          )}
        />
        <div className="flex items-center gap-4">
          <Controller
            name="isAvailable"
            control={control}
            render={({ field }) => (
              <>
                <Switch {...field} checked={field.value} size="lg" />
                <label>Dostupnosť</label>
              </>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          Uložiť knihu
        </Button>
      </form>
    </Admin>
  );
};

export default CreateBookForm;
