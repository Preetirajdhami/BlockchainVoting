"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Hero from "./components/Hero"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { Users, User, ChevronDown, ChevronUp } from "lucide-react"

export default function Home() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

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
        <Link href="/contactus">
          <button className="mt-6 flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-logoBlue text-white rounded-lg hover:bg-navBlue transition-colors font-medium">
            <User className="h-5 w-5" />
            Contact Us
          </button>
        </Link>
      ),
    },
  ]

  const faqItems = [
    {
      question: "What is QuickVote?",
      answer:
        "QuickVote is an innovative online voting platform designed to provide secure, transparent, and efficient elections. It uses advanced blockchain technology to ensure that every vote is tamper-proof and verifiable, making it an ideal solution for student councils, corporate elections, and other organizational voting needs.",
    },
    {
      question: "How does QuickVote ensure the security of votes?",
      answer:
        "QuickVote employs cutting-edge blockchain encryption to securely record and store votes. Blockchain technology creates an immutable ledger that prevents tampering, unauthorized access, or vote manipulation. Each vote is securely encrypted, guaranteeing its authenticity and confidentiality.",
    },
    {
      question: "Can QuickVote handle large-scale elections?",
      answer:
        "Yes, QuickVote is designed to be scalable, making it suitable for elections of all sizes. Whether it’s a small student council election or a nationwide corporate vote, QuickVote’s infrastructure can handle high voter turnout seamlessly and without delays.",
    },
    {
      question: "Is QuickVote easy to use for first-time voters?",
      answer:
        "Absolutely. QuickVote features an intuitive and user-friendly interface, ensuring a smooth voting experience for everyone, even first-time users. The platform guides voters through the process step-by-step, making it simple and accessible.",
    },
    {
      question: "What kind of support does QuickVote provide?",
      answer:
        "QuickVote offers 24/7 customer support to address any issues or questions. Our dedicated team is available around the clock to ensure a hassle-free voting experience, from setup to result declaration. You can contact us anytime for assistance.",
    },
  ]

  const toggleQuestion = (index: number) => {
    setOpenQuestion((prev) => (prev === index ? null : index))
  }

  return (
    <>
      <Header />
      <Hero />

      {/* Why Choose QuickVote Section */}
      <section id="why-choose-quickvote" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-bgBlue mb-6 text-center">Why Choose QuickVote?</h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-12 text-center">
            QuickVote is the next-generation online voting platform that prioritizes security, accessibility, and
            efficiency. Designed for organizations of all sizes, from student councils to corporate teams, QuickVote
            provides a seamless voting experience with a focus on trust, transparency, and innovation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ image, title, description, button }, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-md"
              >
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-logoBlue to-navBlue rounded-lg opacity-10"></div>
                </div>
                <h3 className="text-xl font-semibold text-bgBlue mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
                {button}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="who-we-are" className="bg-gradient-to-br from-logoBlue to-navBlue py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-semibold text-white mb-6">Who We Are?</h2>
              <p className="text-white text-lg leading-relaxed">
                At <strong>QuickVote</strong>, we are a team of passionate innovators committed to transforming the voting
                process. Combining expertise in blockchain technology, cybersecurity, and user experience design, we aim to
                create a secure, transparent, and inclusive platform for modern elections. Guided by the principles of
                trust, accessibility, and innovation, our mission is to empower voters and uphold the integrity of
                democratic systems.
              </p>
              <div className="mt-6">
                <Link href="/aboutus">
                  <button className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-white text-logoBlue rounded-lg hover:bg-gray-100 transition-colors font-medium">
                    <Users className="h-5 w-5" />
                    Meet Our Team
                  </button>
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <Image
                  src="/team.jpeg"
                  alt="QuickVote Team"
                  width={500}
                  height={400}
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white rounded-full opacity-20 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-bgBlue mb-6 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer transition-all duration-300 hover:shadow-md"
                onClick={() => toggleQuestion(index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">{item.question}</h3>
                  {openQuestion === index ? (
                    <ChevronUp className="h-6 w-6 text-logoBlue" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-logoBlue" />
                  )}
                </div>
                {openQuestion === index && (
                  <p className="text-gray-600 text-sm leading-relaxed mt-4">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-semibold text-bgBlue mb-4">Ready to Get Started?</h3>
          <p className="text-gray-600 text-lg mb-6 max-w-3xl mx-auto">
            Join thousands of organizations using QuickVote to empower their elections. Start your secure voting journey
            today.
          </p>
          <Link href="/voter/voterLogin">
            <button className="bg-logoBlue text-white px-8 py-3 rounded-lg hover:bg-navBlue transition-colors font-medium">
              Start Voting Now
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}