const quais = require('quais')
const QRC721Json = require('../artifacts/contracts/QRC721.sol/QRC721.json')
require('dotenv').config()

// Pull in constructor arguments from .env
const tokenArgs = [process.env.QRC721_NAME, process.env.QRC721_SYMBOL, process.env.QRC721_BASE_URI]

async function deployQRC721() {
  // Config provider, wallet, and contract factory
  const provider = new quais.JsonRpcProvider(hre.network.config.url, undefined, { usePathing: true })
  const wallet = new quais.Wallet(hre.network.config.accounts[0], provider)
  const QRC721 = new quais.ContractFactory(QRC721Json.abi, QRC721Json.bytecode, wallet)

  // Broadcast deploy transaction
  const qrc721 = await QRC721.deploy(...tokenArgs)
  console.log('Transaction broadcasted: ' + qrc721.deploymentTransaction().hash)

  // Wait for contract to be deployed
  await qrc721.waitForDeployment()
  console.log('Contract deployed to: ' + (await qrc721.getAddress()))
}

deployQRC721()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
