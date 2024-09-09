const quais = require('quais')

async function verifyQuaiTransaction() {
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

  // Sign transaction
  const tx = await wallet.signTransaction(transaction)

  // Unmarshal signed transaction
  const signedTx = quais.QuaiTransaction.from(tx)

  // Verify signature
  const signerAddress = quais.recoverAddress(signedTx.digest, signedTx.signature)

  if (signerAddress !== address) {
    console.log('Signer address does not match transaction sender address')
  } else {
    console.log('Signer address matches transaction sender address')
  }
}

verifyQuaiTransaction()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
