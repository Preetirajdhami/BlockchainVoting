"use client"

import Image from "next/image"
import Link from "next/link"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { Shield, Globe, ScrollText, BarChart, Smartphone, Lock, Languages, Server, Code, Leaf } from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description:
        "Implements robust user authentication mechanisms using blockchain and MetaMask integration. Ensures voter identity verification while maintaining privacy.",
    },
    {
      icon: Globe,
      title: "Decentralized Voting Process",
      description:
        "Uses blockchain to record votes securely in a distributed ledger, eliminating central points of failure. Prevents unauthorized tampering or manipulation of votes.",
    },
    {
      icon: ScrollText,
      title: "Immutable Audit Trails",
      description:
        "Provides complete transparency with an immutable record of every vote, ensuring verifiability and trust.",
    },
    {
      icon: BarChart,
      title: "Real-Time Vote Counting",
      description:
        "Displays live vote counts instantly, removing delays in result computation. Reduces human error and enhances efficiency.",
    },
    {
      icon: Smartphone,
      title: "Accessibility Across Devices",
      description:
        "Designed with a responsive interface, compatible with desktops, tablets, and mobile devices. Ensures participation from diverse voter demographics.",
    },
    {
      icon: Lock,
      title: "Anonymity of Voters",
      description:
        "Protects the identity of voters using cryptographic methods, allowing for free and fair elections.",
    },
    {
      icon: Server,
      title: "Scalability",
      description:
        "Built to handle elections of any scale, from small organizations to nationwide elections.",
    },
    {
      icon: Code,
      title: "Smart Contract Integration",
      description:
        "Automates rules and processes, ensuring compliance with predefined electoral policies.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "Reduces reliance on physical materials, promoting an eco-friendly election process.",
    },
  ]

  return (
    <>
      <Header />
      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introductory Section */}

            <div className="order-2 lg:order-1">
              <h1 className="text-4xl font-bold text-navBlue mb-6">Our Features</h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                At QuickVote, we are redefining the voting experience with innovative features that prioritize security,
                transparency, and accessibility. Our system leverages blockchain technology to ensure every vote is secure,
                every process is transparent, and every voter is included. Explore the advanced functionalities that make
                QuickVote the future of democratic participation.
              </p>
            </div>
<br />

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-md"
              >
                <div className="w-16 h-16 bg-navBlue rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navBlue mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
      <Footer />
    </>
  )
}