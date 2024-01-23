const { quais } = require("quais6");
const QRC20Json = require('../artifacts/contracts/QRC20.sol/QRC20.json')

async function main() {
    const rpcURL = 'http://localhost:8610'

    // define provider
    const provider = new quais.JsonRpcProvider(rpcURL)
    
    // set contract address we want to events from
    const contractAddress = '0x179DDedcDAFb1CE8F53483e72c88179a4EaFAB31'
    const QRC20 = new quais.Contract(contractAddress, QRC20Json.abi, provider)
    console.log('QRC20 CONTRACT',QRC20)
    

    
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
