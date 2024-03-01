const hre = require('hardhat')
const quais = require('quais6')
const QRC20Json = require('../artifacts/contracts/QRC20.sol/QRC20.json')
const TypedContract = require('../artifacts/contracts/TestTyped.sol/TypedContract.json')

// Define token information to be used by contract constructor
const constructorArgs = {
	name: 'Testing',
	symbol: 'TITI',
	totalSupply: Math.pow(10, 8),
}

async function main() {
	// Configure quai network provider based on hardhat network config
	const quaisProvider = new quais.JsonRpcProvider('http://127.0.0.1:9003')


	// Configure quai wallet based on hardhat network config
	const walletWithProvider = new quais.Wallet(hre.network.config.accounts[0], quaisProvider)

	const QuaisContract = new quais.ContractFactory(QRC20Json.abi, QRC20Json.bytecode, walletWithProvider)

	console.log('QuaisContract: ', QuaisContract)
	const quaisContract = await QuaisContract.deploy (constructorArgs.name, constructorArgs.symbol, constructorArgs.totalSupply, {
		gasLimit: 5000000,
	})

    console.log(quaisContract)

    await new Promise(resolve => setTimeout(resolve, 100000));
    console.log('totalSupply', await quaisContract.totalSupply())
    console.log('totalsupply Static', await quaisContract.totalSupply.staticCall())
    console.log('totalsupply StaticCallresult', await quaisContract.totalSupply.staticCallResult())

}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
