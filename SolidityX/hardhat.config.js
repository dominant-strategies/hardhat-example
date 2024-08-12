/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomicfoundation/hardhat-toolbox')
require('quai-hardhat-plugin')
const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })

module.exports = {
  defaultNetwork: 'cyprus1',
  networks: {
    cyprus1: {
      url: `${process.env.CYPRUS1URL}`,
      accounts: [process.env.CYPRUS1PK],
      chainId: Number(process.env.CHAINID),
    },
    cyprus2: {
      url: `${process.env.CYPRUS2URL}`,
      accounts: [process.env.CYPRUS2PK],
      chainId: Number(process.env.CHAINID),
    },
    cyprus3: {
      url: `${process.env.CYPRUS3URL}`,
      accounts: [process.env.CYPRUS3PK],
      chainId: Number(process.env.CHAINID),
    },
    paxos1: {
      url: `${process.env.PAXOS1URL}`,
      accounts: [process.env.PAXOS1PK],
      chainId: Number(process.env.CHAINID),
    },
    paxos2: {
      url: `${process.env.PAXOS2URL}`,
      accounts: [process.env.PAXOS2PK],
      chainId: Number(process.env.CHAINID),
    },
    paxos3: {
      url: `${process.env.PAXOS3URL}`,
      accounts: [process.env.PAXOS3PK],
      chainId: Number(process.env.CHAINID),
    },
    hydra1: {
      url: `${process.env.HYDRA1URL}`,
      accounts: [process.env.HYDRA1PK],
      chainId: Number(process.env.CHAINID),
    },
    hydra2: {
      url: `${process.env.HYDRA2URL}`,
      accounts: [process.env.HYDRA2PK],
      chainId: Number(process.env.CHAINID),
    },
    hydra3: {
      url: `${process.env.HYDRA3URL}`,
      accounts: [process.env.HYDRA3PK],
      chainId: Number(process.env.CHAINID),
    },
  },

  solidity: {
    version: '0.8.0',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },

  // etherscan: {
  //   apiKey: {
  //     cyprus1: 'abc',
  //   },
  //   customChains: [
  //     {
  //       network: 'cyprus1',
  //       chainId: Number(process.env.CHAINID),
  //       urls: {
  //         apiURL: 'https://quaiscan.io/api/v2',
  //         browserURL: 'https://quaiscan.io/',
  //       },
  //     },
  //   ],
  // },

  paths: {
    sources: './contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 20000,
  },
}
