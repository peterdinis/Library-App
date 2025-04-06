"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useLoggedSession = useMemo(() => {
    const { data: session, status } = useSession();

    return {
        session,
        status
    }
}, []);

export default useLoggedSession