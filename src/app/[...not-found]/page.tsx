import type { NextPage } from "next";
import GlobalErrorComponent from "../_components/shared/GlobalErrorComponent";

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
