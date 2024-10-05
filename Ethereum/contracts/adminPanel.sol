// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AdminPanel {
    // Struct to hold candidate details
    struct Candidate {
        string firstName;
        string lastName;
        string position;
        string addressInfo; // Address as string
        string profileImageHash; // IPFS hash for profile image
        string logoImageHash;    // IPFS hash for logo
        uint256 voteCount;
    }

    // Address of the election authority (admin) state variable
    address public electionAuthority;

    // Mapping to store candidates with an incremental ID
    mapping(uint256 => Candidate) public candidates;
    uint256 public candidateCount = 0;

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
        electionAuthority = msg.sender; // Deployer of the contract is the electionAuthority
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

    // Function to add a candidate (Only admin can add)
    function addCandidate(
        string memory firstName,
        string memory lastName,
        string memory position,
        string memory addressInfo,
        string memory profileImageHash, // New parameter for profile image
        string memory logoImageHash      // New parameter for logo image
    ) public onlyAdmin {
        candidateCount++; // Increment candidate ID
        candidates[candidateCount] = Candidate({
            firstName: firstName,
            lastName: lastName,
            position: position,
            addressInfo: addressInfo,
            profileImageHash: profileImageHash, // Store profile image hash
            logoImageHash: logoImageHash,       // Store logo image hash
            voteCount: 0 // Initialize vote count to zero
        });

        // Emit event when a candidate is added
        emit CandidateAdded(
            candidateCount,
            firstName,
            lastName,
            position,
            addressInfo,
            profileImageHash, // Include profile image hash in event
            logoImageHash     // Include logo image hash in event
        );
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
            string memory profileImageHash, // New return value for profile image hash
            string memory logoImageHash,     // New return value for logo image hash
            uint256 voteCount
        )
    {
        Candidate memory candidate = candidates[candidateID];
        return (
            candidate.firstName,
            candidate.lastName,
            candidate.position,
            candidate.addressInfo,
            candidate.profileImageHash, // Return profile image hash
            candidate.logoImageHash,     // Return logo image hash
            candidate.voteCount
        );
    }
}
