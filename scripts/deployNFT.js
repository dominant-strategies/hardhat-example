const quais = require("quais");
const hre = require("hardhat");

// TODO
// This script is unfinished.

async function main() {
  const NFT = await hre.ethers.getContractFactory("MyNFT");
  console.log("Deploying NFT...")

  // //to create 'signer' object;here 'account'
  const provider = new quais.providers.JsonRpcProvider(hre.config.networks.ropsten.url);
  const walletWithProvider = new quais.Wallet(hre.config.networks.ropsten.accounts[0], provider);
  await provider.ready;

  // const contractBytes = await grindContractAddress(nonce, "zone-0-0", walletWithProvider.address, Greeter);
  const myContract = new quais.ContractFactory(NFT.interface, NFT.bytecode, walletWithProvider);
  
  // // If your contract requires constructor args, you can specify them here
  const nft = await myContract.deploy({ gasLimit: 500000 });

  await nft.deployed();
  console.log("Greeter deployed to:", greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
