const quais = require('quais')
const QRC20Json = require('../artifacts/contracts/QRC20.sol/QRC20.json')
require('dotenv').config()

// Pull in constructor arguments from .env
const tokenArgs = [process.env.QRC20_NAME, process.env.QRC20_SYMBOL, process.env.QRC20_INITIALSUPPLY]

async function deployQRC20() {
  // Config provider, wallet, and contract factory
  const provider = new quais.JsonRpcProvider(hre.network.config.url, undefined, { usePathing: true })
  const wallet = new quais.Wallet(hre.network.config.accounts[0], provider)
  const QRC20 = new quais.ContractFactory(QRC20Json.abi, QRC20Json.bytecode, wallet)

  // Broadcast deploy transaction
  const qrc20 = await QRC20.deploy(...tokenArgs)
  console.log('Transaction broadcasted: ', qrc20.deploymentTransaction().hash)

  // Wait for contract to be deployed
  await qrc20.waitForDeployment()
  console.log('Contract deployed to: ', await qrc20.getAddress())
}

deployQRC20()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
