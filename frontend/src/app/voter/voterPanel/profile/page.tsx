"use client";

import { useState, useEffect } from "react";
import VoterSidebar from "@/app/components/VoterSidebar";
import Image from "next/image";
import { 
  FaUser, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaIdCard,
  FaShieldAlt,
  FaCheckCircle,
  FaEdit
} from "react-icons/fa";

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
        const response = await fetch(
          "https://blockchainvoting-z1xf.onrender.com/api/user/me",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized: Please log in again.");
          }
          throw new Error(
            `Error ${response.status}: Failed to fetch voter profile.`
          );
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
      <div className="flex">
        <VoterSidebar />
        <div className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-logoBlue border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 text-lg">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <VoterSidebar />
        <div className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md text-center p-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaUser className="text-3xl text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Error</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-logoBlue text-white rounded-xl hover:bg-bgBlue transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!voterProfile) {
    return (
      <div className="flex">
        <VoterSidebar />
        <div className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md text-center p-8">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaUser className="text-3xl text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Profile Found</h2>
            <p className="text-gray-600">Unable to load your profile information.</p>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = voterProfile.photo.startsWith("http")
    ? voterProfile.photo
    : `https://blockchainvoting-z1xf.onrender.com/uploads/${voterProfile.photo
        .split("\\")
        .pop()}`;

  const profileFields = [
    {
      icon: <FaUser className="text-logoBlue" />,
      label: "Full Name",
      value: voterProfile.name,
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FaEnvelope className="text-logoBlue" />,
      label: "Email Address",
      value: voterProfile.email,
      color: "from-green-500 to-green-600"
    },
    {
      icon: <FaCalendarAlt className="text-logoBlue" />,
      label: "Date of Birth",
      value: new Date(voterProfile.dob).toLocaleDateString(),
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <FaMapMarkerAlt className="text-logoBlue" />,
      label: "Address",
      value: voterProfile.address,
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <FaPhone className="text-logoBlue" />,
      label: "Mobile Number",
      value: voterProfile.mobile,
      color: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <div className="flex">
      <VoterSidebar />
      <div className="flex-1 min-h-screen bg-gray-50 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-6 py-3 mb-6">
              <FaUser className="text-logoBlue" />
              <span className="text-logoBlue font-semibold">Voter Profile</span>
            </div>
            <h1 className="text-4xl font-bold text-logoBlue mb-4">My Profile</h1>
            <p className="text-xl text-gray-600">Your personal information and voting credentials</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-logoBlue to-bgBlue px-8 py-12 text-white relative">
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/20 rounded-lg rotate-45" />
              <div className="absolute top-4 right-4 w-6 h-6 bg-popBlue/30 rounded-full animate-pulse" />
              <div className="absolute bottom-4 right-4">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <FaCheckCircle className="text-popBlue text-sm" />
                  <span className="text-sm font-medium">Verified Voter</span>
                </div>
              </div>

              <div className="text-center">
                {/* Profile Image */}
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden bg-white/10 backdrop-blur-sm">
                    <Image
                      src={imageUrl}
                      alt="Voter Profile"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-popBlue rounded-full flex items-center justify-center border-2 border-white">
                    <FaCheckCircle className="text-bgBlue text-sm" />
                  </div>
                </div>

                <h2 className="text-3xl font-bold mb-2">{voterProfile.name}</h2>
                <p className="text-blue-100 text-lg">Registered Voter</p>
              </div>
            </div>

            {/* Profile Information */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {profileFields.map((field, index) => (
                  <div
                    key={index}
                    className="group bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${field.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {field.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                          {field.label}
                        </label>
                        <p className="text-lg font-medium text-gray-900 mt-1 break-words">
                          {field.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Security Information */}
              <div className="mt-8 bg-logoBlue/5 rounded-2xl p-6 border border-logoBlue/10">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-logoBlue rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaShieldAlt className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-logoBlue mb-2">Security & Privacy</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Your personal information is protected with end-to-end encryption and blockchain security. 
                      Only you can access this profile, and your voting history remains completely anonymous.
                    </p>
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Verified Account</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Encrypted Data</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Anonymous Voting</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-logoBlue text-white rounded-xl hover:bg-bgBlue transition-colors duration-200 font-semibold">
                  <FaEdit />
                  <span>Edit Profile</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-semibold">
                  <FaIdCard />
                  <span>Download ID</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterProfilePage;