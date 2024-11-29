"use client";
import { useState, useEffect } from "react";
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
  const [isVotingActive, setIsVotingActive] = useState<boolean>(false);
  const [statusLoading, setStatusLoading] = useState<boolean>(true);

  // Fetch voting status
  const fetchVotingStatus = async () => {
    try {
      setStatusLoading(true);
      const response = await fetch("http://localhost:8000/api/admin/voting-status");
      if (!response.ok) {
        throw new Error("Failed to fetch voting status");
      }
      const data = await response.json();
      setIsVotingActive(data.isVotingActive);
    } catch (err) {
      console.error("Error fetching voting status:", err);
      setError("Failed to fetch voting status.");
    } finally {
      setStatusLoading(false);
    }
  };

  // Fetch candidates
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
    fetchVotingStatus();
  }, []);

  useEffect(() => {
    if (isVotingActive) {
      fetchAllCandidates();
    }
  }, [isVotingActive]);

  if (statusLoading) {
    return <div>Loading voting status...</div>;
  }

  if (!isVotingActive) {
    return (
      <VoterLayout>
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Voting Not Started</h2>
          <p className="text-gray-600">The voting process hasn't started yet. Please check back later.</p>
        </div>
      </VoterLayout>
    );
  }

  if (loading) {
    return <div>Loading candidates...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (candidates.length === 0) {
    return (
      <VoterLayout>
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">No Candidates Available</h2>
          <p className="text-gray-600">There are no candidates available for voting at this moment.</p>
        </div>
      </VoterLayout>
    );
  }

  return (
    <VoterLayout>
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
    </VoterLayout>
  );
};

export default CandidateList;
