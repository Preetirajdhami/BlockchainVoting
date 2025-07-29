require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

// Make sure to include ALCHEMY_API_URL
const { PRIVATE_KEY, ALCHEMY_API_URL } = process.env;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },

    sepolia: {
      provider: () => new HDWalletProvider(
        PRIVATE_KEY,
        ALCHEMY_API_URL
      ),
      network_id: 11155111, // Sepolia testnet
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },

  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};
