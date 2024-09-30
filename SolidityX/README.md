## SolidityX

The `SolidityX` folder of `hardhat-example` provides an example hardhat configuration for deploying SolidityX based contracts to Quai Network.

## Dependencies

- [Hardhat](https://www.npmjs.com/package/hardhat): Development toolkit
- [SolidityX](https://github.com/dominant-strategies/SolidityX): A fork of the Solidity compiler that supports Quai Network's QRC20 and QRC721 token standards
- [Nodejs](https://nodejs.org/en/): Javascript runtime engine
- [`@nomicfoundation/hardhat-toolbox`](https://www.npmjs.com/package/@nomicfoundation/hardhat-toolbox): Hardhat utils
- [`quais`](https://www.npmjs.com/package/quais): Javascript SDK for interacting with Quai Network
- [`quai-hardhat-plugin`](https://www.npmjs.com/package/quai-hardhat-plugin): A plugin that installs the SolidityX compiler for use with Hardhat.
- [`dotenv`](https://www.npmjs.com/package/dotenv): A zero-dependency module that securely loads environment variables.

## Run and Deploy

### Install Dependencies

Before installing dependencies, make sure you're inside of the `SolidityX` directory.

Install package dependencies

```shell
npm i
```

### Local SolidityX Compiler

There are two methods of installing the SolidityX compiler for use with Hardhat:

- Install the SolidityX compiler via [`quai-hardhat-plugin`](https://www.npmjs.com/package/quai-hardhat-plugin) (**Recommended**)
- Install and build the SolidityX compiler from source

#### Installing via Plugin

If you've installed `quai-hardhat-plugin` already, the SolidityX compiler will be installed automatically when you run `npx hardhat compile` for MacOS and Linux users. **Windows is not currently supported by the plugin**.

#### Installing from Source

**Note:** Building the compiler from source still requires the `quai-hardhat-plugin` to be installed.

Visit the [SolidityX Repository](https://github.com/dominant-strategies/SolidityX) for instructions on how to clone and build the SolidityX compiler for your specific operating system.

Once you've built the SolidityX compiler, you'll need move the resultant `solc` inside of the `SolidityX` directory so that `hardhat` can find it.

### Environment Config

The environment file for network and deploy configuration is located at the root of the `hardhat-example` directory. It serves as the main configuration file for both the `Solidity` and `SolidityX` directories and should be kept at the repository root.

- Copy `../.env.dist` to `../.env`.

```shell
cp ../.env.dist ../.env
```

- Define network variables inside of the `.env` file.
  - Private Keys
    - The sample environment file is configured with a **placeholder private key** for each chain.
    - Replace the placeholder private key for each chain with **your own private key** that corresponds to the address you want to deploy from.
    - **You cannot use the same private key for each chain.**
  - Chain ID
    - Depending on the network you're deploying to, you'll need to set the `CHAINID` variable to the correct chain ID.
      - Preset to 9000 for testnet and devnet deployments.
      - <u>Testnet and Devnet</u>: `9000`
      - <u>Local</u>: `1337`
  - RPC Endpoints
    - **The RPC_URL variable defaults to the hosted Quai Network RPC URL.**
    - Information for configuring RPC connections via Quais SDK providers can be found [here](https://docs.qu.ai/sdk/static/provider#remote-node-provider).
  - Token Arguments
    - Constructor arguments passed to the deployment scripts for QRC20 and QRC721 tokens.
    - Modify the `arguments` directory to specify your token details (token name, ticker, supply, baseURI, etc).

### Configure and Deploy QRC20 and QRC721 Tokens

This repo has two pre-configured deployment scripts: `deployQRC20.js` and `deployQRC721.js`. These scripts will grab your deployment configurations in tandem with a network flag passed to the deploy command to automatically deploy your QRC20 or QRC721 contract to the network of your choice.

#### QRC20 configuration

The `deployQRC20.js` file pulls contract configurations from your `.env` file at the root of the repository. To modify your arguments passed to the contract constructor, open the `.env` file and find the `QRC20` section. Any changes you make to the `.env` file will be reflected in the `deployQRC20.js` file.

```env
QRC20_NAME=""
QRC20_SYMBOL=""
QRC20_INITIALSUPPLY=
```

#### QRC721 configuration

The `deployQRC721.js` file pulls contract configurations from your `.env` file at the root of the repository. To modify your arguments passed to the contract constructor, open the `.env` file and find the `QRC721` section. Any changes you make to the `.env` file will be reflected in the `deployQRC721.js` file.

```env
QRC721_NAME=""
QRC721_SYMBOL=""
QRC721_BASE_URI=""
```

### Deploy

After configuring your deployment scripts, you'll need to compile the contracts.

```shell
npx hardhat compile
```

Depending on the contract you want to deploy, run the respective deployment script:

```shell
# Deploy QRC20 to cyprus1
npx hardhat run scripts/deployQRC20.js --network cyprus1

# Deploy QRC721 to cyprus1
npx hardhat run scripts/deployQRC721.js --network cyprus1
```

To deploy to a specific network, pass the `--network networkName` flag to the deploy command. Replace `networkName` with one of the options below. If you don't pass a network flag, the contract will be deployed to the `defaultNetwork` specified in your `hardhat.config.js`.

- `cyprus1`
- `cyprus2`

### Verify Contract

**Contract verification via hardhat is still under development. These commands may not work as expected.**

After the contract is deployed, you can verify the deployed contract using the command

```shell
# Verify QRC20
npx hardhat verify --constructor-args "arguments/argumentQRC20.js" --contract "contracts/QRC20.sol:QRC20" --network cyprus1 DEPLOYED_CONTRACT_ADDRESS

# Verify QRC721
npx hardhat verify --constructor-args "arguments/argumentQRC721.js" --contract "contracts/QR721.sol:QRC721" --network cyprus1 DEPLOYED_CONTRACT_ADDRESS
```

Replace `DEPLOYED_CONTRACT_ADDRESS` with contract address you got from the deployment process.
