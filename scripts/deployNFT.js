const quais = require('quais');
const hre = require('hardhat');

// TODO
// This script is unfinished.

async function main() {
	const ethersContract = await hre.ethers.getContractFactory('MyNFT');
	const provider = new quais.providers.JsonRpcProvider(hre.network.config.url);
	const walletWithProvider = new quais.Wallet(hre.network.config.accounts[0], provider);
	await provider.ready;

	const myContract = new quais.ContractFactory(
		ethersContract.interface,
		ethersContract.bytecode,
		walletWithProvider
	);
	const nft = await myContract.deploy({ gasLimit: 1000000 });

	await nft.deployed();
	console.log('Contract deployed to:', nft.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
