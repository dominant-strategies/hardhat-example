const quais = require('quais')

async function queryLogs() {
  // Config provider
  const provider = new quais.JsonRpcProvider(hre.network.config.url, null, { usePathing: true })

  // Define filter for any Transfer events in the last 10 blocks in Cyprus1 ([0, 0])
  const filter = {
    fromBlock: -10, // start query at block 10 from latest
    toBlock: 'latest', // end query at latest block
    topics: [quais.id('Transfer(address,address,uint256)')], // Transfer event signature
    nodeLocation: [0, 0],
  }

  // Query logs
  const logs = await provider.getLogs(filter)
  console.log(`\nLogs: ${JSON.stringify(logs)}\n`)
}

queryLogs()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
