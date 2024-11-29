"use client"; // Add this directive at the top

import { useState } from 'react';
import Link from 'next/link';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Header from "./components/Header";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Header/>

      <Hero />
      <Footer />
    </>
  );
}
