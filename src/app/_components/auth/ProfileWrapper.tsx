"use client";

import { motion } from "framer-motion";
import { useMemo, type FC } from "react";
import { BookGrid } from "./ProfileHelpersComponents";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { Loader2 } from "lucide-react";

const ProfileWrapper: FC = () => {
  const { data: session } = useSession();

  // TODO: Return book

  const { data: myBorrowedBooksData, isLoading, isError } = api.booking.getAllUsersBookings.useQuery({
    userId: session?.user.id!
  })

  if (isLoading) {
    return <Loader2 className="animate-spin w-8 h-8" />
  }

  if (isError) return <p className="prose prose-p: text-red-800 font-bold text-xl">Chyba pri zobrazení požičaných kníh</p>

  return (
    <div className="min-h-screen bg-white p-6 dark:bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{session?.user.email}</h1>
            </div>
          </div>
        </motion.div>

        <h3 className="prose prose-h3: font-bold text-3xl dark:text-white">Moje požičané knihy</h3>
        <div className="mt-3">
          <BookGrid books={myBorrowedBooksData} />
        </div>
      </div>
    </div>
  );
};

export default ProfileWrapper;
