"use client"

import { useState, useEffect } from "react"
import VoterLayout from "../VoterLayout";
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import Image from "next/image"
import { Trophy, BarChart3, Users, AlertCircle } from "lucide-react"
import getAdminContractInstance from "../../../utility/adminContract"

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

interface Winner {
  id: string
  firstName: string
  lastName: string
  location: string
  position: string
  voteCount: string
  profileImageHash?: string
}

export default function ResultPage() {
  const [winners, setWinners] = useState<Winner[]>([])
  const [votesData, setVotesData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isVotingActive, setIsVotingActive] = useState<boolean>(false)
  const [statusLoading, setStatusLoading] = useState<boolean>(true)

  const fetchVotingStatus = async () => {
    try {
      const response = await fetch("https://blockchainvoting-z1xf.onrender.com/api/admin/voting-status", {
        method: "GET",
        credentials: "include",
      })

      if (!response.ok) throw new Error("Failed to fetch voting status")

      const data = await response.json()
      setIsVotingActive(data.isVotingActive)
    } catch (err) {
      console.error("Error fetching voting status:", err)
    } finally {
      setStatusLoading(false)
    }
  }

  const fetchElectionData = async () => {
    setLoading(true)

    try {
      const contract = await getAdminContractInstance()
      const winnersData = await contract.getWinners()
      const formattedWinners = winnersData.map((winner: any) => ({
        id: winner?.id?.toString() || "N/A",
        firstName: winner?.firstName || "Unknown",
        lastName: winner?.lastName || "Unknown",
        position: winner?.position || "Unknown",
        voteCount: winner?.voteCount?.toString() || "0",
        profileImageHash: winner?.profileImageHash || "",
      }))
      setWinners(formattedWinners)

      const candidatesData = await contract.getAllCandidates()
      const votes = candidatesData.map((candidate: any) => ({
        name: `${candidate?.firstName || "Unknown"} ${candidate?.lastName || "Unknown"}`,
        votes: Number.parseInt(candidate?.voteCount?.toString() || "0"),
      }))
      setVotesData(votes)
    } catch (error) {
      console.error("Error fetching election data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVotingStatus()
  }, [])

  useEffect(() => {
    if (!isVotingActive) {
      fetchElectionData()
    }
  }, [isVotingActive])

  const pieChartData = {
    labels: votesData.map((candidate) => candidate.name),
    datasets: [
      {
        data: votesData.map((candidate) => candidate.votes),
        backgroundColor: [
          "#004b84", // logoBlue
          "#207C9F", // navBlue
          "#2C4E8F", // resultBlue
          "#315b87", // featureBlue
          "#012b64", // bgBlue
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  }

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || ""
            const value = (context.raw as number) || 0
            const total = context.dataset.data.reduce((sum: number, curr: number) => sum + curr, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${label}: ${value} votes (${percentage}%)`
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
          const total = context.dataset.data.reduce((sum: number, curr: number) => sum + curr, 0)
          const percentage = ((value / total) * 100).toFixed(1)
          return `${percentage}%`
        },
      },
    },
  }

  if (statusLoading) {
    return (
      <VoterLayout>
        <div className="min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-logoBlue"></div>
        </div>
      </VoterLayout>
    )
  }

  if (isVotingActive) {
    return (
      <VoterLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md text-center">
            <AlertCircle className="h-16 w-16 text-orange mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-bgBlue mb-4">Voting in Progress</h2>
            <p className="text-gray-600">Voting is still active. Results will be available after voting ends.</p>
          </div>
        </div>
      </VoterLayout>
    )
  }

  if (loading) {
    return (
      <VoterLayout>
        <div className="min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-logoBlue"></div>
        </div>
      </VoterLayout>
    )
  }

  return (
    <VoterLayout>
      <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-bgBlue mb-2">Election Results</h1>
            <p className="text-gray-600">Official results from the completed election</p>
          </div>

          {winners.length > 0 && votesData.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Winner Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="text-center mb-6">
                  <Trophy className="h-12 w-12 text-orange mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-bgBlue mb-2">Election Winner</h2>
                  <p className="text-gray-600">Congratulations to our elected representative!</p>
                </div>

                {winners.map((winner: Winner, index: number) => (
                  <div key={index} className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 relative">
                      <Image
                        src={
                          winner.profileImageHash
                            ? `https://ipfs.io/ipfs/${winner.profileImageHash}`
                            : "/placeholder.svg?height=128&width=128"
                        }
                        alt="Winner Portrait"
                        fill
                        className="rounded-full object-cover border-4 border-orange"
                      />
                    </div>

                    <h3 className="text-2xl font-bold text-bgBlue mb-2">
                      {winner.firstName} {winner.lastName}
                    </h3>
                    <p className="text-logoBlue font-semibold mb-1">{winner.position}</p>
                    <p className="text-gray-600 mb-4">{winner.location}</p>

                    <div className="bg-gradient-to-r from-logoBlue to-navBlue text-white px-6 py-3 rounded-lg inline-flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span className="font-semibold">{winner.voteCount} votes</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Results Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="text-center mb-6">
                  <BarChart3 className="h-12 w-12 text-resultBlue mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-bgBlue mb-2">Vote Distribution</h2>
                  <p className="text-gray-600">Breakdown of all votes cast</p>
                </div>

                <div className="h-80">
                  <Pie data={pieChartData} options={pieChartOptions as any} />
                </div>

                {/* Vote Summary */}
                <div className="mt-6 space-y-3">
                  {votesData.map((candidate, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="font-medium text-gray-900">{candidate.name}</span>
                      <span className="text-logoBlue font-semibold">{candidate.votes} votes</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Statistics Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <Users className="h-8 w-8 text-logoBlue mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-bgBlue mb-1">Total Votes</h3>
              <p className="text-2xl font-bold text-logoBlue">
                {votesData.reduce((sum, candidate) => sum + candidate.votes, 0).toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <BarChart3 className="h-8 w-8 text-resultBlue mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-bgBlue mb-1">Candidates</h3>
              <p className="text-2xl font-bold text-resultBlue">{votesData.length}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <Trophy className="h-8 w-8 text-orange mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-bgBlue mb-1">Turnout</h3>
              <p className="text-2xl font-bold text-orange">87.3%</p>
            </div>
          </div>
        </div>
      </div>
    </VoterLayout>
  )
}
