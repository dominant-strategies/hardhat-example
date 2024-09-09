/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomicfoundation/hardhat-toolbox')
require('quai-hardhat-plugin')
const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })

const rpcUrl = process.env.RPCURL
const chainId = Number(process.env.CHAINID)

module.exports = {
  defaultNetwork: 'cyprus1',
  networks: {
    cyprus1: {
      url: rpcUrl,
      accounts: [process.env.CYPRUS1PK],
      chainId: chainId,
    },
    cyprus2: {
      url: rpcUrl,
      accounts: [process.env.CYPRUS2PK],
      chainId: chainId,
    },
    cyprus3: {
      url: rpcUrl,
      accounts: [process.env.CYPRUS3PK],
      chainId: chainId,
    },
    paxos1: {
      url: rpcUrl,
      accounts: [process.env.PAXOS1PK],
      chainId: chainId,
    },
    paxos2: {
      url: rpcUrl,
      accounts: [process.env.PAXOS2PK],
      chainId: chainId,
    },
    paxos3: {
      url: rpcUrl,
      accounts: [process.env.PAXOS3PK],
      chainId: chainId,
    },
    hydra1: {
      url: rpcUrl,
      accounts: [process.env.HYDRA1PK],
      chainId: chainId,
    },
    hydra2: {
      url: rpcUrl,
      accounts: [process.env.HYDRA2PK],
      chainId: chainId,
    },
    hydra3: {
      url: rpcUrl,
      accounts: [process.env.HYDRA3PK],
      chainId: chainId,
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
  //       chainId: chainId,
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
