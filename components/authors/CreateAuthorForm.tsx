"use client"

import type { FC } from "react";
import { Input, Checkbox, Button } from "@nextui-org/react";
import Header from "../shared/Header";
import QuillEditor from "../shared/QuillEditor";

const CreateAuthorForm: FC = () => {
  return (
    <>
      <Header text="Pridaj nového spisovateľa/ku" />
      <form className="flex flex-col gap-4 max-w-md mx-auto mt-6">
        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Meno
          </label>
          <Input
            id="name"
            placeholder="Zadajte meno autora"
            className="mt-1"
            fullWidth
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Popis
          </label>
          <QuillEditor 
             onChange={() => {
                console.log("DO NOTHING")
             }}
             readOnly={false}
             value=""
          />
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label htmlFor="image" className="text-sm font-medium text-gray-700">
            Obrázok
          </label>
          <Input
            id="image"
            placeholder="URL obrázka"
            type="url"
            fullWidth
            className="mt-1"
          />
        </div>

        {/* Is Active */}
        <div className="flex items-center gap-2">
          <Checkbox id="isActive" />
          <label htmlFor="isActive" className="text-sm text-gray-700">
            Aktívny autor
          </label>
        </div>

        {/* Literary Period */}
        <div className="flex flex-col">
          <label
            htmlFor="litPeriod"
            className="text-sm font-medium text-gray-700"
          >
            Literárne obdobie
          </label>
          <Input
            id="litPeriod"
            placeholder="Zadajte literárne obdobie"
            className="mt-1"
            fullWidth
            required
          />
        </div>

        {/* Born Date */}
        <div className="flex flex-col">
          <label
            htmlFor="bornDate"
            className="text-sm font-medium text-gray-700"
          >
            Dátum narodenia
          </label>
          <Input
            id="bornDate"
            placeholder="YYYY-MM-DD"
            type="date"
            fullWidth
            className="mt-1"
            required
          />
        </div>

        {/* Death Date */}
        <div className="flex flex-col">
          <label
            htmlFor="deathDate"
            className="text-sm font-medium text-gray-700"
          >
            Dátum úmrtia
          </label>
          <Input
            id="deathDate"
            placeholder="YYYY-MM-DD"
            type="date"
            fullWidth
            className="mt-1"
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" color="primary" className="mt-4">
          Pridať autora
        </Button>
      </form>
    </>
  );
};

export default CreateAuthorForm;
