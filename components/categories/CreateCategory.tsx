"use client";

import type { FC } from "react";
import Header from "../shared/Header";
import { Button, Input } from "@nextui-org/react";

const CreateCategory: FC = () => {
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
