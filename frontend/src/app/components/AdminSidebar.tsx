"use client"
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { FaRegAddressCard } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoStatsChartSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

// Sidebar component
const AdminSidebar = () => {
    const router = useRouter();

    const handleLogout = async () => {
        router.push('/');
    };

    return (
        <div className="w-64 h-screen bg-navBlue text-white fixed top-0 left-0">
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold">Admin Panel</h2>
            </div>
            <nav className="mt-8">
                <ul className="space-y-4">
                    <li>
                        <Link href="/admin/candidate-details" className="flex items-center py-2 px-4 hover:bg-blue-700">
                        <FaRegAddressCard className="mr-3 text-2xl"/>
                           <span>Candidate Details</span> 
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/add-candidate" className="flex items-center py-2 px-4 hover:bg-blue-700">
                        <IoAddCircleOutline className="mr-3 text-2xl"/>
                           <span>Add Candidate</span> 
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/voting-status" className="flex items-center py-2 px-4 hover:bg-blue-700">
                        <IoStatsChartSharp className="mr-3 text-xl"/>
                            <span>Voting Status</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="flex items-center py-2 px-4 text-left hover:bg-blue-700">
                        <IoIosLogOut className="mr-3 text-2xl"/>
                        <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;
