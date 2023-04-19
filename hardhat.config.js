/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
require('@nomicfoundation/hardhat-toolbox');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

module.exports = {
	defaultNetwork: 'cyprus1',
	networks: {
		cyprus1: {
			url: process.env.CYPRUS1URL,
			accounts: [process.env.CYPRUS1PK],
			chainId: process.env.CHAINID,
		},
		cyprus2: {
			url: process.env.CYPRUS2URL,
			accounts: [process.env.CYPRUS2PK],
			chainId: process.env.CHAINID,
		},
		cyprus3: {
			url: process.env.CYPRUS3URL,
			accounts: [process.env.CYPRUS3PK],
			chainId: process.env.CHAINID,
		},
		paxos1: {
			url: process.env.PAXOS1URL,
			accounts: [process.env.PAXOS1PK],
			chainId: process.env.CHAINID,
		},
		paxos2: {
			url: process.env.PAXOS2URL,
			accounts: [process.env.PAXOS2PK],
			chainId: process.env.CHAINID,
		},
		paxos3: {
			url: process.env.PAXOS3URL,
			accounts: [process.env.PAXOS3PK],
			chainId: process.env.CHAINID,
		},
		hydra1: {
			url: process.env.HYDRA1URL,
			accounts: [process.env.HYDRA1PK],
			chainId: process.env.CHAINID,
		},
		hydra2: {
			url: process.env.HYDRA2URL,
			accounts: [process.env.HYDRA2PK],
			chainId: process.env.CHAINID,
		},
		hydra3: {
			url: process.env.HYDRA3URL,
			accounts: [process.env.HYDRA3PK],
			chainId: process.env.CHAINID,
		},
	},

	// include compiler version defined in your smart contract
	solidity: {
		compilers: [
			{
				version: '0.8.1',
			},
			{
				version: '0.8.17',
			},
		],
	},

	paths: {
		sources: './contracts',
		cache: './cache',
		artifacts: './artifacts',
	},
	mocha: {
		timeout: 20000,
	},
};
