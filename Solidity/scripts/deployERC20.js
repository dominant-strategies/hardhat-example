const quais = require('quais')
const { pollFor } = require('quais-polling')
const ERC20Json = require('../artifacts/contracts/ERC20.sol/TestERC20.json')
require('dotenv').config()

// Define constructor args to be passed to contract
tokenArgs = {
  name: process.env.ERC20_NAME,
  symbol: process.env.ERC20_SYMBOL,
  initialSupply: process.env.ERC20_INITIALSUPPLY,
}

async function deployERC20() {
  // Config provider, wallet, and contract factory
  const provider = new quais.providers.JsonRpcProvider(hre.network.config.url)
  const wallet = new quais.Wallet(hre.network.config.accounts[0], provider)
  const ERC20 = new quais.ContractFactory(ERC20Json.abi, ERC20Json.bytecode, wallet)

  // Broadcast deploy transaction
  const erc20 = await ERC20.deploy(tokenArgs.name, tokenArgs.symbol, tokenArgs.initialSupply, {
    gasLimit: 5000000,
  })
  console.log('1 -- Deploy transaction broadcasted: ' + erc20.deployTransaction.hash + '\n2 -- Waiting for transaction to be mined.')

  // Wait for contract to be deployed (using quais-polling)
  const deployReceipt = await pollFor(provider, 'getTransactionReceipt', [erc20.deployTransaction.hash], 1.5, 1)
  console.log('3 -- Transaction mined. ERC20 deployed to:', deployReceipt.contractAddress)
  console.log('  -- Gas used:', deployReceipt.cumulativeGasUsed.toString())
}

deployERC20()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
