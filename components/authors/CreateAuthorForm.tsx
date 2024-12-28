"use client";

import { api } from "@/convex/_generated/api";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { useMutation } from "convex/react";
import { type FC, type FormEvent, useState } from "react";
import Editor from "../shared/Editor";
import Header from "../shared/Header";
import { literaryPeriods } from "@/data/litPeriodData";

const CreateAuthorForm: FC = () => {
	const generateUploadUrl = useMutation(api.files.generateUploadUrl);
	const createAuthor = useMutation(api.authors.createAuthor);

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		isActive: false,
		litPeriod: "",
		bornDate: "",
		deathDate: "",
	});

	const [imageFile, setImageFile] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleEditorChange = (content: string) => {
		setFormData((prev) => ({
			...prev,
			description: content,
		}));
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (!file.type.startsWith("image/")) {
				setError("Please upload an image file");
				return;
			}
			if (file.size > 5 * 1024 * 1024) {
				setError("File size must be less than 5MB");
				return;
			}
			setImageFile(file);
			setError(null);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
	};

	return (
		<>
			<Header text="Pridaj nového spisovateľa/ku" />
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 max-w-md mx-auto mt-6"
			>
				{/* Name */}
				<div className="flex flex-col">
					<label htmlFor="name" className="text-sm font-medium text-gray-700">
						Meno
					</label>
					<Input
						id="name"
						value={formData.name}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, name: e.target.value }))
						}
						placeholder="Zadajte meno autora"
						className="mt-1"
						fullWidth
						required
					/>
				</div>

				{/* Description */}
				<div className="flex flex-col">
					<label
						htmlFor="description"
						className="text-sm font-medium text-gray-700"
					>
						Popis
					</label>
					<Editor />
				</div>

				{/* Image Upload */}
				<div className="flex flex-col">
					<label htmlFor="image" className="text-sm font-medium text-gray-700">
						Obrázok
					</label>
					<Input
						id="image"
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						className="mt-1"
						fullWidth
					/>
					{imageFile && (
						<p className="text-sm text-gray-500 mt-1">
							Selected: {imageFile.name}
						</p>
					)}
					{error && <p className="text-sm text-red-500 mt-1">{error}</p>}
				</div>

				{/* Is Active */}
				<div className="flex items-center gap-2">
					<Checkbox
						id="isActive"
						isSelected={formData.isActive}
						onValueChange={(checked) =>
							setFormData((prev) => ({ ...prev, isActive: checked }))
						}
					/>
					<label htmlFor="isActive" className="text-sm text-gray-700">
						Aktívny autor
					</label>
				</div>

				{/* Literary Period Select */}
				<div className="flex flex-col">
					<label
						htmlFor="litPeriod"
						className="text-sm font-medium text-gray-700"
					>
						Literárne obdobie
					</label>
					<Select
						id="litPeriod"
						value={formData.litPeriod}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, litPeriod: e.target.value }))
						}
						placeholder="Vyberte literárne obdobie"
						className="mt-1"
						fullWidth
						required
					>
						{literaryPeriods.map((period) => (
							<SelectItem key={period.value} value={period.value}>
								{period.label}
							</SelectItem>
						))}
					</Select>
				</div>

				{/* Born Date */}
				<div className="flex flex-col">
					<label
						htmlFor="bornDate"
						className="text-sm font-medium text-gray-700"
					>
						Dátum narodenia
					</label>
					<Input
						id="bornDate"
						value={formData.bornDate}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, bornDate: e.target.value }))
						}
						placeholder="YYYY-MM-DD"
						type="date"
						fullWidth
						className="mt-1"
						required
					/>
				</div>

				{/* Death Date */}
				<div className="flex flex-col">
					<label
						htmlFor="deathDate"
						className="text-sm font-medium text-gray-700"
					>
						Dátum úmrtia
					</label>
					<Input
						id="deathDate"
						value={formData.deathDate}
						onChange={(e) =>
							setFormData((prev) => ({ ...prev, deathDate: e.target.value }))
						}
						placeholder="YYYY-MM-DD"
						type="date"
						fullWidth
						className="mt-1"
					/>
				</div>

				{/* Submit Button */}
				<Button
					type="submit"
					color="primary"
					className="mt-4"
					isLoading={isLoading}
					disabled={isLoading}
				>
					{isLoading ? "Spracovávam..." : "Pridať autora"}
				</Button>
			</form>
		</>
	);
};

export default CreateAuthorForm;