"use client";

import React, { useState, useEffect } from "react";
import VoterLayout from "../VoterLayout";
import getAdminContractInstance from "../../../utility/adminContract";
import { Pie } from "react-chartjs-2";
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

const ResultPage = () => {
  const [candidates, setCandidates] = useState<any[]>([]); // State to store all candidates
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator
  const [winners, setWinners] = useState<any[]>([]);
  const [votesData, setVotesData] = useState<any[]>([]);
  const [isVotingActive, setIsVotingActive] = useState<boolean>(false); // State for voting status
  const [statusLoading, setStatusLoading] = useState<boolean>(true); // Loading state for voting status

  const fetchVotingStatus = async () => {
    try {
      const response = await fetch(
        "https://blockchainvoting-z1xf.onrender.com/api/admin/voting-status",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to fetch voting status");

      const data = await response.json();
      setIsVotingActive(data.isVotingActive);
    } catch (err) {
      console.error("Error fetching voting status:", err);
    } finally {
      setStatusLoading(false);
    }
  };

  const fetchElectionData = async () => {
    setLoading(true);

    try {
      const contract = await getAdminContractInstance();
      const winnersData = await contract.getWinners();
      const formattedWinners = winnersData.map((winner: any) => ({
        id: winner?.id?.toString() || "N/A",
        firstName: winner?.firstName || "Unknown",
        lastName: winner?.lastName || "Unknown",
        position: winner?.position || "Unknown",
        voteCount: winner?.voteCount?.toString() || "0",
        profileImageHash: winner?.profileImageHash || "",
      }));
      setWinners(formattedWinners);

      const candidatesData = await contract.getAllCandidates();
      const votes = candidatesData.map((candidate: any) => ({
        name: `${candidate?.firstName || "Unknown"} ${
          candidate?.lastName || "Unknown"
        }`,
        votes: parseInt(candidate?.voteCount?.toString() || "0"),
      }));
      setVotesData(votes);
    } catch (error) {
      console.error("Error fetching election data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVotingStatus();
  }, []);

  useEffect(() => {
    if (!isVotingActive) {
      fetchElectionData();
    }
  }, [isVotingActive]);

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
        position: "center",
        anchor: "center",
        align: "center",
      },
      customText: {
        id: "customText",
        afterDraw: (chart: any) => {
          const { ctx, width, height } = chart;
          ctx.save();
          ctx.font = "16px Arial";
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          ctx.fillText(
            "The pie chart below illustrates the distribution of votes among candidates.",
            width / 2,
            height - 20
          );
          ctx.restore();
        },
      },
    },
  };

  return (
    <VoterLayout>
      <div className="min-h-screen flex justify-center items-center py-6 px-4 bg-gray-100">
        <div className="max-w-4xl w-full   p-8">
          <h2 className="text-3xl font-extrabold text-logoBlue text-center mb-8">
            Election Results
          </h2>

          {statusLoading ? (
            <p className="text-lg text-gray-600">Loading voting status...</p>
          ) : isVotingActive ? (
            <p className="text-lg text-red-600 font-semibold mb-6">
              Voting is still active. Results will be available after voting
              ends.
            </p>
          ) : (
            <>
              {loading ? (
                <p className="text-lg text-gray-600">Loading results...</p>
              ) : (
                <>
                  {winners.length > 0 && votesData.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-2xl font-bold text-logoBlue text-center mb-6">
                        Winner Details
                      </h3>

                      <div className="grid gap-8 md:grid-cols-2">
                        <div className="bg-white p-6 border-2 border-popBlue rounded-lg shadow-lg">
                          <h2 className="text-2xl  font-bold text-bgBlue mb-6">
                            Congratulations to the Winner!
                          </h2>
                          <p className="text-lg text-gray-600 mb-6">
                            We are thrilled to announce the winner of this
                            election! Let&apos;s celebrate their achievement!
                          </p>

                          {winners.map((winner: Winner, index: number) => (
                            <div
                              key={index}
                              className="mb-6 text-center flex flex-col items-center"
                            >
                              <Image
  src={
    winner.profileImageHash
      ? `https://ipfs.io/ipfs/${winner.profileImageHash}`
      : "/default-avatar.png"
  }
  alt="Winner Avatar"
  width={128}
  height={128}
  className="w-32 h-32 rounded-full mx-auto mb-4"
/>

                              {/* Use flex to align text consistently */}
                              <div className="flex flex-col items-start ">
                                <h4 className="text-xl lg:text-2xl font-semibold text-bgBlue mb-2">
                                  {winner.firstName} {winner.lastName}
                                </h4>

                                <p className="text-lg font-medium text-gray-700">
                                  Position: {winner.position}
                                </p>
                                <p className="text-lg font-medium text-gray-700">
                                  Votes: {winner.voteCount}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-white p-6 border-2 rounded-lg border-popBlue shadow-lg flex flex-col justify-center items-center">
                          <h3 className="text-2xl font-semibold text-bgBlue">
                            Voting Results
                          </h3>

                          <div className="w-full max-w-md">
                            {/* <p className="text-sm text-gray-700 text-start mb-2">
                              The pie chart below illustrates the distribution of votes among candidates.
                            </p> */}
                            <div className="w-full h-full">
                              <Pie
                                data={pieChartData}
                                options={pieChartOptions as any}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
