/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomicfoundation/hardhat-toolbox");
const deployConfig = require("./rpc.js");

module.exports = {
  defaultNetwork: "local",
  chainConfig: {
    defaultChain: deployConfig.defaultChain,
    addressConfig:
      deployConfig.addressData.addressIndex[deployConfig.defaultChain],
  },
  networks: {
    local: {
      url: deployConfig.urlObject.local[deployConfig.defaultChain],
      accounts: deployConfig.addressData.adresses,
      chainId: 1337,
      websocket: true,
      gas: 2000000,
    },
    // garden: {
    //   url: GARDEN_URL,
    //   accounts: [PRIVATE_KEY],
    //   chainId: 12000,
    //   websocket: true,
    //   gas: 2000000,
    // },
    // colosseum: {
    //   url: COLOSSEUM_URL,
    //   accounts: [PRIVATE_KEY],
    //   chainId: 9000,
    //   websocket: true,
    //   gas: 2000000,
    // },
  },

  // include compiler version defined in your smart contract
  solidity: {
    compilers: [
      {
        version: "0.8.1",
      },
      {
        version: "0.8.17",
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
