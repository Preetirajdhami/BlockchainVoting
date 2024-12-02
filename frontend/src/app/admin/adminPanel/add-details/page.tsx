"use client";
import { useState } from 'react';
import { ethers } from 'ethers';
import getAdminContractInstance from "../../../utility/adminContract.js"; 
import { uploadToIPFS } from '@/app/utility/uploadToIpfs.js';
import AdminLayout from '../AdminLayout';

const AddCandidate = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    addressInfo: '',
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [logoImage, setLogoImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setImage: (file: File | null) => void) => {
    const file = e.target.files?.[0];
    setImage(file || null); 
  };

  const addCandidate = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum); 
    const signer = await provider.getSigner(); 
    if (!signer) {
      console.error('Signer not available. Connect your wallet first.');
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
        logoImageHash     // Pass IPFS hash of logo
      );
      await tx.wait();
      alert('Candidate added successfully!');
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Candidate</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        className="mb-2 p-2 border rounded w-full"
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        className="mb-2 p-2 border rounded w-full"
        onChange={handleChange}
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        className="mb-2 p-2 border rounded w-full"
        onChange={handleChange}
      />
      <input
        type="text"
        name="addressInfo"
        placeholder="Address"
        className="mb-2 p-2 border rounded w-full"
        onChange={handleChange}
      />
      
      <label className="block mb-2">Profile Image</label>
      <input
        type="file"
        accept="image/*"
        className="mb-4 p-2 border rounded w-full"
        onChange={(e) => handleFileChange(e, setProfileImage)}
      />

      <label className="block mb-2">Logo Image</label>
      <input
        type="file"
        accept="image/*"
        className="mb-4 p-2 border rounded w-full"
        onChange={(e) => handleFileChange(e, setLogoImage)}
      />

      <button
        onClick={addCandidate}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Add Candidate
      </button>
    </div>
  );
};

export default AddCandidate;
