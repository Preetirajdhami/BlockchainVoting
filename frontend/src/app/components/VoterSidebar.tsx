"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { 
  FaUser, 
  FaVoteYea, 
  FaChartBar, 
  FaSignOutAlt, 
  FaBars,
  FaTimes,
  FaHome
} from "react-icons/fa";

const VoterSidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    router.push("/voter/voterLogin");
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      icon: <FaUser className="text-lg" />,
      label: "Profile",
      href: "/voter/voterPanel/profile",
    },
    {
      icon: <FaVoteYea className="text-lg" />,
      label: "Voting Area",
      href: "/voter/voterPanel/voting-area",
    },
    {
      icon: <FaChartBar className="text-lg" />,
      label: "Results",
      href: "/voter/voterPanel/result",
    },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-logoBlue rounded-lg flex items-center justify-center">
              <FaVoteYea className="text-white text-sm" />
            </div>
            <span className="text-lg font-bold text-logoBlue">Voter Panel</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-logoBlue hover:bg-logoBlue/10 transition-colors duration-200"
          >
            {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-logoBlue to-bgBlue rounded-2xl flex items-center justify-center">
              <FaVoteYea className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-logoBlue">Voter Panel</h1>
              <p className="text-sm text-gray-500">Your Voting Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {/* Home Link */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="group flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:text-logoBlue hover:bg-logoBlue/5 transition-all duration-200"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-logoBlue/10 flex items-center justify-center transition-colors duration-200">
                <FaHome className="text-lg" />
              </div>
              <span className="font-medium">Home</span>
            </Link>

            {/* Menu Items */}
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:text-logoBlue hover:bg-logoBlue/5 transition-all duration-200"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-logoBlue/10 flex items-center justify-center transition-colors duration-200">
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="group flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-colors duration-200">
                <FaSignOutAlt className="text-lg" />
              </div>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-logoBlue/10 to-bgBlue/10 rounded-xl p-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-popBlue rounded-lg flex items-center justify-center mx-auto mb-2">
                <FaVoteYea className="text-logoBlue text-sm" />
              </div>
              <p className="text-xs font-medium text-logoBlue">QuickVote 2024</p>
              <p className="text-xs text-gray-500">Secure Voting Platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Spacer */}
      <div className="lg:ml-72 min-h-screen pt-16 lg:pt-0">
        {/* This div ensures proper spacing for the main content */}
      </div>
    </>
  );
};

export default VoterSidebar;