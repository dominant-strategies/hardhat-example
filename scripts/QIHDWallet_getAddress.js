const hre = require('hardhat')
const quais = require('quais6')
const { MNEMONICPHRASE, QI_DERIVATIONPATH} = require('./constants.js');

async function main() {
	// Configure quai network provider based on hardhat network config
	const quaisProvider = new quais.JsonRpcProvider(hre.network.config.url)

	const mnemonic = quais.Mnemonic.fromPhrase(MNEMONICPHRASE);
	const qiWallet = quais.QiHDWallet.fromMnemonic(mnemonic, QI_DERIVATIONPATH);

	// connect wallet to provider
	const qiConnectedWallet = qiWallet.connect(quaisProvider);

	console.log('\nInitializing wallet...');
	await qiConnectedWallet.init('cyprus1');
	
	const shardWallets = qiConnectedWallet.shardWalletsMap;

	let addrData = shardWallets.get('cyprus1').addressesInfo;

	console.log('\nQi addresses: ');
	for (let i = 0; i < addrData.length; i++) {
		console.log(`Address[${i}]: ${addrData[i].address}`);
	}

	const nakedAddress = await qiConnectedWallet.getAddress('cyprus1');
	console.log('first naked Address:', nakedAddress);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
