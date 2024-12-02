"use client"; // Add this at the top to make the file a client-side component in Next.js

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import getAdminContractInstance from "../../../utility/adminContract.js"; // Assuming this gets the contract instance

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
  const [singleCandidate, setSingleCandidate] = useState<Candidate | null>(null);

  // Fetch all candidates
  const fetchAllCandidates = async () => {
    try {
      setLoading(true);
      const contract = await getAdminContractInstance();

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

  // Fetch a single candidate by ID (in this case, candidate ID = 3)
  const fetchSingleCandidate = async (candidateID: number) => {
    try {
      const contract = await getAdminContractInstance();
      const candidateData = await contract.getCandidate(candidateID);

      // Map the result to an object that your component expects
      const candidate: Candidate = {
        firstName: candidateData[0],
        lastName: candidateData[1],
        position: candidateData[2],
        addressInfo: candidateData[3],
        profileImageHash: candidateData[4],
        logoImageHash: candidateData[5],
        voteCount: Number(candidateData[6].toString()), // Convert BigInt to number
      };

      console.log("Fetched single candidate:", candidate);

      // Update state with the fetched candidate details
      setSingleCandidate(candidate);
    } catch (err) {
      console.error("Error fetching single candidate:", err);
      setError("Failed to fetch candidate. Please try again.");
    }
  };

  // Use useEffect to call fetchAllCandidates and fetchSingleCandidate on load
  useEffect(() => {
    fetchAllCandidates();
    fetchSingleCandidate(3); // Fetch candidate with ID 3
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
              />
            ) : (
              <p>No logo image available</p>
            )}
          </div>
        </div>
      ))}
      {singleCandidate && (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-semibold">Single Candidate: {singleCandidate.firstName} {singleCandidate.lastName}</h3>
          <p><strong>Position:</strong> {singleCandidate.position}</p>
          <p><strong>Address:</strong> {singleCandidate.addressInfo}</p>
          <p><strong>Vote Count:</strong> {singleCandidate.voteCount}</p>
          <div className="mb-4">
            <strong>Profile Image:</strong>
            {singleCandidate.profileImageHash ? (
              <img
                src={`https://ipfs.io/ipfs/${singleCandidate.profileImageHash}`}
                alt="Profile"
                className="w-32 h-32 rounded-full"
              />
            ) : (
              <p>No profile image available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateList;
