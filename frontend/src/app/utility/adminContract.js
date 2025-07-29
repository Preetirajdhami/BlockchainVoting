import { ethers } from 'ethers';

const adminContractAddress = "0xC3D8F9101AE21728962D9FE91f46c337E171a1EB"; 
const adminContractABI =  [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "candidateID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "firstName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "lastName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "position",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "addressInfo",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "profileImageHash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "logoImageHash",
          "type": "string"
        }
      ],
      "name": "CandidateAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "CandidatesReset",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "candidateCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidateIDs",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "string",
          "name": "firstName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "lastName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "position",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "addressInfo",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "profileImageHash",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "logoImageHash",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "electionAuthority",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "firstName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "lastName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "position",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "addressInfo",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "profileImageHash",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "logoImageHash",
          "type": "string"
        }
      ],
      "name": "addCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "candidateID",
          "type": "uint256"
        }
      ],
      "name": "incrementVoteCount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "resetCandidates",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "candidateID",
          "type": "uint256"
        }
      ],
      "name": "getCandidate",
      "outputs": [
        {
          "internalType": "string",
          "name": "firstName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "lastName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "position",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "addressInfo",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "profileImageHash",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "logoImageHash",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getAllCandidates",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "firstName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "lastName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "position",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "addressInfo",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "profileImageHash",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "logoImageHash",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct AdminPanel.Candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getWinners",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "firstName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "lastName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "position",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "addressInfo",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "profileImageHash",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "logoImageHash",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct AdminPanel.Candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];
let provider, signer;
const getAdminContractInstance = async () => {
  // Check if MetaMask (or another Ethereum wallet) is installed
  if (!window.ethereum) {
    throw new Error("MetaMask not installed. Please install MetaMask to use this application.");
  }

  // Initialize provider if not already done
  if (!provider) {
    provider = new ethers.BrowserProvider(window.ethereum);
  }

  // Check if the wallet is already connected
  const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  if (accounts.length === 0) {
    throw new Error("Please connect your MetaMask wallet.");
  }

  // Set up signer if not already done
  if (!signer) {
    try {
        signer = await provider.getSigner();
    } catch (error) {
      console.error("Error getting signer:", error);
      throw new Error("Could not get signer. Please check your MetaMask settings.");
    }
  }

  // Create and return the contract instance
  const adminContract = new ethers.Contract(adminContractAddress, adminContractABI, signer);
  return adminContract;
};

export default getAdminContractInstance;
