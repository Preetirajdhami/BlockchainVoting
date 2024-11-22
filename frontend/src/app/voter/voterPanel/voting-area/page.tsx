"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import getContractInstance from "../../../utility/contract.js";
import VoterLayout from "../VoterLayout";


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

  const fetchAllCandidates = async () => {
    try {
      setLoading(true);
      const contract = await getContractInstance();

      // Fetch all candidates data from the smart contract
      const candidateData: Candidate[] = await contract.getAllCandidates();
      console.log("Fetched candidates data:", candidateData);

      // Update state with the candidate details
      setCandidates(candidateData);
    } catch (err) {
      console.error("Error fetching candidates:", err);
      setError("Failed to fetch candidates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
    return <div>No candidates available.</div>;
  }

  return (
    <VoterLayout>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Candidate List</h2>
        {candidates.map((candidate, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold">{candidate.firstName} {candidate.lastName}</h3>
            <p><strong>Position:</strong> {candidate.position}</p>
            <p><strong>Address:</strong> {candidate.addressInfo}</p>
            <p><strong>Vote Count:</strong> {candidate.voteCount}</p>
            <div className="mb-4">
              <strong>Profile Image:</strong>
              {candidate.profileImageHash ? (
                <img
                  src={`https://ipfs.io/ipfs/${candidate.profileImageHash}`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full"
                // onError={(e) => {
                //   e.currentTarget.src = "/default-profile.png"; 
                // }}
                />
              ) : (
                <p>No profile image available</p>
              )}
            </div>
            <div className="mb-4">
              <strong>Logo Image:</strong>
              {candidate.logoImageHash ? (
                <img
                  src={`https://ipfs.io/ipfs/${candidate.logoImageHash}`}
                  alt="Logo"
                  className="w-32 h-32"
                // onError={(e) => {
                //   e.currentTarget.src = "/default-logo.png"; 
                // }}
                />
              ) : (
                <p>No logo image available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </VoterLayout>





  );
};

export default CandidateList;
