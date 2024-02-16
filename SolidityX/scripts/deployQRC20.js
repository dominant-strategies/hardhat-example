const quais = require("quais");
const { pollFor } = require("quais-polling");
const QRC20Json = require("../artifacts/contracts/QRC20.sol/QRC20.json");
require("dotenv").config();

// Define constructor args to be passed to contract
tokenArgs = {
  name: process.env.QRC20_NAME, // Name of token
  symbol: process.env.QRC20_SYMBOL, // Symbol of token
  initialSupply: process.env.QRC20_INITIALSUPPLY, // Initial supply of token, will be minted to deployer
};

async function deployQRC20() {
  // Config provider, wallet, and contract factory
  const provider = new quais.providers.JsonRpcProvider(hre.network.config.url);
  const wallet = new quais.Wallet(hre.network.config.accounts[0], provider);
  const QRC20 = new quais.ContractFactory(
    QRC20Json.abi,
    QRC20Json.bytecode,
    wallet
  );

  // Broadcast deploy transaction
  const qrc20 = await QRC20.deploy(
    tokenArgs.name,
    tokenArgs.symbol,
    tokenArgs.initialSupply,
    {
      gasLimit: 5000000,
    }
  );
  console.log(
    "1 -- Deploy transaction broadcasted: " +
      qrc20.deployTransaction.hash +
      "\n2 -- Waiting for transaction to be mined."
  );

  // Wait for contract to be deployed (using quais-polling)
  const deployReceipt = await pollFor(
    provider,
    "getTransactionReceipt",
    [qrc20.deployTransaction.hash],
    1.5,
    1
  );
  console.log(
    "3 -- Transaction mined. QRC20 deployed to:",
    deployReceipt.contractAddress
  );
  console.log("   - Gas used:", deployReceipt.cumulativeGasUsed.toString());
}

deployQRC20()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
