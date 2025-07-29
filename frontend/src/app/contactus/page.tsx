"use client";

import React, { useState } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";

// Header Component
function HeaderAndAbout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <Header/>
    </>
  );
}

// Contactus Section
function Contactus() {
  return (
    <div id="Contactus" className="bg-gray-100 lg:px-32 md:px-8 sm:px-6 px-4 mx-auto py-8">
      <h1 className="text-logoBlue text-4xl font-semibold mb-8">Contact Us</h1>

       {/* Google Map */}
       <div className=" shadow-lg rounded-lg mt-8 ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d222.84554277973342!2d87.27622909019581!3d26.663568989271592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1732724285986!5m2!1sen!2snp"
              width="100%"
              height="500"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>

      <br />
      <br />
      <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
       
          
        {/* Contact Form */}
        <div className="md:w-1/2 w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl text-logoBlue font-semibold mb-4">Get in Touch</h2>
          <form
            action="" 
            method="POST"
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="md:w-1/2 w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl text-logoBlue font-semibold mb-4">Our Contact Details</h2>
          <p className="mb-4 text-gray-700">
            <strong>Address:</strong> Brother&apos;s Complex, Sangeet Chowk,
            Itahari-06, Sunsari
          </p>
          <p className="mb-4 text-gray-700">
            <strong>Phone:</strong> +977-9804030403
          </p>
          <p className="mb-4 text-gray-700">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:quickvote450@gmail.com"
              className="text-blue-600 hover:underline"
            >
              support@quickvote.com
            </a>
          </p>
          <p className="text-gray-700">
            <strong>Business Hours:</strong> Sunday - Friday, 10 AM - 5 PM
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeaderAndAbout />
      <Contactus />
      <Footer/>
    </>

    
  );
}
