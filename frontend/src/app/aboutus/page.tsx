"use client"

import Image from "next/image"
import Link from "next/link"
import Footer from "../components/Footer"
import Header from "../components/Header"

export default function AboutUsPage() {
  return (
    <>
      <Header />
      {/* About Us Section */}
      <section id="aboutus" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* About Us */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl font-bold text-bgBlue mb-6">About QuickVote</h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Welcome to QuickVote, where innovation meets democracy. We are a dedicated team of technology enthusiasts
                and visionaries committed to transforming the way elections are conducted. Our mission is to build a
                secure, transparent, and efficient online voting system that empowers voters and strengthens democratic
                processes.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                At QuickVote, we understand the challenges posed by traditional voting systems, including inefficiency,
                high costs, and security vulnerabilities. Our solution leverages blockchain technology to address these
                issues, ensuring a seamless voting experience that upholds the principles of fairness, privacy, and
                accessibility.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <Image
                  src="/blockchain.png"
                  alt="Blockchain Technology"
                  width={500}
                  height={400}
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-logoBlue to-navBlue rounded-full opacity-20 blur-xl"></div>
              </div>
            </div>
          </div>

          {/* Our Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="relative">
                <Image
                  src="/voting.png"
                  alt="Voting Process"
                  width={500}
                  height={400}
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-popBlue to-navBlue rounded-full opacity-20 blur-xl"></div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-logoBlue mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                QuickVote was conceived with the vision of making elections more inclusive and trustworthy. By combining
                expertise in blockchain technology, software development, and election management, we have developed a
                platform that guarantees the integrity of every vote cast. Our system is designed not just to modernize
                elections but to inspire confidence in democratic processes worldwide.
              </p>
            </div>
          </div>

          {/* Our Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-semibold text-logoBlue mb-6">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To create a world where every voter&apos;s voice is heard and counted with the utmost confidence and
                transparency. QuickVote aims to redefine the global standard for electoral systems, fostering trust and
                participation in democratic processes.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <Image
                  src="/democracy.png"
                  alt="Democratic Process"
                  width={500}
                  height={400}
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-logoBlue to-navBlue rounded-full opacity-20 blur-xl"></div>
              </div>
            </div>
          </div>

          {/* Our Team */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-logoBlue mb-6">Our Team</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
              We are a group of passionate developers, engineers, and problem-solvers working together to bring about
              meaningful change. With expertise spanning blockchain technology, web development, and data security, we are
              well-equipped to deliver a solution that meets the demands of modern elections.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="w-40 h-40 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-logoBlue to-navBlue rounded-lg opacity-10"></div>
                  <Image
                    src="/preeti.jpg"
                    alt="Preeti Rajdhami"
                    width={160}
                    height={150}
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-bgBlue mb-2">Preeti Rajdhami</h3>
                <p className="text-gray-500 mb-4 text-sm">(Backend)</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Preeti is an expert backend developer with a strong focus on building secure and efficient systems. She
                  ensures the QuickVote platform operates seamlessly, maintaining the highest standards of performance,
                  integrity, and trust.
                </p>
              </div>

              {/* Team Member 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="w-40 h-40 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-logoBlue to-navBlue rounded-lg opacity-10"></div>
                  <Image
                    src="/manoj.jpg"
                    alt="Manoj Shrestha"
                    width={160}
                    height={150}
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-bgBlue mb-2">Manoj Shrestha</h3>
                <p className="text-gray-500 mb-4 text-sm">(Frontend)</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Manoj brings a user-centered design approach to QuickVote. He ensures that our platform is intuitive,
                  visually appealing, and accessible to users of all backgrounds.
                </p>
              </div>

              {/* Team Member 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-md">
                <div className="w-40 h-40 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-logoBlue to-navBlue rounded-lg opacity-10"></div>
                  <Image
                    src="/sohit.jpg"
                    alt="Sohit Sharma Tiwari"
                    width={160}
                    height={150}
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-bgBlue mb-2">Sohit Sharma Tiwari</h3>
                <p className="text-gray-500 mb-4 text-sm">(UI/UX)</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sohit focuses on enhancing the platform&apos;s UI/UX. He designs intuitive and user-friendly interfaces
                  to ensure a seamless voting experience while maintaining accessibility and clarity across all user
                  interactions.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h3 className="text-2xl font-semibold text-bgBlue mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 text-lg mb-6">
              Join thousands of organizations already using QuickVote to empower their elections.
            </p>
            <Link href="/voter/voterLogin">
              <button className="bg-logoBlue text-white px-8 py-3 rounded-lg hover:bg-navBlue transition-colors font-medium">
                Start Voting Now
              </button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}