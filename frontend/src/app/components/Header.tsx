import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { pathname } = window.location; // Fallback to window.location for SSR
      setCurrentPath(pathname);
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 bg-white shadow-md z-50 h-20">
      <div className="lg:px-32 sm:px-7 md:px-8 mx-auto flex items-center justify-between py-4 px-4 relative">
        <Link href="/" className="text-2xl font-bold flex items-center space-x-2">
          <Image
  src="/quick.png"
  alt="logo"
  width={48}    // h-12 in Tailwind is 3rem, which equals 48px
  height={48}
/>
        </Link>

        <div className="md:hidden">
          <button onClick={toggleDropdown} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <nav
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:space-x-8 absolute md:static top-16 right-0 md:right-auto bg-white text-black w-48 md:w-auto z-20 shadow-lg md:shadow-none`}
        >
          <div className="flex flex-col md:flex-row md:space-x-8">
            <Link
              href="/"
              className={`${
                currentPath === '/' ? 'text-popBlue' : 'text-gray-900'
              } font-bold hover:text-popBlue block py-2 px-4 md:py-0 md:px-0`}
            >
              HOME
            </Link>
            <Link
              href="/feature"
              className={`${
                currentPath === '/feature' ? 'text-popBlue' : 'text-gray-900'
              } font-bold hover:text-popBlue block py-2 px-4 md:py-0 md:px-0`}
            >
              FEATURES
            </Link>
            <Link
              href="/aboutus"
              className={`${
                currentPath === '/aboutus' ? 'text-popBlue' : 'text-gray-900'
              } font-bold hover:text-popBlue block py-2 px-4 md:py-0 md:px-0`}
            >
              ABOUT US
            </Link>
            <Link
              href="/contactus"
              className={`${
                currentPath === '/contactus' ? 'text-popBlue' : 'text-gray-900'
              } font-bold hover:text-popBlue block py-2 px-4 md:py-0 md:px-0`}
            >
              CONTACT US
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
