"use client"

import { useState } from "react"
import { ethers } from "ethers"
import { Wallet, CheckCircle, AlertCircle } from "lucide-react"

export default function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        setIsConnecting(true)
        setError(null)
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", [])
        setAccount(accounts[0])
      } catch (error) {
        console.error("Error connecting to MetaMask:", error)
        setError("Failed to connect wallet. Please try again.")
      } finally {
        setIsConnecting(false)
      }
    } else {
      setError("MetaMask is not installed. Please install MetaMask to continue.")
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setError(null)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-logoBlue to-navBlue rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Wallet className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-bgBlue mb-2">Wallet Connection</h3>
        <p className="text-gray-600 mb-6">Connect your MetaMask wallet to participate in voting</p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {account ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <div className="text-left">
                <p className="text-green-700 font-medium text-sm">Wallet Connected</p>
                <p className="text-green-600 text-sm font-mono">{formatAddress(account)}</p>
              </div>
            </div>
            <button
              onClick={disconnectWallet}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full bg-logoBlue text-white py-3 px-4 rounded-lg hover:bg-navBlue focus:ring-2 focus:ring-logoBlue focus:ring-offset-2 transition-all font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Wallet className="h-5 w-5" />
                <span>Connect Wallet</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
