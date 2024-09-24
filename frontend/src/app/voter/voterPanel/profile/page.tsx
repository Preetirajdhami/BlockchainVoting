"use client";

import { useState, useEffect } from "react";
import VoterLayout from "../VoterLayout";

interface VoterProfile {
  name: string;
  email: string;
  voterID: string;
  dob: string; // Date of Birth
  address: string;
  mobileNumber: string;
  photo: string; // Photo URL
}

const VoterProfilePage = () => {
  const [voterProfile, setVoterProfile] = useState<VoterProfile>({
    name: "Manoj Shrestha",
    email: "stha8841@gmail.com",
    voterID: "123456789",
    dob: "2002-03-25", 
    address: "Sangeet Chowk, Itahari",
    mobileNumber: "+977-9804030403",
    photo: "https://via.placeholder.com/150", // Placeholder photo URL
  });

  // Fetch profile data (dummy useEffect for now)
  useEffect(() => {
    // Example: fetch data from backend and set voterProfile
    // fetchProfileData().then(data => setVoterProfile(data));
  }, []);

  const handleUpdateProfile = () => {
    // Add logic to handle profile update
    console.log("Update Profile button clicked!");
  };

  return (
    <VoterLayout>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Voter Profile</h2>

          {/* Profile Picture */}
          <div className="mb-6 flex justify-center">
            <img
              src={voterProfile.photo}
              alt="Voter Profile"
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <p className="bg-gray-200 p-3 rounded">{voterProfile.name}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <p className="bg-gray-200 p-3 rounded">{voterProfile.email}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Voter ID
            </label>
            <p className="bg-gray-200 p-3 rounded">{voterProfile.voterID}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date of Birth
            </label>
            <p className="bg-gray-200 p-3 rounded">{voterProfile.dob}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <p className="bg-gray-200 p-3 rounded">{voterProfile.address}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mobile Number
            </label>
            <p className="bg-gray-200 p-3 rounded">{voterProfile.mobileNumber}</p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleUpdateProfile}
              className="bg-navBlue hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </VoterLayout>
  );
};

export default VoterProfilePage;
