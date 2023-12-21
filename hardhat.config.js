/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomicfoundation/hardhat-toolbox')
require('quai-hardhat-plugin')
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

const chainId = Number(process.env.CHAINID)

module.exports = {
	defaultNetwork: 'cyprus1',
	networks: {
		cyprus1: {
			url: `${process.env.CYPRUS1URL}`,
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

	// optional solidityx config for locally built solcx, if not specified solcx will be downloaded

	// common macOS path to local solc (uncomment and edit path if using macOS)
	// solidityx: { compilerPath: '/usr/local/bin/solc' },
	// common Linux path to local solc (uncomment and edit path if using Linux)
	// solidityx: { compilerPath: '/path/to/SolidityX/build/solc/solc' },

	solidity: {
		version: '0.8.0',
		settings: {
			optimizer: {
				enabled: true,
				runs: 1000,
			},
		},
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
