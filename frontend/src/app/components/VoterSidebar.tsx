"use client"
import Link from "next/link";
import {useRouter} from 'next/navigation'
import { CgProfile } from "react-icons/cg";
import { MdHowToVote } from "react-icons/md";
import { MdOutlineQueryStats } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";

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
          <Link href="/voter/profile" className="flex items-center py-2 px-4 hover:bg-blue-700">
         <CgProfile className="mr-3 text-2xl" /> 
               <span>Profile</span>
         </Link>
        </li>

          <li>
            <Link href="/voter/settings" className="flex items-center py-2 px-4 hover:bg-blue-700">
            <MdHowToVote className="mr-3 text-2xl"/>
              <span>Voting Area </span>
            </Link>
          </li>
          <li>
            <Link href="/voter/vote" className="flex items-center py-2 px-4 hover:bg-blue-700">
            <MdOutlineQueryStats className="mr-3 text-2xl"/> 
            <span>Result</span>
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="flex items-center w-full py-2 px-4 text-left hover:bg-blue-700">
            <LuLogOut className="mr-3 text-2xl"/>
             <span>Logout</span> 
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default VoterSidebar