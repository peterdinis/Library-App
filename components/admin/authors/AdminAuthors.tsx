import Header from "@/components/shared/Header";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/hooks/useToast";
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
} from "@nextui-org/react";
import { useMutation, useQuery } from "convex/react";
import { jsPDF } from "jspdf";
import Link from "next/link";
import { type FC, useMemo, useState } from "react";

const AdminAuthors: FC = () => {
	const data = useQuery(api.authors.allAuthorsSelect);
	const [page, setPage] = useState(1);
	const {toast} = useToast()
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

	const updateAuthor = useMutation(api.authors.updateAuthor);
	const deleteAuthor = useMutation(api.authors.deleteAuthor);

	const handleEdit = async (id: string) => {
		// Example: Update the author details
		try {
			await updateAuthor({
				id,
				updates: {
					name: "New Name", // Modify based on your form input
					description: "New description",
				},
			});
			toast({
				title: "Spisovateľ/ka bol/a upravený/á",
				duration: 2000,
				className: "bg-green-800 text-white font-bold text-xl"
			})
		} catch (error) {
			toast({
				title: "Spisovateľ/ka nebol/a upravený/á",
				duration: 2000,
				className: "bg-red-800 text-white font-bold text-xl"
			})
		}
	};

	const handleDelete = async (id: Id<"authors">) => {
		try {
			await deleteAuthor({ id });
			toast({
				title: "Spisovateľ/ka bol/a zmazaný/á",
				duration: 2000,
				className: "bg-green-800 text-white font-bold text-xl"
			})
		} catch (error) {
			toast({
				title: "Spisovateľ/ka nebol/a zmazaný/á",
				duration: 2000,
				className: "bg-green-800 text-white font-bold text-xl"
			})
		}
	};

	const generatePDF = () => {
		if (!data) return;

		const doc = new jsPDF();
		doc.text("Zoznam všetkých spisovateľov", 10, 10);

		let y = 20;
		data.forEach((author, index) => {
			doc.text(`${index + 1}. ${author.name} - ${author.description}`, 10, y);
			y += 10; // Move down for the next line
		});

		doc.save("authors.pdf");
	};

	if (!data) return <CircularProgress label="Načitávam" />;

	return (
		<div className="mt-10">
			<Header text="Zoznam všetkých spisovateľov" />
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
						<TableRow key={item._id}>
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
										// Cast columnKey to a valid key of the item type
										item[columnKey as keyof typeof item] ?? "N/A"
									)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>

			</Table>
		</div>
	);
};

export default AdminAuthors;
