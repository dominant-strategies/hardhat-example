const quais = require('quais')
const { pollFor } = require('quais-polling')
const QRC721Json = require('../artifacts/contracts/QRC721.sol/QRC721.json')
require('dotenv').config()

// Pull in NFT arguments from .env
tokenArgs = {
  name: process.env.QRC721_NAME,
  symbol: process.env.QRC721_SYMBOL,
  baseURI: process.env.QRC721_BASE_URI,
}

async function deployQRC721() {
  // Config provider, wallet, and contract factory
  const provider = new quais.providers.JsonRpcProvider(hre.network.config.url)
  const wallet = new quais.Wallet(hre.network.config.accounts[0], provider)
  const QRC721 = new quais.ContractFactory(QRC721Json.abi, QRC721Json.bytecode, wallet)

  // Broadcast deploy transaction
  const qrc721 = await QRC721.deploy(tokenArgs.name, tokenArgs.symbol, tokenArgs.baseURI, {
    gasLimit: 5000000,
  })
  console.log('1 -- Deploy transaction broadcasted: ' + qrc721.deployTransaction.hash + '\n2 -- Waiting for transaction to be mined.')

  // Wait for contract to be deployed (using quais-polling)
  const deployReceipt = await pollFor(provider, 'getTransactionReceipt', [qrc721.deployTransaction.hash], 1.5, 1)
  console.log('3 -- Transaction mined. QRC721 deployed to:', deployReceipt.contractAddress)
  console.log('   - Gas used:', deployReceipt.cumulativeGasUsed.toString())
}

deployQRC721()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
