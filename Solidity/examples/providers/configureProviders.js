const quais = require('quais')
require('dotenv').config()

async function configureProviders() {
  /**
   * Configure provider using sandbox RPC endpoint with http
   * Sandbox RPC is configured using a port mapping for each shard
   * i.e. cyprus1 is port 9200, cyprus2 is port 9201
   *
   * See: https://docs.qu.ai/build/networks#networking-information
   */
  const portProvider = new quais.JsonRpcProvider('http://rpc.sandbox.quai.network')

  /**
   * Configure provider using pathing RPC endpoint with https
   * Pathing RPC is configured using a subpath mapping for each shard
   * i.e. cyprus1 is port /cyprus1, cyprus2 is port /cyprus2
   *
   * See: https://docs.qu.ai/build/networks#explorer-urls-and-rpc-endpoints
   */
  const pathProvider = new quais.JsonRpcProvider('https://rpc.dev.quai.network', null, { usePathing: true })

  /**
   * Configure provider using pathing RPC endpoint with wss
   * Pathing RPC is configured using a subpath mapping for each shard
   * i.e. cyprus1 is port /cyprus1, cyprus2 is port /cyprus2
   *
   * See: https://docs.qu.ai/build/networks#explorer-urls-and-rpc-endpoints
   */
  const webSocketProvider = new quais.WebSocketProvider('wss://rpc.dev.quai.network', null, { usePathing: true })

  // get some sample data from each provider
  const blockNumber = await portProvider.getBlockNumber(quais.Shard.Cyprus1)
  const block = await pathProvider.getBlock(quais.Shard.Cyprus1, blockNumber, false)
  const feeData = await webSocketProvider.getFeeData(quais.Shard.Cyprus1)

  console.log('Block Number: ', blockNumber)
  console.log('Block: ', block)
  console.log('Fee Data: ', feeData)
}

configureProviders()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
