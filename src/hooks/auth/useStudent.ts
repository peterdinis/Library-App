"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { Role } from "~/types/applicationTypes";

const useStudent = () => {
  const { data: session, status } = useSession();

  const studentUser = useMemo(() => {
    return session?.user?.role === Role.STUDENT;
  }, [session]);

  return {
    studentUser,
    isLoading: status === "loading",
  };
};

export default useStudent;
