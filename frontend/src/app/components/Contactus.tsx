"use client"; // Add this directive at the top

import React from 'react';

const Contactus = () => {
  return (
    <div id="Contactus" className="lg:px-32 px-6 md:px-8 mx-auto  py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Contact Form */}
        <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <form
            action="https://formspree.io/f/your-form-id" // Replace with your form handling URL
            method="POST"
          >
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md mt-8 md:mt-0">
          <h2 className="text-2xl font-semibold mb-4">Our Contact Details</h2>
          <p className="mb-4 text-gray-700">
            <strong>Address:</strong> 123 Democracy Lane, Suite 400, Voting City, VC 12345
          </p>
          <p className="mb-4 text-gray-700">
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p className="mb-4 text-gray-700">
            <strong>Email:</strong> <a href="mailto:support@quickvote.com" className="text-blue-600 hover:underline">support@quickvote.com</a>
          </p>
          <p className="text-gray-700">
            <strong>Business Hours:</strong> Monday - Friday, 9 AM - 5 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
