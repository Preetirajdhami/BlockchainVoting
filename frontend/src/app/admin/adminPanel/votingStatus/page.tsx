"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import getAdminContractInstance from "../../../utility/adminContract";
import { Pie } from "react-chartjs-2";
import { TooltipItem } from "chart.js";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Image from "next/image";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface Winner {
  id: string;
  firstName: string;
  lastName: string;
  location: string;
  position: string;
  voteCount: string;
  profileImageHash?: string;
}

const VotingStatusPage = () => {
  const [isVotingActive, setIsVotingActive] = useState<boolean>(false);
  const [votingStopped, setVotingStopped] = useState<boolean>(false);
  const [winners, setWinners] = useState<any[]>([]);
  const [votesData, setVotesData] = useState<any[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showStartConfirmModal, setShowStartConfirmModal] =
    useState<boolean>(false);

  // Fetch voting status from the server
  const fetchVotingStatus = async () => {
    try {
      const response = await fetch(
        "https://blockchainvoting-z1xf.onrender.com/api/admin/voting-status"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch voting status");
      }
      const data = await response.json();
      setIsVotingActive(data.isVotingActive);
    } catch (error) {
      console.error("Error fetching voting status:", error);
    }
  };

  // Toggle voting status
  const handleToggleVoting = async () => {
    try {
      const response = await fetch(
        "https://blockchainvoting-z1xf.onrender.com/api/admin/voting-status/toggle",
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to toggle voting status");
      }
      const data = await response.json();
      setIsVotingActive(data.isVotingActive);

      if (!data.isVotingActive) {
        setVotingStopped(true);
      }
    } catch (error) {
      console.error("Error toggling voting status:", error);
    }
  };

  const handleConfirmToggle = () => {
    setShowConfirmModal(false);
    handleToggleVoting();
  };

  const handleStartVoting = () => {
    setShowStartConfirmModal(false);
    handleToggleVoting();
  };

  const fetchWinners = async () => {
    try {
      const contract = await getAdminContractInstance();
      const winnersData = await contract.getWinners();

      if (!winnersData || winnersData.length === 0) {
        console.warn("No winners found.");
        setWinners([]);
        return;
      }

      const formattedWinners = winnersData.map((winner: any) => ({
        id: winner?.id?.toString() || "N/A",
        firstName: winner?.firstName || "Unknown",
        lastName: winner?.lastName || "Unknown",
        position: winner?.position || "Unknown",
        voteCount: winner?.voteCount?.toString() || "0",
        profileImageHash: winner?.profileImageHash || "",
      }));

      setWinners(formattedWinners);
    } catch (error) {
      console.error("Error fetching winners:", error);
    }
  };

  const fetchVotesData = async () => {
    try {
      const contract = await getAdminContractInstance();
      const candidates = await contract.getAllCandidates();

      if (!candidates || candidates.length === 0) {
        console.warn("No candidates found.");
        setVotesData([]);
        return;
      }

      const votes = candidates.map((candidate: any) => ({
        name: `${candidate?.firstName || "Unknown"} ${
          candidate?.lastName || "Unknown"
        }`,
        votes: parseInt(candidate?.voteCount?.toString() || "0"),
      }));
      setVotesData(votes);
    } catch (error) {
      console.error("Error fetching votes data:", error);
    }
  };

  useEffect(() => {
    fetchVotingStatus();
  }, []);

  const handleViewResults = async () => {
    await fetchWinners();
    await fetchVotesData();
  };

  const maxVotes = Math.max(...votesData.map((candidate) => candidate.votes));
  const minVotes = Math.min(...votesData.map((candidate) => candidate.votes));

  const pieChartData = {
    labels: votesData.map((candidate) => candidate.name),
    datasets: [
      {
        data: votesData.map((candidate) => candidate.votes),
        backgroundColor: votesData.map((candidate) => {
          if (candidate.votes === maxVotes) {
            return "#004b84"; // Dark blue for the winner
          } else if (candidate.votes === minVotes) {
            return "#207C9F"; // Blue for the candidate with the least votes
          } else {
            return "#012b64"; // Lighter blue for other candidates
          }
        }),
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          boxWidth: 20,
          padding: 10,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = (context.raw as number) || 0;
            const total = context.dataset.data.reduce(
              (sum: number, curr: number) => sum + curr,
              0
            );
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} votes (${percentage}%)`;
          },
        },
      },
      datalabels: {
        color: "white",
        font: {
          weight: "bold",
          size: 16,
        },
        formatter: (value: number, context: any) => {
          const total = context.dataset.data.reduce(
            (sum: number, curr: number) => sum + curr,
            0
          );
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
        position: "center", // Position the labels inside the slices
        anchor: "center", // Align the labels to the center of each slice
        align: "center", // Center the labels inside the slice
      },
    },
  };

  return (
    <AdminLayout>
      <div className="min-h-screen flex justify-center items-center md:justify-start md:items-start bg-gray-200 md:p-4">
        <div className="max-w-md md:max-w-none w-full  rounded-lg p-6 text-center md:text-start md:px-10 md:py-11 ">
          <h2 className="text-3xl font-bold text-bgBlue 2xl:px-48 2xl:text-4x mb-4">
            Voting Status
          </h2>

          <div className="flex justify-center items-center">
            {/* Status Message */}
            <p className="text-lg mb-4">
              {isVotingActive
                ? "Voting has started. Click the button to stop voting."
                : votingStopped
                ? "Voting has ended. You can view the results now."
                : "Voting has not started yet. Click the button to start voting."}
            </p>
          </div>

          {/* Voting Status Toggle */}
          <div className="flex justify-center items-center">
            {!votingStopped && (
              <button
                onClick={() => {
                  if (isVotingActive) {
                    setShowConfirmModal(true); // Show the confirmation modal if voting is active
                  } else {
                    setShowStartConfirmModal(true); // Show confirmation modal for starting the vote
                  }
                }}
                className={`${
                  isVotingActive
                    ? "bg-popBlue hover:bg-white hover:text-popBlue hover:border-popBlue border-[2px] transition duration-300"
                    : "bg-popBlue hover:bg-white hover:text-popBlue hover:border-popBlue border-[2px] transition duration-300"
                } bg-popBlue text-logoBlue font-bold text-lg md:text-xl py-3 px-24 rounded-md items-center focus:outline-none focus:shadow-outline w-auto mb-4`}
                disabled={showConfirmModal || showStartConfirmModal} // Disable the button if any modal is open
              >
                {isVotingActive ? "Stop Voting" : "Start Voting"}
              </button>
            )}
          </div>

          {/* Display Results */}
          {!isVotingActive && votingStopped && (
            <>
              <div className="flex justify-center items-center">
                <button
                  onClick={handleViewResults}
                  className="py-3 px-24 bg-popBlue text-logoBlue hover:bg-white hover:text-popBlue hover:border-popBlue border-[2px] transition duration-300 font-bold text-lg md:text-xl rounded-md focus:outline-none focus:shadow-outline w-full md:w-auto mb-4"
                >
                  View Results
                </button>
              </div>

              {winners.length > 0 && votesData.length > 0 && (
                <div className="mt-4">
                  {/* Section Heading */}
                  <h3 className="text-2xl  lg:text-3xl font-bold text-center text-logoBlue mb-8">
                    Winner Details
                  </h3>

                  {/* Winner Details and Pie Chart */}
                  <div className="flex flex-col md:flex-row 2xl:px-48 gap-6 justify-center">
                    {/* Winner Details */}
                    <div className="bg-white py-6  border-2 rounded-lg shadow-lg text-center flex-1 px-4 sm:px-8">
                      <h2 className="text-2xl font-bold text-bgBlue mb-6">
                        Congratulations to the Winner!
                      </h2>
                      <p className="text-lg text-gray-600 mb-6">
                        We are thrilled to announce the winner of this election!
                        Their dedication, hard work, and the support of their
                        community have earned them this prestigious title. Let&apos;s
                        celebrate their achievement!
                      </p>

                      <div className="mb-6">
                        <Image
                          src={
                            winners[0].profileImageHash
                              ? `https://ipfs.io/ipfs/${winners[0].profileImageHash}`
                              : "/default-avatar.png"
                          }
                          alt="Winner Avatar"
                          width={128} // 32 * 4 = 128px
                          height={128} // same height to keep it square
                          className="rounded-full mx-auto mb-4"
                        />
                        <h4 className="text-xl font-semibold text-bgBlue mb-2">
                          {winners[0].firstName} {winners[0].lastName}
                        </h4>
                        <p className="text-lg font-medium text-gray-700">
                          {winners[0].location}
                        </p>
                        <p className="text-lg font-medium text-gray-700">
                          Position:{winners[0].position}
                        </p>
                        <p className="text-lg font-medium text-gray-700">
                          Votes: {winners[0].voteCount}
                        </p>
                      </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="flex justify-center items-center bg-white border-2 rounded-lg shadow-lg flex-1 p-6">
                      <div className="w-full h-full max-w-md">
                        <Pie
                          data={pieChartData}
                          options={pieChartOptions as any}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Confirmation Modal for stopping voting */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
            <p className="mb-6">
              Stopping the voting process will finalize the election and you
              won&apos;t be able to restart it.
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleConfirmToggle}
                className="bg-white text-logoBlue text-sm  rounded-full hover:bg-logoBlue hover:text-white transition duration-300 font-bold py-2 px-4"
              >
                Yes, Stop Voting
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-white text-logoBlue text-sm  rounded-full hover:bg-logoBlue hover:text-white transition duration-300 font-bold py-2 px-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for starting voting */}
      {showStartConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
            <p className="mb-6">
              Starting the voting process will allow voters to cast their votes.
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleStartVoting} // Start voting
                className=" bg-white text-logoBlue text-sm  rounded-full hover:bg-logoBlue hover:text-white transition duration-300 font-bold py-2 px-4"
              >
                Yes, Start Voting
              </button>

              <button
                onClick={() => setShowStartConfirmModal(false)} // Cancel modal
                className=" bg-white text-logoBlue text-sm rounded-full hover:bg-logoBlue hover:text-white transition duration-300 font-bold py-2 px-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default VotingStatusPage;
