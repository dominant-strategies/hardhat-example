const quais = require('quais6')
const { keccak_256 } = require('@noble/hashes/sha3');
const { mnemonicPhrase, derivationPath, privKey1, privKey2, mockTxHash1, mockTxHash2} = require('./constants.js');

const { createTransaction,
	getCompressedPublicKey,
	getUncompressedPublicKey,
	getAddressFromPublicKey,
	hexToUint8Array,
	getSignatureSerialized,
	hexlify,
	verifyMusigSignature,
} = require('./tools.js');


async function main() {
	
	// Create the UTXO wallet
	const mnemonic = quais.Mnemonic.fromPhrase(mnemonicPhrase);
	const utxoWallet = quais.UTXOHDWallet.fromMnemonic(mnemonic, derivationPath);

	// Get the compressed public key, uncompressed public key and address for the two private keys
	const pubkey1 = getCompressedPublicKey(privKey1);
	const pubkey1uncompressed = getUncompressedPublicKey(privKey1);
	const addr1 = getAddressFromPublicKey(pubkey1uncompressed);

	const pubkey2 = getCompressedPublicKey(privKey2);
	const pubkey2uncompressed = getUncompressedPublicKey(privKey2);
	const addr2 = getAddressFromPublicKey(pubkey2uncompressed);

	// Define the UTXO addresses for the wallet
	const utxoAddresses = [
		{
			address: addr1,
			privKey: privKey1,
		},
		{
			address: addr2,
			privKey: privKey2,
		},
	];

	// Define the outpoints for the UTXO addresses
	const addressOutPoints = {
		addr1: [
			{
				Txhash: mockTxHash1,
				Index: 0,
				Denomination: 7,
			},
			{
				Txhash: mockTxHash2,
				Index: 0,
				Denomination: 7,
			}
		],
	};

	console.log('Wallet key/addres pairs: ', utxoAddresses);
	// Manually populate the UTXO addresses and outpoints into the UTXOHDWallet
	utxoWallet.shardWalletsMap.set('cyprus1', {addressesInfo: utxoAddresses, outpoints: addressOutPoints})
	
	// Define tx inputs, outputs and chainId for the UTXO
	let txInputs = [
		{
			// ! NOTE: The pubkey is in uncompressed format. Only this format will result in a valid address
			pub_key: hexToUint8Array(pubkey1uncompressed),
			previous_out_point:
			{
				hash: {
					value: hexToUint8Array(mockTxHash1),
				},
				index: 0,
			},
		},
		{
			// ! NOTE: The pubkey is in uncompressed format. Only this format will result in a valid address
			pub_key: hexToUint8Array(pubkey2uncompressed),
			previous_out_point:
			{
				hash: {
					value: hexToUint8Array(mockTxHash2),
				},
				index: 0,
			},
		}
		
	];

	console.log('\ntxInputs[0].pubKey: ', hexlify(txInputs[0].pub_key));
	console.log('txInputs[1].pubKey: ', hexlify(txInputs[1].pub_key));
	let txOutputs = [
		{
			address: hexToUint8Array(addr2),
			denomination: 7,
		},
	];

	console.log('\ntxOutput.address:', hexlify(txOutputs[0].address));

	// Create the UTXO to be signed
	const chainId = BigInt(969);
	const utxo = createTransaction(chainId, txInputs, txOutputs, addr1);

	// calculate the hash of the tx (message to be signed)
	const txHash = keccak_256(utxo.unsignedSerialized);
	console.log('\ntx hash to sign:', hexlify(txHash));
	
	// Sign the tx
	console.log('Signing tx...');
	const signedTx = await utxoWallet.signTransaction(utxo);

	console.log('Unmarshalling signed tx...')
	const signedTxUnmarshalled = quais.QiTransaction.from(signedTx);
	console.log('Signed tx:', signedTxUnmarshalled);

	// Get the signature from the signed tx
	const signatureSerialzed = signedTxUnmarshalled.signature;

	console.log('Verifying transaction musig signature...');
	// Verify the transaction passing the signature, txHash and public key (in compressed format)
	const verified = verifyMusigSignature(signatureSerialzed, txHash, [hexToUint8Array(pubkey1), hexToUint8Array(pubkey2)]);
	console.log('Verified:', verified);

	return;

}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
