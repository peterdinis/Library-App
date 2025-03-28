import bcrypt from "bcrypt";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const userRouter = createTRPCRouter({
  getAllUsers: publicProcedure.query(async () => {
    return await db.user.findMany();
  }),

  searchUsers: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      return await db.user.findMany({
        where: {
          OR: [
            {
              fullName: {
                contains: input.query,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: input.query,
                mode: "insensitive",
              },
            },
          ],
        },
      });
    }),

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
});
