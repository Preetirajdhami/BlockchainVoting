import { useState } from 'react'
import { ethers } from 'ethers'

const WalletConnect = () => {
  const [account, setAccount] = useState<string | null>(null)

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", [])
        setAccount(accounts[0])
      } catch (error) {
        console.error("Error connecting to MetaMask:", error)
      }
    } else {
      alert("MetaMask is not installed")
    }
  }

  return (
    <div className="text-center">
      <button
        onClick={connectWallet}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Connect Wallet
      </button>
      {account && <p>Connected: {account}</p>}
    </div>
  )
}

export default WalletConnect
