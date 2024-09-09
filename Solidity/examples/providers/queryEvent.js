const quais = require('quais')

async function queryEvent() {
  // Config provider
  const provider = new quais.JsonRpcProvider(hre.network.config.url, null, { usePathing: true })

  // Define simplified abi
  const abi = ['event Transfer(address indexed from, address indexed to, uint amount)']

  // Create contract to query events from
  const contract = new quais.Contract('0x002F4783248e2D6FF1aa6482A8C0D7a76de3C329', abi, provider)

  // Define filter on Transfer events
  const filter = contract.filters.Transfer

  // Query historical events in the last 100 blocks
  const events = await contract.queryFilter(filter, -100)
  console.log(`\nEvents: ${JSON.stringify(events)}\n`)
}

queryEvent()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
