const quais = require('quais')

const contractAddress = '0x002F4783248e2D6FF1aa6482A8C0D7a76de3C329'

async function getAddressData() {
  // Config provider, wallet
  const provider = new quais.JsonRpcProvider(hre.network.config.url, null, { usePathing: true })
  const wallet = new quais.Wallet(hre.network.config.accounts[0], provider)
  const myAddress = await wallet.getAddress()

  // Get balance of address
  const balance = await provider.getBalance(myAddress, 'latest')

  // // Get nonce of address
  const nonce = await provider.getTransactionCount(myAddress, 'latest')

  // // Get code stored at a Quai address
  const code = await provider.getCode(contractAddress, 'latest')

  // // Get value of a storage slot at a Quai address
  const storage = await provider.getStorage(contractAddress, 0, 'latest')

  // // Print values
  console.log(`Balance of ${myAddress}: `, balance)
  console.log(`Nonce of ${myAddress}: `, nonce)
  console.log(`Code stored at ${contractAddress}: `, code)
  console.log(`Value of storage slot 0 at ${contractAddress}: `, storage)
}

getAddressData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
