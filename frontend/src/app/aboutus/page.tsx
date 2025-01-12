"use client";

import { useState } from "react";
import Link from "next/link";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
export default function AboutUsPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
     <Header/>
      {/* About Us Section */}
      <section id="aboutus" className="bg-gray-100 lg:px-32 md:px-8 sm:px-6 px-4 mx-auto py-8">
          <h1 className="text-logoBlue text-4xl font-semibold mb-8 text-left">About Us</h1>

          <p className="text-gray-600 text-lg mb-8 text-left">
          Welcome to QuickVote, where innovation meets democracy. We are a dedicated team of technology enthusiasts and visionaries committed to transforming the way elections are conducted. Our mission is to build a secure, transparent, and efficient online voting system that empowers voters and strengthens democratic processes.
          <br></br>
          <br></br>
          At QuickVote, we understand the challenges posed by traditional voting systems, including inefficiency, high costs, and security vulnerabilities. Our solution leverages blockchain technology to address these issues, ensuring a seamless voting experience that upholds the principles of fairness, privacy, and accessibility.
          </p>
          <h2 className="text-logoBlue text-3xl font-semibold mb-6 text-left">Our Story</h2>
          <p className="text-gray-600 text-lg mb-8 text-left">
          QuickVote was conceived with the vision of making elections more inclusive and trustworthy. By combining expertise in blockchain technology, software development, and election management, we have developed a platform that guarantees the integrity of every vote cast. Our system is designed not just to modernize elections but to inspire confidence in democratic processes worldwide.
          </p>

          <h2 className="text-logoBlue text-3xl font-semibold mb-6 text-left">Our Vision</h2>
          <p className="text-gray-600 text-lg mb-8 text-left">
          To create a world where every voter's voice is heard and counted with the utmost confidence and transparency. QuickVote aims to redefine the global standard for electoral systems, fostering trust and participation in democratic processes.
          </p>

          <h2 className="text-logoBlue text-3xl font-semibold mb-6 text-left">Our Team</h2>
          <p className="text-gray-600 text-lg mb-8 text-left">
          We are a group of passionate developers, engineers, and problem-solvers working together to bring about meaningful change. With expertise spanning blockchain technology, web development, and data security, we are well-equipped to deliver a solution that meets the demands of modern elections.
          </p>

          <div className="flex flex-wrap justify-center gap-12">
            {/* Team Member 1 */}
            <div className="max-w-xs bg-white p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-110 group">
              <img
                src="/preeti.jpg"
                alt="Preeti Rajdhami"
                className="w-38 h-40 mx-auto box-full rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-logoBlue mb-1">Preeti Rajdhami</h3>
              <p className="text-gray-900 mb-4">(Backend)</p>
              <p className="text-gray-600 text-left">
              Preeti is an expert backend developer with a strong focus on building secure and efficient systems. She ensures the QuickVote platform operates seamlessly, maintaining the highest standards of performance, integrity, and trust.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="max-w-xs bg-white p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-110 group">
              <img
                src="/manoj.jpg"
                alt="Manoj Shrestha"
                className="w-38 h-40 mx-auto box-full rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-logoBlue mb-1">Manoj Shrestha</h3>
              <p className="text-gray-900 mb-4">(Frontend)</p>
              <p className="text-gray-600 text-left">
                Manoj brings a user-centered design approach to QuickVote. He ensures that our platform is intuitive, visually appealing, and accessible to users of all backgrounds.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="max-w-xs bg-white p-6 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-110 group">
              <img
                src="/sohit.jpg"
                alt="Sohit Sharma Tiwari"
                className="w-38 h-40 mx-auto box-full rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-logoBlue mb-1">Sohit Sharma Tiwari</h3>
              <p className="text-gray-6900 mb-4">(Security Analyst)</p>
              <p className="text-gray-600 text-left">
                Sohit focuses on ensuring the platform's security. He implements robust encryption methods to guarantee the protection of voter data and the integrity of the voting process.
              </p>
            </div>
          </div>
      </section>
      <Footer/>
    </>
  );
}
