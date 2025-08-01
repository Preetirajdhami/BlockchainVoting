"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import getAdminContractInstance from "../../../utility/adminContract";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Image from "next/image";
import { 
  FaPlay, 
  FaStop, 
  FaChartPie, 
  FaCrown, 
  FaUsers, 
  FaVoteYea, 
  FaSpinner,
  FaExclamationTriangle,
  FaCheckCircle
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

const VotingStatusPage = () => {
  const [isVotingActive, setIsVotingActive] = useState<boolean>(false);
  const [votingStopped, setVotingStopped] = useState<boolean>(false);
  const [winners, setWinners] = useState<any[]>([]);
  const [votesData, setVotesData] = useState<any[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showStartConfirmModal, setShowStartConfirmModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusLoading, setStatusLoading] = useState<boolean>(true);

  const fetchVotingStatus = async () => {
    try {
      setStatusLoading(true);
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
    } finally {
      setStatusLoading(false);
    }
  };

  const handleToggleVoting = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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

  if (statusLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-logoBlue border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 text-lg">Loading voting status...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const maxVotes = Math.max(...votesData.map((candidate) => candidate.votes), 0);
  const minVotes = Math.min(...votesData.map((candidate) => candidate.votes), 0);

  const pieChartData = {
    labels: votesData.map((candidate) => candidate.name),
    datasets: [
      {
        data: votesData.map((candidate) => candidate.votes),
        backgroundColor: votesData.map((candidate) => {
          if (candidate.votes === maxVotes && maxVotes > 0) {
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
          padding: 15,
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
            const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : '0';
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
          const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
          return `${percentage}%`;
        },
      },
    },
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-4 py-2 mb-4">
            <FaVoteYea className="text-logoBlue" />
            <span className="text-logoBlue font-semibold">Election Control</span>
          </div>
          <h1 className="text-4xl font-bold text-logoBlue mb-4">Voting Status Management</h1>
          <p className="text-xl text-gray-600">
            Control the voting process and monitor election results in real-time
          </p>
        </div>

        {/* Voting Control Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-logoBlue to-bgBlue px-8 py-8 text-white relative">
            <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/20 rounded-lg rotate-45" />
            <div className="absolute top-4 right-4 w-6 h-6 bg-popBlue/30 rounded-full animate-pulse" />
            
            <div className="text-center relative">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl ${
                isVotingActive ? 'bg-green-500' : 'bg-gray-500'
              }`}>
                {isVotingActive ? <FaPlay className="text-3xl text-white" /> : <FaStop className="text-3xl text-white" />}
              </div>
              <h2 className="text-3xl font-bold mb-3">
                {isVotingActive ? "Voting is Active" : votingStopped ? "Voting Ended" : "Voting Not Started"}
              </h2>
              <p className="text-blue-100 text-lg">
                {isVotingActive 
                  ? "Voters can currently cast their ballots" 
                  : votingStopped 
                  ? "View the final election results below" 
                  : "Ready to start the voting process"}
              </p>
            </div>
          </div>

          <div className="p-8 text-center">
            {!votingStopped && (
              <button
                onClick={() => {
                  if (isVotingActive) {
                    setShowConfirmModal(true);
                  } else {
                    setShowStartConfirmModal(true);
                  }
                }}
                disabled={isLoading}
                className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                  isLoading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : isVotingActive
                    ? "bg-red-500 hover:bg-red-600 text-white hover:shadow-xl"
                    : "bg-gradient-to-r from-logoBlue to-bgBlue text-white hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <FaSpinner className="animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    {isVotingActive ? <FaStop /> : <FaPlay />}
                    <span>{isVotingActive ? "Stop Voting" : "Start Voting"}</span>
                  </div>
                )}
              </button>
            )}

            {!isVotingActive && votingStopped && (
              <button
                onClick={handleViewResults}
                className="px-12 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <FaChartPie />
                  <span>View Results</span>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Results Section */}
        {!isVotingActive && votingStopped && winners.length > 0 && votesData.length > 0 && (
          <div className="space-y-8">
            {/* Winner Announcement */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 py-8 text-center relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full" />
                
                <div className="relative">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <FaCrown className="text-4xl text-yellow-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">🎉 Election Winner! 🎉</h2>
                  <p className="text-yellow-100 text-lg">Congratulations to our newly elected representative</p>
                </div>
              </div>

              <div className="p-8">
                {winners.map((winner: Winner, index: number) => (
                  <div key={index} className="text-center">
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

                      <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-logoBlue">
                          {winner.firstName} {winner.lastName}
                        </h3>
                        <div className="inline-flex items-center space-x-2 bg-logoBlue/10 text-logoBlue px-6 py-3 rounded-full font-semibold text-lg">
                          <FaUsers />
                          <span>{winner.position}</span>
                        </div>
                        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-bold text-xl">
                          <FaVoteYea />
                          <span>{winner.voteCount} Votes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Dashboard */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Results Chart */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-4 py-2 mb-4">
                    <FaChartPie className="text-logoBlue" />
                    <span className="text-logoBlue font-semibold">Vote Distribution</span>
                  </div>
                  <h3 className="text-2xl font-bold text-logoBlue mb-4">Election Results</h3>
                  <p className="text-gray-600">
                    Total votes: <span className="font-bold text-logoBlue">
                      {votesData.reduce((sum, candidate) => sum + candidate.votes, 0)}
                    </span>
                  </p>
                </div>
                
                <div className="relative h-80">
                  <Pie data={pieChartData} options={pieChartOptions as any} />
                </div>
              </div>

              {/* Vote Breakdown */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-4 py-2 mb-4">
                    <FaUsers className="text-logoBlue" />
                    <span className="text-logoBlue font-semibold">Detailed Results</span>
                  </div>
                  <h3 className="text-2xl font-bold text-logoBlue">Candidate Rankings</h3>
                </div>

                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {votesData
                    .sort((a, b) => b.votes - a.votes)
                    .map((candidate, index) => {
                      const totalVotes = votesData.reduce((sum, c) => sum + c.votes, 0);
                      const percentage = totalVotes > 0 ? ((candidate.votes / totalVotes) * 100).toFixed(1) : '0';
                      const isWinner = candidate.votes === maxVotes && maxVotes > 0;
                      
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                            isWinner 
                              ? 'border-yellow-400 bg-yellow-50' 
                              : 'border-gray-200 bg-gray-50 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
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
                                  #{index + 1} • {percentage}% of votes
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`text-xl font-bold ${isWinner ? 'text-yellow-800' : 'text-logoBlue'}`}>
                                {candidate.votes}
                              </p>
                              <p className="text-sm text-gray-600">votes</p>
                            </div>
                          </div>
                          
                          {/* Vote percentage bar */}
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-1000 ${
                                isWinner ? 'bg-yellow-500' : 'bg-logoBlue'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Election Statistics */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-logoBlue mb-4">Election Statistics</h3>
                <p className="text-gray-600">
                  Complete overview of the election results and participation metrics
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
                  <div className="text-sm text-gray-600">Total Candidates</div>
                </div>

                <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-200">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FaVoteYea className="text-white" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {votesData.reduce((sum, candidate) => sum + candidate.votes, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Votes Cast</div>
                </div>

                <div className="text-center p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FaCrown className="text-yellow-900" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-600 mb-1">
                    {maxVotes}
                  </div>
                  <div className="text-sm text-gray-600">Winning Vote Count</div>
                </div>

                <div className="text-center p-6 bg-purple-50 rounded-2xl border border-purple-200">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FaChartPie className="text-white" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {votesData.length > 0 && votesData.reduce((sum, candidate) => sum + candidate.votes, 0) > 0
                      ? ((maxVotes / votesData.reduce((sum, candidate) => sum + candidate.votes, 0)) * 100).toFixed(1)
                      : '0'}%
                  </div>
                  <div className="text-sm text-gray-600">Winner&apos;s Share</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal for stopping voting */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-6 text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaExclamationTriangle className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold">Stop Voting?</h3>
              </div>
              <div className="p-8 text-center">
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Stopping the voting process will finalize the election and you won&apos;t be able to restart it. 
                  Are you sure you want to proceed?
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmToggle}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                  >
                    Yes, Stop Voting
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal for starting voting */}
        {showStartConfirmModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-logoBlue to-bgBlue px-8 py-6 text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold">Start Voting?</h3>
              </div>
              <div className="p-8 text-center">
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Starting the voting process will allow voters to cast their votes. 
                  Are you ready to begin the election?
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowStartConfirmModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStartVoting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-logoBlue to-bgBlue text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                  >
                    Yes, Start Voting
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default VotingStatusPage;