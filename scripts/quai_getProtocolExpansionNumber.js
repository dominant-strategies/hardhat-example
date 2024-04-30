const hre = require('hardhat')
const quais = require('quais6')

// Define initial greeting to be used by contract constructor
constructorArgs = {
	greeting: 'Hello, Quai!',
}

async function main() {
	// Configure quai network provider based on hardhat network config
	const quaisProvider = new quais.JsonRpcProvider(hre.network.config.url)

	// Ensure provider is ready
	await quaisProvider.ready

	// call `quai_getProtocolExpansionNumber` method
	const expansionNumber = await quaisProvider.getProtocolExpansionNumber()

	// Log the expansion number
	console.log('Protocol expansion number: ', expansionNumber)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
