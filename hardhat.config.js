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
			url: 'http://localhost:8610',
			accounts: [process.env.CYPRUS1PK],
			chainId: 1337,
		},
		cyprus2: {
			url: 'http://localhost:8542',
			accounts: [process.env.CYPRUS2PK],
			chainId: 1337,
		},
		cyprus3: {
			url: 'http://localhost:8674',
			accounts: [process.env.CYPRUS3PK],
			chainId: 1337,
		},
		paxos1: {
			url: 'http://localhost:8512',
			accounts: [process.env.PAXOS1PK],
			chainId: 1337,
		},
		paxos2: {
			url: 'http://localhost:8544',
			accounts: [process.env.PAXOS2PK],
			chainId: 1337,
		},
		paxos3: {
			url: 'http://localhost:8576',
			accounts: [process.env.PAXOS3PK],
			chainId: 1337,
		},
		hydra1: {
			url: 'http://localhost:8614',
			accounts: [process.env.HYDRA1PK],
			chainId: 1337,
		},
		hydra2: {
			url: 'http://localhost:8646',
			accounts: [process.env.HYDRA2PK],
			chainId: 1337,
		},
		hydra3: {
			url: 'http://localhost:8678',
			accounts: [process.env.HYDRA3PK],
			chainId: 1337,
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
