"use client";

import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Header from "./components/Header";
import WhyChoose from "./components/WhyChoose";
import WhoWeAre from "./components/WhoWeAre";
import FAQ from "./components/FAQ";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <WhyChoose />
      <WhoWeAre />
      <FAQ />
      <Footer />
    </>
  );
}