import { ethers } from 'ethers';



const contractAddress = "0xea430983a38b971D15FC0D58b70f465C31B34AbE";
const contractABI = [
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
    "type": "function"
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
    "type": "function"
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
    "type": "function"
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
    "type": "function"
  }
];
 const getContractInstance = async () => {
  // Check if MetaMask (or another Ethereum wallet) is installed
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  // Set up provider and signer
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Create and return the contract instance
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  return contract;
};
 export default getContractInstance
