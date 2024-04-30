const hre = require('hardhat')
const quais = require('quais6')
const QRC20Json = require('../artifacts/contracts/QRC20.sol/QRC20.json')
const Test = require('../artifacts/contracts/Test.sol/TestContract.json')
const { HDNodeVoidWallet } = require('ethers')

// Define token information to be used by contract constructor
const constructorArgs = {
	name: 'Testing',
	symbol: 'TITI',
	totalSupply: Math.pow(10, 8),
}

async function main() { 

    const shard = quais.getShardForAddress('0x229B4383535DD107B2D53596610b10209F945545')
    console.log(shard)


	const type = quais.getTxType('0x00E8ABF5494e0E0632A89995BBAEe9335044df13', '0x029B4383535DD107B2D53596610b10209F945545')
	console.log(type)

	const path = quais.quaiHDAccountPath()
	console.log(path)
	
    let wallet = quais.Wallet.fromPhrase(process.env.MNEMONIC,  path , null,  quais.LangEs.wordlist())
	console.log(wallet)
	wallet = wallet.deriveAddress(0, 'Cyprus One')
	console.log(wallet)
	console.log(wallet.address)
	console.log(quais.isUTXOAddress(wallet.address))

}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
