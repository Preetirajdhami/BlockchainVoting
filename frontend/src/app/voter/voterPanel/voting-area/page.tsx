"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import getAdminContractInstance from "../../../utility/adminContract";
import getVoterContractInstance from "../../../utility/voterContract";
import VoterSidebar from "@/app/components/VoterSidebar";
import Image from "next/image";
import { 
  FaVoteYea, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaUser, 
  FaMapMarkerAlt,
  FaShieldAlt,
  FaTimes
} from "react-icons/fa";

interface Candidate {
  firstName: string;
  lastName: string;
  position: string;
  addressInfo: string;
  profileImageHash: string;
  logoImageHash: string;
  voteCount: number;
}

const VotingAreaPage = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVotingActive, setIsVotingActive] = useState<boolean>(false);
  const [statusLoading, setStatusLoading] = useState<boolean>(true);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [voting, setVoting] = useState<number | null>(null);

  // Fetch voting status
  const fetchVotingStatus = async () => {
    try {
      setStatusLoading(true);
      const response = await fetch(
        "https://blockchainvoting-z1xf.onrender.com/api/admin/voting-status"
      );
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

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const voterAddress = accounts[0];

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      if (!signer) {
        console.error("Signer not available. Connect your wallet first.");
        return;
      }
      const contract = await getVoterContractInstance();

      const tx = await contract.castVote(selectedCandidate, {
        gasLimit: 100000,
      });
      await tx.wait();
      
      // Show success message
      alert("Vote successfully cast!");
      fetchAllCandidates();
    } catch (err) {
      console.error("Error casting vote:", err);
      setError("Unable to cast your vote. Please try again.");
    } finally {
      setVoting(null);
      setSelectedCandidate(null);
    }
  };

  useEffect(() => {
    fetchVotingStatus();
  }, []);

  useEffect(() => {
    if (isVotingActive) fetchAllCandidates();
  }, [isVotingActive]);

  // Loading states
  if (statusLoading) {
    return (
      <div className="flex">
        <VoterSidebar />
        <div className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-logoBlue border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 text-lg">Checking voting status...</p>
          </div>
        </div>
      </div>
    );
  }

  // Voting not active
  if (!isVotingActive) {
    return (
      <div className="flex">
        <VoterSidebar />
        <div className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md text-center p-8">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <FaExclamationTriangle className="text-4xl text-yellow-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Voting Not Available</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              The voting process has not started yet. Please check back later when voting becomes available.
            </p>
            <div className="bg-logoBlue/5 rounded-2xl p-6 border border-logoBlue/10">
              <div className="flex items-center space-x-3">
                <FaShieldAlt className="text-logoBlue flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold text-logoBlue text-sm mb-1">Stay Updated</h3>
                  <p className="text-xs text-gray-600">
                    We&apos;ll notify you as soon as voting opens. Your vote matters!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex">
        <VoterSidebar />
        <div className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-logoBlue border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 text-lg">Loading candidates...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <VoterSidebar />
        <div className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md text-center p-8">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <FaExclamationTriangle className="text-4xl text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Error</h2>
            <p className="text-red-600 mb-8 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-logoBlue text-white rounded-xl hover:bg-bgBlue transition-colors duration-200 font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="flex">
        <VoterSidebar />
        <div className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md text-center p-8">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <FaVoteYea className="text-4xl text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No Candidates</h2>
            <p className="text-gray-600 text-lg">
              There are no candidates available for voting at this moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <VoterSidebar />
      <div className="flex-1 min-h-screen bg-gray-50 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-6 py-3 mb-6">
              <FaVoteYea className="text-logoBlue" />
              <span className="text-logoBlue font-semibold">Voting Area</span>
            </div>
            <h1 className="text-4xl font-bold text-logoBlue mb-4">Cast Your Vote</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your preferred candidate carefully. This action cannot be undone once submitted.
            </p>
            
            {/* Voting Instructions */}
            <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-200 max-w-2xl mx-auto">
              <div className="flex items-start space-x-4">
                <FaShieldAlt className="text-logoBlue text-xl flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-logoBlue mb-2">Secure Voting Process</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Your vote is encrypted and recorded on the blockchain for maximum security and transparency. 
                    Make sure you have MetaMask connected to complete the voting process.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Candidates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {candidates.map((candidate, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl border border-gray-200 hover:border-logoBlue/30 hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              >
                {/* Candidate Header */}
                <div className="relative p-6 bg-gradient-to-br from-gray-50 to-white">
                  {/* Profile Image */}
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      {candidate.profileImageHash ? (
                        <div className="w-24 h-24 rounded-full border-4 border-logoBlue/20 overflow-hidden bg-gray-100">
                          <Image
                            src={`https://ipfs.io/ipfs/${candidate.profileImageHash}`}
                            alt="Profile"
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-logoBlue/10 flex items-center justify-center">
                          <FaUser className="text-3xl text-logoBlue" />
                        </div>
                      )}
                      
                      {/* Logo Badge */}
                      {candidate.logoImageHash && (
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-white shadow-lg">
                          <Image
                            src={`https://ipfs.io/ipfs/${candidate.logoImageHash}`}
                            alt="Logo"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Candidate Info */}
                  <div className="text-center space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {candidate.firstName} {candidate.lastName}
                    </h3>
                    <div className="space-y-2">
                      <div className="inline-flex items-center space-x-2 bg-logoBlue/10 text-logoBlue px-3 py-1 rounded-full text-sm font-semibold">
                        <FaUser className="text-xs" />
                        <span>{candidate.position}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm">
                        <FaMapMarkerAlt className="text-xs" />
                        <span>{candidate.addressInfo}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vote Button */}
                <div className="p-6 bg-white border-t border-gray-100">
                  <button
                    onClick={() => setSelectedCandidate(index + 1)}
                    disabled={voting === index + 1}
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                      voting === index + 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-logoBlue to-bgBlue text-white hover:shadow-xl hover:scale-105 group-hover:from-bgBlue group-hover:to-logoBlue"
                    }`}
                  >
                    {voting === index + 1 ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        <span>Casting Vote...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <FaVoteYea className="text-xl" />
                        <span>Vote for {candidate.firstName}</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedCandidate !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-logoBlue to-bgBlue px-8 py-6 text-white relative">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-popBlue rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-3xl text-bgBlue" />
                </div>
                <h3 className="text-2xl font-bold">Confirm Your Vote</h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 text-center">
              <div className="space-y-6">
                <div>
                  <p className="text-gray-600 leading-relaxed">
                    You are about to cast your vote for
                  </p>
                  <p className="text-2xl font-bold text-logoBlue mt-2">
                    {candidates[selectedCandidate - 1]?.firstName} {candidates[selectedCandidate - 1]?.lastName}
                  </p>
                  <p className="text-logoBlue font-semibold">
                    {candidates[selectedCandidate - 1]?.position}
                  </p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                  <div className="flex items-start space-x-3">
                    <FaExclamationTriangle className="text-yellow-600 flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <h4 className="font-semibold text-yellow-800 text-sm">Important Notice</h4>
                      <p className="text-yellow-700 text-sm mt-1">
                        This action cannot be undone. Once submitted, your vote will be permanently recorded on the blockchain.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={castVote}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-logoBlue to-bgBlue text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <FaVoteYea />
                      <span>Confirm Vote</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingAreaPage;