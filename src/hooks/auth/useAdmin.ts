"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { Role } from "~/types/applicationTypes";

const useAdmin = () => {
  const { data: session, status } = useSession();

  const adminUser = useMemo(() => {
    return session?.user?.role === Role.ADMIN;
  }, [session]);

  return {
    adminUser,
    isLoading: status === "loading",
  };
};

export default useAdmin;
