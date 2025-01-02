"use client";

import { Button } from "@nextui-org/react";
import { Book, Info } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { BentoGrid, BentoGridItem } from "../shared/BentoGrid";
import Header from "../shared/Header";

const items = [
	{
		title: "Všetky knihy",
		description: "Zoznam všetkých kníh",
		icon: <Book className="h-4 w-4 text-neutral-500" />,
		button: (
			<Button variant="solid" color="primary">
				<Link href="/admin/books">Všetky knihy</Link>
			</Button>
		),
	},
	{
		title: "Všetky kategórie",
		description: "Zoznam všetkých kategórií",
		icon: <Info className="h-4 w-4 text-neutral-500" />,
		button: (
			<Button variant="solid" color="secondary">
				<Link href="/admin/categories">Všetky kategórie</Link>
			</Button>
		),
	},
	{
		title: "Všetci spisovatelia",
		description: "Zoznam všetkých spisovateľov",
		icon: <Info className="h-4 w-4 text-neutral-500" />,
		button: (
			<Button variant="solid" color="primary">
				<Link href="/admin/authors">Všetci spisovatelia</Link>
			</Button>
		),
	},
	{
		title: "Všetky vydavateľstvá",
		description: "Zoznam všetkých vydavateľstiev",
		icon: <Info className="h-4 w-4 text-neutral-500" />,
		button: (
			<Button variant="solid" color="secondary">
				<Link href="/admin/publishers">Všetky vydavateľstvá</Link>
			</Button>
		),
	},

	{
		title: "Všetky objednávky",
		description: "Zoznam všetkých požičaných kníh",
		icon: <Book className="h-4 w-4 text-neutral-500" />,
		button: (
			<Button color="secondary" variant="solid">
				<Link href="/admin/bookings">Všetky objednávky</Link>
			</Button>
		),
	},
];

const AdminProfileWrapper: FC = () => {
	return (
		<>
			<Header text="Admin časť" />
			<BentoGrid className="mt-12 max-w-4xl mx-auto">
				{items.map((item, i) => (
					<BentoGridItem
						key={i}
						title={item.title}
						description={item.description}
						icon={item.icon}
						button={item.button}
						className={i === 4 || i === 6 ? "md:col-span-2" : ""}
					/>
				))}
			</BentoGrid>
		</>
	);
};

export default AdminProfileWrapper;
