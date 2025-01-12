"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { MdOutlineHowToVote, MdQueryStats } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for menu toggle

const VoterSidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // State to track menu toggle

  const handleLogout = async () => {
    router.push("/voter/voterLogin");
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Navbar */}
      <div className="lg:hidden  text-logoBlue fixed w-full top-0 left-0 z-10 flex items-center px-2 sm:px-8 py-4">
        <button onClick={toggleSidebar} className="text-3xl mr-4">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
       
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-logoBlue text-white z-20 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300`}
      >
        <div className="p-6 text-left">
          <h2 className="text-2xl text-popBlue font-bold">Voter Panel</h2>
        </div>
        <nav className="mt-8">
          <ul className="space-y-4">
            <li>
              <Link
                href="/voter/voterPanel/profile"
                className="flex items-center py-2 px-4 hover:bg-popBlue"
              >
                <CgProfile className="mr-3 text-2xl" />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                href="/voter/voterPanel/voting-area"
                className="flex items-center py-2 px-4 hover:bg-popBlue"
              >
                <MdOutlineHowToVote className="mr-3 text-2xl" />
                <span>Voting Area</span>
              </Link>
            </li>
            <li>
              <Link
                href="/voter/voterPanel/result"
                className="flex items-center py-2 px-4 hover:bg-popBlue"
              >
                <MdQueryStats className="mr-3 text-2xl" />
                <span>Result</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center py-2 px-4 text-left hover:bg-popBlue"
              >
                <IoIosLogOut className="mr-3 text-2xl" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile view */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      
      <div className={`lg:ml-64   min-h-screen`}>
        
      </div>
    </>
  );
};

export default VoterSidebar;
