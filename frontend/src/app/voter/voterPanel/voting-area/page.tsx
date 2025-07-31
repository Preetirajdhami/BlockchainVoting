"use client"

import { useState, useEffect } from "react"
import VoterLayout from "../VoterLayout"
import Image from "next/image"
import { Vote, User, MapPin, CheckCircle, AlertCircle } from "lucide-react"

interface Candidate {
  firstName: string
  lastName: string
  position: string
  addressInfo: string
  profileImageHash: string
  logoImageHash: string
  voteCount: number
}

export default function CandidateList() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isVotingActive, setIsVotingActive] = useState<boolean>(false)
  const [statusLoading, setStatusLoading] = useState<boolean>(true)
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null)
  const [voting, setVoting] = useState<number | null>(null)

  const fetchVotingStatus = async () => {
    try {
      setStatusLoading(true)
      const response = await fetch("https://blockchainvoting-z1xf.onrender.com/api/admin/voting-status")
      if (!response.ok) throw new Error("Failed to fetch voting status")

      const data = await response.json()
      setIsVotingActive(data.isVotingActive)
    } catch (err) {
      console.error("Error fetching voting status:", err)
      setError("Unable to fetch voting status. Please try again.")
    } finally {
      setStatusLoading(false)
    }
  }

  const fetchAllCandidates = async () => {
    try {
      setLoading(true)
      // Replace with your actual contract call
      const mockCandidates: Candidate[] = [
        {
          firstName: "John",
          lastName: "Doe",
          position: "Mayor",
          addressInfo: "123 Main St",
          profileImageHash: "",
          logoImageHash: "",
          voteCount: 0,
        },
      ]
      setCandidates(mockCandidates)
    } catch (err) {
      console.error("Error fetching candidates:", err)
      setError("Failed to load candidates. Please refresh the page.")
    } finally {
      setLoading(false)
    }
  }

  const castVote = async () => {
    try {
      if (selectedCandidate === null) return

      setVoting(selectedCandidate)
      // Add your voting logic here
      alert("Vote successfully cast!")
      fetchAllCandidates()
    } catch (err) {
      console.error("Error casting vote:", err)
      setError("Unable to cast your vote. Please try again.")
    } finally {
      setVoting(null)
      setSelectedCandidate(null)
    }
  }

  useEffect(() => {
    fetchVotingStatus()
  }, [])

  useEffect(() => {
    if (isVotingActive) fetchAllCandidates()
  }, [isVotingActive])

  if (statusLoading) {
    return (
      <VoterLayout>
        <div className="min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-logoBlue"></div>
        </div>
      </VoterLayout>
    )
  }

  if (!isVotingActive) {
    return (
      <VoterLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md text-center">
            <AlertCircle className="h-16 w-16 text-orange mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-bgBlue mb-4">Voting Not Active</h2>
            <p className="text-gray-600">
              The voting process has not started yet. Please check back later for updates.
            </p>
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

  if (error) {
    return (
      <VoterLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </VoterLayout>
    )
  }

  if (candidates.length === 0) {
    return (
      <VoterLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md text-center">
            <Vote className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-bgBlue mb-4">No Candidates Available</h2>
            <p className="text-gray-600">There are no candidates available for voting at this moment.</p>
          </div>
        </div>
      </VoterLayout>
    )
  }

  return (
    <VoterLayout>
      <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-bgBlue mb-2">Cast Your Vote</h1>
            <p className="text-gray-600">Select your preferred candidate and cast your vote securely</p>
          </div>

          {/* Candidates Grid */}
          <div className="grid gap-6">
            {candidates.map((candidate, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-6">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    {candidate.profileImageHash ? (
                      <Image
                        src={`https://ipfs.io/ipfs/${candidate.profileImageHash}`}
                        alt="Profile"
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Candidate Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-bgBlue mb-1">
                      {candidate.firstName} {candidate.lastName}
                    </h3>
                    <p className="text-logoBlue font-medium mb-2">{candidate.position}</p>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {candidate.addressInfo}
                    </div>
                  </div>

                  {/* Party Logo */}
                  <div className="flex-shrink-0">
                    {candidate.logoImageHash ? (
                      <Image
                        src={`https://ipfs.io/ipfs/${candidate.logoImageHash}`}
                        alt="Party Logo"
                        width={60}
                        height={60}
                        className="w-15 h-15 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-15 h-15 rounded-full bg-gray-100 flex items-center justify-center">
                        <Vote className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Vote Button */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => setSelectedCandidate(index + 1)}
                      disabled={voting === index + 1}
                      className="bg-logoBlue text-white px-6 py-3 rounded-lg hover:bg-navBlue focus:ring-2 focus:ring-logoBlue focus:ring-offset-2 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {voting === index + 1 ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Voting...</span>
                        </>
                      ) : (
                        <>
                          <Vote className="h-4 w-4" />
                          <span>Vote</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedCandidate !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <CheckCircle className="h-16 w-16 text-logoBlue mx-auto mb-4" />
              <h3 className="text-xl font-bold text-bgBlue mb-2">Confirm Your Vote</h3>
              <p className="text-gray-600">Are you sure you want to cast your vote? This action cannot be undone.</p>
            </div>

            <div className="flex space-x-4">
              <button
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                onClick={() => setSelectedCandidate(null)}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-3 bg-logoBlue text-white rounded-lg hover:bg-navBlue transition-colors font-medium"
                onClick={castVote}
              >
                Confirm Vote
              </button>
            </div>
          </div>
        </div>
      )}
    </VoterLayout>
  )
}
