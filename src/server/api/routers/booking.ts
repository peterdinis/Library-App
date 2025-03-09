import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import z from "zod"

export const bookingRouter = createTRPCRouter({
    getAllBookings: publicProcedure.query(async () => {
        return await db.borrowRecord.findMany();
    }),

    getBookingDetail: publicProcedure
        .input(z.string())
        .query(async ({ input }) => {
            return await db.borrowRecord.findUnique({
                where: { id: input },
            });
        }),

    getAllUsersBookings: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        ).query(async ({ input }) => {
            const oneUser = await db.user.findFirst({
                where: {
                    id: input.userId
                }
            })

            const allUsersBooking = await db.borrowRecord.findMany({
                where: {
                    userId: oneUser!.id
                }
            })

            return allUsersBooking
        })
});
