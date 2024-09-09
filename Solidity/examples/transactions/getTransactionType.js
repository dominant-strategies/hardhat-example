const quais = require('quais')
require('dotenv').config()

const from = '0x002F4783248e2D6FF1aa6482A8C0D7a76de3C329' // Cyprus1 Quai address
const to = '0x002F4783248e2D6FF1aa6482A8C0D7a76de3C329' // Cyprus1 Quai address

async function getAddressData() {
  // Get type of transaction
  const txType = quais.getTxType(from, to)
  console.log('Transaction type: ', txType) // type 0
}

getAddressData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
