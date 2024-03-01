const quais = require('quais');

// Replace these with your values
const privateKey = '0x7e99ffbdf4b3dda10174f18a0991114bb4a7a684b5972c6901fbe8a4a4bfc325';
const recipientAddress = '0x009d80f23Ff003536E43c810c5c1F85520EA4Db0';

// Connect to the Ethereum network
const provider = new quais.providers.JsonRpcProvider('http://127.0.0.1:9100');
provider.getNetwork().then((network) => { console.log(network) });  
// Create a wallet from the private key, connected to the provider
const wallet = new quais.Wallet(privateKey, provider);
console.log(wallet.address)
async function sendTransaction() {
    const tx = {
        to: recipientAddress,
        value: quais.utils.parseEther("0.01"),
    };

    try {
        console.log('Sending transaction...');
        const transactionResponse = await wallet.sendTransaction(tx);
        console.log('Transaction successful:', transactionResponse.hash);
    } catch (error) {
        console.error('Transaction failed:', error);
    }
}

sendTransaction();
