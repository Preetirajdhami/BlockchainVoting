"use client";

import React, { useState, useEffect } from "react";
import VoterLayout from "../VoterLayout";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import getAdminContractInstance from "../../../utility/adminContract";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultPage = () => {
  const [candidates, setCandidates] = useState<any[]>([]); // State to store all candidates
  const [loading, setLoading] = useState<boolean>(false); // State for loading indicator
  const [isVotingActive, setIsVotingActive] = useState<boolean>(false); // State for voting status
  const [statusLoading, setStatusLoading] = useState<boolean>(true); // Loading state for voting status

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

  // Fetch all candidates with votes from the smart contract
  const fetchAllCandidates = async () => {
    try {
      setLoading(true);
      const contract = await getAdminContractInstance();

      // Fetch all candidates data
      const candidateData: any[] = await contract.getAllCandidates();
      const mappedCandidates = candidateData.map((data: any) => ({
        firstName: data.firstName,
        lastName: data.lastName,
        voteCount: Number(data.voteCount.toString()), // Ensure BigInt conversion
      }));

      setCandidates(mappedCandidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to fetch data on mount
  useEffect(() => {
    fetchVotingStatus();
  }, []);

  // Fetch candidates only if voting has ended
  useEffect(() => {
    if (!isVotingActive) fetchAllCandidates();
  }, [isVotingActive]);

  // Prepare data for the chart
  const chartData = {
    labels: candidates.map(
      (candidate) => `${candidate.firstName} ${candidate.lastName}`
    ),
    datasets: [
      {
        label: "Votes",
        data: candidates.map((candidate) => candidate.voteCount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <VoterLayout>
      <div className="min-h-screen flex justify-center items-center">
        <div className="max-w-4xl w-full bg-white rounded-lg p-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Election Results</h2>

          {/* Display loading or active voting status */}
          {statusLoading ? (
            <p>Loading voting status...</p>
          ) : isVotingActive ? (
            <p className="text-lg text-red-500 font-semibold mb-4">
              Voting is still active. Results will be available after voting ends.
            </p>
          ) : (
            <>
              {/* Show loading state for fetching candidates */}
              {loading ? (
                <p>Loading results...</p>
              ) : (
                <>
                  {/* Bar Graph */}
                  <div className="mt-6">
                    <Bar data={chartData} options={chartOptions} />
                  </div>

                  {/* Candidate Details */}
                  {/* <div className="mt-8 text-left">
                    <h3 className="text-lg font-semibold">Candidate Details</h3>
                    <ul>
                      {candidates.map((candidate, index) => (
                        <li key={index} className="mt-2">
                          <strong>
                            {candidate.firstName} {candidate.lastName}
                          </strong>{" "}
                          - Votes: {candidate.voteCount}
                        </li>
                      ))}
                    </ul>
                  </div> */}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </VoterLayout>
  );
};

export default ResultPage;
