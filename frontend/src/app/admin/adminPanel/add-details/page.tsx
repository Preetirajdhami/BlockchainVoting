"use client";
import { useState } from "react";
import { ethers } from "ethers";
import getAdminContractInstance from "../../../utility/adminContract.js";
import { uploadToIPFS } from "@/app/utility/uploadToIpfs.js";
import AdminLayout from "../AdminLayout";

const AddCandidate = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    position: "",
    addressInfo: "",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [logoImage, setLogoImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0];
    setImage(file || null);
  };

  const addCandidate = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    if (!signer) {
      console.error("Signer not available. Connect your wallet first.");
      return;
    }

    try {
      if (!profileImage || !logoImage) {
        alert("Both profile and logo images are required.");
        return;
      }

      const profileImageHash = await uploadToIPFS(profileImage);
      const logoImageHash = await uploadToIPFS(logoImage);

      const contract = await getAdminContractInstance();
      const tx = await contract.addCandidate(
        formData.firstName,
        formData.lastName,
        formData.position,
        formData.addressInfo,
        profileImageHash, // Pass IPFS hash of profile image
        logoImageHash // Pass IPFS hash of logo
      );
      await tx.wait();
      alert("Candidate added successfully!");
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg px-6 sm:px-8 py-8 shadow-lg">
          <h2 className="text-2xl lg:text-3xl font-semibold text-center text-bgBlue mb-6">Add Candidate</h2>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="mb-4 p-2 border rounded w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="mb-4 p-2 border rounded w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            className="mb-4 p-2 border rounded w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="addressInfo"
            placeholder="Address"
            className="mb-4 p-2 border rounded w-full"
            onChange={handleChange}
          />
          <label className="block mb-2 text-sm font-medium text-gray-600">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            className="mb-4 p-2 border rounded w-full"
            onChange={(e) => handleFileChange(e, setProfileImage)}
          />
          <label className="block mb-2 text-sm font-medium text-gray-600">Logo Image</label>
          <input
            type="file"
            accept="image/*"
            className="mb-4 p-2 border rounded w-full"
            onChange={(e) => handleFileChange(e, setLogoImage)}
          />
          <button
            onClick={addCandidate}
            className="w-full px-4 py-2 bg-popBlue text-logoBlue text-lg  font-semibold rounded-md hover:bg-logoBlue hover:text-popBlue transition duration-300"
          >
            Add Candidate
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddCandidate;
