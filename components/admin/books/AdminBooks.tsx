"use client";

import Admin from "@/components/auth/Admin";
import Header from "@/components/shared/Header";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/hooks/useToast";
import {
	Button,
	CircularProgress,
	Input,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
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

const AdminBooks: FC = () => {
	const data = useQuery(api.books.allSelectBooks);
	const updateBook = useMutation(api.books.updateBook);
	const deleteBook = useMutation(api.books.deleteBook);
	const { toast } = useToast();
	const [page, setPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentBookId, setCurrentBookId] = useState<Id<"books"> | null>(null);
	const [form, setForm] = useState({ title: "", author: "", description: "" });

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

	const openEditModal = (
		id: Id<"books">,
		title: string,
		author: string,
		description: string,
	) => {
		setCurrentBookId(id);
		setForm({ title, author, description });
		setIsModalOpen(true);
	};

	const closeEditModal = () => {
		setIsModalOpen(false);
		setCurrentBookId(null);
		setForm({ title: "", author: "", description: "" });
	};

	const handleEditSubmit = async () => {
		if (!currentBookId) return;

		try {
			await updateBook({ id: currentBookId, updates: form });
			toast({
				title: "Kniha bola upravená",
				duration: 2000,
				className: "bg-green-800 text-xl font-bold text-white",
			});
			closeEditModal();
		} catch (error) {
			toast({
				title: "Kniha nebola upravená",
				duration: 2000,
				className: "bg-red-800 text-xl font-bold text-white",
			});
		}
	};

	const handleDelete = async (id: Id<"books">) => {
		try {
			await deleteBook({ id });
			toast({
				title: "Kniha bola zmazaná",
				duration: 2000,
				className: "bg-green-800 text-xl font-bold text-white",
			});
		} catch (error) {
			toast({
				title: "Kniha nebola zmazaná",
				duration: 2000,
				className: "bg-red-800 text-xl font-bold text-white",
			});
		}
	};

	const generatePDF = () => {
		if (!data) return;

		const doc = new jsPDF();
		doc.text("Zoznam všetkých kníh", 10, 10);

		let y = 20;
		data.forEach((book, index) => {
			doc.text(
				`${index + 1}. ${book.title} by ${book.author} - ${book.description}`,
				10,
				y,
			);
			y += 10;
		});

		doc.save("books.pdf");
	};

	if (!data) return <CircularProgress label="Načitávam" />;

	return (
		<Admin>
			<div className="mt-10">
				<Header text="Zoznam všetkých kníh" />
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
						<TableColumn key="title">Názov</TableColumn>
						<TableColumn key="author">Autor</TableColumn>
						<TableColumn key="description">Popis</TableColumn>
						<TableColumn key="edit">Upraviť</TableColumn>
						<TableColumn key="delete">Zmazať</TableColumn>
					</TableHeader>
					<TableBody items={items}>
						{(item) => (
							<TableRow key={item.title}>
								<TableCell>{item.title}</TableCell>
								<TableCell>{item.author}</TableCell>
								<TableCell>{item.description}</TableCell>
								<TableCell>
									<Button
										variant="faded"
										color="primary"
										onPress={() =>
											openEditModal(item._id, item.title, item.author, item.description)
										}
									>
										Upraviť
									</Button>
								</TableCell>
								<TableCell>
									<Button
										variant="faded"
										color="secondary"
										onPress={() => handleDelete(item._id)}
									>
										Zmazať
									</Button>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>

				<Modal isOpen={isModalOpen} onClose={closeEditModal} closeButton>
					<ModalHeader>
						<h3>Upraviť knihu</h3>
					</ModalHeader>
					<ModalBody>
						<Input
							label="Názov"
							value={form.title}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, title: e.target.value }))
							}
						/>
						<Input
							label="Autor"
							value={form.author}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, author: e.target.value }))
							}
						/>
						<Input
							label="Popis"
							value={form.description}
							onChange={(e) =>
								setForm((prev) => ({ ...prev, description: e.target.value }))
							}
						/>
					</ModalBody>
					<ModalFooter>
						<Button onPress={handleEditSubmit} color="primary">
							Uložiť
						</Button>
						<Button onPress={closeEditModal} color="secondary" variant="flat">
							Zrušiť
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		</Admin>
	);
};

export default AdminBooks;