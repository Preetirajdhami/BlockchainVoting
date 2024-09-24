"use client"
import Link from "next/link";
import {useRouter} from 'next/navigation'
import { CgProfile } from "react-icons/cg";
import { MdOutlineHowToVote } from "react-icons/md";
import { MdQueryStats } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

// Sidebar component
const VoterSidebar = () => {
    const router = useRouter();
    const handleLogout = async () =>{
        router.push('/voter/voterLogin');

    }
  return (
    <div className="w-64 h-screen bg-navBlue text-white fixed top-0 left-0">
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Voter Panel</h2>
      </div>
      <nav className="mt-8">
        <ul className="space-y-4">
          <li>
            <Link href="/voter/voterPanel/profile" className="flex items-center py-2 px-4 hover:bg-blue-700">
            <CgProfile className="mr-3 text-2xl"/>
            <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link href="/voter/voterPanel/voting-area" className="flex items-center py-2 px-4 hover:bg-blue-700">
            <MdOutlineHowToVote className="mr-3 text-2xl"/>
              <span>Voting Area</span>
            </Link>
          </li>
          <li>
            <Link href="/voter/voterPanel/result" className="flex items-center py-2 px-4 hover:bg-blue-700">
            <MdQueryStats className="mr-3 text-2xl"/>
              <span>Result</span>
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

export default VoterSidebar