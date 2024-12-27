"use client";

import { api } from "@/convex/_generated/api";
import { Button, Chip, CircularProgress, Link } from "@nextui-org/react";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { type FC, type Key, useMemo } from "react";
import BookingBookModal from "../booking/BookingBookModal";
import Empty from "../shared/Empty";
import Header from "../shared/Header";

const BookDetail: FC = () => {
	const { id } = useParams();

	const bookID = id as unknown as string;
	const data = useQuery(api.books.getBookById, {
		id: bookID
	});

	const bookDetail = useMemo(() => {
		return (
			<div
				className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10"
				key={id as unknown as Key}
			>
				<div>
					<h1 className="title-font mb-1 text-4xl font-medium dark:text-blue-50 text-gray-900">
						<span className="font-bold">Názov</span>:{" "}
						<span>{data && data?.book?.name}</span>
					</h1>
				</div>

				<div className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<div className="font-bold">Krátky popis: </div>
					<span>{data && data?.book?.description}</span>
				</div>

				<div className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<div className="font-bold">Počet strán: </div>
					<p>{data && data?.book?.pages}</p>
				</div>

				<div className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<div className="font-bold">Rok vydania: </div>
					<p>{data && data?.book?.year}</p>
				</div>
				<div className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<div className="font-bold">Kniha patrí pod kategóriu: </div>
					<Link
						className="text-black font-bold text-xl"
						href={`/categories/${data && data?.category?.id}`}
					>
						{data && data?.category?.name}
					</Link>
				</div>
				<div>
					<div className="mb-4 mt-3 text-2xl font-light dark:text-blue-50 leading-relaxed">
						<span className="font-bold">Kniha je:</span>
						{data && data?.book?.isAvailable ? (
							<Chip className="ml-4" color="success">
								Dostupná
							</Chip>
						) : (
							<Chip className="ml-4" color="danger">
								Nedostupná
							</Chip>
						)}
						<br />
						<hr className="mt-6" />
						<div className="flex">
							<Button variant="faded" size="lg" className="mt-5">
								<Link href="/books">Návrat na knihy</Link>
							</Button>
							<div className="mt-5 ml-3">
								<BookingBookModal
									modalTitle="Požičat knihu"
									btnName="Požičat knihu"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}, [data, id]);

	if (!id) {
		return <Empty text="Kniha neexistuje" />;
	}

	if (!data) {
		return <CircularProgress label="Načítavam..." />;
	}

	return (
		<div>
			<Header text="Detail knihy" />
			<section className="body-font mt-2 overflow-hidden dark:bg-background bg-white text-gray-700">
				<div className="container mx-auto px-5 py-12">
					<div className="mx-auto flex flex-wrap lg:w-4/5">
						<Image
							width={400}
							height={400}
							priority={true}
							alt={data && data?.book?.name}
							className="w-full rounded-lg border object-cover object-center drop-shadow-md lg:w-1/2"
							src={data && data?.book?.image!}
						/>
						{bookDetail}
					</div>
				</div>
			</section>
		</div>
	);
};

export default BookDetail;
