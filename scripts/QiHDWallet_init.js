const hre = require('hardhat')
const quais = require('quais6')

async function main() {
	// Configure quai network provider based on hardhat network config
	const quaisProvider = new quais.JsonRpcProvider(hre.network.config.url)

	const mnemonicPhrase = "empower cook violin million wool twelve involve nice donate author mammal salt royal shiver birth olympic embody hello beef suit isolate mixed text spot";
	const mnemonic = quais.Mnemonic.fromPhrase(mnemonicPhrase);
	const derivationPath = "m/44'/969'/0'/0";
	const qiWallet = quais.QiHDWallet.fromMnemonic(mnemonic, derivationPath);

	// connect wallet to provider
	const connectedQiWallet = qiWallet.connect(quaisProvider);

	console.log('\nInitializing wallet...');
	await connectedQiWallet.init('cyprus1');
	
	const shardWallets = connectedQiWallet.shardWalletsMap;

	let addrData = shardWallets.get('cyprus1').addressesInfo;

	console.log('\nQi addresses: ');
	for (let i = 0; i < addrData.length; i++) {
		console.log(`Address[${i}]: ${addrData[i].address}`);
	}

	let outpoints = shardWallets.get('cyprus1').outpoints;

	// get the outpoint for the first address
	let [[firstAddress, firstAddressOutpoints]] = Array.from(outpoints);

	console.log('First Address:', firstAddress);
	console.log('Total Outpoints for First Address:', firstAddressOutpoints.length);

	const denominations = [0.001, 0.005, 0.01, 0.05, 0.1, 0.25, 0.5, 1, 5, 10, 20, 50, 100, 1000, 10000, 100000, 1000000];
	const totalValue = firstAddressOutpoints.reduce((acc, {TxHash, Index, Denomination}) => {
		const value = BigInt(denominations[Denomination]);
		return acc + value;
	    }, BigInt(0));
	    
	console.log(`Balance: ${totalValue.toString()} Qi`);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
