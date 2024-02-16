/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomicfoundation/hardhat-toolbox");
require("quai-hardhat-plugin");
require("@nomicfoundation/hardhat-verify");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

module.exports = {
  defaultNetwork: "cyprus1",
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
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },

  etherscan: {
    apiKey: {
      cyprus1: "abc",
      cyprus2: "abc",
      cyprus3: "abc",
      paxos1: "abc",
      paxos2: "abc",
      paxos3: "abc",
      hydra1: "abc",
      hydra2: "abc",
      hydra3: "abc",
    },
    customChains: [
      {
        network: "cyprus1",
        chainId: Number(process.env.CHAINID),
        urls: {
          apiURL: "https://cyprus1.colosseum.quaiscan.io/api",
          browserURL: "https://cyprus1.colosseum.quaiscan.io",
        },
      },
      {
        network: "cyprus2",
        chainId: Number(process.env.CHAINID),
        urls: {
          apiURL: "https://cyprus2.colosseum.quaiscan.io/api",
          browserURL: "https://cyprus2.colosseum.quaiscan.io",
        },
      },
      {
        network: "cyprus3",
        chainId: Number(process.env.CHAINID),
        urls: {
          apiURL: "https://cyprus3.colosseum.quaiscan.io/api",
          browserURL: "https://cyprus3.colosseum.quaiscan.io",
        },
      },
      {
        network: "paxos1",
        chainId: Number(process.env.CHAINID),
        urls: {
          apiURL: "https://paxos1.colosseum.quaiscan.io/api",
          browserURL: "https://paxos1.colosseum.quaiscan.io",
        },
      },
      {
        network: "paxos2",
        chainId: Number(process.env.CHAINID),
        urls: {
          apiURL: "https://paxos2.colosseum.quaiscan.io/api",
          browserURL: "https://paxos2.colosseum.quaiscan.io",
        },
      },
      {
        network: "paxos3",
        chainId: Number(process.env.CHAINID),
        urls: {
          apiURL: "https://paxos3.colosseum.quaiscan.io/api",
          browserURL: "https://paxos3.colosseum.quaiscan.io",
        },
      },
      {
        network: "hydra1",
        chainId: Number(process.env.CHAINID),
        urls: {
          apiURL: "https://hydra1.colosseum.quaiscan.io/api",
          browserURL: "https://hydra1.colosseum.quaiscan.io",
        },
      },
      {
        network: "hydra2",
        chainId: Number(process.env.CHAINID),
        urls: {
          apiURL: "https://hydra2.colosseum.quaiscan.io/api",
          browserURL: "https://hydra2.colosseum.quaiscan.io",
        },
      },
      {
        network: "hydra3",
        chainId: Number(process.env.CHAINID),
        urls: {
          apiURL: "https://hydra3.colosseum.quaiscan.io/api",
          browserURL: "https://hydra3.colosseum.quaiscan.io",
        },
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
