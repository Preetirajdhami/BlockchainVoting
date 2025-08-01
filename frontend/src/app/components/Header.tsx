import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiMenu, HiX } from 'react-icons/hi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { pathname } = window.location;
      setCurrentPath(pathname);
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'FEATURES', path: '/feature' },
    { name: 'ABOUT US', path: '/aboutus' },
    { name: 'CONTACT US', path: '/contactus' }
  ];

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="QuickVote Logo"
                width={48}
                height={48}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-2xl font-bold text-logoBlue opacity-0 md:opacity-100 transition-opacity duration-300">
              QuickVote
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`relative px-6 py-3 font-semibold text-sm tracking-wider transition-all duration-300 rounded-full ${
                  currentPath === item.path
                    ? 'text-white bg-logoBlue shadow-lg'
                    : 'text-gray-700 hover:text-logoBlue hover:bg-logoBlue/5'
                }`}
              >
                {item.name}
                {currentPath === item.path && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-popBlue rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleDropdown}
            className="md:hidden p-3 rounded-xl text-logoBlue hover:bg-logoBlue/10 transition-all duration-300"
          >
            {isOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <nav className="py-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-6 py-4 font-semibold text-sm tracking-wider transition-all duration-300 rounded-2xl ${
                  currentPath === item.path
                    ? 'text-white bg-logoBlue shadow-lg'
                    : 'text-gray-700 hover:text-logoBlue hover:bg-logoBlue/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;