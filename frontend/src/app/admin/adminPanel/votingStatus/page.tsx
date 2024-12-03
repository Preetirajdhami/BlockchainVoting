"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import  getAdminContractInstance  from "../../../utility/adminContract";

const VotingStatusPage = () => {
    const [isVotingActive, setIsVotingActive] = useState<boolean>(false);
    const [votingStopped, setVotingStopped] = useState<boolean>(false); // Tracks if voting was explicitly stopped by the admin.
    const [winner, setWinner] = useState<any>(null); // State to store winner details

    // Fetch voting status from the server
    const fetchVotingStatus = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/admin/voting-status");
            if (!response.ok) {
                throw new Error("Failed to fetch voting status");
            }
            const data = await response.json();
            setIsVotingActive(data.isVotingActive);
        } catch (error) {
            console.error("Error fetching voting status:", error);
        }
    };

    // Toggle voting status
    const handleToggleVoting = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/admin/voting-status/toggle", {
                method: "POST",
            });
            if (!response.ok) {
                throw new Error("Failed to toggle voting status");
            }
            const data = await response.json();
            setIsVotingActive(data.isVotingActive);

            // Mark voting as stopped if the admin deactivates voting
            if (!data.isVotingActive) {
                setVotingStopped(true);
            }
        } catch (error) {
            console.error("Error toggling voting status:", error);
        }
    };

    // Fetch the winner from the contract
    const fetchWinner = async () => {
        try {
            const contract = await getAdminContractInstance();
            const winnerData = await contract.getWinner();

            // Update the winner state with the fetched details
            setWinner({
                id: winnerData[0].toString(),
                firstName: winnerData[1],
                lastName: winnerData[2],
                position: winnerData[3],
                voteCount: winnerData[4].toString(),
            });
        } catch (error) {
            console.error("Error fetching winner details:", error);
        }
    };

    // Fetch the voting status on initial render
    useEffect(() => {
        fetchVotingStatus();
    }, []);

    // Handle viewing results
    const handleViewResults = async () => {
        await fetchWinner(); // Fetch the winner before navigating
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Voting Status</h2>
                    <button
                        onClick={handleToggleVoting}
                        className="bg-navBlue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
                    >
                        {isVotingActive ? "Stop Voting" : "Start Voting"}
                    </button>

                    {/* Conditional rendering for the "View Results" button */}
                    {!isVotingActive && votingStopped && (
                        <>
                            <button
                                onClick={handleViewResults}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
                            >
                                View Results
                            </button>

                            {winner && (
                                <div className="mt-4 text-left">
                                    <h3 className="text-lg font-semibold">Winner Details</h3>
                                    <p>ID: {winner.id}</p>
                                    <p>Name: {winner.firstName} {winner.lastName}</p>
                                    <p>Position: {winner.position}</p>
                                    <p>Votes: {winner.voteCount}</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default VotingStatusPage;
