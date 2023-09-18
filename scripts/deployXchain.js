const quais = require('quais');
const QRC20 = require('../artifacts/contracts/QRC20.sol/QRC20.json');
const { networks } = require('../hardhat.config.js');

async function addApprovedQRC20Addresses(contractData) {
    for (const targetNetwork of Object.keys(networks)) {
        const isShard = contractData.some(contract => contract.network === targetNetwork);
        if (!isShard) {
            continue
        }
        const network = networks[targetNetwork];
        console.log('Target Network: ', targetNetwork)
        console.log('Target Network URL: ', network.url)


        const provider = new quais.providers.JsonRpcProvider(network.url);
        const privateKey = network.accounts[0];
        const wallet = new quais.Wallet(privateKey, provider);

        const currentContract = contractData.find(current => current.network === targetNetwork);
        const approvedContracts = contractData.filter(approved => approved.network !== targetNetwork);

        console.log('\x1b[33mPreparing address approval for', currentContract.network, 'contract address: ', currentContract.address, ' | ChainID: ', currentContract.chainIdx, '\x1b[0m')
        console.log(
            `\nCurrent Contract:\n` +
            `---------------------------------------------------\n` +
            `ChainIdx:  \x1b[32m${currentContract.chainIdx}\x1b[0m\n` +
            `Network: \x1b[32m${currentContract.network}\x1b[0m\n` +
            `Address:  \x1b[32m${currentContract.address}\x1b[0m\n` +
            `---------------------------------------------------`
        );
        console.log("\nContracts approved for linking:");
        console.table(approvedContracts, ['address', 'chainIdx', 'network']);

        const contract = new quais.Contract(currentContract.address, QRC20.abi, wallet);

        const transactionData = await contract.populateTransaction.AddApprovedAddresses(
            approvedContracts.map(approved => approved.chainIdx),
            approvedContracts.map(approved => approved.address)
        );
        try {
            const txResponse = await wallet.sendTransaction(transactionData);
            console.log('Transaction sent to', currentContract.network, ':', txResponse.hash);
            await txResponse.wait();
            console.log('\x1b[32mSuccessfully mined transaction on', currentContract.network, 'with hash:', txResponse.hash, '\x1b[0m');
        } catch (error) {
            console.error('\x1b[31mError sending transaction to', currentContract.network, ':\x1b[0m', error);
        }
    }
}

module.exports = {
    addApprovedQRC20Addresses,
};