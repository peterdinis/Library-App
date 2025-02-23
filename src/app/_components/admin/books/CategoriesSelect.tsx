"use client"

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

const CategoriesSelect: FC = () => {
    const { data, isLoading } = api.category.getAllCategories.useQuery()

    if (isLoading) return <Loader2 className="animate-spin w-8 h-8" />


    return (
        <>
            <Label htmlFor="category">Vybrať kategóriu</Label>
            <Select
            >
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
    )
}

export default CategoriesSelect