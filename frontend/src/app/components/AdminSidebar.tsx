"use client"
import Link from "next/link";
import { useRouter } from 'next/navigation';

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
                        <Link href="/admin/candidate-details" className="block py-2 px-4 hover:bg-blue-700">
                            Candidate Details
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/add-candidate" className="block py-2 px-4 hover:bg-blue-700">
                            Add Candidate
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/voting-status" className="block py-2 px-4 hover:bg-blue-700">
                            Voting Status
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="block w-full py-2 px-4 text-left hover:bg-blue-700">
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;
