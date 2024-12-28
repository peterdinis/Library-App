"use client"

import { Select, SelectItem } from "@nextui-org/react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { FC } from "react"
import Empty from "../shared/Empty"

const CategoriesSelect: FC = () => {
    const data = useQuery(api.categories.allSelectCategories);

    if (!data) return <Empty text="Žiadne kategórie neboli najdené" />

    return (
        <Select
            className="max-w-xs"
            items={data}
            label="Vybrať kategóriu"
            placeholder="Vybrať kategóriu"
        >
            {(item) => <SelectItem>{item.name}</SelectItem>}
        </Select>
    )
}

export default CategoriesSelect