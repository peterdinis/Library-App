import type { NextPage } from "next";
import Hero from "./components/home/HomeWrapper";
import ServicesWrapper from "./components/home/ServicesWrapper";
import Footer from "./components/shared/Footer";

const Homepage: NextPage = () => {
	return (
		<>
			<Hero />
			<div className="mt-5">
				<ServicesWrapper />
			</div>
			<Footer />
		</>
	);
};

export default Homepage;
