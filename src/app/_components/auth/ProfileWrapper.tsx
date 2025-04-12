"use client";

import { motion } from "framer-motion";
import { type FC } from "react";
import { BookGrid, BooksData } from "./ProfileHelpersComponents";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { Loader2 } from "lucide-react";
import Loader from "~/components/ui/loader";

const ProfileWrapper: FC = () => {
  const { data: session } = useSession();

  const {
    data: myBorrowedBooksData,
    isLoading,
    isError,
  } = api.booking.getAllUsersBookings.useQuery(
    {
      userId: session?.user.id ?? "",
    },
    {
      enabled: !!session?.user.id,
    },
  );

  if (isLoading || myBorrowedBooksData === undefined) {
    return <Loader width={8} height={8} />
  }

  if (isError)
    return (
      <p className="prose-p: prose text-xl font-bold text-red-800">
        Chyba pri zobrazení požičaných kníh
      </p>
    );

  return (
    <div className="dark:bg-background min-h-screen bg-white p-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 rounded-xl bg-zinc-100 p-6 shadow-xs dark:bg-zinc-900"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{session?.user.email}</h1>
            </div>
          </div>
        </motion.div>

        <h3 className="prose-h3: prose text-3xl font-bold dark:text-white">
          Moje požičané knihy
        </h3>
        <div className="mt-3">
          <BookGrid books={myBorrowedBooksData as unknown as BooksData} />
        </div>
      </div>
    </div>
  );
};

export default ProfileWrapper;
