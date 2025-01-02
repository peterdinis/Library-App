"use client";

import Admin from "@/components/auth/Admin";
import Header from "@/components/shared/Header";
import { api } from "@/convex/_generated/api";
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
import { useQuery } from "convex/react";
import { jsPDF } from "jspdf";
import Link from "next/link";
import { type FC, useMemo, useState } from "react";

const AdminBookings: FC = () => {
	const data = useQuery(api.bookings.allSelectBooking);
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

	const handleEdit = (id: string) => {
		console.log("Edit book with ID:", id);
	};

	const handleDelete = (id: string) => {
		console.log("Delete book with ID:", id);
	};

	const generatePDF = () => {
		if (!data) return;

		const doc = new jsPDF();
		doc.setFontSize(12);

		// Add a title
		doc.text("Zoznam všetkých kníh", 10, 10);

		// Table headers
		doc.text("Meno knihy", 10, 20);
		doc.text("Požičané od", 70, 20);
		doc.text("Požičané do", 110, 20);
		doc.text("Email", 150, 20);
		doc.text("Meno", 190, 20);
		doc.text("Priezvisko", 230, 20);

		// Table rows
		let y = 30;
		data.forEach((booking) => {
			doc.text(booking.bookName || "N/A", 10, y);
			doc.text(booking.from || "N/A", 70, y);
			doc.text(booking.to || "N/A", 110, y);
			doc.text(booking.userEmail || "N/A", 150, y);
			doc.text(booking.userName || "N/A", 190, y);
			doc.text(booking.userLastName || "N/A", 230, y);
			y += 10;
		});

		// Save or open the PDF
		doc.save("bookings.pdf");
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
					<Button variant="flat" color="success" onPress={generatePDF}>
						Stiahnuť ako PDF
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
						<TableColumn key="bookName">Meno knihy</TableColumn>
						<TableColumn key="from">Požičané od</TableColumn>
						<TableColumn key="to">Požičané do</TableColumn>
						<TableColumn key="userEmail">Email</TableColumn>
						<TableColumn key="userName">Meno</TableColumn>
						<TableColumn key="userLastName">Priezvisko</TableColumn>
						<TableColumn key="edit">Upraviť</TableColumn>
						<TableColumn key="delete">Zmazať</TableColumn>
					</TableHeader>
					<TableBody items={items}>
						{(item) => (
							<TableRow key={item.bookName}>
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

export default AdminBookings;
