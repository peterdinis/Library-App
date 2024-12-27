"use client";

import type { FC, useState } from "react";
import Header from "../shared/Header";
import { Button, Input } from "@nextui-org/react";
import { useToast } from "@/hooks/useToast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { z } from 'zod';

const formSchema = z.object({
    name: z.string(),
    description: z.string()
})

const CreateCategory: FC = () => {
    const router = useRouter();
    const {toast} = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: ""
        },
    });

	return (
		<>
			<Header text="Nová kategória" />
			<div className="flex justify-center items-center mt-10">
				<form className="w-full max-w-md space-y-6">
					<Input
						label="Názov kategórie"
						size="lg"
						type="text"
						fullWidth
                        isRequired
						className="w-full"
					/>
					<Input
						label="Popis kategórie"
						size="lg"
						type="text"
						fullWidth
                        isRequired
						className="w-full"
					/>
					<Button
						variant="solid"
						className="mt-4 w-full"
						color="primary"
					>
						Vytvoriť novú kategóriu
					</Button>
				</form>
			</div>
		</>
	);
};

export default CreateCategory;
