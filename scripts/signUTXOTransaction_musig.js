//! NOTE: This script is for developement and only works with a modified version of the 'signTransaction' method in the UTXOHDWallet class
//! In order for this script to work, 'signTransaction' must be modified to return the tx object (instead of the serialized string) 

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

	// Manually populate the UTXO addresses and outpoints into the UTXOHDWallet
	utxoWallet.addressOutpoints = addressOutPoints;
	utxoWallet.utxoAddresses = utxoAddresses;
	console.log('Wallet key/addres pairs: ', utxoWallet.utxoAddresses);
	
	// Define tx inputs, outputs and chainId for the UTXO
	let txInputs = [
		{
			txhash: mockTxHash1,
			index: 0,
			// ! NOTE: The pubkey is in uncompressed format. Only this format will result in a valid address
			pubKey: hexToUint8Array(pubkey1uncompressed),
		},
		{
			txhash: mockTxHash2,
			index: 0,
			// ! NOTE: The pubkey is in uncompressed format. Only this format will result in a valid address
			pubKey: hexToUint8Array(pubkey2uncompressed),
		},
		
	];

	console.log('txInputs:', txInputs)

	let txOutputs = [
		{
			Address: addr2,
			Denomination: 7,
		},
	];

	console.log('txOutputs:', txOutputs)

	const chainId = BigInt(969);
	
	// Create the UTXO to be signed
	const utxo = createTransaction(chainId, txInputs, txOutputs, addr1);
	console.log('utxo tx Serialized:', utxo.unsignedSerialized);

	// calculate the hash of the UTXO (message to be signed)
	const txHash = keccak_256(utxo.unsignedSerialized);
	console.log('tx hash to sign:', hexlify(txHash));
	
	// Sign the tx
	console.log('Signing UTXO...');
	const signedUTXO = await utxoWallet.signTransaction(utxo);

	// Get the signature from the signed UTXO
	console.log("Getting the signature...")
	console.log('Signature: ', signedUTXO.signature);
	const signatureSerialzed = getSignatureSerialized(signedUTXO.signature);

	// Verify the transaction passing the signature, txHash and public key (in compressed format)
	console.log('Verifying transaction musig signature...');
	
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
