const quais = require('quais')
const { pollFor } = require('quais-polling')
const ERC721Json = require('../artifacts/contracts/ERC721.sol/TestERC721.json')
require('dotenv').config()

// Define constructor args to be passed to contract
tokenArgs = {
  name: process.env.ERC721_NAME, // Name of collection
  symbol: process.env.ERC721_SYMBOL, // Collection symbol
  baseURI: process.env.ERC721_BASE_URI, // Base URI for token metadata (make sure to keep the slash at the end)
}

async function deployERC721() {
  // Config provider, wallet, and contract factory
  const provider = new quais.providers.JsonRpcProvider(hre.network.config.url)
  const wallet = new quais.Wallet(hre.network.config.accounts[0], provider)
  const ERC721 = new quais.ContractFactory(ERC721Json.abi, ERC721Json.bytecode, wallet)

  // Broadcast deploy transaction
  const erc721 = await ERC721.deploy(tokenArgs.name, tokenArgs.symbol, tokenArgs.baseURI, {
    gasLimit: 5000000,
  })
  console.log('1 -- Deploy transaction broadcasted: ' + erc721.deployTransaction.hash + '\n2 -- Waiting for transaction to be mined.')

  // Wait for contract to be deployed (using quais-polling)
  const deployReceipt = await pollFor(provider, 'getTransactionReceipt', [erc721.deployTransaction.hash], 1.5, 1)
  console.log('3 -- Transaction mined. ERC721 deployed to:', deployReceipt.contractAddress)
  console.log('   - Gas used:', deployReceipt.cumulativeGasUsed.toString())
}

deployERC721()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
