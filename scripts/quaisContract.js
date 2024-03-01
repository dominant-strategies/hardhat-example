const { quais } = require("quais6");
const QRC20Json = require('../artifacts/contracts/QRC20.sol/QRC20.json')

async function main() {
    const rpcURL = 'http://localhost:8610'
    const wsURL = "wss://mainnet.infura.io/ws/v3/9612df15afd84f4a99edc22ca5807d66"//'ws://localhost:8611'
    // define provider
    const provider = new quais.JsonRpcProvider(rpcURL)
    const wsProvider = new quais.WebSocketProvider(wsURL)

    
    // wsProvider.on('block', (blockNumber) => {
    //     console.log(`Block ${blockNumber} mined`);
    // })


    // set contract address we want to events from
    const contractAddress = '0x0836792e8eCF47B48535D1b52E69B60434ec354A'
    const QRC20 = new quais.Contract(contractAddress, QRC20Json.abi, provider)
    console.log('QRC20 CONTRACT',QRC20)
    
    const filterFrom = QRC20.filters.Transfer('0x11453fa3951f8766cb2d1628f24dbd10890fee9c')
    const logsFrom = await QRC20.queryFilter(filterFrom, -100, 'latest')
    console.log(logsFrom)

    // QRC20.on('Transfer', (from, to, value, event) => {
    //     console.log(`Transfer from ${from} to ${to}: ${value.toString()}`);
    //     // Additional logic to handle the event
    // });
}

main()
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
