"use client";

import { useState } from "react";
import Link from "next/link";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { FaUsers, FaRegUser } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Import the Chevron icons

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null); // Specify that openQuestion can be a number or null

  // Points for "Why Choose QuickVote?"
  const features = [
    {
      image: "/security.png",
      title: "Advanced Security",
      description:
        "QuickVote leverages cutting-edge blockchain technology to guarantee the safety of your votes. Each vote is encrypted and securely recorded, preventing tampering or unauthorized access. Our system is designed to uphold trust and ensure fair election outcomes.",
    },
    {
      image: "/easeofuse.png",
      title: "Ease of Use",
      description:
        "QuickVote’s intuitive interface makes online voting accessible to everyone, regardless of their technical expertise. Whether you’re a tech-savvy user or a first-time voter, our platform ensures a smooth and seamless voting experience.",
    },
    {
      image: "/customerservice.png",
      title: "24/7 Customer Service",
      description:
        "We pride ourselves on our exceptional customer support. Our team is available around the clock to resolve any issues and answer your queries, ensuring a hassle-free voting experience from start to finish.",
      button: (
        <div className="mt-6">
          <Link href="/contactus">
            <button className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 border-[2px] border-popBlue bg-popBlue text-logoBlue text-sm font-semibold rounded-full hover:bg-white hover:text-popBlue transition duration-300">
              <FaRegUser className="text-lg" />
              Contact us
            </button>
          </Link>
        </div>
      ),
    },
  ];

  // FAQ Items
  const faqItems = [
    {
      question: "What is QuickVote?",
      answer: "QuickVote is an innovative online voting platform designed to provide secure, transparent, and efficient elections. It uses advanced blockchain technology to ensure that every vote is tamper-proof and verifiable, making it an ideal solution for student councils, corporate elections, and other organizational voting needs.",
    },
    {
      question: "How does QuickVote ensure the security of votes?",
      answer: "QuickVote employs cutting-edge blockchain encryption to securely record and store votes. Blockchain technology creates an immutable ledger that prevents tampering, unauthorized access, or vote manipulation. Each vote is securely encrypted, guaranteeing its authenticity and confidentiality.",
    },
    {
      question: "Can QuickVote handle large-scale elections?",
      answer: "Yes, QuickVote is designed to be scalable, making it suitable for elections of all sizes. Whether it’s a small student council election or a nationwide corporate vote, QuickVote’s infrastructure can handle high voter turnout seamlessly and without delays.",
    },
    {
      question: "Is QuickVote easy to use for first-time voters?",
      answer: "Absolutely. QuickVote features an intuitive and user-friendly interface, ensuring a smooth voting experience for everyone, even first-time users. The platform guides voters through the process step-by-step, making it simple and accessible.",
    },
    {
      question: "What kind of support does QuickVote provide?",
      answer: "QuickVote offers 24/7 customer support to address any issues or questions. Our dedicated team is available around the clock to ensure a hassle-free voting experience, from setup to result declaration. You can contact us anytime for assistance.",
    },
  ];

  // Toggle function for FAQ
  const toggleQuestion = (index: number) => {
    setOpenQuestion((prevOpenQuestion) => (prevOpenQuestion === index ? null : index));
  };

  return (
    <>
      <Header />
      <Hero />

      {/* Why Choose QuickVote Section */}
      <section id="why-choose-quickvote" className="bg-gray-100 lg:px-24 md:px-8 sm:px-6 px-8 mx-auto py-8">
        <h1 className="text-logoBlue text-3xl md:text-4xl font-semibold mb-6 text-left">
          Why Choose QuickVote?
        </h1>
        <p className="text-gray-900 text-lg mb-6 text-left">
          QuickVote is the next-generation online voting platform that prioritizes security, accessibility, and efficiency. Designed for organizations of all sizes, from student councils to corporate teams, QuickVote provides a seamless voting experience with a focus on trust, transparency, and innovation. Here's why QuickVote stands out:
        </p>

        <div className="flex flex-col gap-6">
          {features.map(({ image, title, description, button }, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-md max-w-4xl mx-auto ${
                index % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* Image */}
              <div className="w-full md:w-1/4">
                <img
                  src={image}
                  alt={title}
                  className="rounded-lg w-full h-auto object-cover"
                />
              </div>
              {/* Content */}
              <div className="w-full md:w-3/4 text-left">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
                {/* Add the button for "24/7 Customer Service" */}
                {button}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="who-we-are" className="bg-logoBlue lg:px-24 md:px-8 sm:px-6 px-4 mx-auto py-12">
        <div className="flex flex-wrap items-center justify-between">
          {/* Left Image */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center">
            <img
              src="/team.jpeg"
              alt="QuickVote Team"
              className="rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl"
            />
          </div>

          {/* Right Text */}
          <div className="w-full lg:w-1/2 text-left">
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4">Who We Are?</h2>
            <p className="text-white text-sm leading-relaxed">
              At <strong>QuickVote</strong>, we are a team of passionate innovators committed to transforming the voting process.
              Combining expertise in blockchain technology, cybersecurity, and user experience design, we aim to create a secure,
              transparent, and inclusive platform for modern elections. Guided by the principles of trust, accessibility, and innovation,
              our mission is to empower voters and uphold the integrity of democratic systems.
            </p>
            <div className="mt-6">
              <Link href="/aboutus">
                <button className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 border-[2px] border-popBlue bg-popBlue text-logoBlue text-sm font-semibold rounded-full hover:bg-logoBlue hover:text-popBlue transition duration-300">
                  <FaUsers className="text-lg" />
                  Meet Our Team
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

{/* FAQ Section */}
<section id="faq" className="bg-gray-100 lg:px-24 md:px-8 sm:px-6 px-4 mx-auto py-12">
  {/* FAQ Content */}
  <div className="flex flex-col lg:flex-row-reverse gap-10 items-start">
    {/* FAQ Image */}
    <div className="w-full lg:w-1/4 mb-6 lg:mb-0 flex justify-center">
      <img
        src="/faq.png"
        alt="FAQ Illustration"
        className="rounded-lg shadow-lg object-contain w-full max-w-xs sm:max-w-sm"
      />
    </div>
    {/* FAQ List */}
    <div className="w-full lg:w-3/4">
      <h2 className="text-logoBlue text-2xl md:text-4xl font-semibold mb-6 text-left">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqItems.map((item, index) => (
          <div key={index}>
            <div
              className="flex border-b items-center justify-between cursor-pointer"
              onClick={() => toggleQuestion(index)}
            >
              <h3 className="font-medium text-lg text-gray-800">{item.question}</h3>
              {openQuestion === index ? (
                <FiChevronUp className="text-gray-600" />
              ) : (
                <FiChevronDown className="text-gray-600" />
              )}
            </div>
            {openQuestion === index && (
              <p className="text-gray-600 mt-2">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
</section>



      <Footer />
    </>
  );
}
