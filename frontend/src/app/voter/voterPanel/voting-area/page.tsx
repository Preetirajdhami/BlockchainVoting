"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import getAdminContractInstance from "../../../utility/adminContract";
import getVoterContractInstance from "../../../utility/voterContract";
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
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null); // Tracks selected candidate for voting
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
  const castVote = async () => {
    try {
      if (selectedCandidate === null) return;

      setVoting(selectedCandidate);

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const voterAddress = accounts[0];
      console.log("Voter Address:", voterAddress);
      console.log("Voting for Candidate ID:", selectedCandidate);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      if (!signer) {
        console.error("Signer not available. Connect your wallet first.");
        return;
      }
      const contract = await getVoterContractInstance();

      console.log("Submitting transaction for candidate ID:", selectedCandidate);

      // Submit the vote
      const tx = await contract.castVote(selectedCandidate, { gasLimit: 100000 });
      await tx.wait();
      alert("Vote successfully cast!");

      // Refresh candidate data after vote
      fetchAllCandidates();
    } catch (err) {
      console.error("Error casting vote:", err);
      setError("Unable to cast your vote. Please try again.");
    } finally {
      setVoting(null);
      setSelectedCandidate(null); // Close modal
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
      <VoterLayout>
        <div className="p-6 bg-white rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">No Candidates Available</h2>
          <p className="text-gray-600">The voting process has not started yet. Please check back later for updates.</p>
        </div>
      </VoterLayout>
    );
  }

  if (loading) return <div>Loading candidates...</div>;

  if (error) return <div className="text-red-500">{error}</div>;

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
      <main className="w-full flex justify-center">
        <div className="w-full max-w-4xl">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 px-2 sm:px-8 mt-12">Candidate List</h2>
          <div className="space-y-4 sm:px-8 px-2">
            {candidates.map((candidate, index) => (
              <div
                key={index}
                className="flex sm:flex-row items-center bg-white rounded-lg shadow p-2 lg:p-4"
              >
                <div className="flex-shrink-0">
                  {candidate.profileImageHash ? (
                    <img
                      src={`https://ipfs.io/ipfs/${candidate.profileImageHash}`}
                      alt="Profile"
                      className="w-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 h-16 rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-300 flex items-center justify-center">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex-grow ml-1 sm:ml-4 sm:mb-0">
                  <h3 className="text-sm sm:text-xl font-semibold">
                    {candidate.firstName} {candidate.lastName}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">{candidate.position}</p>
                </div>
                <div className="flex-shrink-0 mr-2 sm:mb-0">
                  {candidate.logoImageHash ? (
                    <img
                      src={`https://ipfs.io/ipfs/${candidate.logoImageHash}`}
                      alt="Logo"
                      className="w-16 h-16 rounded-full"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-300 flex items-center justify-center">
                      No Logo
                    </div>
                  )}
                </div>
                <div className=" pl-6 flex flex-col space-x-0 sm:space-x-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => setSelectedCandidate(index + 1)}
                    className={`px-4 py-2 bg-logoBlue hover:bg-popBlue text-white transition duration-300 font-bold rounded-md  ${
                      voting === index + 1 ? "opacity-50 cursor-not-allowed" : ""
                    } sm:text-lg sm:px-6`}
                    disabled={voting === index + 1}
                  >
                    {voting === index + 1 ? "Voting..." : "Vote"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal for confirmation */}
      {selectedCandidate !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Your Vote</h3>
            <p className="mb-4">
              Are you sure you want to cast your vote? Once submitted, this action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setSelectedCandidate(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-logoBlue hover:bg-popBlue text-white transition duration-300 font-bold rounded-md"
                onClick={castVote}
              >
                Vote
              </button>
            </div>
          </div>
        </div>
      )}
    </VoterLayout>
  );
};

export default CandidateList;
