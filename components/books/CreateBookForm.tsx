"use client"

import {type FC, useState} from "react";
import Header from "../shared/Header";
import { Button, Input, Switch } from "@nextui-org/react";
import Editor from "../shared/Editor";
import CategoriesSelect from "../categories/CategoriesSelect";
import AuthorsSelect from "../authors/AuthorsSelect";
import PublisherSelect from "../publishers/PublisherSelect";

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
  const [formData, setFormData] = useState<BookFormData>({
    name: "",
    description: "",
    image: null,
    year: new Date().getFullYear(),
    pages: 0,
    isAvailable: true,
    categoryId: "",
    authorId: "",
    publisherId: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" || name === "pages" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSwitchChange = (value: boolean) => {
    setFormData((prev) => ({ ...prev, isAvailable: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    // Tu môžete implementovať API volanie na uloženie knihy
  };

  return (
    <>
      <Header text="Nová kniha" />
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto space-y-4 p-4 rounded-md shadow-md"
      >
        <Input
          label="Názov knihy"
          placeholder="Zadajte názov"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          fullWidth
        />
        <Editor />
        <Input
          label="Rok vydania"
          type="number"
          name="year"
          value={formData.year as unknown as string}
          onChange={handleInputChange}
          required
          fullWidth
        />
        <Input
          label="Počet strán"
          type="number"
          name="pages"
          value={formData.pages as unknown as string}
          onChange={handleInputChange}
          required
          fullWidth
        />
        <CategoriesSelect />
        <AuthorsSelect />
        <PublisherSelect />
        <Input
          label="Obrázok knihy"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          required
          fullWidth
        />
        <div className="flex items-center gap-4">
          <Switch
            checked={formData.isAvailable}
            size="lg"
          />
          <label>Dostupnosť</label>
        </div>
        <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">
          Uložiť knihu
        </Button>
      </form>
    </>
  );
};

export default CreateBookForm;
