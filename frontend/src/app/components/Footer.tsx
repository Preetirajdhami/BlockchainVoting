import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-navBlue text-white py-8">
      <div className="container mx-auto lg:px-32 sm:px-6 md:px-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand and Navigation Links */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Voting App</h2>
            <nav className="space-y-2">
              <a href="/" className="block hover:text-gray-300">Home</a>
              <a href="#about" className="block hover:text-gray-300">About Us</a>
              <a href="#contact" className="block hover:text-gray-300">Contact Us</a>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="mb-4 md:mb-0 text-center">
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p>Email: support@votingapp.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p>&copy; 2024 Voting App. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
