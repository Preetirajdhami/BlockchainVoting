"use client";

import { useState, useEffect } from "react";
;
import getAdminContractInstance from "../../../utility/adminContract.js";
import AdminLayout from "../AdminLayout";

interface Candidate {
  firstName: string;
  lastName: string;
  position: string;
  addressInfo: string;
  profileImageHash: string;
  logoImageHash: string;
  voteCount: number;
}

const CandidateList = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all candidates
  const fetchAllCandidates = async () => {
    try {
      setLoading(true);
      const contract = await getAdminContractInstance();

      // Fetch all candidates data from the smart contract
      const candidateData: any[] = await contract.getAllCandidates(); // Adjusted type to handle any structure
      console.log("Fetched candidates data:", candidateData);

      // Map the fetched data to the Candidate structure
      const mappedCandidates: Candidate[] = candidateData.map((data) => ({
        firstName: data.firstName,
        lastName: data.lastName,
        position: data.position,
        addressInfo: data.addressInfo,
        profileImageHash: data.profileImageHash,
        logoImageHash: data.logoImageHash,
        // Ensure voteCount is properly converted if it's BigInt
        voteCount: Number(data.voteCount.toString()), 
      }));

      // Update state with the mapped candidate details
      setCandidates(mappedCandidates);
    } catch (err) {
      console.error("Error fetching candidates:", err);
      setError("Failed to fetch candidates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to call fetchAllCandidates on load
  useEffect(() => {
    fetchAllCandidates();
  }, []);

  if (loading) {
    return <div>Loading candidates...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (candidates.length === 0) {
    return (
      <AdminLayout>
         <div className="text-center text-xl font-semibold text-gray-700 mt-8">
          No candidates available.
        </div>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
       <main className="flex-1 p-6   rounded-lg ">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-9 text-gray-800">
            Candidate List
          </h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {candidates.map((candidate, index) => (
             <div
             key={index}
             className="p-6 bg-gray-100  rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
           >
             {/* Profile Image */}
             <div className="text-center mb-4">
               <img
                 src={
                   candidate.profileImageHash
                     ? `https://ipfs.io/ipfs/${candidate.profileImageHash}`
                     : "https://via.placeholder.com/150" 
                 }
                 alt="Profile"
                 className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto"
               />
               {!candidate.profileImageHash && (
                 <p className="text-gray-500 mt-2">No profile image available</p>
               )}
             </div>
           
             {/* Candidate Details */}
             <div className="text-center">
               <h3 className="text-xl font-semibold text-gray-700 mb-2">
                 {candidate.firstName} {candidate.lastName}
               </h3>
               <p className="text-gray-600 mb-2">
                 <strong>Position:</strong> {candidate.position}
               </p>
               <p className="text-gray-600 mb-2">
                 <strong>Address:</strong> {candidate.addressInfo}
               </p>
               <p className="text-gray-600 mb-4">
                 <strong>Vote Count:</strong> {candidate.voteCount}
               </p>
             </div>
           
             {/* Logo Image */}
             {/* <div className="text-center mt-6">
               <strong className="text-gray-700">Logo Image:</strong>
               {candidate.logoImageHash ? (
                 <img
                   src={`https://ipfs.io/ipfs/${candidate.logoImageHash}`}
                   alt="Logo"
                   className="w-20 h-20 md:w-28 md:h-28 mx-auto"
                 />
               ) : (
                 <p className="text-gray-500 mt-2">No logo image available</p>
               )}
             </div> */}
           </div>
           
            ))}
          </div>
        </main>
    </AdminLayout>



  );
};

export default CandidateList;
