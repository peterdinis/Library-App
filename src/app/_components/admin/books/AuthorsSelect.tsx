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

interface AuthorSelectProps {
  onSelect: (value: string) => void;
}

const AuthorsSelect: FC<AuthorSelectProps> = ({ onSelect }) => {
  const { data, isLoading } = api.author.getAllAuthors.useQuery();

  if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

  return (
    <>
      <Label htmlFor="author">Vybrať spisovateľa/ku</Label>
      <Select onValueChange={onSelect}>
        <SelectTrigger id="author">
          <SelectValue placeholder="Vybrať spisovateľa/ku" />
        </SelectTrigger>
        <SelectContent>
          {data?.map((author) => (
            <SelectItem key={author.id} value={author.id}>
              {author.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default AuthorsSelect;
