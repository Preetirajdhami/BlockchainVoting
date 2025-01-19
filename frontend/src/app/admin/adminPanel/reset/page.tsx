"use client";
import React, { useState } from "react";
import getAdminContractInstance from "../../../utility/adminContract";
import AdminLayout from "../AdminLayout";

const ResetCandidatesPage = () => {
  const [isResetting, setIsResetting] = useState(false);
  const [message, setMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for modal visibility
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleReset = async () => {
    setIsResetting(true);
    setMessage("");
    setTransactionHash(null); // Reset transaction hash before starting a new reset
    try {
      // Get the contract instance
      const adminContract = await getAdminContractInstance();

      // Call the resetCandidates function
      const tx = await adminContract.resetCandidates();
      setMessage("Transaction sent. Waiting for confirmation...");

      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      setTransactionHash(receipt.transactionHash); // Store transaction hash

      setMessage("Candidates have been successfully reset.");
    } catch (error) {
      console.error("Error resetting candidates:", error);

      // Safely handle error with more informative messages
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("An unexpected error occurred while resetting candidates.");
      }
    } finally {
      setIsResetting(false);
    }
  };

  const confirmReset = () => {
    setShowConfirmModal(false); // Close the modal
    handleReset(); // Proceed with the reset
  };

  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center mx-auto p-4 bg-gray-200  min-h-screen">
        <h1 className="text-3xl font-bold text-bgBlue text-center mb-6">Reset Candidates</h1>
        <div className="text-center">
          <button
            className={`px-6 py-3 rounded text-white text-lg ${
              isResetting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-popBlue hover:bg-white hover:text-popBlue hover:border-popBlue border-[2px] transition duration-300"
            } sm:px-14 sm:py-4 text-xl lg:text-2xl font-medium `}
            onClick={() => setShowConfirmModal(true)} // Open the confirmation dialog
            disabled={isResetting}
          >
            {isResetting ? "Resetting..." : "Reset "}
          </button>
        </div>
  
        {message && (
          <div className="mt-4 text-center">
            <p className="text-lg sm:text-xl">{message}</p>
          </div>
        )}
  
        {/* Display transaction details if available */}
        {transactionHash && (
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Transaction Hash:{" "}
              <a
                href={`https://etherscan.io/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {transactionHash}
              </a>
            </p>
          </div>
        )}
  
        {/* Confirmation Dialog */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-11/12 sm:w-96">
              <p className="text-lg font-semibold mb-4">
                Are you sure you want to reset the candidates? This action cannot
                be undone.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-white text-logoBlue text-sm  rounded-full hover:bg-logoBlue hover:text-white transition duration-300 font-bold py-2 px-4"
                  onClick={confirmReset}
                >
                  Yes, Reset
                </button>
                <button
                  className="bg-white text-logoBlue text-sm rounded-full hover:bg-logoBlue hover:text-white transition duration-300 font-bold py-2 px-4"
                  onClick={() => setShowConfirmModal(false)} // Close the modal
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
  
};

export default ResetCandidatesPage;
