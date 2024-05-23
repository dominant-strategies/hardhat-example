const hre = require('hardhat')
const quais = require('quais6')
const { MNEMONICPHRASE, QI_DERIVATIONPATH} = require('./constants.js');

async function main() {
	const mnemonic = quais.Mnemonic.fromPhrase(MNEMONICPHRASE);
	const quaiWallet = quais.QuaiHDWallet.fromMnemonic(mnemonic, QI_DERIVATIONPATH);
	
	console.log("\nCalling quaiWallet.getAddress('cyprus1')...");
	let address = await quaiWallet.getAddress('cyprus1');
	console.log('getAddress(cyprus1) #1:', address);
	address = await quaiWallet.getAddress('cyprus1');
	console.log('getAddress(cyprus1) #2:', address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
