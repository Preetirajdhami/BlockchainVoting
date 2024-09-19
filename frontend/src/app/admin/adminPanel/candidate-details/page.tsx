"use client";

import { useState, useEffect } from "react";

interface CandidateProfile {
  name: string;
  email: string;
  candidateID: string;
  party: string;
}

const CandidateDetailsPage = () => {
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>({
    name: "Jane Smith",
    email: "janesmith@example.com",
    candidateID: "987654321",
    party: "Independent",
  });

  // Fetch profile data (dummy useEffect for now)
  useEffect(() => {
    // Example: fetch data from backend and set candidateProfile
    // fetchCandidateData().then(data => setCandidateProfile(data));
  }, []);

  const handleUpdateDetails = () => {
    // Add logic to handle candidate details update
    console.log("Update Details button clicked!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Candidate Details</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <p className="bg-gray-200 p-3 rounded">{candidateProfile.name}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <p className="bg-gray-200 p-3 rounded">{candidateProfile.email}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Candidate ID
          </label>
          <p className="bg-gray-200 p-3 rounded">{candidateProfile.candidateID}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Party
          </label>
          <p className="bg-gray-200 p-3 rounded">{candidateProfile.party}</p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleUpdateDetails}
            className="bg-navBlue hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            Update Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsPage;
