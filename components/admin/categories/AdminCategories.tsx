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
	Modal,
	Input,
	ModalHeader,
	ModalBody,
	ModalFooter,
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
	const { toast } = useToast();
	const [page, setPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentCategoryId, setCurrentCategoryId] = useState<Id<"categories"> | null>(null);
	const [form, setForm] = useState({ name: "", description: "" });

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

	const openEditModal = (id: Id<"categories">, name: string, description: string) => {
		setCurrentCategoryId(id);
		setForm({ name, description });
		setIsModalOpen(true);
	};

	const closeEditModal = () => {
		setIsModalOpen(false);
		setCurrentCategoryId(null);
		setForm({ name: "", description: "" });
	};

	const handleEditSubmit = async () => {
		if (!currentCategoryId) return;

		try {
			await updateCategory({ id: currentCategoryId, updates: form });
			toast({
				title: "Kategória bola upravená",
				duration: 2000,
				className: "bg-green-800 text-xl font-bold text-white",
			});
			closeEditModal();
		} catch (error) {
			toast({
				title: "Kategória nebola upravená",
				duration: 2000,
				className: "bg-red-800 text-xl font-bold text-white",
			});
		}
	};

	const handleDelete = async (id: Id<"categories">) => {
		try {
			await deleteCategory({ id });
			toast({
				title: "Kategória bola zmazaná",
				duration: 2000,
				className: "bg-green-800 text-xl font-bold text-white",
			});
		} catch (error) {
			toast({
				title: "Kategória nebola zmazaná",
				duration: 2000,
				className: "bg-red-800 text-xl font-bold text-white",
			});
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
			y += 10;
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
								<TableCell>{item.name}</TableCell>
								<TableCell>{item.description}</TableCell>
								<TableCell>
									<Button
										variant="faded"
										color="primary"
										onPress={() => openEditModal(item._id, item.name, item.description)}
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
						<h3>Upraviť kategóriu</h3>
					</ModalHeader>
					<ModalBody>
						<Input
							label="Názov"
							value={form.name}
							onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
						/>
						<Input
							label="Popis"
							value={form.description}
							onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
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

export default AdminCategories;