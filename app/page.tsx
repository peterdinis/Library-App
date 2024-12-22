import { NextPage } from "next";
import Footer from "./components/shared/Footer";
import ServicesWrapper from "./components/home/ServicesWrapper";
import Hero from "./components/home/HomeWrapper";

const Homepage: NextPage = () => {
  return (
    <>
      <Hero />
      <ServicesWrapper />
      <Footer />
    </>
  )
}

export default Homepage