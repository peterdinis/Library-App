"use client";

import { FC, useState } from "react";
import Header from "../shared/Header";
import { Button, CircularProgress, Input } from "@nextui-org/react";
import { useToast } from "@/hooks/useToast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { v7 as uuidv7 } from "uuid";

const formSchema = z.object({
  id: z.string(),
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
      id: uuidv7(),
      name: "",
      description: "",
    },
  });

  const onCategorySubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Form Data Submitted:", data); // Debugging
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
      console.error("Error Creating Category:", error); // Debugging
      toast({
        title: "Kategóriu sa nepodarilo vytvoriť",
        description: error.message || "Neočakávaná chyba",
        className: "bg-red-800 text-white font-bold text-xl",
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
    </>
  );
};

export default CreateCategory;
