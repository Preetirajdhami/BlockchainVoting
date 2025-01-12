"use client";

import React, { useState, useEffect } from "react";
import VoterLayout from "../VoterLayout";
import getAdminContractInstance from "../../../utility/adminContract";

const Page = () => {
  const [winner, setWinner] = useState<any>(null); // State to store winner details
  const [loading, setLoading] = useState<boolean>(false); // State for loading indicator
  const [isVotingActive, setIsVotingActive] = useState<boolean>(false); // State for voting status
  const [statusLoading, setStatusLoading] = useState<boolean>(true); // Loading state for fetching voting status

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
    } finally {
      setStatusLoading(false);
    }
  };

  // Fetch the winner from the contract
  const fetchWinner = async () => {
    try {
      setLoading(true);
      const contract = await getAdminContractInstance();
      const winnerData = await contract.getWinner();

      // Update the winner state with the fetched details
      setWinner({
        id: winnerData[0].toString(),
        firstName: winnerData[1],
        lastName: winnerData[2],
        position: winnerData[3],
        voteCount: winnerData[4].toString(),
      });
    } catch (error) {
      console.error("Error fetching winner details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchVotingStatus on initial render
  useEffect(() => {
    fetchVotingStatus();
  }, []);

  return (
    <VoterLayout>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Election Results</h2>

          {/* Display message if voting is still active */}
          {statusLoading ? (
            <p>Loading voting status...</p>
          ) : isVotingActive ? (
            <p className="text-lg text-red-500 font-semibold mb-4">
              Voting is still active. Results will be available after voting ends.
            </p>
          ) : (
            <button
              onClick={fetchWinner}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
              disabled={loading}
            >
              {loading ? "Fetching Results..." : "View Results"}
            </button>
          )}

          {/* Display winner details if available */}
          {winner && (
            <div className="mt-4 text-left">
              <h3 className="text-lg font-semibold">Winner Details</h3>
              
              <p>
                <strong>Name:</strong> {winner.firstName} {winner.lastName}
              </p>
              <p><strong>Position:</strong> {winner.position}</p>
              <p><strong>Votes:</strong> {winner.voteCount}</p>
            </div>
          )}
        </div>
      </div>
    </VoterLayout>
  );
};

export default Page;
