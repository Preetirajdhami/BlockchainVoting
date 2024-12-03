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
        voteCount: Number(data.voteCount.toString()), // Convert BigInt to number
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
    return <div>No candidates available.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Candidate List</h2>
      {candidates.map((candidate, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-semibold">
            {candidate.firstName} {candidate.lastName}
          </h3>
          <p>
            <strong>Position:</strong> {candidate.position}
          </p>
          <p>
            <strong>Address:</strong> {candidate.addressInfo}
          </p>
          <p>
            <strong>Vote Count:</strong> {candidate.voteCount}
          </p>
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
    </div>
  );
};

export default CandidateList;
