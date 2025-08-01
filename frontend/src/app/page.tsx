"use client";

import { useState } from "react";
import Link from "next/link";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { FaUsers, FaRegUser, FaShieldAlt, FaHeadset, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Image from "next/image";
import security from "../../public/security.png"
import easeofuse from "../../public/easeofuse.png"
import customerservice from "../../public/customerservice.png"
import team from "../../public/team.jpeg"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const features = [
    {
      image: security,
      title: "Advanced Security",
      description:
        "QuickVote leverages cutting-edge blockchain technology to guarantee the safety of your votes. Each vote is encrypted and securely recorded, preventing tampering or unauthorized access.",
      icon: <FaShieldAlt className="text-2xl text-logoBlue" />,
      stats: "256-bit Encryption"
    },
    {
      image: easeofuse, 
      title: "Ease of Use",
      description:
        "Our intuitive interface makes online voting accessible to everyone, regardless of their technical expertise. Simple, clean design ensures a smooth voting experience for all users.",
      icon: <FaRegUser className="text-2xl text-logoBlue" />,
      stats: "3-Step Process"
    },
    {
      image: customerservice,
      title: "24/7 Customer Service",
      description:
        "We provide exceptional customer support around the clock. Our dedicated team is always available to resolve issues and ensure a hassle-free voting experience.",
      icon: <FaHeadset className="text-2xl text-logoBlue" />,
      stats: "< 2min Response",
      button: (
        <div className="mt-6">
          <Link href="/contactus">
            <button className="inline-flex items-center px-6 py-3 bg-logoBlue text-white font-semibold rounded-xl hover:bg-bgBlue hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <FaRegUser className="mr-2" />
              Contact Us
            </button>
          </Link>
        </div>
      ),
    },
  ];

  const faqItems = [
    {
      question: "What is QuickVote?",
      answer:
        "QuickVote is an innovative blockchain-powered voting platform designed to provide secure, transparent, and efficient elections for organizations of all sizes.",
    },
    {
      question: "How does QuickVote ensure vote security?",
      answer:
        "We employ cutting-edge blockchain encryption to create tamper-proof, verifiable votes. Each vote is secured with cryptographic methods that prevent manipulation.",
    },
    {
      question: "Can QuickVote handle large-scale elections?",
      answer:
        "Yes, QuickVote is designed to scale seamlessly from small organization votes to large-scale elections with thousands of participants.",
    },
    {
      question: "Is QuickVote easy to use for first-time voters?",
      answer:
        "Absolutely. Our platform features an intuitive, user-friendly interface that guides voters through the process step-by-step.",
    },
    {
      question: "What kind of support does QuickVote provide?",
      answer:
        "QuickVote offers 24/7 customer support with dedicated assistance for setup, voting, and result declaration. Our team is always available to help.",
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion((prevOpenQuestion) =>
      prevOpenQuestion === index ? null : index
    );
  };

  return (
    <>
      <Header />
      <Hero />

      {/* Why Choose QuickVote Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-6 py-3 mb-6">
              <FaShieldAlt className="text-logoBlue" />
              <span className="text-logoBlue font-semibold">Why Choose Us</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-logoBlue mb-6">
              Why Choose QuickVote?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience the next-generation voting platform that prioritizes security, 
              accessibility, and efficiency for organizations of all sizes.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                    <div className="absolute -top-6 -left-6 w-16 h-16 bg-logoBlue rounded-2xl flex items-center justify-center shadow-lg">
                      {feature.icon}
                    </div>
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={500}
                      height={300}
                      className="w-full h-auto rounded-2xl"
                    />
                    {feature.stats && (
                      <div className="absolute -bottom-4 -right-4 bg-popBlue text-bgBlue px-4 py-2 rounded-xl font-bold shadow-lg">
                        {feature.stats}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-logoBlue">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {feature.button && feature.button}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 bg-logoBlue">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-6 py-3">
                  <FaUsers className="text-popBlue" />
                  <span className="text-white font-semibold">Our Story</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                  Who We Are?
                </h2>
                <p className="text-xl text-gray-200 leading-relaxed">
                  At <strong className="text-popBlue">QuickVote</strong>, we are a team of passionate 
                  innovators committed to transforming the voting process through blockchain technology, 
                  cybersecurity, and user experience design.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Our mission is to empower voters and uphold the integrity of democratic systems worldwide 
                  through secure, transparent, and inclusive voting solutions.
                </p>
              </div>
              
              <Link href="/aboutus">
                <button className="inline-flex items-center px-8 py-4 bg-popBlue text-bgBlue font-bold text-lg rounded-xl hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <FaUsers className="mr-3" />
                  Meet Our Team
                </button>
              </Link>
            </div>

            {/* Team Image */}
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <Image
                  src={team}
                  alt="QuickVote Team"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-2xl"
                />
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-popBlue text-bgBlue px-4 py-2 rounded-xl font-bold shadow-lg">
                  Innovation Team
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white text-logoBlue px-4 py-2 rounded-xl font-bold shadow-lg">
                  Est. 2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-6 py-3 mb-6">
              <FiChevronDown className="text-logoBlue" />
              <span className="text-logoBlue font-semibold">FAQ</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-logoBlue mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about QuickVote
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleQuestion(index)}
                >
                  <h3 className="text-lg font-semibold text-logoBlue pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openQuestion === index ? (
                      <FiChevronUp className="text-logoBlue text-xl" />
                    ) : (
                      <FiChevronDown className="text-logoBlue text-xl" />
                    )}
                  </div>
                </button>
                
                <div className={`px-8 transition-all duration-300 ease-in-out ${
                  openQuestion === index ? 'max-h-96 pb-6' : 'max-h-0'
                } overflow-hidden`}>
                  <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-6">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}