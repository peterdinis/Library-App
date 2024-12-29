"use client";

import { api } from "@/convex/_generated/api";
import { useToast } from "@/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, Input } from "@nextui-org/react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Admin from "../auth/Admin";
import Header from "../shared/Header";

const formSchema = z.object({
	name: z.string().min(1, "Názov kategórie je povinný"),
	description: z.string().min(1, "Popis kategórie je povinný"),
});

const CreateCategory: FC = () => {
	const router = useRouter();
	const { toast } = useToast();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const createCategoryMutation = useMutation(api.categories.createCategory);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const onCategorySubmit = async (data: z.infer<typeof formSchema>) => {
		setIsSubmitting(true);
		try {
			await createCategoryMutation(data);
			toast({
				title: "Kategória bola úspešne vytvorená",
				className: "bg-green-800 text-white font-bold text-xl",
				duration: 2000,
			});
			form.reset();
			router.push("/categories");
		} catch (error) {
			toast({
				title: "Kategóriu sa nepodarilo vytvoriť",
				className: "bg-red-800 text-white font-bold text-xl",
				duration: 2000,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Admin>
			<Header text="Nová kategória" />
			<div className="flex justify-center items-center mt-10">
				<form
					onSubmit={form.handleSubmit(onCategorySubmit)}
					className="w-full max-w-md space-y-6"
				>
					<Input
						label="Názov kategórie"
						size="lg"
						type="text"
						{...form.register("name")}
						fullWidth
						isRequired
						className="w-full"
						errorMessage={form.formState.errors.name?.message}
					/>
					<Input
						label="Popis kategórie"
						size="lg"
						type="text"
						{...form.register("description")}
						fullWidth
						isRequired
						className="w-full"
						errorMessage={form.formState.errors.description?.message}
					/>
					<Button
						type="submit"
						variant="solid"
						className="mt-4 w-full"
						color="primary"
						isDisabled={isSubmitting}
					>
						{isSubmitting ? <CircularProgress /> : "Vytvoriť novú kategóriu"}
					</Button>
				</form>
			</div>
		</Admin>
	);
};

export default CreateCategory;
