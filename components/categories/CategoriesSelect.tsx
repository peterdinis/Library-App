"use client";

import { api } from "@/convex/_generated/api";
import { Select, SelectItem } from "@nextui-org/react";
import { useQuery } from "convex/react";
import type { FC } from "react";
import Empty from "../shared/Empty";

const CategoriesSelect: FC = () => {
	const data = useQuery(api.categories.allSelectCategories);

	if (!data) return <Empty text="Žiadne kategórie neboli najdené" />;

    return (
        <Select
            items={data}
            label="Vybrať kategóriu"
            placeholder="Vybrať kategóriu"
        >
            {(item) => <SelectItem key={item._id}>{item.name}</SelectItem>}
        </Select>
    )
}

export default CategoriesSelect;
