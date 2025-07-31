"use client"

import { useState, useEffect } from "react"
import VoterLayout from "../VoterLayout";
import Image from "next/image"
import { User, Mail, Calendar, MapPin, Phone, Camera } from "lucide-react"

interface VoterProfile {
  name: string
  email: string
  voterID: string
  dob: string
  address: string
  mobile: string
  photo: string
}

export default function VoterProfilePage() {
  const [voterProfile, setVoterProfile] = useState<VoterProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVoterProfile = async () => {
      try {
        const response = await fetch("https://blockchainvoting-z1xf.onrender.com/api/user/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized: Please log in again.")
          }
          throw new Error(`Error ${response.status}: Failed to fetch voter profile.`)
        }

        const data = await response.json()
        if (!data.user) {
          throw new Error("No voter profile data found.")
        }

        setVoterProfile(data.user)
      } catch (err: any) {
        setError(err.message || "Something went wrong.")
      } finally {
        setLoading(false)
      }
    }

    fetchVoterProfile()
  }, [])

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
        <div className="min-h-screen flex justify-center items-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        </div>
      </VoterLayout>
    )
  }

  if (!voterProfile) {
    return (
      <VoterLayout>
        <div className="min-h-screen flex justify-center items-center">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md">
            <p className="text-gray-600 text-center">No voter profile found.</p>
          </div>
        </div>
      </VoterLayout>
    )
  }

  const imageUrl = voterProfile.photo.startsWith("http")
    ? voterProfile.photo
    : `https://blockchainvoting-z1xf.onrender.com/uploads/${voterProfile.photo.split("\\").pop()}`

  const profileData = [
    { label: "Full Name", value: voterProfile.name, icon: User },
    { label: "Email Address", value: voterProfile.email, icon: Mail },
    {
      label: "Date of Birth",
      value: new Date(voterProfile.dob).toLocaleDateString(),
      icon: Calendar,
    },
    { label: "Address", value: voterProfile.address, icon: MapPin },
    { label: "Mobile Number", value: voterProfile.mobile, icon: Phone },
  ]

  return (
    <VoterLayout>
      <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-bgBlue mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and account settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Picture Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-32 h-32 mx-auto mb-4 relative">
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt="Profile Picture"
                        fill
                        className="rounded-full object-cover border-4 border-gray-100"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-logoBlue text-white p-2 rounded-full hover:bg-navBlue transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <h2 className="text-xl font-semibold text-bgBlue mb-1">{voterProfile.name}</h2>
                  <p className="text-gray-500 text-sm">Verified Voter</p>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-bgBlue">Personal Information</h3>
                  <button className="text-logoBlue hover:text-navBlue text-sm font-medium">Edit Profile</button>
                </div>

                <div className="space-y-6">
                  {profileData.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-1">{item.label}</p>
                        <p className="text-gray-600 break-words">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-logoBlue text-white px-6 py-3 rounded-lg hover:bg-navBlue transition-colors font-medium">
              Change Password
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Download Profile Data
            </button>
          </div>
        </div>
      </div>
    </VoterLayout>
  )
}
