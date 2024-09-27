// import { ethers } from 'ethers';

// const connectMetaMask = async () => {
//   try {
//     // Request account access
//     await window.ethereum.request({ method: 'eth_requestAccounts' });
//     console.log("MetaMask connected");
    
//     // Set up provider and signer
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
    
//     return { provider, signer };
//   } catch (error) {
//     console.error("Error connecting MetaMask:", error);
//   }
// };

// export default connectMetaMask;
