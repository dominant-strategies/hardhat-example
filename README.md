## hardhat-example

`hardhat-example` provides a simple smart contract deployment framework using the Hardhat development kit on Quai Network.

This project demonstrates a basic Hardhat use case. It comes with a few sample contracts, and a script that deploys a contract.

## Dependencies

- [`hardhat`](https://www.npmjs.com/package/hardhat): Development toolkit
- [SolidityX](https://github.com/dominant-strategies/SolidityX): A fork of the Solidity compiler that supports Quai Network's QRC20 and QRC721 token standards
- [Nodejs](https://nodejs.org/en/): Javascript runtime engine
- [`@nomicfoundation/hardhat-toolbox`](https://www.npmjs.com/package/@nomicfoundation/hardhat-toolbox): Hardhat utils
- [`quais`](https://www.npmjs.com/package/quais) and [`quais-polling`](https://www.npmjs.com/package/quais-polling): Javascript SDK for interacting with Quai Network
- [`quai-hardhat-plugin`](https://www.npmjs.com/package/quai-hardhat-plugin): A plugin that installs the SolidityX compiler for use with Hardhat.
- [`dotenv`](https://www.npmjs.com/package/dotenv): A zero-dependency module that securely loads environment variables.

## Run and Deploy

### Install Dependencies

1. Clone `hardhat-example`

```shell
git clone https://github.com/dominant-strategies/hardhat-example
```

2. Install package dependencies

```shell
npm i
```

### Local SolidityX Compiler

There are two methods of installing the SolidityX compiler for use with Hardhat:

- Install the SolidityX compiler via [`quai-hardhat-plugin`](https://www.npmjs.com/package/quai-hardhat-plugin) (**Recommended**)
- Install and build the SolidityX compiler from source

#### Installing via Plugin

If you've installed `quai-hardhat-plugin` already, the SolidityX compiler will be installed automatically when you run `npx hardhat compile` for MacOS and Linux users. Windows is not currently supported by the plugin.

#### Installing from Source

**Note:** Building the compiler from source still requires the `quai-hardhat-plugin` to be installed.

Visit the [SolidityX Repository](https://github.com/dominant-strategies/SolidityX) for instructions on how to clone and build the SolidityX compiler for your specific operating system.

Once you've built the SolidityX compiler, you'll need to add path to your `solc` binary into the `customCompilerPath` variable in the `hardhat.config.js` file. The file already includes common paths for MacOS and Linux as comments.

### Environment Config

- Copy `.env.dist` to `.env`.

```shell
cp .env.dist .env
```

- Define network variables inside of the `.env` file.
  - Private Keys
    - The sample environment file is configured with a **placeholder private key** for each chain.
    - Replace the placeholder private key for each chain with **your own private key** that corresponds to the address you want to deploy from.
    - **You cannot use the same private key for each chain.**
  - Chain ID
    - Depending on the network you're deploying to, you'll need to set the `CHAINID` variable to the correct chain ID.
      - <u>Local</u>: `1337`
      - <u>Testnet</u>: `9000`
      - <u>Devnet</u>: `12000`
  - RPC Endpoints
    - **RPC endpoints are default configured for a local node.**
    - <u>Local</u>: HTTP ports for each chain's `RPCURL` can be found [here](https://docs.quai.network/node/node-overview#networking-and-conventions).
    - <u>Remote</u>: hosted RPC endpoints for each chain can be found [here](https://docs.quai.network/develop/networks#testnet).

### Deploy

1. Configure the `deploy.js` script to specify the contract you'd like to deploy
   - Pass the name of the contract into the hardhat runtime contract definition
   - Pass relevant constructor arguments into the deploy command (i.e. the intial greeting for the `greeter.sol` contract)
2. Compile contracts using `npx hardhat compile`
3. Deploy contract to a single chain using `npx hardhat run scripts/deploy.js`
   - This will deploy to the `defaultNetwork` specified in your `hardhat.config.js`
   - You can specify a network other than the `defaultNetwork` by passing the `--network networkName` flag to the deploy command. Replace `networkName` with one of the options below.
   - Available `networkName` are:
     - `cyprus1`
     - `cyprus2`
     - `cyprus3`
     - `paxos1`
     - `paxos2`
     - `paxos3`
     - `hydra1`
     - `hydra2`
     - `hydra3`

### Deploying QRC20 or QRC721

The `deployQRC20.js` and `deployQRC721.js` scripts have been included as a simple method of deploying QRC20 and QRC721 contracts to a single chain within Quai Network.

To specify token details (token name, ticker, supply, etc) for either the QRC20 or QRC721 contract, modify the `constructorArgs` object in the deploy script.

### Hardhat

Hardhat has a number of other useful CLI commands.

```shell
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat help
```

## Authors

[Juuddi](https://github.com/Juuddi)
