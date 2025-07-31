"use client"

import Image from "next/image"
import Link from "next/link"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <>
      <Header />
      {/* Contact Us Section */}
      <section id="contactus" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introductory Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl font-bold text-bgBlue mb-6">Contact Us</h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                We’re here to help you with any questions or support you need. Reach out to the QuickVote team via our
                contact form, email, or phone, and let’s make your voting experience seamless and secure. Your feedback is
                invaluable to us!
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <Image
                  src="/contact.png"
                  alt="Contact QuickVote"
                  width={500}
                  height={400}
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-logoBlue to-navBlue rounded-full opacity-20 blur-xl"></div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-logoBlue mb-6 text-center">Our Location</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d222.84554277973342!2d87.27622909019581!3d26.663568989271592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1732724285986!5m2!1sen!2snp"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              ></iframe>
            </div>
          </div>

          {/* Contact Form and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold text-bgBlue mb-6">Get in Touch</h2>
              <form action="" method="POST">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="block w-full border-gray-300 rounded-lg shadow-sm focus:border-logoBlue focus:ring focus:ring-logoBlue focus:ring-opacity-50 p-3"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="block w-full border-gray-300 rounded-lg shadow-sm focus:border-logoBlue focus:ring focus:ring-logoBlue focus:ring-opacity-50 p-3"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="block w-full border-gray-300 rounded-lg shadow-sm focus:border-logoBlue focus:ring focus:ring-logoBlue focus:ring-opacity-50 p-3"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-logoBlue text-white py-3 px-4 rounded-lg hover:bg-navBlue transition-colors font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Details */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold text-bgBlue mb-6">Our Contact Details</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-logoBlue" />
                  <p className="text-gray-600 text-sm">
                    <strong>Address:</strong> Brother&apos;s Complex, Sangeet Chowk, Itahari-06, Sunsari
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 text-logoBlue" />
                  <p className="text-gray-600 text-sm">
                    <strong>Phone:</strong>{" "}
                    <a href="tel:+977-9804030403" className="text-popBlue hover:underline">
                      +977-9804030403
                    </a>
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-6 w-6 text-logoBlue" />
                  <p className="text-gray-600 text-sm">
                    <strong>Email:</strong>{" "}
                    <a href="mailto:quickvote450@gmail.com" className="text-popBlue hover:underline">
                      quickvote450@gmail.com
                    </a>
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-logoBlue" />
                  <p className="text-gray-600 text-sm">
                    <strong>Business Hours:</strong> Sunday - Friday, 10 AM - 5 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h3 className="text-2xl font-semibold text-bgBlue mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 text-lg mb-6">
              Contact us today to learn how QuickVote can transform your elections.
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