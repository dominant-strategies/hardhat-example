const quais = require('quais')
const hre = require('hardhat')

async function main() {
	// Define contract using hardhat runtime (for ABI and bytecode)
	const ethersContract = await hre.ethers.getContractFactory('Greeter')

	// Configure quai network provider based on hardhat network config
	const quaisProvider = new quais.providers.JsonRpcProvider(hre.network.config.url)

	// Configure quai wallet based on hardhat network config
	const walletWithProvider = new quais.Wallet(hre.network.config.accounts[0], quaisProvider)

	// Ensure provider is ready
	await quaisProvider.ready

	// Build contract factory using quai provider and wallet
	const QuaisContract = new quais.ContractFactory(
		ethersContract.interface.fragments,
		ethersContract.bytecode,
		walletWithProvider
	)

	// Deploy greeter contract with initial greeting
	const quaisContract = await QuaisContract.deploy('Hello, Quai!')

	await quaisContract.deployed()
	console.log('Deployed at:', quaisContract.address)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
