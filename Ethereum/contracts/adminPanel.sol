// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {
    
    // Struct to hold candidate details
    struct Candidate {
        string firstName;
        string lastName;
        string position;
        string addressInfo; // Address as string
        uint256 voteCount;
    }

    // Address of the election authority (admin)
    address public electionAuthority;

    // Mapping to store candidates with an incremental ID
    mapping(uint256 => Candidate) public candidates;
    uint256 public candidateCount = 0;

    // Modifier to restrict certain functions to only the admin (electionAuthority)
    modifier onlyAdmin() {
        require(msg.sender == electionAuthority, "Only admin can perform this action");
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
        string addressInfo
    );

    // Function to add a candidate (Only admin can add)
    function addCandidate(
        string memory firstName,
        string memory lastName,
        string memory position,
        string memory addressInfo
    ) public onlyAdmin {
        candidateCount++; // Increment candidate ID
        candidates[candidateCount] = Candidate({
            firstName: firstName,
            lastName: lastName,
            position: position,
            addressInfo: addressInfo,
            voteCount: 0 // Initialize vote count to zero
        });

        // Emit event when a candidate is added
        emit CandidateAdded(
            candidateCount,
            firstName,
            lastName,
            position,
            addressInfo
        );
    }

    // Function to get candidate details by ID
    function getCandidate(uint256 candidateID) public view returns (
        string memory firstName,
        string memory lastName,
        string memory position,
        string memory addressInfo,
        uint256 voteCount
    ) {
        Candidate memory candidate = candidates[candidateID];
        return (
            candidate.firstName,
            candidate.lastName,
            candidate.position,
            candidate.addressInfo,
            candidate.voteCount
        );
    }
}
