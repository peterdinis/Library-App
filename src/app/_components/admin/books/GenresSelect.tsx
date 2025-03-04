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

interface GenresSelectProps {
  onSelect: (value: string) => void;
}

const GenresSelect: FC<GenresSelectProps> = ({
  onSelect,
}: GenresSelectProps) => {
  const { data, isLoading } = api.genre.getAllGenres.useQuery();

  if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />;

  return (
    <>
      <Label htmlFor="genre">Vybrať žáner</Label>
      <Select onValueChange={onSelect}>
        <SelectTrigger id="genre">
          <SelectValue placeholder="Vybrať žáner" />
        </SelectTrigger>
        <SelectContent>
          {data?.map((genre) => (
            <SelectItem key={genre.id} value={genre.id}>
              {genre.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default GenresSelect;
