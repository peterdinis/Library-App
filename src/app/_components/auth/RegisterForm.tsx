"use client";

import { useState } from "react";
import { Book, Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import type { RegisterFormInputs } from "./Auth.interface";
import { useToast } from "~/hooks/shared/use-toast";
import { Button } from "~/components/ui/button";

const RegisterForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const { toast } = useToast();

  const registerMutation = api.user.register.useMutation();
  const sendRegisterEmail = api.email.sendAfterRegister.useMutation();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerMutation.mutateAsync(data);
      sendRegisterEmail.mutate({
        email: data.email,
        fullName: data.fullName,
      });
      toast({
        title: "Registrácia bola úspešná.",
        duration: 2000,
        className: "bg-green-700 text-white font-bold text-xl",
      });
      window.location.replace("/sign-in");
    } catch (error: any) {
      if (error.message === "Email is already registered") {
        toast({
          title: "Tento email už je zaregistrovaný",
          description: "Použite iný email na registráciu.",
          duration: 3000,
          className: "bg-red-600 text-white font-bold text-xl",
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-zinc-900">
        <div className="text-center">
          <div className="flex justify-center">
            <Book className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-sky-50">
            Registrácia
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 dark:text-sky-50"
              >
                Celé meno
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
                  className="form-input w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-zinc-700 dark:text-white dark:placeholder-white"
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
                Email
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="form-input w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-zinc-700 dark:text-white dark:placeholder-white"
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
                Heslo
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
                  className="form-input w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-zinc-700 dark:text-white dark:placeholder-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
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
          <Button type="submit" size="lg" variant="default" className="w-full">
            Registrácia
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
