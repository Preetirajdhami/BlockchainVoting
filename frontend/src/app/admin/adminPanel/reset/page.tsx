"use client"
import React, { useState } from "react";
import getAdminContractInstance from "../../../utility/adminContract";

const ResetCandidatesPage = () => {
  const [isResetting, setIsResetting] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    setIsResetting(true);
    setMessage("");
    try {
      // Get the contract instance
      const adminContract = await getAdminContractInstance();
  
      // Call the resetCandidates function
      const tx = await adminContract.resetCandidates();
      setMessage("Transaction sent. Waiting for confirmation...");
  
      // Wait for the transaction to be mined
      await tx.wait();
      setMessage("Candidates have been successfully reset.");
    } catch (error) {
      console.error("Error resetting candidates:", error);
  
      // Safely handle error
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Reset Candidates</h1>
      <div className="text-center">
        <button
          className={`px-6 py-2 rounded text-white ${
            isResetting ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          }`}
          onClick={handleReset}
          disabled={isResetting}
        >
          {isResetting ? "Resetting..." : "Reset Candidates"}
        </button>
      </div>
      {message && (
        <div className="mt-4 text-center">
          <p className="text-lg">{message}</p>
        </div>
      )}
    </div>
  );
};

export default ResetCandidatesPage;
