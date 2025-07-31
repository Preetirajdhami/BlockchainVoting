import { Facebook, Twitter, Instagram, Mail, ChevronRight, Phone } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-bgBlue text-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description Section */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-center lg:items-start">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-logoBlue to-navBlue rounded-xl flex items-center justify-center">
                  <Image src="/whitelogo.png" alt="QuickVote Logo" width={32} height={32} className="rounded-lg" />
                </div>
                <span className="text-2xl font-bold text-white">QuickVote</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 text-center lg:text-left">
                QuickVote is a blockchain platform ensuring secure, transparent, and accessible voting with real-time
                counting and user-friendly features.
              </p>
              <div className="flex justify-center lg:justify-start space-x-4">
                <a
                  href="https://www.facebook.com/share/1EzbvPcRPT/?mibextid=wwXIfr"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-popBlue transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/quickvote450"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-popBlue transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/quickvote450/"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-popBlue transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="mailto:quickvote450@gmail.com"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-popBlue transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Our Pages Section */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-6 text-center lg:text-left">Our Pages</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Features", href: "/feature" },
                { name: "About Us", href: "/aboutus" },
                { name: "Contact Us", href: "/contactus" },
              ].map((item) => (
                <li key={item.name} className="flex items-center justify-center lg:justify-start">
                  <a
                    href={item.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-popBlue transition-all duration-200 group"
                  >
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links Section */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-6 text-center lg:text-left">Quick Access</h3>
            <div className="flex flex-col items-center lg:items-start">
              <div className="bg-white p-4 rounded-xl mb-4">
                <Image
                  src="/qr.png"
                  alt="QR Code for quick access"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <p className="text-gray-300 text-xs text-center lg:text-left">Scan for quick access to our platform</p>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-6 text-center lg:text-left">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <Mail className="h-5 w-5 text-popBlue flex-shrink-0" />
                <a
                  href="mailto:quickvote450@gmail.com"
                  className="text-gray-300 hover:text-popBlue transition-colors text-sm"
                >
                  quickvote450@gmail.com
                </a>
              </div>
              {["+977-9804030403", "+977-9826330488", "+977-9824370198"].map((phone) => (
                <div key={phone} className="flex items-center justify-center lg:justify-start space-x-3">
                  <Phone className="h-5 w-5 text-popBlue flex-shrink-0" />
                  <a href={`tel:${phone}`} className="text-gray-300 hover:text-popBlue transition-colors text-sm">
                    {phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="text-center">
            <p className="text-gray-300 text-sm">
              &copy; 2024 QuickVote. All Rights Reserved. | Empowering Democracy Through Technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
