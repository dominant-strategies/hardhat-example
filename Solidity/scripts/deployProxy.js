const quais = require('quais')
const BoxJson = require('../artifacts/contracts/Box.sol/Box.json')
const { upgrades } = require("hardhat");
require('dotenv').config()

async function deployProxy() {
  // Config provider, wallet, and contract factory
  const provider = new quais.JsonRpcProvider("https://orchard.rpc.quai.network", undefined, { usePathing: true })
  const wallet = new quais.Wallet(hre.network.config.accounts[0], provider)
  const ipfsHash = await deployMetadata.pushMetadataToIPFS("Box")
  const Box = new quais.ContractFactory(BoxJson.abi, BoxJson.bytecode, wallet, ipfsHash)

  // Broadcast deploy transaction
  const proxy = await upgrades.deployProxy(Box, [100])

  console.log('Transaction broadcasted: ', proxy.deploymentTransaction().hash)

  // Wait for contract to be deployed
  await proxy.waitForDeployment()
  console.log(await proxy.retrieve())
  console.log('Contract deployed to: ', await proxy.getAddress())
}

deployProxy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
