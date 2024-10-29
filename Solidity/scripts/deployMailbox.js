const quais = require('quais')
const MailboxJson = require('../artifacts/contracts/mailbox.sol/PaymentChannelMailbox.json')
require('dotenv').config()

async function deployMailbox() {
  // Config provider, wallet, and contract factory
  const rpcConfig = {
    usePathing: hre.network.config.url.includes('https'),
  }
  const provider = new quais.JsonRpcProvider(hre.network.config.url, undefined, rpcConfig)
  const wallet = new quais.Wallet(hre.network.config.accounts[0], provider)
  const Mailbox = new quais.ContractFactory(MailboxJson.abi, MailboxJson.bytecode, wallet)

  // Broadcast deploy transaction
  const mailbox = await Mailbox.deploy()
  console.log('Transaction broadcasted: ', mailbox.deploymentTransaction().hash)

  // Wait for contract to be deployed
  await mailbox.waitForDeployment()
  console.log('Contract deployed to: ', await mailbox.getAddress())
}

deployMailbox()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
