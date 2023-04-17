const quais = require("quais");
const hre = require("hardhat");

async function main() {
  const Greeter = await hre.ethers.getContractFactory("Greeter");

  const provider = new quais.providers.JsonRpcProvider(
    hre.config.networks[hre.config.defaultNetwork].url
  );

  const walletWithProvider = new quais.Wallet(
    hre.config.networks[hre.config.defaultNetwork].accounts[
      hre.config.chainConfig.addressConfig
    ],
    provider
  );
  await provider.ready;

  const myContract = new quais.ContractFactory(
    Greeter.interface,
    Greeter.bytecode,
    walletWithProvider
  );

  const greeter = await myContract.deploy("Hello, Quai");

  await greeter.deployed();
  console.log("Deployed at:", greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
