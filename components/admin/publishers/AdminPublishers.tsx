"use client";

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
import { type FC, useMemo, useState } from "react";

const AdminPublishers: FC = () => {
	const data = useQuery(api.publishers.allSelectPublishers);
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

	if (!data) return <CircularProgress label="Načitávam" />;

	return (
		<div className="mt-10">
			<Header text="Zoznam všetkých vydavateľstiev" />
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
	);
};

export default AdminPublishers;
