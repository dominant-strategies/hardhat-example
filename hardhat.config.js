/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

const dotenv = require("dotenv");
dotenv.config({path:'process.env'});
const { RPC_URL, PRIVATE_KEY } = process.env;    // get the private key from your process.env file

module.exports = {
  defaultNetwork: "ropsten",    
  networks: {

    quaitestnet: {      // quaitestnet is the default quai network during the entire development phase.
      url: RPC_URL,
      accounts: [PRIVATE_KEY], 
      chainId: 9101,    // chainId of the Cyprus1
      websocket: true,
      gas: 2001306      // gas limit used for deploys. This is an arbitrary value, accurate gas estimates must be obtained for deployments.  
    },

    ropsten: {          // ropsten is a locally ran testnet of all 13 of the quai network blockchains.
      url: "http://127.0.0.1:8610/",
      accounts: [PRIVATE_KEY],  
      chainId: 12101,   // chainId of the ropsten Cyprus1
      websocket: true,
      gas: 2001306      // gas limit used for deploys. This is an arbitrary value, accurate gas estimates must be obtained for deployments. 
    }
  },

  solidity: {
    compilers: [
      {
        version: "0.5.16"
      },
      {
        version: "0.6.2"
      },
      {
        version: "0.6.4"
      },
      {
        version: "0.7.0"
      },
      {
        version: "0.8.0"
      }
    ]
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