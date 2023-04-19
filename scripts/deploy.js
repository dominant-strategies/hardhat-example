const quais = require('quais');
const hre = require('hardhat');

async function main() {
	const ethersContract = await hre.ethers.getContractFactory('Greeter');
	const quaisProvider = new quais.providers.JsonRpcProvider(hre.network.config.url);

	const walletWithProvider = new quais.Wallet(hre.network.config.accounts[0], quaisProvider);
	await quaisProvider.ready;

	const QuaisContract = new quais.ContractFactory(
		ethersContract.interface,
		ethersContract.bytecode,
		walletWithProvider
	);

	const quaisContract = await QuaisContract.deploy('Hello, Quai', { gasLimit: 1000000 });

	await quaisContract.deployed();
	console.log('Deployed at:', quaisContract.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
