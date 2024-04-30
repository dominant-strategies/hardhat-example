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

	const address = "0x00Ab6272B231776f5e753086Be2068499729981f";
	const outpoints = await quaisProvider.getOutpointsByAddress(address);

	console.log('Outpoints: ', outpoints)

}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
