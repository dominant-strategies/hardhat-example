const { schnorr } = require('@noble/curves/secp256k1');
const quais = require('quais6')
const { keccak256: addressKeccak256, getAddress:getChesumedAddress } = require('quais6');
const { MuSigFactory } = require("@brandonblack/musig")
const { nobleCrypto } = require("quais6");


// Function to create a UTXO
function createTransaction(chainId, inputs, outputs, address) {
	const tx = new quais.QiTransaction(address);
	tx.chainId = chainId; 
	tx.txInputs = inputs;
	tx.txOutputs = outputs;
	return tx;
}

// getCompressedPublickey gets the pub key from the private key as hex string
function getCompressedPublicKey(privateKey) {
	// if privateKey is not type string, thow an error
	if (typeof privateKey !== 'string') {
		throw new Error('Invalid privateKey format (should be string)');
	}
	// if privateKey does not contain '0x' prefix, append it
	if (!privateKey.startsWith('0x')) {
		privateKey = '0x' + privateKey;
	}

	const compressedPubkey = quais.SigningKey.computePublicKey(privateKey, true);

	// return formattedCompressedPubkey;
	return compressedPubkey; 
}

// getUncompressedPublickey gets the pub key from the private key as hex string, including the parity byte and the x and y coordinates
function getUncompressedPublicKey(privateKey) {
	// if privateKey is not type string, thow an error
	if (typeof privateKey !== 'string') {
		throw new Error('Invalid privateKey format (should be string)');
	}
	// if privateKey does not contain '0x' prefix, append it
	if (!privateKey.startsWith('0x')) {
		privateKey = '0x' + privateKey;
	}
	const uncompressedPubkey = quais.SigningKey.computePublicKey(privateKey, false);
	return uncompressedPubkey;
}

// getAddressFromPublicKey gets the address from the umcompressed public key
function getAddressFromPublicKey(publicKey) {
	// if publicKey is not type string, thow an error
	if (typeof publicKey !== 'string') {
		throw new Error('Invalid publicKey format (should be string)');
	}

	// if publicKey contains '0x' prefix, remove it
	if (publicKey.startsWith('0x')) {
		publicKey = publicKey.slice(2);
	}
	// make sure the public key is 132 characters long (1 byte parity + 32 bytes x-coordinate + 32 bytes y-coordinate = 65 bytes)
	if (publicKey.length !== 130) {
		throw new Error('Invalid publicKey length');
	}
	// get the address from the public key
	const address = addressKeccak256("0x" + publicKey.substring(2)).substring(26);
	return getChesumedAddress(address);
}

// hexlify converts a uint8array to a hex string
function hexlify(uint8array) {
	let hexString = '0x';
	for (let i = 0; i < uint8array.length; i++) {
		let byte = uint8array[i].toString(16);
		if (byte.length < 2) {
			byte = '0' + byte;
		}
		hexString += byte;
	}
	return hexString;
}

function hexToUint8Array(hexString) {
	if (hexString.length % 2 !== 0) {
	    throw new Error('Invalid hexString');
	}
	// if the hexstring has a '0x' prefix, remove it
	if (hexString.startsWith('0x')) {
		hexString = hexString.slice(2);
	}
	var bytes = new Uint8Array(hexString.length / 2);
	for (let i = 0; i < bytes.length; i++) {
	    bytes[i] = parseInt(hexString.substr(i * 2, 2), 16);
	}
	return bytes;
    }

// getSignature gets the signature object (with r,s and v) and returns a string
function getSignatureSerialized(signatureObj) {
	// get the r, s and v values from the signature object
	let r = signatureObj.r;
	// trim the '0x' prefix from the r value
	if (r.startsWith('0x')) {
		r = r.slice(2);
	}
	let s = signatureObj.s;
	// trim the '0x' prefix from the s value
	if (s.startsWith('0x')) {
		s = s.slice(2);
	}
	let v = signatureObj.v;
	// convert the v value to a hex string
	v = v.toString(16);

	const signatureString = r + s + v;
	const signature = quais.Signature.from("0x" + signatureString)
	return signature.compactSerialized;
}


function verifySchnorrSignature(signatureSerialized, txHash, publicKey) {
	// trim the parity byte from the publicKey
	publicKey = "0x"+publicKey.slice(4);
	return schnorr.verify(hexToUint8Array(signatureSerialized), txHash, hexToUint8Array(publicKey));
}


function verifyMusigSignature(signatureSerialized, txHash, publicKeysArray) {
	const musig = MuSigFactory(nobleCrypto);

	const aggPublicKeyObj = musig.keyAgg(publicKeysArray);

	let aggPublicKey = hexlify(aggPublicKeyObj.aggPublicKey);

	// remove the last 32 bytes (64 hex) from the aggPublicKey
	let compressedPubKey = aggPublicKey.slice(0, -64);

	return verifySchnorrSignature(signatureSerialized, txHash, compressedPubKey);
}

module.exports = {
	createTransaction,
	getCompressedPublicKey,
	getUncompressedPublicKey,
	getAddressFromPublicKey,
	hexlify,
	hexToUint8Array,
	getSignatureSerialized,
	verifySchnorrSignature,
	verifyMusigSignature
}