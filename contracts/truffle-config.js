require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonic = process.env.MNEMONIC;
const infuraProjectId = process.env.INFURA_PROJECT_ID;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    sepolia: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://sepolia.infura.io/v3/${infuraProjectId}`
        ),
      network_id: 11155111, // Sepolia Testnet ID
      gas: 5000000, // Adjust gas limit to 5,000,000
      gasPrice: 20000000000, // 20 Gwei
      confirmations: 2, // Wait for 2 confirmations
      timeoutBlocks: 200, // Wait up to 200 blocks
      skipDryRun: true, // Skip dry run before migrations
      deploymentPollingInterval: 15000, // Set polling interval to 15 seconds
    },
  },
  compilers: {
    solc: {
      version: "0.8.20", // Fetch exact version from solc-bin
      settings: {
        optimizer: {
          enabled: true, // Enable Solidity optimizer
          runs: 200, // Optimize for how many times you intend to run the code
        },
      },
    },
  },
};
