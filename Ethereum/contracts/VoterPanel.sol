// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AdminPanel.sol"; // Import the AdminPanel contract

contract VoterPanel {
    // Reference to the AdminPanel contract
    AdminPanel public adminPanel;

    // Mapping to track if an address has voted
    mapping(address => bool) public hasVoted;

    // Modifier to ensure only eligible voters can vote
    modifier eligibleToVote() {
        require(!hasVoted[msg.sender], "You have already voted.");
        _;
    }

    // Event to log voting activity
    event VoteCast(address voter, uint256 candidateID);

    // Constructor to initialize with the address of the AdminPanel contract
    constructor(address _adminPanelAddress) {
        adminPanel = AdminPanel(_adminPanelAddress);
    }

    // Function to cast a vote for a candidate
    function castVote(uint256 candidateID) public eligibleToVote {
        // Verify the candidate exists
        require(candidateID > 0 && candidateID <= adminPanel.candidateCount(), "Invalid candidate ID");

        // Mark the voter as having voted
        hasVoted[msg.sender] = true;

        // Increment the candidate's vote count in the AdminPanel contract
        adminPanel.incrementVoteCount(candidateID);

        // Emit the voting event
        emit VoteCast(msg.sender, candidateID);
    }

    // Function to check if a voter has already voted
    function checkIfVoted(address voter) public view returns (bool) {
        return hasVoted[voter];
    }
}
