"use client";
import React, { useState } from "react";
import getAdminContractInstance from "../../../utility/adminContract";
import AdminLayout from "../AdminLayout";

const ResetCandidatesPage = () => {
  const [isResetting, setIsResetting] = useState(false);
  const [message, setMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for modal visibility

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

  const confirmReset = () => {
    setShowConfirmModal(false); // Close the modal
    handleReset(); // Proceed with the reset
  };

  return (
    <AdminLayout>
      <div className="mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Reset Candidates</h1>
        <div className="text-center">
          <button
            className={`px-6 py-3 rounded text-white text-lg ${
              isResetting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            } sm:px-8 sm:py-4`}
            onClick={() => setShowConfirmModal(true)} // Open the confirmation dialog
            disabled={isResetting}
          >
            {isResetting ? "Resetting..." : "Reset Candidates"}
          </button>
        </div>
        {message && (
          <div className="mt-4 text-center">
            <p className="text-lg sm:text-xl">{message}</p>
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
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 sm:px-6 sm:py-3"
                  onClick={confirmReset}
                >
                  Yes, Reset
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 sm:px-6 sm:py-3"
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
