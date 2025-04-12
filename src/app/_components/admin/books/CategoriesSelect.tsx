"use client";

import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { FC } from "react";
import { api } from "~/trpc/react";
import Loader from "~/components/ui/loader";

interface CategorySelectProps {
  onSelect: (value: string) => void;
}

const CategoriesSelect: FC<CategorySelectProps> = ({ onSelect }) => {
  const { data, isLoading } = api.category.getAllCategories.useQuery();

  if (isLoading) return <Loader width={8} height={8} />

  return (
    <>
      <Label htmlFor="category">Vybrať kategóriu</Label>
      <Select onValueChange={onSelect}>
        <SelectTrigger id="category">
          <SelectValue placeholder="Vybrať kategóriu" />
        </SelectTrigger>
        <SelectContent>
          {data?.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default CategoriesSelect;
