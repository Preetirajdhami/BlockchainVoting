"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

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
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
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
  );
};

export default FAQ;