import { ethers } from 'ethers';

// Connect MetaMask
async function walletConnect() {
  if (window.ethereum) {
    try {
      // Create a new provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Request accounts
      await provider.send("eth_requestAccounts", []); // Provide an empty array as the second argument
      
      // Get the signer
      const signer = await provider.getSigner(); // Await the getSigner() method
      
      console.log("Wallet connected:", await signer.getAddress()); // Now this line works
      return signer;
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  } else {
    console.log("Install MetaMask");
  }
}
 export default walletConnect