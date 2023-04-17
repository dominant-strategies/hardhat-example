const quais = require("quais");
const hre = require("hardhat");

console.log("");
console.log("Chain URL: " + hre.config.networks[hre.config.defaultNetwork].url);
console.log(
  "Private Key: " +
    hre.config.networks[hre.config.defaultNetwork].accounts[
      hre.config.chainConfig.addressConfig
    ]
);
console.log("");

async function main() {
  // Use hre to define contract to deploy
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  // console.log("Deploying Greeter...");

  // Create wallet and provider
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

  // Create quai contract factory
  const myContract = new quais.ContractFactory(
    Greeter.interface,
    Greeter.bytecode,
    walletWithProvider
  );

  // // If your contract requires constructor args, you can specify them here
  const greeter = await myContract.deploy({ gasLimit: 2000000 });

  await greeter.deployed();
  console.log("Contract deployed to:", greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
