/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');
require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const { LOCAL_URL, GARDEN_URL, COLOSSEUM_URL, PRIVATE_KEY } = process.env;

module.exports = {
  defaultNetwork: "local",
  networks: {
    // ropsten is a locally ran testnet of all 13 of the quai network blockchains.
    ropsten: {
      url: ROPSTEN_URL,
      accounts: [PRIVATE_KEY],
      chainId: 1337, // Ropsten chainId
    local: {
      url: LOCAL_URL,
      accounts: [PRIVATE_KEY],
      chainId: 9000,
      websocket: true,
      gas: 2000000,
    },
    garden: {
      url: GARDEN_URL,
      accounts: [PRIVATE_KEY],
      chainId: 12000,
      websocket: true,
      gas: 2000000,
    },
    colosseum: {
      url: COLOSSEUM_URL,
      accounts: [PRIVATE_KEY],
      chainId: 9000,
      websocket: true,
      gas: 2000000,
    },
  },

  // include compiler version defined in your smart contract
  solidity: {
    compilers: [
      {
        version: "0.8.1",
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
