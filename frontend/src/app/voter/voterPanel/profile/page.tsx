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
        const response = await fetch("http://localhost:8000/api/user/me", {
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

  const handleUpdateProfile = () => {
    console.log("Update Profile button clicked!");
  };

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

  return (
    <VoterLayout>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Voter Profile</h2>

      
          <div className="mb-6 flex justify-center">
            <img
              src={voterProfile.photo.startsWith("http") ? voterProfile.photo : `http://localhost:8000/${voterProfile.photo}`}
              alt="Voter Profile"
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
          </div>

          {[
            { label: "Name", value: voterProfile.name },
            { label: "Email", value: voterProfile.email },
            { label: "Voter ID", value: voterProfile.voterID },
            { label: "Date of Birth", value: new Date(voterProfile.dob).toLocaleDateString() },
            { label: "Address", value: voterProfile.address },
            { label: "Mobile Number", value: voterProfile.mobile },
          ].map((item, index) => (
            <div className="mb-4" key={index}>
              <label className="block text-gray-700 text-sm font-bold mb-2">{item.label}</label>
              <p className="bg-gray-200 p-3 rounded">{item.value}</p>
            </div>
          ))}

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
