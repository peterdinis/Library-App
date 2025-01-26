import { NextPage } from "next";
import HomeWrapper from "../_components/home/HomeWrapper";
import Footer from "../_components/home/Footer";
import Features from "../_components/home/Features";

const Homepage: NextPage = () => {
  return (
    <>
      <HomeWrapper />
      <Features />
      <Footer />
    </>
  );
};

export default Homepage;
