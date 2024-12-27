import GlobalErrorComponent from "@/components/shared/GlobalErrorComponent";
import type { NextPage } from "next";

const NotFoundPage: NextPage = () => {
	return (
		<GlobalErrorComponent
			statusCode={"404"}
			message={"Stránka nebola nájdená"}
			linkHref="/"
			linkText="Návrat na hlavnú stárnku"
		/>
	);
};

export default NotFoundPage;
