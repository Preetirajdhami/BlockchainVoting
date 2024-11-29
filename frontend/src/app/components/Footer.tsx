import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { GoTriangleRight } from "react-icons/go";

const Footer = () => {
  return (
    <footer className="bg-blue-400 text-white py-8 overflow-hidden">
      <div className="px-8 md:px-16 text-xl">
        {/* Flexbox for the main footer content */}
        <div className="flex justify-between items-start gap-8">
          
          {/* Logo and Description Section - Left aligned */}
          <div className="flex-1 text-start">
            <div className="flex flex-col items-start">
              <img src="/quick.png" alt="QuickVote Logo" className="h-12 mb-4" />
              <p className="text-sm mb-4">
                QuickVote is a blockchain platform ensuring secure, transparent, and accessible voting with real-time counting and user-friendly features.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-cyan-400" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="#" className="hover:text-cyan-400" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="hover:text-cyan-400" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href="#" className="hover:text-cyan-400" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="mailto:quickvote450@gmail.com" className="hover:text-cyan-400" aria-label="Email">
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>

          {/* Our Pages Section - Centered but text left */}
          <div className="flex-1 text-left flex justify-center">
            <div className="text-left">
              <h3 className="font-semibold mb-4">OUR PAGES</h3>
              <ul className="space-y-2 text-sm">
                {/* Flex to align icon with text */}
                <li className="flex items-center justify-start space-x-2 transition-transform duration-200 hover:translate-x-2">
                  <GoTriangleRight className="text-sm" />
                  <a href="/" className="hover:text-cyan-400">Home</a>
                </li>
                <li className="flex items-center justify-start space-x-2 transition-transform duration-200 hover:translate-x-2">
                  <GoTriangleRight className="text-sm" />
                  <a href="/feature" className="hover:text-cyan-400">Feature</a>
                </li>
                <li className="flex items-center justify-start space-x-2 transition-transform duration-200 hover:translate-x-2">
                  <GoTriangleRight className="text-sm" />
                  <a href="/aboutus" className="hover:text-cyan-400">About Us</a>
                </li>
                <li className="flex items-center justify-start space-x-2 transition-transform duration-200 hover:translate-x-2">
                  <GoTriangleRight className="text-sm" />
                  <a href="/contactus" className="hover:text-cyan-400">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Us Section - Right aligned but text left */}
          <div className="flex-1 text-left flex justify-end">
            <div className="text-left">
              <h3 className="font-semibold mb-4">CONTACT US</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:quickvote450@gmail.com" className="hover:text-cyan-400">quickvote450@gmail.com</a></li>
                <li><a href="tel:+9779804030403" className="hover:text-cyan-400">+977-9804030403</a></li>
                <li><a href="tel:+9779804030403" className="hover:text-cyan-400">+977-9826330488</a></li>
                <li><a href="tel:+9779804030403" className="hover:text-cyan-400">+977-9824370198</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="px-8">
        <div className="mt-8 text-center border-t border-gray-600 pt-4">
          <p className="text-sm md:text-base">&copy; 2024 Voting App. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
