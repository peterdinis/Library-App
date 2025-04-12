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

interface AuthorSelectProps {
  onSelect: (value: string) => void;
}

const AuthorsSelect: FC<AuthorSelectProps> = ({ onSelect }) => {
  const { data, isLoading } = api.author.getAllAuthors.useQuery();

  if (isLoading) return <Loader width={8} height={8} />;

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
