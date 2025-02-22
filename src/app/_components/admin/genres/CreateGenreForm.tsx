"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";

const genreSchema = z.object({
	name: z.string().min(3, "Názov musí mať aspoň 3 znaky"),
});

type GenreFormValues = z.infer<typeof genreSchema>;

const CreateGenreForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<GenreFormValues>({
		resolver: zodResolver(genreSchema),
	});

	const { toast } = useToast();
	const utils = api.useUtils();
	const createNewGenreMut = api.genre.createGenre.useMutation({
		onSuccess: () => {
			reset();
			utils.genre.getAllGenres.invalidate();
			toast({
				title: "Žáner bol vytvorený",
				duration: 2000,
				className: "bg-green-800 text-white font-bold",
			});
		},

		onError: () => {
			toast({
				title: "Žáner nebol vytvorený",
				duration: 2000,
				className: "bg-red-800 text-white font-bold",
			});
		},
	});

	const onSubmit = (data: GenreFormValues) => {
		createNewGenreMut.mutate(data);
	};

	return (
		<div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow">
			<h1 className="text-3xl font-bold text-center mb-4">Vytvor nový žáner</h1>
			<Button variant={"link"}>
				<Link href="/admin">Vrátiť sa na admina</Link>
			</Button>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<Input {...register("name")} placeholder="Zadajte názov..." />
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
					disabled={createNewGenreMut.isPending}
				>
					{createNewGenreMut.isPending ? (
						<Loader2 className="animate-spin w-8 h-8" />
					) : (
						"Vytvoriť žáner"
					)}
				</button>
			</form>
		</div>
	);
};

export default CreateGenreForm;
