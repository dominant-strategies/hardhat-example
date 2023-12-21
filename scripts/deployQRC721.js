const hre = require('hardhat')
const quais = require('quais')
const { pollFor } = require('quais-polling')
const QRC721Json = require('../artifacts/contracts/QRC721.sol/QRC721.json')

constructorArgs = {
	name: 'Test NFT',
	symbol: 'TNFT',
}

async function main() {
	// Configure quai network provider based on hardhat network config
	const quaisProvider = new quais.providers.JsonRpcProvider(hre.network.config.url)

	// Configure quai wallet based on hardhat network config
	const walletWithProvider = new quais.Wallet(hre.network.config.accounts[0], quaisProvider)

	// Ensure provider is ready
	await quaisProvider.ready

	// Build contract factory using quai provider and wallet
	const QuaisContract = new quais.ContractFactory(QRC721Json.abi, QRC721Json.bytecode, walletWithProvider)

	// Deploy greeter contract with initial greeting
	const quaisContract = await QuaisContract.deploy(constructorArgs.name, constructorArgs.symbol, { gasLimit: 5000000 })

	// Use quais-polling shim to wait for contract to be deployed
	const deployReceipt = await pollFor(
		quaisProvider, // provider passed to poller
		'getTransactionReceipt', // method to call on provider
		[quaisContract.deployTransaction.hash], // params to pass to method
		1.5, // initial polling interval in seconds
		1 // request timeout in seconds
	)
	console.log('Contract deployed. Transaction receipt: ', deployReceipt)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
