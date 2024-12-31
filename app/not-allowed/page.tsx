"use client"

import GlobalErrorComponent from "@/components/shared/GlobalErrorComponent";
import { NextPage } from "next";
import { useRouter } from "next/navigation";

const NotAllowedPage: NextPage = () => {

    const router = useRouter();

    setTimeout(() => {
        router.push("/")
    }, 3000)

    return (
        <>
            <GlobalErrorComponent
                statusCode={"401"}
                message={"Najprv sa musíte prihlásit"}
            />
        </>
    )
}

export default NotAllowedPage