import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-navBlue text-white py-8">
      <div className="container mx-auto lg:px-32 sm:px-6 md:px-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Brand and Navigation Links */}
          <div className="mb-6 md:mb-0 w-full md:w-1/3 text-center md:text-left">
            <div className="text-2xl font-bold mb-4">
            <img src="/quick.png" alt="logo" className="h-10" />
            </div>
            <nav className="space-y-2">
              <a href="/" className="block hover:text-gray-300">Home</a>
              <a href="/feature" className="block hover:text-gray-300">Feature</a>
              <a href="/aboutus" className="block hover:text-gray-300">About Us</a>
              <a href="/contactus" className="block hover:text-gray-300">Contact Us</a>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="mb-6 md:mb-0 w-full md:w-1/3 text-center">
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p className="text-sm md:text-base">Email: quickvote450@gmail.com</p>
            <p className="text-sm md:text-base">Phone: +977-9804030403</p>
          </div>
        </div>

        <div className="mt-8 text-center border-t border-gray-600 pt-4">
          <p className="text-sm md:text-base">&copy; 2024 Voting App. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
