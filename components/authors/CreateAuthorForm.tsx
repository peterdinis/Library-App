"use client";

import { api } from "@/convex/_generated/api";
import { literaryPeriods } from "@/data/litPeriodData";
import { Button, Checkbox, CircularProgress, Input, Select, SelectItem } from "@nextui-org/react";
import { useMutation } from "convex/react";
import { type FC, type FormEvent, useState } from "react";
import Admin from "../auth/Admin";
import Editor from "../shared/Editor";
import Header from "../shared/Header";
import { Id } from "@/convex/_generated/dataModel";

interface FormData {
  name: string;
  description: string;
  isActive: boolean;
  litPeriod: string;
  bornDate: string;
  deathDate: string;
}

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
		<Admin>
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
		</Admin>
	);
};

const CreateAuthorForm: FC = () => {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createAuthor = useMutation(api.authors.createAuthor);

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      description: content,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Prosím, nahrajte iba obrázkový súbor");
      return;
    }
    
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      setError("Veľkosť súboru musí byť menšia ako 5MB");
      return;
    }
    
    setImageFile(file);
    setError(null);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setImageFile(null);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.name || !formData.litPeriod || !formData.bornDate) {
        throw new Error("Prosím, vyplňte všetky povinné polia");
      }

      let fileId: Id<"_storage"> | null = null;

      // Handle file upload if exists
      if (imageFile) {
        try {
          // Generate upload URL with proper arguments
          const { storageId, url } = await generateUploadUrl({
            contentType: imageFile.type,
            maxSize: imageFile.size,
          });
          
          const uploadResponse = await fetch(url, {
            method: "PUT",
            body: imageFile,
            headers: {
              "Content-Type": imageFile.type,
            },
          });

          if (!uploadResponse.ok) {
            throw new Error(`Upload failed: ${uploadResponse.statusText}`);
          }

          fileId = storageId;
        } catch (uploadError) {
          if (uploadError instanceof Error) {
            throw new Error(uploadError.message);
          }
          throw new Error("Nepodarilo sa nahrať obrázok");
        }
      }

      // Create author with or without image
      await createAuthor({
        name: formData.name,
        description: formData.description,
        isActive: formData.isActive,
        litPeriod: formData.litPeriod,
        bornDate: formData.bornDate,
        deathDate: formData.deathDate || null,
        storageId: fileId,
      });

      resetForm();
    } catch (err) {
      console.error("Form submission error:", err);
      setError(
        err instanceof Error 
          ? err.message 
          : "Nastala neočakávaná chyba pri ukladaní autora"
      );
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="container mx-auto px-4">
      <Header text="Pridaj nového spisovateľa/ku" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md mx-auto mt-6"
      >
        {/* Name */}
        <div className="flex flex-col gap-1">
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
            isRequired
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Popis
          </label>
          <Editor value={formData.description} onChange={handleEditorChange} />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-1">
          <label htmlFor="image" className="text-sm font-medium text-gray-700">
            Obrázok
          </label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imageFile && (
            <p className="text-sm text-gray-500 mt-1">
              Vybraný súbor: {imageFile.name}
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
        <div className="flex flex-col gap-1">
          <label htmlFor="litPeriod" className="text-sm font-medium text-gray-700">
            Literárne obdobie
          </label>
          <Select
            id="litPeriod"
            value={formData.litPeriod}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, litPeriod: e.target.value }))
            }
            placeholder="Vyberte literárne obdobie"
            isRequired
          >
            {literaryPeriods.map((period) => (
              <SelectItem key={period.value} value={period.value}>
                {period.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Born Date */}
        <div className="flex flex-col gap-1">
          <label htmlFor="bornDate" className="text-sm font-medium text-gray-700">
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
            isRequired
          />
        </div>

        {/* Death Date */}
        <div className="flex flex-col gap-1">
          <label htmlFor="deathDate" className="text-sm font-medium text-gray-700">
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
          {isLoading ? <CircularProgress /> : "Pridať autora"}
        </Button>
      </form>
    </div>
  );
};

export default CreateAuthorForm;