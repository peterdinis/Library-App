"use client"

import { Select, SelectItem } from "@nextui-org/react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { FC } from "react"
import Empty from "../shared/Empty"

const BookSelect: FC = () => {
    const data = useQuery(api.books.allSelectBooks);

    if (!data) return <Empty text="Žiadne knihy neboli nájdené" />

    return (
        <Select
            className="max-w-xs"
            items={data}
            label="Vybrať knihu"
            placeholder="Vybrať knihu"
        >
            {(item) => <SelectItem key={item._id}>{item.name}</SelectItem>}
        </Select>
    )
}

export default BookSelect