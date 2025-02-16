import { FC } from "react"
import Navigation from "../../shared/Navigation"
import { Button } from "~/components/ui/button"
import Link from "next/link"

const CreateBookForm: FC = () => {
    return (
        <>
            <Navigation />
            <h1 className="text-center mt-10 font-bold text-4xl">
                Vytvorenie novej knihy
            </h1>
            <div className="mt-3">
                <Button variant={"link"}>
                    <Link href="/admin" className="font-bold text-xl">Návrat na admin čast</Link>
                </Button>
            </div>

            <div className="flex justify-center items-center mt-4">
                FORM
            </div>
        </>
    )
}

export default CreateBookForm