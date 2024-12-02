"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import getAdminContractInstance from "../../../utility/adminContract";
import getVoterContractInstance from "../../../utility/voterContract";

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
  const [voting, setVoting] = useState<number | null>(null); // Tracks the ID of the candidate being voted for

  // Fetch voting status
  const fetchVotingStatus = async () => {
    try {
      setStatusLoading(true);
      const response = await fetch("http://localhost:8000/api/admin/voting-status");
      if (!response.ok) throw new Error("Failed to fetch voting status");

      const data = await response.json();
      setIsVotingActive(data.isVotingActive);
    } catch (err) {
      console.error("Error fetching voting status:", err);
      setError("Unable to fetch voting status. Please try again.");
    } finally {
      setStatusLoading(false);
    }
  };

  // Fetch all candidates
  const fetchAllCandidates = async () => {
    try {
      setLoading(true);
      const contract = await getAdminContractInstance();
      const candidateData: Candidate[] = await contract.getAllCandidates();
      setCandidates(candidateData);
    } catch (err) {
      console.error("Error fetching candidates:", err);
      setError("Failed to load candidates. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  // Cast vote
  const castVote = async (candidateID: number) => {
    try {
      setVoting(candidateID);

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const voterAddress = accounts[0];
      console.log("Voter Address:", voterAddress);
      console.log("Voting for Candidate ID:", candidateID); 

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      if (!signer) {
        console.error('Signer not available. Connect your wallet first.');
        return;
      }
      const contract = await getVoterContractInstance();

      console.log("Submitting transaction for candidate ID:", candidateID);

      // Submit the vote
      const tx =  await contract.castVote(candidateID, { gasLimit: 100000 }); 
      await tx.wait();
      alert("Vote successfully cast!");

      // Refresh candidate data after vote
      fetchAllCandidates();
    } catch (err) {
      console.error("Error casting vote:", err);
      setError("Unable to cast your vote. Please try again.");
    } finally {
      setVoting(null);
    }
  };

  // Initial fetch of voting status
  useEffect(() => {
    fetchVotingStatus();
  }, []);

  // Fetch candidates when voting is active
  useEffect(() => {
    if (isVotingActive) fetchAllCandidates();
  }, [isVotingActive]);

  // Conditional rendering
  if (statusLoading) return <div>Loading voting status...</div>;

  if (!isVotingActive) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Voting Not Started</h2>
        <p className="text-gray-600">The voting process hasn't started yet. Please check back later.</p>
      </div>
    );
  }

  if (loading) return <div>Loading candidates...</div>;

  if (error) return <div className="text-red-500">{error}</div>;

  if (candidates.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">No Candidates Available</h2>
        <p className="text-gray-600">There are no candidates available for voting at this moment.</p>
      </div>
    );
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
          <button
            onClick={() => castVote(index + 1)} // Assuming candidate IDs start from 1
            className={`bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 ${
              voting === index + 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={voting === index + 1}
          >
            {voting === index + 1 ? "Voting..." : "Vote"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CandidateList;
