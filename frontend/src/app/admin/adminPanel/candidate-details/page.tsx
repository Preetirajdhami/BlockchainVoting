"use client";

import { useState, useEffect } from "react";
import getAdminContractInstance from "../../../utility/adminContract.js";
import AdminLayout from "../AdminLayout";
import Image from "next/image.js";
import { 
  FaUsers, 
  FaUser, 
  FaMapMarkerAlt, 
  FaVoteYea, 
  FaSpinner, 
  FaExclamationTriangle,
  FaUserPlus,
  FaEye
} from "react-icons/fa";

interface Candidate {
  firstName: string;
  lastName: string;
  position: string;
  addressInfo: string;
  profileImageHash: string;
  logoImageHash: string;
  voteCount: number;
}

const CandidateDetailsPage = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllCandidates = async () => {
    try {
      setLoading(true);
      const contract = await getAdminContractInstance();
      const candidateData: any[] = await contract.getAllCandidates();
      
      const mappedCandidates: Candidate[] = candidateData.map((data) => ({
        firstName: data.firstName,
        lastName: data.lastName,
        position: data.position,
        addressInfo: data.addressInfo,
        profileImageHash: data.profileImageHash,
        logoImageHash: data.logoImageHash,
        voteCount: Number(data.voteCount.toString()),
      }));

      setCandidates(mappedCandidates);
    } catch (err) {
      console.error("Error fetching candidates:", err);
      setError("Failed to fetch candidates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCandidates();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-logoBlue border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 text-lg">Loading candidates...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md text-center p-8">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <FaExclamationTriangle className="text-4xl text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Error Loading Data</h2>
            <p className="text-red-600 mb-8 text-lg">{error}</p>
            <button
              onClick={fetchAllCandidates}
              className="px-8 py-3 bg-logoBlue text-white rounded-xl hover:bg-bgBlue transition-colors duration-200 font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (candidates.length === 0) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md text-center p-8">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <FaUserPlus className="text-4xl text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No Candidates Found</h2>
            <p className="text-gray-600 text-lg mb-8">
              There are no candidates registered yet. Add the first candidate to get started.
            </p>
            <a
              href="/admin/adminPanel/add-details"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-logoBlue text-white rounded-xl hover:bg-bgBlue transition-colors duration-200 font-semibold"
            >
              <FaUserPlus />
              <span>Add First Candidate</span>
            </a>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-4 py-2 mb-4">
                <FaUsers className="text-logoBlue" />
                <span className="text-logoBlue font-semibold">Candidate Management</span>
              </div>
              <h1 className="text-4xl font-bold text-logoBlue mb-4">Candidate Details</h1>
              <p className="text-xl text-gray-600">
                Manage and view all registered candidates for the election
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="text-center">
                  <div className="text-3xl font-bold text-logoBlue">{candidates.length}</div>
                  <div className="text-sm text-gray-600">Total Candidates</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {candidates.map((candidate, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl border border-gray-200 hover:border-logoBlue/30 hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Card Header */}
              <div className="relative p-6 bg-gradient-to-br from-gray-50 to-white">
                {/* Profile Image */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-full border-4 border-logoBlue/20 overflow-hidden bg-gray-100">
                      {candidate.profileImageHash ? (
                        <Image
                          src={`https://ipfs.io/ipfs/${candidate.profileImageHash}`}
                          alt="Profile"
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaUser className="text-3xl text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    {/* Logo Badge */}
                    {candidate.logoImageHash && (
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-white shadow-lg">
                        <Image
                          src={`https://ipfs.io/ipfs/${candidate.logoImageHash}`}
                          alt="Logo"
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Candidate Info */}
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {candidate.firstName} {candidate.lastName}
                  </h3>
                  <div className="space-y-2">
                    <div className="inline-flex items-center space-x-2 bg-logoBlue/10 text-logoBlue px-3 py-1 rounded-full text-sm font-semibold">
                      <FaUser className="text-xs" />
                      <span>{candidate.position}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm">
                      <FaMapMarkerAlt className="text-xs" />
                      <span>{candidate.addressInfo}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 bg-white border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-logoBlue/10 rounded-xl flex items-center justify-center">
                      <FaVoteYea className="text-logoBlue" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-logoBlue">{candidate.voteCount}</p>
                      <p className="text-sm text-gray-600">Votes Received</p>
                    </div>
                  </div>
                  
                  <button className="opacity-0 group-hover:opacity-100 p-3 bg-logoBlue/10 hover:bg-logoBlue hover:text-white text-logoBlue rounded-xl transition-colors duration-200">
                    <FaEye className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 bg-white rounded-3xl border border-gray-200 shadow-lg p-8">
          <h3 className="text-2xl font-bold text-logoBlue mb-6">Election Summary</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-logoBlue/5 rounded-2xl border border-logoBlue/10">
              <div className="w-12 h-12 bg-logoBlue rounded-xl flex items-center justify-center mx-auto mb-3">
                <FaUsers className="text-white" />
              </div>
              <div className="text-2xl font-bold text-logoBlue mb-1">{candidates.length}</div>
              <div className="text-sm text-gray-600">Total Candidates</div>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-200">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FaVoteYea className="text-white" />
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {candidates.reduce((sum, candidate) => sum + candidate.voteCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Votes</div>
            </div>

            <div className="text-center p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FaUser className="text-white" />
              </div>
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {Math.max(...candidates.map(c => c.voteCount), 0)}
              </div>
              <div className="text-sm text-gray-600">Highest Votes</div>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-2xl border border-purple-200">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FaSpinner className="text-white" />
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {candidates.filter(c => c.voteCount > 0).length}
              </div>
              <div className="text-sm text-gray-600">With Votes</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CandidateDetailsPage;