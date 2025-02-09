import type { NextPage } from "next";
import Features from "../_components/home/Features";
import Footer from "../_components/home/Footer";
import HomeWrapper from "../_components/home/HomeWrapper";

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
