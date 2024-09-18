"use client"; // Add this directive at the top

import { useState } from 'react';
import Link from 'next/link';
import About from './components/About';
import Hero from './components/Hero';
import Contactus from './components/Contactus';
import Footer from './components/Footer';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="sticky top-0 bg-navBlue text-white shadow-md z-50">
  <div className="lg:px-32 sm:px-6 md:px-8 mx-auto flex items-center justify-between py-4 px-4 relative">
    {/* Brand Name */}
    <Link href="/" className="text-2xl font-bold">
      Voting App
    </Link>

    {/* Hamburger Icon for Mobile View */}
    <div className="md:hidden">
      <button onClick={toggleDropdown} className="focus:outline-none">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>

    {/* Navigation Links */}
    <nav
      className={`${
        isOpen ? 'block' : 'hidden'
      } md:flex md:items-center md:space-x-8  absolute md:static top-16 right-0 md:right-auto bg-navBlue text-white w-48 md:w-auto z-20 shadow-lg md:shadow-none`}
    >
      <div className="flex flex-col md:flex-row md:space-x-8">
        <Link
          href="/"
          className="hover:text-gray-300 block py-2 px-4 md:py-0 md:px-0"
        >
          Home
        </Link>
        <Link
          href="#about"
          className="hover:text-gray-300 block py-2 px-4 md:py-0 md:px-0"
        >
          About Us
        </Link>
        <Link
          href="#Contactus"
          className="hover:text-gray-300 block py-2 px-4 md:py-0 md:px-0"
        >
          Contact Us
        </Link>
      </div>
    </nav>
  </div>
</header>


      <Hero />

      <About />
      <Contactus />
      <Footer/>
    </>
  );
}
