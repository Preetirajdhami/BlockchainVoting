import React from "react";
import {
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaArrowRight,
} from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import qr from "../../../public/qr.png"
import quick from "../../../public/icon.png"


const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/feature" },
    { name: "About Us", href: "/aboutus" },
    { name: "Contact Us", href: "/contactus" }
  ];

  const socialLinks = [
    {
      icon: <FaFacebook className="text-xl" />,
      href: "https://www.facebook.com/share/1EzbvPcRPT/?mibextid=wwXIfr",
      label: "Facebook",
      color: "hover:bg-blue-600"
    },
    {
      icon: <FaXTwitter className="text-xl" />,
      href: "https://x.com/quickvote450",
      label: "Twitter",
      color: "hover:bg-black"
    },
    {
      icon: <FaInstagram className="text-xl" />,
      href: "https://www.instagram.com/quickvote450/",
      label: "Instagram",
      color: "hover:bg-pink-600"
    },
    {
      icon: <FaEnvelope className="text-xl" />,
      href: "mailto:quickvote450@gmail.com",
      label: "Email",
      color: "hover:bg-red-600"
    }
  ];

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-lg" />,
      text: "Itahari, Sunsari, Nepal"
    },
    {
      icon: <FaPhone className="text-lg" />,
      text: "+977-9800000000  "
    },
    {
      icon: <FaEnvelope className="text-lg" />,
      text: "quickvote450@gmail.com"
    }
  ];

  return (
    <footer className="bg-bgBlue text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <Image
                src={quick}
                alt="QuickVote Logo"
                width={70}
                height={10}
              />
               <span className="text-xl text-center font-bold text-white">
              Quick <br/>Vote
            </span>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-lg">
              QuickVote is a blockchain platform ensuring secure, transparent, 
              and accessible voting with real-time counting and user-friendly features.
            </p>
            
            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-popBlue">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${social.color} group`}
                    aria-label={social.label}
                  >
                    <div className="text-white group-hover:text-white transition-colors duration-300">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-popBlue">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-300 hover:text-white transition-all duration-300"
                  >
                    <FaArrowRight className="text-sm mr-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300 text-popBlue" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div className="space-y-6">
            <h4 className="text-xl text-center font-semibold text-popBlue">Resources</h4>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h5 className="font-semibold text-white mb-3">QR Code</h5>
                <div className="bg-white rounded-xl p-4 inline-block">
                  <Image
                    src={qr}
                    alt="QR Code for useful links"
                    width={120}
                    height={120}
                    className="w-30 h-30"
                  />
                </div>
                <p className="text-sm text-gray-300 mt-3">
                  Scan to access official election information
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-popBlue">Contact Us</h4>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-3 group">
                  <div className="w-8 h-8 bg-popBlue/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-popBlue/30 transition-colors duration-300">
                    <div className="text-popBlue">{info.icon}</div>
                  </div>
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {info.text.includes('@') ? (
                      <a href={`mailto:${info.text}`} className="hover:text-popBlue transition-colors duration-300">
                        {info.text}
                      </a>
                    ) : info.text.includes('+') ? (
                      <a href={`tel:${info.text}`} className="hover:text-popBlue transition-colors duration-300">
                        {info.text}
                      </a>
                    ) : (
                      info.text
                    )}
                  </p>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h5 className="font-semibold text-white mb-3">Business Hours</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Sunday - Friday</span>
                  <span className="text-popBlue">10 AM - 5 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-gray-400">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-6 text-gray-300">
              <p className="text-center lg:text-left">
                © 2024 QuickVote. All Rights Reserved.
              </p>
              <div className="hidden lg:block w-1 h-1 bg-gray-500 rounded-full"></div>
              <p className="text-center lg:text-left">
                Powered by Blockchain Technology
              </p>
            </div>
          
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;