"use client";

import Admin from "@/components/auth/Admin";
import Header from "@/components/shared/Header";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
	Button,
	CircularProgress,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	getKeyValue,
} from "@nextui-org/react";
import { useMutation, useQuery } from "convex/react";
import { jsPDF } from "jspdf";
import Link from "next/link";
import { type FC, useMemo, useState } from "react";
import { useToast } from "@/hooks/useToast";

const AdminCategories: FC = () => {
	const data = useQuery(api.categories.allSelectCategories);
	const updateCategory = useMutation(api.categories.updateCategory);
	const deleteCategory = useMutation(api.categories.deleteCategory);
	const {toast} = useToast();
	const [page, setPage] = useState(1);

	const rowsPerPage = 4;
	const pages = useMemo(
		() => (data && data.length > 0 ? Math.ceil(data.length / rowsPerPage) : 1),
		[data],
	);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		return data?.slice(start, end);
	}, [page, data]);

	const handleEdit = async (id: Id<"categories">) => {
		try {
			const updates = { name: "Updated Name", description: "Updated Description" };
			await updateCategory({ id, updates });
			alert("Category updated successfully!");
		} catch (error) {
			alert(`Error updating category: ${error}`);
		}
	};

	const handleDelete = async (id: Id<"categories">) => {
		try {
			await deleteCategory({ id });
			toast({
				title: "Kategória bola zmazaná",
				duration: 2000,
				className: "bg-green-800 text-xl font-bold text-white"
			})
		} catch (error) {
			toast({
				title: "Kategória nebola zmazaná",
				duration: 2000,
				className: "bg-red-800 text-xl font-bold text-white"
			})
		}
	};

	const generatePDF = () => {
		if (!data) return;

		const doc = new jsPDF();
		doc.text("Zoznam všetkých kategórií", 10, 10);

		let y = 20;
		data.forEach((category, index) => {
			doc.text(
				`${index + 1}. ${category.name} - ${category.description}`,
				10,
				y,
			);
			y += 10; // Move down for the next line
		});

		doc.save("categories.pdf");
	};

	if (!data) return <CircularProgress label="Načitávam" />;

	return (
		<Admin>
			<div className="mt-10">
				<Header text="Zoznam všetkých kategórií" />
				<div className="mt-10 flex justify-center items-center">
					<Link className="font-bold text-xl" href="/admin">
						Naspät na admina
					</Link>
				</div>
				<div className="flex justify-end mb-4">
					<Button variant="flat" color="primary" onPress={generatePDF}>
						Exportovať do PDF
					</Button>
				</div>
				<Table
					className="mt-10"
					aria-label="Example table with client side pagination"
					bottomContent={
						<div className="flex w-full justify-center">
							<Pagination
								isCompact
								showControls
								showShadow
								color="secondary"
								page={page}
								total={pages}
								onChange={(page) => setPage(page)}
							/>
						</div>
					}
					classNames={{
						wrapper: "min-h-[222px]",
					}}
				>
					<TableHeader>
						<TableColumn key="name">Meno</TableColumn>
						<TableColumn key="description">Popis</TableColumn>
						<TableColumn key="edit">Upraviť</TableColumn>
						<TableColumn key="delete">Zmazať</TableColumn>
					</TableHeader>
					<TableBody items={items}>
						{(item) => (
							<TableRow key={item.name}>
								{(columnKey) => (
									<TableCell>
										{columnKey === "edit" ? (
											<Button
												variant="faded"
												color="primary"
												onPress={() => handleEdit(item._id)}
											>
												Upraviť
											</Button>
										) : columnKey === "delete" ? (
											<Button
												variant="faded"
												color="secondary"
												onPress={() => handleDelete(item._id)}
											>
												Zmazať
											</Button>
										) : (
											getKeyValue(item, columnKey)
										)}
									</TableCell>
								)}
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</Admin>
	);
};

export default AdminCategories;