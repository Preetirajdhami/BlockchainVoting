
"use client";
import { useState } from "react";
import AdminLayout from "../AdminLayout";

const VotingStatusPage = () => {
    const [isVotingActive, setIsVotingActive] = useState(false);

    const handleToggleVoting = () => {
        setIsVotingActive((prev) => !prev);
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Voting Status
                </h2>
                <button
                    onClick={handleToggleVoting}
                    className={`bg-navBlue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full`}
                >
                    {isVotingActive ? "Stop Voting" : "Start Voting"}
                </button>
            </div>
        </div>
        </AdminLayout>
        
    );
};

export default VotingStatusPage;
