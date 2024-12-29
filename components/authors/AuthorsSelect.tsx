"use client";

import { api } from "@/convex/_generated/api";
import { Select, SelectItem } from "@nextui-org/react";
import { useQuery } from "convex/react";
import type { FC } from "react";
import Empty from "../shared/Empty";

const AuthorsSelect: FC = () => {
	const data = useQuery(api.authors.allAuthorsSelect);

	if (!data) return <Empty text="Žiadny spisovatelia neboli nájdení" />;

	return (
		<Select
			items={data}
			label="Vybrať spisovateľa/ku"
			placeholder="Vybrať spisovateľa/ku"
		>
			{(item) => <SelectItem key={item._id}>{item.name}</SelectItem>}
		</Select>
	);
};

export default AuthorsSelect;
