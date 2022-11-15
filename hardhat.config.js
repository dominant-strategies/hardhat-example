/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
const dotenv = require("dotenv");
dotenv.config({ path: "process.env" });
const { RPC_URL, PRIVATE_KEY, ROPSTEN_URL } = process.env; // import private key and RPC URLs from a process.env file

module.exports = {
  defaultNetwork: "ropsten",
  networks: {
    // ropsten is a locally ran testnet of all 13 of the quai network blockchains.
    ropsten: {
      url: ROPSTEN_URL,
      accounts: [PRIVATE_KEY],
      chainId: 1337, // Ropsten chainId
      websocket: true,
      gas: 2000000, // gas limit used for deploys. This is an arbitrary value, accurate gas estimates must be obtained for deployments.
    },
  },

  // include compiler version defined in your smart contract
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
    ],
  },

  paths: {
    sources: "./contracts",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};
