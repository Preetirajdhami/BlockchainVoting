"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="sticky top-0 bg-white shadow-md z-50 h-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Image
            src="/quick.png"
            alt="QuickVote Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-bgBlue">QuickVote</span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleDropdown}
            className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-logoBlue"
          >
            {isOpen ? <X className="w-6 h-6 text-bgBlue" /> : <Menu className="w-6 h-6 text-bgBlue" />}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`
            ${
              isOpen ? "block" : "hidden"
            } md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 right-0 bg-white md:bg-transparent w-full md:w-auto z-20 shadow-lg md:shadow-none rounded-b-lg md:rounded-none border md:border-0 border-gray-200 px-4 md:px-0 py-4 md:py-0
          `}
        >
          <div className="flex flex-col md:flex-row md:space-x-6">
            {[
              { name: "Home", href: "/" },
              { name: "Features", href: "/feature" },
              { name: "About Us", href: "/aboutus" },
              { name: "Contact Us", href: "/contactus" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${
                    currentPath === item.href
                      ? "bg-logoBlue text-white md:bg-transparent md:text-popBlue"
                      : "text-gray-700 hover:bg-gray-50 hover:text-logoBlue md:hover:bg-transparent"
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}