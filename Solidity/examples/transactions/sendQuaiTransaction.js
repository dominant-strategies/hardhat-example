const quais = require('quais')

async function sendQuaiTransaction() {
  // Config provider, wallet
  const provider = new quais.JsonRpcProvider(hre.network.config.url, null, { usePathing: true })
  const wallet = new quais.Wallet(hre.network.config.accounts[0], provider)
  const address = await wallet.getAddress()

  // Build transaction
  const transaction = {
    from: address,
    to: '0x005f644097F8f0E9f996Dca4F4F23aBB6C1Cc8b3',
    value: quais.parseQuai('0.01'),
  }

  // Broadcast transaction
  const tx = await wallet.sendTransaction(transaction)
  console.log('Transaction broadcasted: ', tx.hash)

  // Wait for transaction to be mined
  const receipt = await tx.wait()
  console.log('Transaction mined: ', receipt)
}

sendQuaiTransaction()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
