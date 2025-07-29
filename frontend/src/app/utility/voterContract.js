import { ethers } from 'ethers';

const voterContractAddress = "0x7cdCF12a5fFdCCEDfF1A27eb3FA2D514f38a22C8"; 
const voterContractABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_adminPanelAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "candidateID",
          "type": "uint256"
        }
      ],
      "name": "VoteCast",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "adminPanel",
      "outputs": [
        {
          "internalType": "contract AdminPanel",
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
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "hasVoted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
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
          "name": "candidateID",
          "type": "uint256"
        }
      ],
      "name": "castVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "voter",
          "type": "address"
        }
      ],
      "name": "checkIfVoted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];
let provider, signer;
const getVoterContractInstance = async () => {
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
      signer = await provider.getSigner();  // Correct method
    } catch (error) {
      console.error("Error getting signer:", error);
      throw new Error("Could not get signer. Please check your MetaMask settings.");
    }
  }

  // Create and return the contract instance
  const voterContract = new ethers.Contract(voterContractAddress, voterContractABI, signer);
  return voterContract;
};

export default getVoterContractInstance;
