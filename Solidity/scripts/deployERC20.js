const quais = require('quais')
const ERC20Json = require('../artifacts/contracts/ERC20.sol/TestERC20.json')
require('dotenv').config()

// Pull contract arguments from .env
const tokenArgs = [process.env.ERC20_NAME, process.env.ERC20_SYMBOL, quais.parseUnits(process.env.ERC20_INITIALSUPPLY)]

async function deployERC20() {
  // Config provider, wallet, and contract factory
  const provider = new quais.JsonRpcProvider(hre.network.config.url, undefined, { usePathing: true })
  const wallet = new quais.Wallet(hre.network.config.accounts[0], provider)
  const ERC20 = new quais.ContractFactory(ERC20Json.abi, ERC20Json.bytecode, wallet)

  // Broadcast deploy transaction
  const erc20 = await ERC20.deploy(...tokenArgs)
  console.log('Transaction broadcasted: ', erc20.deploymentTransaction().hash)

  // Wait for contract to be deployed
  await erc20.waitForDeployment()
  console.log('Contract deployed to: ', await erc20.getAddress())
}

deployERC20()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
