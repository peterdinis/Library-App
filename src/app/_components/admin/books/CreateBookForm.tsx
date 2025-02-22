import Link from "next/link";
import type { FC } from "react";
import { Button } from "~/components/ui/button";
import Navigation from "../../shared/Navigation";

const CreateBookForm: FC = () => {
	return (
		<>
			<Navigation />
			<h1 className="mt-10 text-center text-4xl font-bold">
				Vytvorenie novej knihy
			</h1>
			<div className="mt-3">
				<Button variant={"link"}>
					<Link href="/admin" className="text-xl font-bold">
						Návrat na admin čast
					</Link>
				</Button>
			</div>

			<div className="mt-4 flex items-center justify-center">FORM</div>
		</>
	);
};

export default CreateBookForm;
