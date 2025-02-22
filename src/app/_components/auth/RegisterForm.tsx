"use client";

import { useState } from "react";
import { Book, Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { api } from "~/trpc/react";
import type { RegisterFormInputs } from "./Auth.interface";

const RegisterForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormInputs>();

	const registerMutation = api.user.register.useMutation();
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const onSubmit = (data: RegisterFormInputs) => {
		registerMutation.mutate(data);
	};

	return (
		<div className="flex items-center justify-center p-4">
			<div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-zinc-900">
				<div className="text-center">
					<div className="flex justify-center">
						<Book className="h-12 w-12 text-indigo-600" />
					</div>
					<h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-sky-50">
						Prihlásenie
					</h2>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<div>
							<label
								htmlFor="fullName"
								className="block text-sm font-medium text-gray-700 dark:text-sky-50"
							>
								Full Name
							</label>
							<div className="relative mt-1">
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<User className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="fullName"
									type="text"
									{...register("fullName", {
										required: "Full name is required",
									})}
									className="block w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
									placeholder="Your Full Name"
								/>
								{errors.fullName && (
									<p className="mt-1 text-sm text-red-500">
										{errors.fullName.message}
									</p>
								)}
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 dark:text-sky-50"
							>
								Email address
							</label>
							<div className="relative mt-1">
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<Mail className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="email"
									type="email"
									{...register("email", { required: "Email is required" })}
									className="block w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
									placeholder="you@school.edu"
								/>
								{errors.email && (
									<p className="mt-1 text-sm text-red-500">
										{errors.email.message}
									</p>
								)}
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 dark:text-sky-50"
							>
								Password
							</label>
							<div className="relative mt-1">
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									{...register("password", {
										required: "Password is required",
									})}
									className="block w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
									placeholder="••••••••"
								/>
								<button
									type="button"
									onClick={togglePasswordVisibility}
									className="absolute inset-y-0 right-0 flex items-center pr-3"
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5 text-gray-400" />
									) : (
										<Eye className="h-5 w-5 text-gray-400" />
									)}
								</button>
								{errors.password && (
									<p className="mt-1 text-sm text-red-500">
										{errors.password.message}
									</p>
								)}
							</div>
						</div>
					</div>

					<div className="text-center">
						<Button size="lg" variant="default" type="submit">
							Prihlásiť sa
						</Button>
					</div>
					<Popover>
						<PopoverTrigger>Ako prebieha registrácia?</PopoverTrigger>
						<PopoverContent className="rounded-lg bg-white p-4 shadow-lg dark:bg-stone-900">
							<ul className="list-inside list-decimal space-y-2 text-gray-700 dark:text-sky-200">
								<li>Zaregistrujte sa.</li>
								<li>Admin potvrdí váš účet.</li>
								<li>Po potvrdení e-mailom sa môžete prihlásiť do knižnice.</li>
							</ul>
						</PopoverContent>
					</Popover>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
