"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import getAdminContractInstance from "../../../utility/adminContract";
import { Pie } from "react-chartjs-2";
import { TooltipItem } from 'chart.js';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);


const VotingStatusPage = () => {
    const [isVotingActive, setIsVotingActive] = useState<boolean>(false);
    const [votingStopped, setVotingStopped] = useState<boolean>(false);
    const [winner, setWinner] = useState<any>(null);
    const [votesData, setVotesData] = useState<any[]>([]);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showStartConfirmModal, setShowStartConfirmModal] = useState<boolean>(false);

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

            if (!data.isVotingActive) {
                setVotingStopped(true);
            }
        } catch (error) {
            console.error("Error toggling voting status:", error);
        }
    };

    const handleConfirmToggle = () => {
        setShowConfirmModal(false);
        handleToggleVoting();
    };

    const handleStartVoting = () => {
        setShowStartConfirmModal(false);
        handleToggleVoting();
    };

    const fetchWinner = async () => {
        try {
            const contract = await getAdminContractInstance();
            const winnerData = await contract.getWinner();

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

    const fetchVotesData = async () => {
        try {
            const contract = await getAdminContractInstance();
            const candidates = await contract.getAllCandidates();
            const votes = candidates.map((candidate: any) => ({
                name: `${candidate.firstName} ${candidate.lastName}`,
                votes: parseInt(candidate.voteCount.toString()),
            }));
            setVotesData(votes);
        } catch (error) {
            console.error("Error fetching votes data:", error);
        }
    };

    useEffect(() => {
        fetchVotingStatus();
    }, []);

    const handleViewResults = async () => {
        await fetchWinner();
        await fetchVotesData();
    };

    const pieChartData = {
        labels: votesData.map((candidate) => candidate.name),
        datasets: [
            {
                data: votesData.map((candidate) => candidate.votes),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            },
        ],
    };

    const pieChartOptions = {
        plugins: {
            legend: {
                position: "right" as const,
                labels: {
                    boxWidth: 20,
                    padding: 10,
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const label = context.label || "";
                        const value = context.raw as number || 0;
                        const total = context.dataset.data.reduce((sum: number, curr: number) => sum + curr, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${label}: ${value} votes (${percentage}%)`;
                    },
                },
            },
            datalabels: {
                color: 'white',
                font: {
                    weight: 'bold',
                    size: 16,
                },
                formatter: (value: number, context: any) => {
                    const total = context.dataset.data.reduce((sum: number, curr: number) => sum + curr, 0);
                    const percentage = ((value / total) * 100).toFixed(2);
                    return `${percentage}%`;
                },
                position: 'center', // Position the labels inside the slices
                anchor: 'center', // Align the labels to the center of each slice
                align: 'center', // Center the labels inside the slice
            },
        },
    };









    return (
        <AdminLayout>
            <div className="min-h-screen flex justify-center items-center md:justify-start md:items-start md:p-4">
                <div className="max-w-md md:max-w-none w-full bg-white rounded-lg p-6 text-center md:text-start md:px-10 md:py-11 ">
                    <h2 className="text-3xl font-semibold text-bgBlue mb-4">Voting Status</h2>

                    <div className="flex justify-center items-center">
                        {/* Status Message */}
                        <p className="text-lg mb-4">
                            {isVotingActive ? (
                                "Voting has started. Click the button to stop voting."
                            ) : votingStopped ? (
                                "Voting has ended. You can view the results now."
                            ) : (
                                "Voting has not started yet. Click the button to start voting."
                            )}
                        </p>
                    </div>

                    {/* Voting Status Toggle */}
                    <div className="flex justify-center items-center">

                        {!votingStopped && (
                            <button
                                onClick={() => {
                                    if (isVotingActive) {
                                        setShowConfirmModal(true); // Show the confirmation modal if voting is active
                                    } else {
                                        setShowStartConfirmModal(true); // Show confirmation modal for starting the vote
                                    }
                                }}
                                className={`${isVotingActive ? "bg-popBlue hover:bg-white hover:text-popBlue hover:border-popBlue border-[2px] transition duration-300" : "bg-popBlue hover:bg-white hover:text-popBlue hover:border-popBlue border-[2px] transition duration-300"
                                    } bg-popBlue text-logoBlue font-bold text-lg md:text-xl py-3 px-24 rounded-md items-center focus:outline-none focus:shadow-outline w-auto mb-4`}
                                disabled={showConfirmModal || showStartConfirmModal} // Disable the button if any modal is open
                            >
                                {isVotingActive ? "Stop Voting" : "Start Voting"}
                            </button>
                        )}
                    </div>


                    {/* Display Results */}
                    {!isVotingActive && votingStopped && (
                        <>
                            <div className="flex justify-center items-center">
                                <button
                                    onClick={handleViewResults}
                                    className="py-3 px-24 bg-popBlue text-logoBlue hover:bg-white hover:text-popBlue hover:border-popBlue border-[2px] transition duration-300 font-bold text-lg md:text-xl rounded-md focus:outline-none focus:shadow-outline w-full md:w-auto mb-4"
                                >
                                    View Results
                                </button>
                            </div>

                            {winner && votesData.length > 0 && (
                                <div className="mt-4 bg-blue-300 p-4">
                                    {/* Section Heading */}
                                    <h3 className="text-lg font-semibold text-center mb-4">Winner Details</h3>

                                    {/* Winner Details and Pie Chart */}
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                        {/* Winner Details */}
                                        <div className="md:w-1/2">
                                            <p>ID: {winner.id}</p>
                                            <p>Name: {winner.firstName} {winner.lastName}</p>
                                            <p>Position: {winner.position}</p>
                                            <p>Votes: {winner.voteCount}</p>
                                        </div>

                                        {/* Pie Chart */}
                                        <div className="md:w-1/2 flex justify-center">
                                            <div className="w-72 h-72"> {/* Adjust the width and height as needed */}
                                                <Pie data={pieChartData} options={pieChartOptions as any} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </>
                    )}

                </div>
            </div>

            {/* Confirmation Modal for stopping voting */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
                        <p className="mb-6">
                            Stopping the voting process will finalize the election and you won’t be able to restart it.
                        </p>
                        <div className="flex justify-between">
                            <button
                                onClick={handleConfirmToggle}
                                className="bg-white text-logoBlue text-sm  rounded-full hover:bg-logoBlue hover:text-white transition duration-300 font-bold py-2 px-4"
                            >
                                Yes, Stop Voting
                            </button>
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="bg-white text-logoBlue text-sm  rounded-full hover:bg-logoBlue hover:text-white transition duration-300 font-bold py-2 px-4"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal for starting voting */}
            {showStartConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
                        <p className="mb-6">
                            Starting the voting process will allow voters to cast their votes.
                        </p>
                        <div className="flex justify-between">
                            <button
                                onClick={handleStartVoting} // Start voting
                                className=" bg-white text-logoBlue text-sm  rounded-full hover:bg-logoBlue hover:text-white transition duration-300 font-bold py-2 px-4"
                            >
                                Yes, Start Voting
                            </button>

                            <button
                                onClick={() => setShowStartConfirmModal(false)} // Cancel modal
                                className=" bg-white text-logoBlue text-sm rounded-full hover:bg-logoBlue hover:text-white transition duration-300 font-bold py-2 px-4"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default VotingStatusPage;
