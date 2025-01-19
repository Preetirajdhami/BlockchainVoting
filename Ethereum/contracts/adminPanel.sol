// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AdminPanel {
    // Struct to hold candidate details
    struct Candidate {
        string firstName;
        string lastName;
        string position;
        string addressInfo;
        string profileImageHash;
        string logoImageHash;
        uint256 voteCount;
    }

    // Address of the election authority (admin) state variable
    address public electionAuthority;

    // Mapping to store candidates with an incremental ID
    mapping(uint256 => Candidate) public candidates;
    uint256 public candidateCount = 0;

    // Array to keep track of candidate IDs
    uint256[] public candidateIDs;

    // Modifier to restrict certain functions to only the admin (electionAuthority)
    modifier onlyAdmin() {
        require(
            msg.sender == electionAuthority,
            "Only admin can perform this action"
        );
        _;
    }

    // Constructor to initialize the contract with the admin's address
    constructor() {
        electionAuthority = msg.sender;
    }

    // Event to log candidate addition
    event CandidateAdded(
        uint256 candidateID,
        string firstName,
        string lastName,
        string position,
        string addressInfo,
        string profileImageHash,
        string logoImageHash
    );

    // Event to log reset action
    event CandidatesReset();

    // Function to add a candidate (Only admin can add)
    function addCandidate(
        string memory firstName,
        string memory lastName,
        string memory position,
        string memory addressInfo,
        string memory profileImageHash,
        string memory logoImageHash
    ) public onlyAdmin {
        candidateCount++;
        candidates[candidateCount] = Candidate({
            firstName: firstName,
            lastName: lastName,
            position: position,
            addressInfo: addressInfo,
            profileImageHash: profileImageHash,
            logoImageHash: logoImageHash,
            voteCount: 0
        });

        // Add the new candidate ID to the array
        candidateIDs.push(candidateCount);

        // Emit event when a candidate is added
        emit CandidateAdded(
            candidateCount,
            firstName,
            lastName,
            position,
            addressInfo,
            profileImageHash,
            logoImageHash
        );
    }

    // Function to increment the vote count for a candidate
    function incrementVoteCount(uint256 candidateID) external {
        require(candidateID > 0 && candidateID <= candidateCount, "Invalid candidate ID");
        candidates[candidateID].voteCount += 1; // Increment the vote count
    }

    // Function to reset all candidates
    function resetCandidates() public onlyAdmin {
        // Reset all candidate data
        for (uint256 i = 1; i <= candidateCount; i++) {
            delete candidates[i];
        }

        // Reset candidate count and clear candidate IDs
        candidateCount = 0;
        delete candidateIDs;

        // Emit event for reset action
        emit CandidatesReset();
    }

    // Function to get candidate details by ID
    function getCandidate(
        uint256 candidateID
    )
        public
        view
        returns (
            string memory firstName,
            string memory lastName,
            string memory position,
            string memory addressInfo,
            string memory profileImageHash,
            string memory logoImageHash,
            uint256 voteCount
        )
    {
        Candidate memory candidate = candidates[candidateID];
        return (
            candidate.firstName,
            candidate.lastName,
            candidate.position,
            candidate.addressInfo,
            candidate.profileImageHash,
            candidate.logoImageHash,
            candidate.voteCount
        );
    }

    // Function to get all candidates' details
    function getAllCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidateCount);
        for (uint256 i = 0; i < candidateCount; i++) {
            allCandidates[i] = candidates[candidateIDs[i]];
        }
        return allCandidates;
    }

    // Function to get all winners in case of a tie
    function getWinners() public view returns (Candidate[] memory) {
        require(candidateCount > 0, "No candidates available.");

        uint256 maxVotes = 0;

        // Find the highest vote count
        for (uint256 i = 1; i <= candidateCount; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
            }
        }

        // Count candidates with the highest vote count
        uint256 tieCount = 0;
        for (uint256 i = 1; i <= candidateCount; i++) {
            if (candidates[i].voteCount == maxVotes) {
                tieCount++;
            }
        }

        // Create an array to store tied candidates
        Candidate[] memory winners = new Candidate[](tieCount);
        uint256 index = 0;
        for (uint256 i = 1; i <= candidateCount; i++) {
            if (candidates[i].voteCount == maxVotes) {
                winners[index] = candidates[i];
                index++;
            }
        }

        return winners;
    }
}
