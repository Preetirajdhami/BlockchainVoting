"use client";

import { useState, useEffect } from "react";
import VoterLayout from "../VoterLayout";

interface VoterProfile {
  name: string;
  email: string;
  voterID: string;
  dob: string;
  address: string;
  mobile: string;
  photo: string;
}

const VoterProfilePage = () => {
  const [voterProfile, setVoterProfile] = useState<VoterProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoterProfile = async () => {
      try {
        const response = await fetch("https://blockchainvoting-z1xf.onrender.com/api/user/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized: Please log in again.");
          }
          throw new Error(`Error ${response.status}: Failed to fetch voter profile.`);
        }

        const data = await response.json();
        if (!data.user) {
          throw new Error("No voter profile data found.");
        }

        setVoterProfile(data.user);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchVoterProfile();
  }, []);

  if (loading) {
    return (
      <VoterLayout>
        <div className="min-h-screen flex justify-center items-center">
          <p>Loading voter profile...</p>
        </div>
      </VoterLayout>
    );
  }

  if (error) {
    return (
      <VoterLayout>
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-red-500">{error}</p>
        </div>
      </VoterLayout>
    );
  }

  if (!voterProfile) {
    return (
      <VoterLayout>
        <div className="min-h-screen flex justify-center items-center">
          <p>No voter profile found.</p>
        </div>
      </VoterLayout>
    );
  }

  // Log the image source to check its validity
  const imageUrl = voterProfile.photo.startsWith('http')
    ? voterProfile.photo
    : `https://blockchainvoting-z1xf.onrender.com/uploads/${voterProfile.photo.split('\\').pop()}`;

  console.log("Voter Profile Image URL:", imageUrl);

  return (
     <VoterLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex justify-center items-center p-6">
        <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-bgBlue mb-6 text-center">Voter Profile</h2>

          <div className="mb-6 flex justify-center">
            <img
              src={imageUrl}
              alt="Voter Profile"
              className="w-28 h-28 object-cover rounded-full shadow-md transition-transform transform hover:scale-105"
              onError={(e) => console.error("Error loading image:", e)}
            />
          </div>

          {[
            { label: "Name", value: voterProfile.name },
            { label: "Email", value: voterProfile.email },
            { label: "Date of Birth", value: new Date(voterProfile.dob).toLocaleDateString() },
            { label: "Address", value: voterProfile.address },
            { label: "Mobile Number", value: voterProfile.mobile },
          ].map((item, index) => (
            <div className="mb-4" key={index}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {item.label}
              </label>
              <p className="bg-gray-50 p-4 rounded-lg text-gray-800 shadow-sm">
                {item.value}
              </p>
            </div>
          ))}

          
        </div>
      </div>
    </VoterLayout>
  );
};

export default VoterProfilePage;
