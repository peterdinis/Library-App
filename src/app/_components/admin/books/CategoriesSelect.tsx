"use client";

import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Loader2 } from "lucide-react";
import { FC } from "react";
import { api } from "~/trpc/react";

interface CategorySelectProps {
  onSelect: (value: string) => void;
}

const CategoriesSelect: FC<CategorySelectProps> = ({ onSelect }) => {
  const { data, isLoading } = api.category.getAllCategories.useQuery();

  if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

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
