const quais = require('quais')
const ERC721Json = require('../artifacts/contracts/ERC721.sol/TestERC721.json')
require('dotenv').config()

// Pull contract arguments from .env
const tokenArgs = [process.env.ERC721_NAME, process.env.ERC721_SYMBOL, process.env.ERC721_BASE_URI, process.env.ERC721_MAX_TOKENS]

async function deployERC721() {
  // Config provider, wallet, and contract factory
  const provider = new quais.JsonRpcProvider(hre.network.config.url, undefined, { usePathing: true })
  const wallet = new quais.Wallet(hre.network.config.accounts[0], provider)
  const ERC721 = new quais.ContractFactory(ERC721Json.abi, ERC721Json.bytecode, wallet)

  // Broadcast deploy transaction
  const erc721 = await ERC721.deploy(...tokenArgs)
  console.log('Transaction broadcasted: ', erc721.deploymentTransaction().hash)

  // Wait for contract to be deployed
  await erc721.waitForDeployment()
  console.log('Contract deployed to: ', await erc721.getAddress())
}

deployERC721()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
