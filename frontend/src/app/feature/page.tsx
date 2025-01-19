"use client";

import { useState } from "react";
import Link from "next/link";
import React from "react";
import { FaShieldAlt } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { LuScrollText } from "react-icons/lu";
import { BsFileBarGraphFill } from "react-icons/bs";
import { MdDevices } from "react-icons/md";
import { FaMask } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { FaRobot } from "react-icons/fa";
import { FaRecycle } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function FeaturesPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Header />
      {/* Features Section */}
      <section id="features" className="bg-gray-100 lg:px-32 md:px-8 sm:px-6 px-4 mx-auto py-8">
        <h1 className="text-logoBlue text-3xl md:text-4xl font-semibold mb-8 text-left">
          Our Features
        </h1>
        <p className="text-gray-600 text-lg mb-8 text-left">
          At QuickVote, we are redefining the voting experience with innovative features that prioritize security, transparency, and accessibility. Our system leverages blockchain technology to ensure every vote is secure, every process is transparent, and every voter is included. Explore the advanced functionalities that make QuickVote the future of democratic participation.
        </p>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {[
            {
              icon: <FaShieldAlt />,
              title: "Secure Authentication",
              description:
                "Implements robust user authentication mechanisms using blockchain and MetaMask integration. Ensures voter identity verification while maintaining privacy.",
            },
            {
              icon: <AiOutlineGlobal />,
              title: "Decentralized Voting Process",
              description:
                "Uses blockchain to record votes securely in a distributed ledger, eliminating central points of failure. Prevents unauthorized tampering or manipulation of votes.",
            },
            {
              icon: <LuScrollText />,
              title: "Immutable Audit Trails",
              description:
                "Provides complete transparency with an immutable record of every vote, ensuring verifiability and trust.",
            },
            {
              icon: <BsFileBarGraphFill />,
              title: "Real-Time Vote Counting",
              description:
                "Displays live vote counts instantly, removing delays in result computation. Reduces human error and enhances efficiency.",
            },
            {
              icon: <MdDevices />,
              title: "Accessibility Across Devices",
              description:
                "Designed with a responsive interface, compatible with desktops, tablets, and mobile devices. Ensures participation from diverse voter demographics.",
            },
            {
              icon: <FaMask />,
              title: "Anonymity of Voters",
              description:
                "Protects the identity of voters using cryptographic methods, allowing for free and fair elections.",
            },
            {
              icon: <FaGlobeAmericas />,
              title: "Multi-Language Support",
              description:
                "Offers an intuitive interface in multiple languages, ensuring inclusivity in diverse communities.",
            },
            {
              icon: <BsGraphUp />,
              title: "Scalability",
              description:
                "Built to handle elections of any scale, from small organizations to nationwide elections.",
            },
            {
              icon: <FaRobot />,
              title: "Smart Contract Integration",
              description:
                "Automates rules and processes, ensuring compliance with predefined electoral policies.",
            },
            {
              icon: <FaRecycle />,
              title: "Sustainability",
              description:
                "Reduces reliance on physical materials, promoting an eco-friendly election process.",
            },
          ].map(({ icon, title, description }, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/3 max-w-xs sm:max-w-sm p-6 rounded-lg shadow-md bg-white flex flex-col items-center text-left transform transition-transform duration-300 hover:scale-110 group"
            >
              <div className="flex justify-center items-center w-20 h-20 bg-logoBlue text-white text-6xl sm:text-7xl rounded-lg mb-4">
                {icon}
              </div>
              <div className="w-full">
                <h3 className="text-xl font-semibold text-gray-900 px-2 text-left">{title}</h3>
                <div className="group-hover:block bg-white p-2 rounded-lg">
                  <p className="text-gray-600">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

       


      </section>
      <div className="flex bg-featureBlue border-2 rounded-lg shadow-lg">
          {/* Left Side (Image) */}
          <div className="w-1/3">
            <img
              src="/path-to-your-image.jpg" // Replace with your image path
              alt="Anonymous Voting"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Right Side (Text Points) */}
          <div className="w-2/3 pl-6">
            <h3 className="text-xl font-semibold text-bgBlue mb-2">Why Our Voting System is Anonymous</h3>
            <ul className="list-disc pl-5">
              <li className="text-lg text-gray-700">Votes are encrypted using secure methods.</li>
              <li className="text-lg text-gray-700">Voters' identities are not stored or revealed.</li>
              <li className="text-lg text-gray-700">Blockchain technology ensures data immutability.</li>
              <li className="text-lg text-gray-700">Your vote cannot be traced back to you.</li>
            </ul>
          </div>
        </div>




      <Footer />
    </>
  );
}
