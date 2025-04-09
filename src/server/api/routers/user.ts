import bcrypt from "bcrypt";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ratelimit from "~/lib/upstash/ratelimit";

export const userRouter = createTRPCRouter({
  getAllUsers: publicProcedure.query(() =>
    db.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
      },
    }),
  ),

  searchUsers: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
      }),
    )
    .query(({ input }) =>
      db.user.findMany({
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
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      }),
    ),

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

      const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
      const { success } = await ratelimit.limit(ip);

      if (!success) return redirect("/too-fast");

      const existingUser = await db.user.findUnique({
        where: { email },
        select: { id: true },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email is already registered",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await db.user.create({
        data: {
          fullName,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
        },
      });

      return {
        message: "User registered successfully",
        userId: newUser.id,
      };
    }),

  deleteUserById: publicProcedure
    .input(
      z.object({
        id: z.string().uuid("Invalid user ID"),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await db.user.findUnique({
        where: { id: input.id },
        select: { id: true },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      await db.user.delete({
        where: { id: input.id },
      });

      return { message: "User deleted successfully" };
    }),
});
