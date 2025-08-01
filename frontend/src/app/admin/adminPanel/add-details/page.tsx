"use client";
import { useState, useRef } from "react";
import { ethers } from "ethers";
import getAdminContractInstance from "../../../utility/adminContract.js";
import { uploadToIPFS } from "@/app/utility/uploadToIpfs.js";
import AdminLayout from "../AdminLayout";
import Image from "next/image";
import { 
  FaUserPlus, 
  FaUser, 
  FaMapMarkerAlt, 
  FaCamera, 
  FaImage, 
  FaCheckCircle,
  FaSpinner
} from "react-icons/fa";

const AddCandidatePage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    position: "",
    addressInfo: "",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Refs for file inputs
  const profileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: (file: File | null) => void,
    setPreview: (preview: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const addCandidate = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Validation
      if (!formData.firstName || !formData.lastName || !formData.position || !formData.addressInfo) {
        throw new Error("All fields are required.");
      }

      if (!profileImage || !logoImage) {
        throw new Error("Both profile and logo images are required.");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      if (!signer) {
        throw new Error("Signer not available. Connect your wallet first.");
      }

      // Upload images to IPFS
      const profileImageHash = await uploadToIPFS(profileImage);
      const logoImageHash = await uploadToIPFS(logoImage);

      // Add candidate to blockchain
      const contract = await getAdminContractInstance();
      const tx = await contract.addCandidate(
        formData.firstName,
        formData.lastName,
        formData.position,
        formData.addressInfo,
        profileImageHash,
        logoImageHash
      );
      await tx.wait();

      setSuccessMessage("Candidate added successfully!");
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        position: "",
        addressInfo: "",
      });
      setProfileImage(null);
      setLogoImage(null);
      setProfilePreview(null);
      setLogoPreview(null);

    } catch (error: any) {
      console.error("Error adding candidate:", error);
      setErrorMessage(error.message || "Failed to add candidate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen py-8 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-logoBlue/10 rounded-full px-6 py-3 mb-6">
              <FaUserPlus className="text-logoBlue" />
              <span className="text-logoBlue font-semibold">Add New Candidate</span>
            </div>
            <h1 className="text-4xl font-bold text-logoBlue mb-4">Register Candidate</h1>
            <p className="text-xl text-gray-600">
              Add a new candidate to the election with their details and images
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-logoBlue to-bgBlue px-8 py-8 text-white relative">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/20 rounded-lg rotate-45" />
              <div className="absolute top-4 right-4 w-6 h-6 bg-popBlue/30 rounded-full animate-pulse" />
              
              <div className="text-center relative">
                <div className="w-16 h-16 bg-popBlue rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaUserPlus className="text-3xl text-bgBlue" />
                </div>
                <h2 className="text-2xl font-bold">Candidate Registration Form</h2>
                <p className="text-blue-100 mt-2">Fill in all required information</p>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8 space-y-8">
              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-xl">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaCheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700 font-medium">{successMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <FaUser className="text-logoBlue" />
                    <span>First Name</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-logoBlue focus:outline-none transition-all duration-300 text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <FaUser className="text-logoBlue" />
                    <span>Last Name</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-logoBlue focus:outline-none transition-all duration-300 text-lg"
                  />
                </div>
              </div>

              {/* Position Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <FaUserPlus className="text-logoBlue" />
                  <span>Position</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Enter position (e.g., President, Mayor, etc.)"
                  className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-logoBlue focus:outline-none transition-all duration-300 text-lg"
                />
              </div>

              {/* Address Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-logoBlue" />
                  <span>Address</span>
                </label>
                <input
                  type="text"
                  name="addressInfo"
                  value={formData.addressInfo}
                  onChange={handleChange}
                  placeholder="Enter full address"
                  className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-logoBlue focus:outline-none transition-all duration-300 text-lg"
                />
              </div>

              {/* Image Upload Section */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Profile Image */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <FaCamera className="text-logoBlue" />
                    <span>Profile Image</span>
                  </label>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-logoBlue transition-colors duration-300 relative">
                    {profilePreview ? (
                      <div className="space-y-4">
                        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-logoBlue/20">
                          <Image
                            height={96}
                            width={96}
                            src={profilePreview}
                            alt="Profile Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex gap-3 justify-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setProfileImage(null);
                              setProfilePreview(null);
                            }}
                            className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            Remove Image
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              profileInputRef.current?.click();
                            }}
                            className="text-logoBlue hover:text-logoBlue/80 text-sm font-medium px-3 py-1 rounded-lg hover:bg-logoBlue/10 transition-colors"
                          >
                            Change Image
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="space-y-4 cursor-pointer"
                        onClick={() => profileInputRef.current?.click()}
                      >
                        <div className="w-16 h-16 bg-logoBlue/10 rounded-full flex items-center justify-center mx-auto">
                          <FaCamera className="text-2xl text-logoBlue" />
                        </div>
                        <div>
                          <p className="text-gray-600 mb-2">Upload profile image</p>
                          <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Hidden file input */}
                    <input
                      ref={profileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setProfileImage, setProfilePreview)}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Logo Image */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <FaImage className="text-logoBlue" />
                    <span>Logo Image</span>
                  </label>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-logoBlue transition-colors duration-300 relative">
                    {logoPreview ? (
                      <div className="space-y-4">
                        <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-4 border-logoBlue/20">
                          <Image
                            height={96}
                            width={96}
                            src={logoPreview}
                            alt="Logo Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex gap-3 justify-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLogoImage(null);
                              setLogoPreview(null);
                            }}
                            className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            Remove Image
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              logoInputRef.current?.click();
                            }}
                            className="text-logoBlue hover:text-logoBlue/80 text-sm font-medium px-3 py-1 rounded-lg hover:bg-logoBlue/10 transition-colors"
                          >
                            Change Image
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="space-y-4 cursor-pointer"
                        onClick={() => logoInputRef.current?.click()}
                      >
                        <div className="w-16 h-16 bg-logoBlue/10 rounded-2xl flex items-center justify-center mx-auto">
                          <FaImage className="text-2xl text-logoBlue" />
                        </div>
                        <div>
                          <p className="text-gray-600 mb-2">Upload logo image</p>
                          <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Hidden file input */}
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, setLogoImage, setLogoPreview)}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={addCandidate}
                disabled={isLoading}
                className={`w-full py-4 bg-gradient-to-r from-logoBlue to-bgBlue text-white font-bold text-lg rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${
                  isLoading ? "opacity-75 cursor-not-allowed" : "hover:scale-[1.02]"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <FaSpinner className="animate-spin" />
                    <span>Adding Candidate...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <FaUserPlus />
                    <span>Add Candidate</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-logoBlue/5 rounded-2xl p-6 border border-logoBlue/10">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-logoBlue rounded-xl flex items-center justify-center flex-shrink-0">
                <FaUserPlus className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-logoBlue mb-2">Adding Candidates</h3>
                <div className="text-gray-600 text-sm space-y-1">
                  <p>• Make sure to fill in all required fields</p>
                  <p>• Profile image should clearly show the candidate&apos;s face</p>
                  <p>• Logo image will be displayed as the candidate&apos;s symbol</p>
                  <p>• Images will be stored securely on IPFS</p>
                  <p>• Transaction will be recorded on blockchain for transparency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddCandidatePage;