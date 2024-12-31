import GlobalErrorComponent from "@/components/shared/GlobalErrorComponent";
import { NextPage } from "next";

const NotAllowedPage: NextPage = () => {
    return (
        <>
            <GlobalErrorComponent
                statusCode={"401"}
                message={"Najprv sa musíte prihlásit"}
                linkHref="/"
                linkText="Návrat na hlavnú stárnku"
            />
        </>
    )
}

export default NotAllowedPage