/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomicfoundation/hardhat-toolbox')
const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })

const rpcUrl = process.env.RPC_URL
const chainId = Number(process.env.CHAIN_ID)

module.exports = {
  defaultNetwork: 'cyprus1',
  networks: {
    cyprus1: {
      url: rpcUrl,
      accounts: [process.env.CYPRUS1_PK],
      chainId: chainId,
    },
    cyprus2: {
      url: rpcUrl,
      accounts: [process.env.CYPRUS2_PK],
      chainId: chainId,
    },
  },

  solidity: {
    version: '0.8.20',
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
