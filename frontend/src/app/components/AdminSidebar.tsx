"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegAddressCard } from "react-icons/fa6";
import { IoAddCircleOutline, IoStatsChartSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const AdminSidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // State to track menu toggle

  const handleLogout = async () => {
    router.push("/admin/adminLogin");
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Navbar */}
      <div className="lg:hidden text-logoBlue fixed w-full top-0 left-0 z-10 flex items-center px-4 sm:px-8 py-4">
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
          <h2 className="text-2xl text-popBlue font-bold">Admin Panel</h2>
        </div>
        <nav className="mt-8">
          <ul className="space-y-4">
            <li>
              <Link
                href="/admin/adminPanel/candidate-details"
                className="flex items-center py-2 px-4 hover:bg-popBlue"
              >
                <FaRegAddressCard className="mr-3 text-2xl" />
                <span>Candidate Details</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/adminPanel/add-details"
                className="flex items-center py-2 px-4 hover:bg-popBlue"
              >
                <IoAddCircleOutline className="mr-3 text-2xl" />
                <span>Add Candidate</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/adminPanel/votingStatus"
                className="flex items-center py-2 px-4 hover:bg-popBlue"
              >
                <IoStatsChartSharp className="mr-3 text-xl" />
                <span>Voting Status</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/adminPanel/reset"
                className="flex items-center py-2 px-4 hover:bg-popBlue"
              >
                <GrPowerReset className="mr-3 text-xl" />
                <span>Reset</span>
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

      <div className={`lg:ml-64 min-h-screen`}></div>
    </>
  );
};

export default AdminSidebar;
