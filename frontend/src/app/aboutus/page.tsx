"use client";

import { useState } from "react";
import Link from "next/link";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from "next/image";
import { 
  FaUsers, 
  FaLightbulb, 
  FaRocket, 
  FaHeart, 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope,
  FaCode,
  FaPaintBrush,
  FaServer
} from "react-icons/fa";

import preeti from "../../../public/preeti.jpg"
import manoj from "../../../public/manoj.jpg"
import sohit from "../../../public/sohit.jpg"




export default function AboutUsPage() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const teamMembers = [
    {
      name: "Preeti Rajdhami",
      role: "Backend Developer",
      image: preeti,
      description: "Preeti is an expert backend developer with a strong focus on building secure and efficient systems. She ensures the QuickVote platform operates seamlessly, maintaining the highest standards of performance, integrity, and trust.",
      skills: ["Node.js", "Blockchain", "Security", "Database Design"],
      icon: <FaServer className="text-2xl" />,
      color: "from-blue-500 to-blue-600",
      social: {
        linkedin: "#",
        github: "https://github.com/Preetirajdhami",
        email: "mailto:preeti@quickvote.com"
      }
    },
    {
      name: "Manoj Shrestha",
      role: "Frontend Developer",
      image: manoj,
      description: "Manoj brings a user-centered design approach to QuickVote. He ensures that our platform is intuitive, visually appealing, and accessible to users of all backgrounds and technical skill levels.",
      skills: ["React", "Next.js", "UI/UX", "TypeScript"],
      icon: <FaCode className="text-2xl" />,
      color: "from-green-500 to-green-600",
      social: {
        linkedin: "https://www.linkedin.com/in/manoj-shrestha-43a64b177/",
        github: "https://github.com/ManojScripts-dot",
        email: "mailto:manoj@quickvote.com"
      }
    },
    {
      name: "Sohit Sharma Tiwari",
      role: "UI/UX Designer",
      image: sohit,
      description: "Sohit focuses on enhancing the platform's UI/UX. He designs intuitive and user-friendly interfaces to ensure a seamless voting experience while maintaining accessibility and clarity across all user interactions.",
      skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
      icon: <FaPaintBrush className="text-2xl" />,
      color: "from-purple-500 to-purple-600",
      social: {
        linkedin: "#",
        github: "https://github.com/MrSOHIT",
        email: "mailto:sohit@quickvote.com"
      }
    }
  ];

  const values = [
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible in voting technology, creating solutions that are ahead of their time.",
      color: "from-yellow-400 to-yellow-500"
    },
    {
      icon: <FaHeart className="text-3xl" />,
      title: "Integrity",
      description: "Trust and transparency are at the core of everything we do. We believe democracy deserves nothing less than absolute integrity.",
      color: "from-red-400 to-red-500"
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Inclusivity",
      description: "Our platform is designed to be accessible to everyone, ensuring that every voice can be heard in the democratic process.",
      color: "from-blue-400 to-blue-500"
    },
    {
      icon: <FaRocket className="text-3xl" />,
      title: "Excellence",
      description: "We strive for perfection in every aspect of our platform, from security to user experience and everything in between.",
      color: "from-green-400 to-green-500"
    }
  ];

  const milestones = [
    { year: "2024", title: "QuickVote Founded", description: "Started with a vision to revolutionize voting" },
    { year: "2024", title: "First Beta Release", description: "Launched our initial platform for testing" },
    { year: "2024", title: "Blockchain Integration", description: "Implemented advanced blockchain security" },
    { year: "2024", title: "Growing Community", description: "Expanding our reach across organizations" }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-logoBlue via-bgBlue to-logoBlue text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-popBlue/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-navBlue/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <FaUsers className="text-popBlue" />
              <span className="font-semibold">About QuickVote</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Meet the Team Behind
              <span className="text-popBlue block">Secure Democracy</span>
            </h1>
            
            <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              We are passionate innovators committed to transforming the voting process through 
              blockchain technology, exceptional design, and unwavering dedication to democratic values.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Our Story */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-6 py-3">
                  <FaLightbulb className="text-logoBlue" />
                  <span className="text-logoBlue font-semibold">Our Story</span>
                </div>
                <h2 className="text-4xl font-bold text-logoBlue">Our Journey</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  QuickVote was conceived with the vision of making elections more inclusive and trustworthy. 
                  By combining expertise in blockchain technology, software development, and election management, 
                  we have developed a platform that guarantees the integrity of every vote cast.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our system is designed not just to modernize elections but to inspire confidence in 
                  democratic processes worldwide. We believe that technology should serve democracy, 
                  not complicate it.
                </p>
              </div>
            </div>

            {/* Our Vision */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-6 py-3">
                  <FaRocket className="text-logoBlue" />
                  <span className="text-logoBlue font-semibold">Our Vision</span>
                </div>
                <h2 className="text-4xl font-bold text-logoBlue">Our Vision</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To create a world where every voter&apos;s voice is heard and counted with the utmost 
                  confidence and transparency. QuickVote aims to redefine the global standard for 
                  electoral systems, fostering trust and participation in democratic processes.
                </p>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-logoBlue mb-3">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Empowering democracy through secure, transparent, and accessible voting technology 
                    that puts the power back in the hands of the people.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-6 py-3 mb-6">
              <FaHeart className="text-logoBlue" />
              <span className="text-logoBlue font-semibold">Our Values</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-logoBlue mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values shape every decision we make and every line of code we write.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group text-center p-8 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${value.color} rounded-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-logoBlue mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-6 py-3 mb-6">
              <FaUsers className="text-logoBlue" />
              <span className="text-logoBlue font-semibold">Our Team</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-logoBlue mb-6">
              Meet the Innovators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are a group of passionate developers, engineers, and problem-solvers working 
              together to bring about meaningful change in democratic processes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                onMouseEnter={() => setSelectedMember(index)}
                onMouseLeave={() => setSelectedMember(null)}
              >
                {/* Image Section */}
                <div className="relative h-96 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay with social links */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <a href={member.social.linkedin} className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-200 shadow-lg">
                        <FaLinkedin className="text-xl" />
                      </a>
                      <a href={member.social.github} className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-200 shadow-lg">
                        <FaGithub className="text-xl" />
                      </a>
                      <a href={member.social.email} className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-200 shadow-lg">
                        <FaEnvelope className="text-xl" />
                      </a>
                    </div>
                  </div>

                  {/* Role Badge with Glass Effect */}
                  <div className="absolute top-4 left-4 inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm shadow-lg group-hover:bg-white/30 group-hover:scale-105 transition-all duration-300">
                    {member.icon}
                    <span className="font-medium">{member.role}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-logoBlue">{member.name}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{member.description}</p>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 pt-4">
                      {member.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-logoBlue/10 text-logoBlue text-sm font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-6 py-3 mb-6">
              <FaRocket className="text-logoBlue" />
              <span className="text-logoBlue font-semibold">Our Journey</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-logoBlue mb-6">
              Milestones & Achievements
            </h2>
            <p className="text-xl text-gray-600">
              Key moments that shaped QuickVote into what it is today.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-logoBlue/20 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="text-2xl font-bold text-logoBlue mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 bg-logoBlue rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center">
                    <div className="w-3 h-3 bg-popBlue rounded-full"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-logoBlue to-bgBlue text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Join Our Mission
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Ready to be part of the future of democratic voting? Whether you&apos;re an organization 
              looking to implement secure voting or a developer interested in contributing to our cause, 
              we&apos;d love to hear from you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link href="/contactus">
                <button className="px-10 py-4 bg-popBlue text-bgBlue rounded-2xl hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-bold text-lg">
                  Get In Touch
                </button>
              </Link>
              <Link href="/feature">
                <button className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-2xl hover:bg-white hover:text-logoBlue transition-all duration-300 transform hover:scale-105 font-bold text-lg">
                  Explore Features
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}