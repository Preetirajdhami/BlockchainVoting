"use client"
import { useState } from 'react';
import { ethers, isAddress } from 'ethers';// Ensure ethers is imported properly
 
import getContractInstance from "../../../utility/contract.js"; 

const AddCandidate = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    addressInfo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addCandidate = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum); // Initialize provider
    const signer = await provider.getSigner(); // Get the signer
    if (!signer) {
      console.error('Signer not available. Connect your wallet first.');
      return;
    }

    // Trim the addressInfo to remove any leading/trailing spaces
    // let resolvedAddress: string | null = formData.addressInfo.trim();

    // Check if the input is an Ethereum address
    // if (!isAddress(resolvedAddress)) {
    //   try {
    //     // Attempt to resolve the name as an ENS name
    //     resolvedAddress = await signer.resolveName(resolvedAddress);
    //     if (!resolvedAddress) {
    //       throw new Error('Invalid ENS name or address');
    //     }
    //   } catch (error) {
    //     console.error('Error resolving ENS name:', error);
    //     return;
    //   }
    // }

    // Ensure resolvedAddress is a string before proceeding
    // if (resolvedAddress === null) {
    //   console.error('Resolved address is null');
    //   return;
    // }

    try {
      const contract = await getContractInstance();
      const tx = await contract.addCandidate(
        formData.firstName,
        formData.lastName,
        formData.position,
        formData.addressInfo
        // resolvedAddress // Use the resolved address here
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
