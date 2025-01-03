"use client";

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useCopyToClipboard } from "@/hooks/useCopy";
import { useToast } from "@/hooks/useToast";
import { useUser } from "@clerk/nextjs";
import { Button, Chip, CircularProgress, Input, Link } from "@nextui-org/react";
import { useMutation, useQuery } from "convex/react";
import { Copy } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { type FC, type Key, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import BookingBookModal from "../booking/BookingBookModal";
import Empty from "../shared/Empty";
import Header from "../shared/Header";
import LongText from "../shared/LongText";

const BookDetail: FC = () => {
	const { id } = useParams();
	const bookID = id as unknown as Id<"books">;
	const { toast } = useToast();
	const createBooking = useMutation(api.bookings.createBooking);
	const data = useQuery(api.books.getBookById, { id: bookID });
	const [, copy] = useCopyToClipboard();
	const { user } = useUser();
	const router = useRouter();

	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			bookName: "",
			from: "",
			to: "",
			userName: "",
			userLastName: "",
			userEmail: "",
			userClass: "",
		},
	});

	const onSubmit = async (formData: any) => {
		if (!user) return;
		try {
			await createBooking(formData);
			toast({
				title: "Objednávka bola úspešne vytvorená.",
				className: "bg-green-800 text-white font-bold",
			});
			router.push("/bookings/me");
			reset();
		} catch (error: any) {
			toast({
				title: "Chyba pri vytváraní objednávky.",
				description: error.message,
				className: "bg-red-800 text-white font-bold",
			});
		}
	};

	const bookDetail = useMemo(() => {
		if (!data) return null;

		const { book, category, author, publisher } = data;

		return (
			<div
				className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10"
				key={id as Key}
			>
				<h1 className="title-font mb-1 text-4xl font-medium dark:text-blue-50 text-gray-900">
					<span className="font-bold">Názov</span>:{" "}
					<span>
						{book?.name}{" "}
						<Copy
							className="ml-4 cursor-pointer"
							onClick={() => copy(book?.name || "")}
						/>
					</span>
				</h1>

				<div className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<div className="font-bold">Krátky popis: </div>
					<span><LongText text={data?.book?.description!} maxLength={30} /></span>
				</div>

				<div className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<div className="font-bold">Počet strán: </div>
					<p>{book?.pages || "Neznáme"}</p>
				</div>

				<div className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<div className="font-bold">Rok vydania: </div>
					<p>{book?.year || "Neznáme"}</p>
				</div>

				<div className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<div className="font-bold">Kniha patrí pod kategóriu: </div>
					{category ? (
						<Link
							className="text-black dark:text-slate-50 font-bold text-xl"
							href={`/categories/${category._id}`}
						>
							{category.name}
						</Link>
					) : (
						""
					)}
				</div>

				<div className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<div className="font-bold">Knihu napísal: </div>
					{author ? (
						<Link
							className="text-black dark:text-slate-50 font-bold text-xl"
							href={`/authors/${author._id}`}
						>
							{author.name}
						</Link>
					) : (
						""
					)}
				</div>

				<div className="mb-4 mt-3 text-2xl font-light leading-relaxed dark:text-blue-50 text-gray-800">
					<div className="font-bold">Kniha patrí pod vydavateľstvo: </div>
					{publisher ? (
						<Link
							className="text-black dark:text-slate-50 font-bold text-xl"
							href={`/publishers/${publisher._id}`}
						>
							{publisher.name}
						</Link>
					) : (
						""
					)}
				</div>

				<div className="mb-4 mt-3 text-2xl font-light dark:text-blue-50 text-gray-800">
					<span className="font-bold">Kniha je:</span>
					{book?.isAvailable ? (
						<Chip className="ml-4" color="success">
							Dostupná
						</Chip>
					) : (
						<Chip className="ml-4" color="danger">
							Nedostupná
						</Chip>
					)}
				</div>

				<div className="flex mt-6">
					<Button variant="bordered" size="lg" className="mr-3">
						<Link href="/books">Návrat na knihy</Link>
					</Button>
					<BookingBookModal
						modalTitle="Požičat knihu"
						btnName="Požičat knihu"
						modalChildren={
							<>
								<h2 className="font-bold text-xl text-red-800">
									Pre prihlasenie musíte byť prihlasení
								</h2>
								<form
									onSubmit={handleSubmit(onSubmit)}
									className="flex flex-col gap-4 mt-5"
								>
									<Controller
										name="bookName"
										control={control}
										rules={{ required: "Názov knihy je povinný." }}
										render={({ field }) => (
											<Input {...field} label="Názov knihy" />
										)}
									/>
									<Controller
										name="from"
										control={control}
										rules={{ required: "Dátum 'Od' je povinný." }}
										render={({ field }) => (
											<Input {...field} label="Od" type="date" />
										)}
									/>
									<Controller
										name="to"
										control={control}
										rules={{ required: "Dátum 'Do' je povinný." }}
										render={({ field }) => (
											<Input {...field} label="Do" type="date" />
										)}
									/>
									<Controller
										name="userName"
										control={control}
										rules={{ required: "Meno používateľa je povinné." }}
										render={({ field }) => (
											<Input {...field} label="Meno používateľa" />
										)}
									/>
									<Controller
										name="userLastName"
										control={control}
										rules={{ required: "Priezvisko používateľa je povinné." }}
										render={({ field }) => (
											<Input {...field} label="Priezvisko používateľa" />
										)}
									/>
									<Controller
										name="userEmail"
										control={control}
										rules={{
											required: "Email je povinný.",
											pattern: {
												value:
													/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
												message: "Zadajte platnú emailovú adresu.",
											},
										}}
										render={({ field }) => (
											<Input {...field} label="Email" type="email" />
										)}
									/>
									<Controller
										name="userClass"
										control={control}
										render={({ field }) => <Input {...field} label="Trieda" />}
									/>
									<Button type="submit" className="bg-blue-500">
										Vytvoriť objednávku
									</Button>
								</form>
							</>
						}
						closeBtnName="Zatvoriť"
					/>
				</div>
				<hr className="mt-5" />
			</div>
		);
	}, [data, id]);

	if (!id) return <Empty text="Kniha neexistuje" />;
	if (!data) return <CircularProgress label="Načítavam..." />;

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
							alt={data?.book?.name || "Obrázok knihy"}
							className="w-full rounded-lg border object-cover object-center drop-shadow-md lg:w-1/2"
							src={data?.book?.image || "/placeholder.jpg"}
						/>
						{bookDetail}
					</div>
				</div>
			</section>
		</div>
	);
};

export default BookDetail;
