"use client"
import Link from "next/link";
import {useRouter} from 'next/navigation'

// Sidebar component
const VoterSidebar = () => {
    const router = useRouter();
    const handleLogout = async () =>{
        router.push('/');

    }
  return (
    <div className="w-64 h-screen bg-navBlue text-white fixed top-0 left-0">
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Voter Panel</h2>
      </div>
      <nav className="mt-8">
        <ul className="space-y-4">
          <li>
            <Link href="/voter/profile" className="block py-2 px-4 hover:bg-blue-700">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/voter/settings" className="block py-2 px-4 hover:bg-blue-700">
              Voting Area
            </Link>
          </li>
          <li>
            <Link href="/voter/vote" className="block py-2 px-4 hover:bg-blue-700">
              Result
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

export default VoterSidebar