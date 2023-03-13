const quais = require("quais");
const hre = require("hardhat");

async function main() {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  console.log("Deploying Greeter...");

  // //to create 'signer' object;here 'account'
  const provider = new quais.providers.JsonRpcProvider(
    hre.config.networks.quai.url
  );
  const walletWithProvider = new quais.Wallet(
    hre.config.networks.quai.accounts[0],
    provider
  );
  await provider.ready;

  // const contractBytes = await grindContractAddress(nonce, "zone-0-0", walletWithProvider.address, Greeter);
  const myContract = new quais.ContractFactory(
    Greeter.interface,
    Greeter.bytecode,
    walletWithProvider
  );

  // // If your contract requires constructor args, you can specify them here
  const greeter = await myContract.deploy("Sup bitches we deployed a Quai Contract");

  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
