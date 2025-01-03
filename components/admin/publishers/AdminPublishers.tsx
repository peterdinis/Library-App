"use client";

import Admin from "@/components/auth/Admin";
import Header from "@/components/shared/Header";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/hooks/useToast";
import type { PublisherUpdates } from "@/types/PublisherTypes";
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
	useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQuery } from "convex/react";
import { jsPDF } from "jspdf";
import Link from "next/link";
import { type FC, useMemo, useState } from "react";

const AdminPublishers: FC = () => {
	const data = useQuery(api.publishers.allSelectPublishers);
	const updatePublisher = useMutation(api.publishers.updatePublisher);
	const deletePublisher = useMutation(api.publishers.deletePublisher);
	const { toast } = useToast();
	const [page, setPage] = useState(1);
	const [selectedPublisher, setSelectedPublisher] = useState<any | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		image: null as File | null,
		city: "",
		isActive: false,
	});
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [loading, setLoading] = useState(false); // Loading state for update and delete actions
	const [, setError] = useState<string | null>(null); // Error state for handling errors

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

	const handleEdit = (publisher: any) => {
		setSelectedPublisher(publisher);
		setFormData({
			name: publisher.name || "",
			description: publisher.description || "",
			image: publisher.image || "",
			city: publisher.city || "",
			isActive: publisher.isActive || false,
		});
		onOpen();
	};

	const handleUpdate = async () => {
		setLoading(true);
		setError(null); // Reset any previous error
		try {
			await updatePublisher({
				id: selectedPublisher._id as Id<"publishers">,
				updates: formData as unknown as PublisherUpdates,
			});
			toast({
				title: "Vydavateľstvo bolo úpravené",
				duration: 2000,
				className: "bg-green-800 text-white font-bold text-xl",
			});
			onClose();
			setFormData({
				name: "",
				description: "",
				image: null,
				city: "",
				isActive: false,
			}); // Reset form
		} catch (error) {
			setError("Chyba pri aktualizovaní vydavateľa.");
			toast({
				title: "Vydavateľstvo nebolo úpravené",
				duration: 2000,
				className: "bg-red-800 text-white font-bold text-xl",
			});
		} finally {
			setLoading(false); // Reset loading state
		}
	};

	const handleDelete = async (id: string) => {
		setLoading(true);
		setError(null); // Reset any previous error
		try {
			await deletePublisher({ id: id as Id<"publishers"> });
			toast({
				title: "Vydavateľstvo bolo zmazané",
				duration: 2000,
				className: "bg-green-800 text-white font-bold text-xl",
			});
		} catch (error) {
			setError("Chyba pri mazaní vydavateľa.");
			toast({
				title: "Vydavateľstvo nebolo zmazané",
				duration: 2000,
				className: "bg-red-800 text-white font-bold text-xl",
			});
		} finally {
			setLoading(false); // Reset loading state
		}
	};

	const generatePDF = () => {
		if (!data) return;

		const doc = new jsPDF();
		doc.text("Zoznam všetkých vydavateľstiev", 10, 10);

		let y = 20;
		data.forEach((publisher, index) => {
			doc.text(
				`${index + 1}. ${publisher.name} - ${publisher.description}`,
				10,
				y,
			);
			y += 10; // Move down for the next line
		});

		doc.save("publishers.pdf");
	};

	if (!data) return <CircularProgress label="Načitávam" />;

	return (
		<Admin>
			<div className="mt-10">
				<Header text="Zoznam všetkých vydavateľstiev" />
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
								<TableCell>{item.name}</TableCell>
								<TableCell>{item.description}</TableCell>
								<TableCell>
									<Button
										variant="faded"
										color="primary"
										onPress={() => handleEdit(item)}
									>
										Upraviť
									</Button>
								</TableCell>
								<TableCell>
									<Button
										variant="faded"
										color="secondary"
										onPress={() => handleDelete(item._id)}
										disabled={loading} // Disable delete while loading
									>
										Zmazať
									</Button>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>

				{/* Update Modal */}
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalHeader>Upraviť vydavateľa</ModalHeader>
					<ModalBody>
						<Input
							label="Meno"
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
						/>
						<Input
							label="Popis"
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
						/>
						<input
							type="file"
							accept="image/*"
							onChange={(e) => {
								const file = e.target.files?.[0] || null;
								setFormData({ ...formData, image: file });
							}}
						/>
						<Input
							label="Mesto"
							value={formData.city}
							onChange={(e) =>
								setFormData({ ...formData, city: e.target.value })
							}
						/>
					</ModalBody>
					<ModalFooter>
						<Button variant="flat" color="secondary" onPress={onClose}>
							Zrušiť
						</Button>
						<Button
							variant="flat"
							color="primary"
							onPress={handleUpdate}
							disabled={loading} // Disable button while loading
						>
							Upraviť
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		</Admin>
	);
};

export default AdminPublishers;
