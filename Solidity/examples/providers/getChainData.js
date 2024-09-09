const quais = require('quais')
require('dotenv').config()

async function getAddressData() {
  // Config provider
  const provider = new quais.JsonRpcProvider(hre.network.config.url, null, { usePathing: true })

  // Get block (with includeTransactions set to false)
  const block = await provider.getBlock(quais.Shard.Cyprus1, 'latest', false)

  // Get current protocol expansion number
  const protocolExpansionNumber = await provider.getProtocolExpansionNumber()

  console.log('Latest block: ', block)
  console.log('Current Protocol Expansion Number: ', protocolExpansionNumber)
}

getAddressData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
