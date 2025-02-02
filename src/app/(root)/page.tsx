import { NextPage } from "next";
import Footer from "../_components/home/Footer";
import Features from "../_components/home/Features";
import Hero from "../_components/home/Hero";

const Homepage: NextPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <Footer />
    </>
  );
};

export default Homepage;
