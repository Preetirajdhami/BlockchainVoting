import React from "react";
import { FaFacebook, FaXTwitter, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa6";
import { GoTriangleRight } from "react-icons/go";

const Footer = () => {
  return (
    <footer className="bg-bgBlue text-white py-8 overflow-hidden">
      <div className="px-4 sm:px-8 md:px-16 text-xl">
        {/* Flexbox for the main footer content */}
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          
          {/* Logo and Description Section */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start">
              <img src="/whitelogo.png" alt="QuickVote Logo" className="h-12 mb-4" />
              <p className="text-sm mb-4">
                QuickVote is a blockchain platform ensuring secure, transparent, and accessible voting with real-time counting and user-friendly features.
              </p>
              <div className="flex justify-center lg:justify-start space-x-4 mb-4">
                <a href="https://www.facebook.com/share/1EzbvPcRPT/?mibextid=wwXIfr" className="hover:text-popBlue" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="https://x.com/quickvote450" className="hover:text-popBlue" aria-label="Twitter">
                  <FaXTwitter />
                </a>
                <a href="https://www.instagram.com/quickvote450/" className="hover:text-popBlue" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="mailto:quickvote450@gmail.com" className="hover:text-popBlue" aria-label="Email">
                  <FaEnvelope />
                </a>
              </div>
              {/* Border after Social Icons on Small Screens */}
              <div className="border-t border-gray-600 w-full block lg:hidden mb-4"></div>
            </div>
          </div>

          {/* Our Pages Section */}
          <div className="flex-1 text-left justify-center lg:text-left">
            <div className="flex flex-col items-center lg:items-left">
              <h3 className="font-semibold mb-4">OUR PAGES</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-center lg:justify-start space-x-2 transition-transform duration-200 hover:translate-x-2">
                  <GoTriangleRight className="text-sm" />
                  <a href="/" className="hover:text-popBlue">Home</a>
                </li>
                <li className="flex items-center justify-center lg:justify-start space-x-2 transition-transform duration-200 hover:translate-x-2">
                  <GoTriangleRight className="text-sm" />
                  <a href="/feature" className="hover:text-popBlue">Feature</a>
                </li>
                <li className="flex items-center justify-center lg:justify-start space-x-2 transition-transform duration-200 hover:translate-x-2">
                  <GoTriangleRight className="text-sm" />
                  <a href="/aboutus" className="hover:text-popBlue">About Us</a>
                </li>
                <li className="flex items-center justify-center lg:justify-start space-x-2 transition-transform duration-200 hover:translate-x-2">
                  <GoTriangleRight className="text-sm" />
                  <a href="/contactus" className="hover:text-popBlue">Contact Us</a>
                </li>
              </ul>
              {/* Border after Our Pages on Small Screens */}
              <div className="border-t border-gray-600 w-full block lg:hidden mt-4"></div>
            </div>
          </div>

          {/* Useful Link Section */}
          <div className="flex-1 text-center lg:text-end">
            <div className="flex flex-col items-center lg:items-end">
              <h3 className="font-semibold mb-4">USEFUL LINK</h3>
              <img src="/qr.png" alt="QR of useful links" className="w-32 h-32 object-contain mb-4" />
              {/* Border after Useful Link on Small Screens */}
              <div className="border-t border-gray-600 w-full block lg:hidden mt-4"></div>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="flex-1 text-center lg:text-end">
            <div className="flex flex-col items-center lg:items-end">
              <h3 className="font-semibold mb-4">CONTACT US</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:quickvote450@gmail.com" className="hover:text-cyan-400">quickvote450@gmail.com</a></li>
                <li><a href="tel:+9779804030403" className="hover:text-cyan-400">+977-9804030403</a></li>
                <li><a href="tel:+9779826330488" className="hover:text-cyan-400">+977-9826330488</a></li>
                <li><a href="tel:+9779824370198" className="hover:text-cyan-400">+977-9824370198</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="px-4 sm:px-8">
        <div className="mt-8 text-center border-t border-gray-600 pt-4">
          <p className="text-sm md:text-base">&copy; 2024 Voting App. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
