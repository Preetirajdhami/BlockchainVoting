"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import AdminLayout from "../AdminLayout";

interface CandidateFormData {
  firstName: string;
  lastName: string;
  position: string;
  profileImage: File | null;
  address: string;
  logo: File | null;
}

const AddCandidateForm: React.FC = () => {
  const [formData, setFormData] = useState<CandidateFormData>({
    firstName: "",
    lastName: "",
    position: "",
    profileImage: null,
    address: "",
    logo: null,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("firstName", formData.firstName);
    formDataToSubmit.append("lastName", formData.lastName);
    formDataToSubmit.append("position", formData.position);
    if (formData.profileImage) {
      formDataToSubmit.append("profileImage", formData.profileImage);
    }
    formDataToSubmit.append("address", formData.address);
    if (formData.logo) {
      formDataToSubmit.append("logo", formData.logo);
    }

    // You can now send `formDataToSubmit` to your backend using fetch or axios
    console.log("Form submitted");

    // Reset form (optional)
    setFormData({
      firstName: "",
      lastName: "",
      position: "",
      profileImage: null,
      address: "",
      logo: null,
    });
  };

  return (
    <AdminLayout>
        <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Add Candidate</h2>
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        {/* Position */}
        <div className="mb-4">
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        {/* Profile Image */}
        <div className="mb-4">
          <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
            Upload Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            accept="image/*"
            required
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        {/* Logo */}
        <div className="mb-4">
          <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
            Upload Logo
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            accept="image/*"
            required
          />
        </div>

        {/* Add Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Add Candidate
          </button>
        </div>
      </form>
    </div>
    </AdminLayout>
    
  );
};

export default AddCandidateForm;
