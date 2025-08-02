"use client";

import { useState } from "react";
import React from "react";
import { 
  FaShieldAlt, 
  FaGlobe, 
  FaFileAlt, 
  FaChartLine,
  FaMobile, 
  FaUserSecret,
  FaExpand,
  FaCogs,
  FaLeaf,
  FaCheckCircle
} from "react-icons/fa";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default function FeaturesPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Secure Authentication",
      description: "Advanced blockchain and MetaMask integration ensures robust user authentication while maintaining complete privacy and security for every voter.",
      color: "from-blue-500 to-blue-600",
      stats: "256-bit Encryption"
    },
    {
      icon: <FaGlobe className="text-4xl" />,
      title: "Decentralized Voting Process",
      description: "Distributed ledger technology eliminates central points of failure and prevents unauthorized tampering or vote manipulation through blockchain consensus.",
      color: "from-green-500 to-green-600",
      stats: "100% Decentralized"
    },
    {
      icon: <FaFileAlt className="text-4xl" />,
      title: "Immutable Audit Trails",
      description: "Complete transparency with permanent, unchangeable records of every vote cast, ensuring full verifiability and trust in the democratic process.",
      color: "from-purple-500 to-purple-600",
      stats: "Permanent Records"
    },
    {
      icon: <FaChartLine className="text-4xl" />,
      title: "Real-Time Vote Counting",
      description: "Instant vote processing and live result updates eliminate delays and reduce human error in result computation and announcement.",
      color: "from-gray-500 to-gray-600",
      stats: "Live Updates"
    },
    {
      icon: <FaMobile className="text-4xl" />,
      title: "Cross-Device Accessibility",
      description: "Responsive design compatible with desktops, tablets, and mobile devices ensuring universal participation across all user demographics.",
      color: "from-pink-500 to-pink-600",
      stats: "All Devices"
    },
    {
      icon: <FaUserSecret className="text-4xl" />,
      title: "Voter Anonymity Protection",
      description: "Advanced cryptographic methods protect voter identity while maintaining the integrity and verifiability of each vote cast in the system.",
      color: "from-indigo-500 to-indigo-600",
      stats: "100% Anonymous"
    },
    {
      icon: <FaExpand className="text-4xl" />,
      title: "Infinite Scalability",
      description: "Architecture designed to handle elections of any scale, from small organizational votes to large-scale nationwide democratic processes.",
      color: "from-red-500 to-red-600",
      stats: "Unlimited Scale"
    },
    {
      icon: <FaCogs className="text-4xl" />,
      title: "Smart Contract Integration",
      description: "Automated rule enforcement and process management ensures compliance with predefined electoral policies and transparent execution.",
      color: "from-yellow-500 to-yellow-600",
      stats: "Automated Rules"
    },
    {
      icon: <FaLeaf className="text-4xl" />,
      title: "Eco-Friendly Solution",
      description: "Sustainable digital approach reduces physical material dependency, promoting environmentally responsible elections and reducing carbon footprint.",
      color: "from-emerald-500 to-emerald-600",
      stats: "Zero Paper"
    }
  ];

  const benefits = [
    "Reduced election costs by up to 90%",
    "Instant result verification and transparency",
    "Enhanced voter participation and accessibility",
    "Elimination of human counting errors",
    "Secure blockchain-based vote storage",
    "24/7 customer support and assistance"
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-logoBlue via-bgBlue to-logoBlue text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-popBlue/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-navBlue/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-orange/10 rounded-full blur-2xl animate-pulse delay-2000" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <FaShieldAlt className="text-popBlue" />
              <span className="font-semibold">Advanced Features</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Powerful Features for
                <span className="text-popBlue block">Secure Voting</span>
              </h1>
              <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Discover the innovative features that make QuickVote the most secure, 
                transparent, and accessible voting platform available today.
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-center pt-8">
              <div className="grid grid-cols-3 gap-16 max-w-md">
                <div className="text-center">
                  <div className="text-3xl font-bold text-popBlue">8+</div>
                  <div className="text-sm text-gray-300">Features</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-popBlue">100%</div>
                  <div className="text-sm text-gray-300">Secure</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-popBlue">24/7</div>
                  <div className="text-sm text-gray-300">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-6 py-3 mb-6">
              <FaCogs className="text-logoBlue" />
              <span className="text-logoBlue font-semibold">Core Features</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-logoBlue mb-6">
              Built for the Future of Democracy
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our cutting-edge technology stack ensures every vote is secure, every process is transparent, 
              and every voter is empowered to participate in democratic decision-making.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-logoBlue/30 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                
                {/* Icon */}
                <div className={`relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-logoBlue group-hover:text-bgBlue transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <div className="text-xs bg-logoBlue/10 text-logoBlue px-3 py-1 rounded-full font-semibold">
                      {feature.stats}
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect Indicator */}
                <div className={`mt-6 h-1 bg-gradient-to-r ${feature.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-6 py-3">
                  <FaCheckCircle className="text-logoBlue" />
                  <span className="text-logoBlue font-semibold">Key Benefits</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-logoBlue">
                  Why Organizations Choose QuickVote
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Experience measurable improvements in your voting processes with 
                  our comprehensive blockchain-powered solution.
                </p>
              </div>

              {/* Benefits List */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-logoBlue/5 transition-colors duration-300 group"
                  >
                    <div className="w-8 h-8 bg-logoBlue rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <FaCheckCircle className="text-white text-sm" />
                    </div>
                    <span className="text-gray-800 font-medium group-hover:text-logoBlue transition-colors duration-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="bg-gradient-to-br from-logoBlue to-bgBlue rounded-3xl p-8 text-white relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full" />
                
                <div className="relative space-y-6">
                  <div className="w-16 h-16 bg-popBlue rounded-2xl flex items-center justify-center">
                    <FaShieldAlt className="text-3xl text-bgBlue" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Enterprise Ready</h3>
                    <p className="text-blue-100 leading-relaxed">
                      Trusted by organizations worldwide for secure, transparent, 
                      and efficient voting processes.
                    </p>
                  </div>
                  
                  {/* Mini Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-popBlue">99.9%</div>
                      <div className="text-xs text-blue-200">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-popBlue">500+</div>
                      <div className="text-xs text-blue-200">Organizations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}