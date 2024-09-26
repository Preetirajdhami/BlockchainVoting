"use client";

import React from "react";
import VoterLayout from "../VoterLayout";

interface Candidate {
  id: number;
  name: string;
  post: string;
  image: string;
  partyLogo: string;
}

const candidates: Candidate[] = [
  {
    id: 1,
    name: "Manoj Shrestha",
    post: "CR",
    image: "https://via.placeholder.com/100", // Placeholder image URL
    partyLogo: "https://via.placeholder.com/50", // Placeholder for party logo
  },
  {
    id: 2,
    name: "Candidate Name",
    post: "Post",
    image: "https://via.placeholder.com/100", // Placeholder image URL
    partyLogo: "https://via.placeholder.com/50", // Placeholder for party logo
  },
  {
    id: 3,
    name: "Candidate Name",
    post: "Post",
    image: "https://via.placeholder.com/100", // Placeholder image URL
    partyLogo: "https://via.placeholder.com/50", // Placeholder for party logo
  },
];

const CandidateListWithPartyLogo = () => {
  return (
    <VoterLayout>
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-6 space-y-4">
      {candidates.map((candidate) => (
        <div
          key={candidate.id}
          className="bg-white rounded-lg shadow-md flex items-center justify-between w-full max-w-md p-4"
        >
          {/* Candidate Profile Picture */}
          <div className="flex items-center space-x-4">
            <img
              src={candidate.image}
              alt="Candidate Profile"
              className="w-16 h-16 rounded-full"
            />
            {/* Name and Post */}
            <div>
              <p className="font-bold text-lg">{candidate.name}</p>
              <p className="text-gray-500">({candidate.post})</p>
            </div>
          </div>

          {/* Party Logo */}
          <img
            src={candidate.partyLogo}
            alt="Party Logo"
            className="w-15 h-15 rounded-full"
          />

          {/* Buttons */}
          <div className="flex flex-col space-y-2">
            <button
              style={{ backgroundColor: "#cd4e35" }}
              className="text-white py-2 px-4 rounded hover:opacity-90"
            >
              View Profile
            </button>
            <button
              style={{ backgroundColor: "#cd4e35" }}
              className="text-white py-2 px-4 rounded hover:opacity-90"
            >
              Vote
            </button>
          </div>
        </div>
      ))}
    </div>
    </VoterLayout>
  );
};

export default CandidateListWithPartyLogo;
