/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomicfoundation/hardhat-toolbox')
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

const chainId = Number(process.env.CHAINID)

module.exports = {
	defaultNetwork: 'cyprus1',
	networks: {
		cyprus1: {
			url: process.env.CYPRUS1URL.toString(),
			accounts: [process.env.CYPRUS1PK],
			chainId: chainId,
		},
		cyprus2: {
			url: `${process.env.CYPRUS2URL}`,
			accounts: [process.env.CYPRUS2PK],
			chainId: chainId,
		},
		cyprus3: {
			url: `${process.env.CYPRUS3URL}`,
			accounts: [process.env.CYPRUS3PK],
			chainId: chainId,
		},
		paxos1: {
			url: `${process.env.PAXOS1URL}`,
			accounts: [process.env.PAXOS1PK],
			chainId: chainId,
		},
		paxos2: {
			url: `${process.env.PAXOS2URL}`,
			accounts: [process.env.PAXOS2PK],
			chainId: chainId,
		},
		paxos3: {
			url: `${process.env.PAXOS3URL}`,
			accounts: [process.env.PAXOS3PK],
			chainId: chainId,
		},
		hydra1: {
			url: `${process.env.HYDRA1URL}`,
			accounts: [process.env.HYDRA1PK],
			chainId: chainId,
		},
		hydra2: {
			url: `${process.env.HYDRA2URL}`,
			accounts: [process.env.HYDRA2PK],
			chainId: chainId,
		},
		hydra3: {
			url: `${process.env.HYDRA3URL}`,
			accounts: [process.env.HYDRA3PK],
			chainId: chainId,
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
}
