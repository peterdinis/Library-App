"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { Role } from "~/types/applicationTypes";

const useTeacher = () => {
  const { data: session, status } = useSession();

  const teacherUser = useMemo(() => {
    return session?.user?.role === Role.TEACHER;
  }, [session]);

  return {
    teacherUser,
    isLoading: status === "loading",
  };
};

export default useTeacher;
