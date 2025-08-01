"use client";
import React, { useState } from "react";
import getAdminContractInstance from "../../../utility/adminContract";
import AdminLayout from "../AdminLayout";
import { 
  FaUndo, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaSpinner,
  FaShieldAlt,
  FaDatabase,
  FaTrash
} from "react-icons/fa";

const ResetElectionPage = () => {
  const [isResetting, setIsResetting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleReset = async () => {
    setIsResetting(true);
    setMessage("");
    setMessageType("");
    setTransactionHash(null);
    
    try {
      const adminContract = await getAdminContractInstance();
      const tx = await adminContract.resetCandidates();
      
      setMessage("Transaction sent. Waiting for confirmation...");
      setMessageType("");

      const receipt = await tx.wait();
      setTransactionHash(receipt.transactionHash);

      setMessage("Election has been successfully reset! All candidate data has been cleared.");
      setMessageType("success");
    } catch (error) {
      console.error("Error resetting candidates:", error);

      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("An unexpected error occurred while resetting the election.");
      }
      setMessageType("error");
    } finally {
      setIsResetting(false);
    }
  };

  const confirmReset = () => {
    setShowConfirmModal(false);
    handleReset();
  };

  return (
    <AdminLayout>
      <div className="min-h-screen py-8 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-red-100 rounded-full px-6 py-3 mb-6">
              <FaUndo className="text-red-600" />
              <span className="text-red-600 font-semibold">Reset Election</span>
            </div>
            <h1 className="text-4xl font-bold text-red-600 mb-4">Reset Election Data</h1>
            <p className="text-xl text-gray-600">
              Permanently remove all candidate information and reset the election
            </p>
          </div>

          {/* Warning Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-red-200 overflow-hidden mb-8">
            {/* Warning Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-8 text-white relative">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/20 rounded-lg rotate-45" />
              <div className="absolute top-4 right-4 w-6 h-6 bg-white/30 rounded-full animate-pulse" />
              
              <div className="text-center relative">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <FaExclamationTriangle className="text-4xl text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-3">⚠️ DANGER ZONE ⚠️</h2>
                <p className="text-red-100 text-lg">This action cannot be undone</p>
              </div>
            </div>

            {/* Warning Content */}
            <div className="p-8">
              <div className="space-y-6">
                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl">
                  <div className="flex items-start space-x-4">
                    <FaExclamationTriangle className="text-red-500 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-red-800 text-lg mb-3">Critical Warning</h3>
                      <div className="text-red-700 space-y-2">
                        <p>• <strong>All candidate data will be permanently deleted</strong></p>
                        <p>• <strong>All vote counts will be reset to zero</strong></p>
                        <p>• <strong>This action is recorded on the blockchain</strong></p>
                        <p>• <strong>There is no way to recover the data once reset</strong></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <FaDatabase className="text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Data Loss</h4>
                    <p className="text-sm text-gray-600">All candidate information will be erased</p>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <FaTrash className="text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Vote Reset</h4>
                    <p className="text-sm text-gray-600">All votes will return to zero</p>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <FaShieldAlt className="text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Blockchain</h4>
                    <p className="text-sm text-gray-600">Transaction recorded permanently</p>
                  </div>
                </div>

                {/* Status Messages */}
                {message && (
                  <div className={`p-4 rounded-xl border-l-4 ${
                    messageType === "success" 
                      ? "bg-green-50 border-green-400" 
                      : messageType === "error"
                      ? "bg-red-50 border-red-400"
                      : "bg-blue-50 border-blue-400"
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {messageType === "success" ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : messageType === "error" ? (
                          <FaExclamationTriangle className="text-red-500" />
                        ) : (
                          <FaSpinner className="text-blue-500 animate-spin" />
                        )}
                      </div>
                      <p className={`font-medium ${
                        messageType === "success" 
                          ? "text-green-700" 
                          : messageType === "error"
                          ? "text-red-700"
                          : "text-blue-700"
                      }`}>
                        {message}
                      </p>
                    </div>
                  </div>
                )}

                {/* Transaction Hash */}
                {transactionHash && (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Transaction Details</h4>
                    <div className="break-all text-sm text-gray-600">
                      <strong>Hash:</strong>{" "}
                      <a
                        href={`https://etherscan.io/tx/${transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-logoBlue hover:underline"
                      >
                        {transactionHash}
                      </a>
                    </div>
                  </div>
                )}

                {/* Reset Button */}
                <div className="text-center pt-4">
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    disabled={isResetting}
                    className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                      isResetting
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:scale-105"
                    }`}
                  >
                    {isResetting ? (
                      <div className="flex items-center space-x-3">
                        <FaSpinner className="animate-spin" />
                        <span>Resetting Election...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <FaUndo />
                        <span>Reset Election</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaShieldAlt className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">When to Use Reset</h3>
                <div className="text-blue-800 text-sm space-y-1">
                  <p>• Before starting a completely new election</p>
                  <p>• When you need to remove test candidates</p>
                  <p>• If there are issues with current election data</p>
                  <p>• To start fresh with a clean slate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-6 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaExclamationTriangle className="text-3xl" />
              </div>
              <h3 className="text-2xl font-bold">Final Confirmation</h3>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="text-center space-y-6">
                <div className="space-y-3">
                  <p className="text-gray-800 font-semibold text-lg">
                    Are you absolutely sure?
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    This will permanently delete all candidate data and reset all vote counts. 
                    This action cannot be undone and will be recorded on the blockchain.
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-800 text-sm font-medium">
                    ⚠️ Type &quot;RESET&quot; below to confirm this dangerous action
                  </p>
                  <input
                    type="text"
                    placeholder="Type RESET to continue"
                    className="w-full mt-3 px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:border-red-500"
                    onChange={(e) => {
                      // You can add validation here if needed
                    }}
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmReset}
                    className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200 font-semibold"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <FaUndo />
                      <span>Reset Now</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ResetElectionPage;