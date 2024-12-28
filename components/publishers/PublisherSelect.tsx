"use client";

import { api } from "@/convex/_generated/api";
import { Select, SelectItem } from "@nextui-org/react";
import { useQuery } from "convex/react";
import type { FC } from "react";
import Empty from "../shared/Empty";

const PublisherSelect: FC = () => {
	const data = useQuery(api.publishers.allSelectPublishers);

	if (!data) return <Empty text="Žiadne vydavateľstvá neboli nájdené" />;

	return (
		<Select
			className="max-w-xs"
			items={data}
			label="Vybrať vydavateľstvo"
			placeholder="Vybrať vydavateľstvo"
		>
			{(item) => <SelectItem>{item.name}</SelectItem>}
		</Select>
	);
};

export default PublisherSelect;
