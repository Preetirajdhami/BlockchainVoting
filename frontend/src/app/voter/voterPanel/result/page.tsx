"use client";

import React, { useState, useEffect } from "react";
import VoterSidebar from "@/app/components/VoterSidebar";
import getAdminContractInstance from "../../../utility/adminContract";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Image from "next/image";
import { 
  FaTrophy, 
  FaChartPie, 
  FaCrown, 
  FaUsers, 
  FaVoteYea, 
  FaExclamationTriangle,
  FaSpinner
} from "react-icons/fa";

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

const VoterResultPage = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [winners, setWinners] = useState<any[]>([]);
  const [votesData, setVotesData] = useState<any[]>([]);
  const [isVotingActive, setIsVotingActive] = useState<boolean>(false);
  const [statusLoading, setStatusLoading] = useState<boolean>(true);

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
        borderWidth: 0,
        hoverBorderWidth: 3,
        hoverBorderColor: "#fff",
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 15,
          padding: 20,
          font: {
            size: 12,
          },
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#004b84',
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = (context.raw as number) || 0;
            const total = context.dataset.data.reduce(
              (sum: number, curr: number) => sum + curr,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} votes (${percentage}%)`;
          },
        },
      },
      datalabels: {
        color: "white",
        font: {
          weight: "bold" as const,
          size: 14,
        },
        formatter: (value: number, context: any) => {
          const total = context.dataset.data.reduce(
            (sum: number, curr: number) => sum + curr,
            0
          );
          const percentage = ((value / total) * 100).toFixed(1);
          return total > 0 ? `${percentage}%` : '0%';
        },
      },
    },
  };

  if (statusLoading) {
    return (
      <div className="flex">
        <VoterSidebar />
        <div className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-logoBlue border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 text-lg">Loading voting status...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isVotingActive) {
    return (
      <div className="flex">
        <VoterSidebar />
        <div className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md text-center p-8">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <FaSpinner className="text-4xl text-logoBlue animate-spin" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Voting in Progress</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Voting is currently active. Results will be available once the voting period ends.
            </p>
            <div className="bg-logoBlue/5 rounded-2xl p-6 border border-logoBlue/10">
              <div className="flex items-center space-x-3">
                <FaVoteYea className="text-logoBlue flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold text-logoBlue text-sm mb-1">Check Back Later</h3>
                  <p className="text-xs text-gray-600">
                    Results will be automatically updated when voting concludes.
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
            <p className="text-gray-600 text-lg">Loading election results...</p>
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
              <FaTrophy className="text-logoBlue" />
              <span className="text-logoBlue font-semibold">Election Results</span>
            </div>
            <h1 className="text-4xl font-bold text-logoBlue mb-4">Final Results</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The voting has concluded. Here are the official results powered by blockchain transparency.
            </p>
          </div>

          {winners.length > 0 && votesData.length > 0 ? (
            <div className="space-y-12">
              {/* Winner Announcement */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-logoBlue to-bgBlue px-8 py-12 text-white text-center relative">
                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/20 rounded-lg rotate-45" />
                  <div className="absolute top-4 right-4 w-6 h-6 bg-popBlue/30 rounded-full animate-pulse" />
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full" />
                  
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <FaCrown className="text-3xl text-yellow-900" />
                    </div>
                    <h2 className="text-3xl font-bold mb-3">🎉 We Have a Winner! 🎉</h2>
                    <p className="text-blue-100 text-lg">Congratulations to our elected representative</p>
                  </div>
                </div>

                <div className="p-8">
                  {winners.map((winner: Winner, index: number) => (
                    <div key={index} className="text-center">
                      {/* Winner Profile */}
                      <div className="mb-8">
                        <div className="relative inline-block mb-6">
                          <div className="w-32 h-32 rounded-full border-4 border-yellow-400 overflow-hidden bg-gray-100 shadow-xl">
                            <Image
                              src={
                                winner.profileImageHash
                                  ? `https://ipfs.io/ipfs/${winner.profileImageHash}`
                                  : "/default-avatar.png"
                              }
                              alt="Winner Avatar"
                              width={128}
                              height={128}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                            <FaCrown className="text-yellow-900 text-lg" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-3xl font-bold text-logoBlue">
                            {winner.firstName} {winner.lastName}
                          </h3>
                          <div className="inline-flex items-center space-x-2 bg-logoBlue/10 text-logoBlue px-4 py-2 rounded-full font-semibold">
                            <FaUsers className="text-sm" />
                            <span>{winner.position}</span>
                          </div>
                          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-lg">
                            <FaVoteYea className="text-sm" />
                            <span>{winner.voteCount} Votes</span>
                          </div>
                        </div>
                      </div>

                      {/* Congratulatory Message */}
                      <div className="bg-gradient-to-r from-logoBlue/5 to-bgBlue/5 rounded-2xl p-6 border border-logoBlue/10">
                        <h4 className="text-xl font-bold text-logoBlue mb-3">
                          Congratulations! 🎊
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          Thank you to everyone who participated in this democratic process. 
                          Your voice has been heard and counted through our secure blockchain voting system.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Results */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Vote Distribution Chart */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-4 py-2 mb-4">
                      <FaChartPie className="text-logoBlue" />
                      <span className="text-logoBlue font-semibold">Vote Distribution</span>
                    </div>
                    <h3 className="text-2xl font-bold text-logoBlue">Election Statistics</h3>
                  </div>
                  
                  <div className="relative h-80">
                    <Pie data={pieChartData} options={pieChartOptions as any} />
                  </div>
                  
                  <div className="mt-6 text-center text-sm text-gray-600">
                    <p>Total votes cast: <span className="font-semibold text-logoBlue">
                      {votesData.reduce((sum, candidate) => sum + candidate.votes, 0)}
                    </span></p>
                  </div>
                </div>

                {/* Detailed Vote Breakdown */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-4 py-2 mb-4">
                      <FaUsers className="text-logoBlue" />
                      <span className="text-logoBlue font-semibold">Vote Breakdown</span>
                    </div>
                    <h3 className="text-2xl font-bold text-logoBlue">Candidate Results</h3>
                  </div>

                  <div className="space-y-4">
                    {votesData
                      .sort((a, b) => b.votes - a.votes)
                      .map((candidate, index) => {
                        const totalVotes = votesData.reduce((sum, c) => sum + c.votes, 0);
                        const percentage = totalVotes > 0 ? ((candidate.votes / totalVotes) * 100).toFixed(1) : '0';
                        const isWinner = candidate.votes === maxVotes;
                        
                        return (
                          <div
                            key={index}
                            className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                              isWinner 
                                ? 'border-yellow-400 bg-yellow-50' 
                                : 'border-gray-200 bg-gray-50 hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {isWinner && (
                                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                    <FaCrown className="text-yellow-900 text-sm" />
                                  </div>
                                )}
                                <div>
                                  <p className={`font-semibold ${isWinner ? 'text-yellow-800' : 'text-gray-900'}`}>
                                    {candidate.name}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Rank #{index + 1}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={`text-lg font-bold ${isWinner ? 'text-yellow-800' : 'text-logoBlue'}`}>
                                  {candidate.votes} votes
                                </p>
                                <p className="text-sm text-gray-600">
                                  {percentage}%
                                </p>
                              </div>
                            </div>
                            
                            {/* Vote percentage bar */}
                            <div className="mt-3">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all duration-1000 ${
                                    isWinner ? 'bg-yellow-500' : 'bg-logoBlue'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Election Summary */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-logoBlue mb-4">Election Summary</h3>
                  <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    This election was conducted using QuickVote&apos;s secure blockchain technology, 
                    ensuring complete transparency and immutability of all votes cast.
                  </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-logoBlue/5 rounded-2xl border border-logoBlue/10">
                    <div className="w-12 h-12 bg-logoBlue rounded-xl flex items-center justify-center mx-auto mb-3">
                      <FaUsers className="text-white" />
                    </div>
                    <div className="text-2xl font-bold text-logoBlue mb-1">
                      {votesData.length}
                    </div>
                    <div className="text-sm text-gray-600">Candidates</div>
                  </div>

                  <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-200">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <FaVoteYea className="text-white" />
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {votesData.reduce((sum, candidate) => sum + candidate.votes, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Total Votes</div>
                  </div>

                  <div className="text-center p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
                    <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <FaCrown className="text-yellow-900" />
                    </div>
                    <div className="text-2xl font-bold text-yellow-600 mb-1">
                      {maxVotes}
                    </div>
                    <div className="text-sm text-gray-600">Winning Votes</div>
                  </div>

                  <div className="text-center p-6 bg-purple-50 rounded-2xl border border-purple-200">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <FaChartPie className="text-white" />
                    </div>
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {votesData.length > 0 ? ((maxVotes / votesData.reduce((sum, candidate) => sum + candidate.votes, 0)) * 100).toFixed(1) : '0'}%
                    </div>
                    <div className="text-sm text-gray-600">Win Margin</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <FaExclamationTriangle className="text-4xl text-gray-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">No Results Available</h2>
              <p className="text-lg text-gray-600">
                Election results are not available at this time. Please check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoterResultPage;