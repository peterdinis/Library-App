import bcrypt from "bcrypt";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { signIn } from "~/server/auth";
import { db } from "~/server/db";

export const userRouter = createTRPCRouter({
	register: publicProcedure
		.input(
			z.object({
				fullName: z.string().min(1, "Full name is required"),
				email: z.string().email("Invalid email address"),
				password: z
					.string()
					.min(6, "Password must be at least 6 characters long"),
			}),
		)
		.mutation(async ({ input }) => {
			const { fullName, email, password } = input;

			const existingUser = await db.user.findUnique({
				where: { email },
			});

			if (existingUser) {
				throw new Error("Email is already registered");
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const newUser = await db.user.create({
				data: {
					fullName,
					email,
					password: hashedPassword,
				},
			});

			return {
				message: "User registered successfully",
				userId: newUser.id,
			};
		}),

	loginUser: publicProcedure
		.input(
			z.object({
				email: z.string().email("Invalid email address"),
				password: z
					.string()
					.min(6, "Password must be at least 6 characters long"),
			}),
		)
		.mutation(async ({ input }) => {
			const { email, password } = input;

			try {
				const result = await signIn("credentials", {
					email,
					password,
					redirect: false,
				});

				if (result?.error) {
					return { success: false, error: result.error };
				}

				return { success: true };
			} catch (error) {
				console.log(error, "Signin error");
				return { success: false, error: "Signin error" };
			}
		}),
});
