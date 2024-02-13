## SolidityX

The `SolidityX` folder of `hardhat-example` provides an example hardhat configuration for deploying SolidityX based contracts to Quai Network.

## Dependencies

- [Hardhat](https://www.npmjs.com/package/hardhat): Development toolkit
- [SolidityX](https://github.com/dominant-strategies/SolidityX): A fork of the Solidity compiler that supports Quai Network's QRC20 and QRC721 token standards
- [Nodejs](https://nodejs.org/en/): Javascript runtime engine
- [`@nomicfoundation/hardhat-toolbox`](https://www.npmjs.com/package/@nomicfoundation/hardhat-toolbox): Hardhat utils
- [`quais`](https://www.npmjs.com/package/quais) and [`quais-polling`](https://www.npmjs.com/package/quais-polling): Javascript SDK for interacting with Quai Network
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
      - <u>Local</u>: `1337`
      - <u>Testnet</u>: `9000`
      - <u>Devnet</u>: `12000`
  - RPC Endpoints
    - **RPC endpoints are default configured for a local node.**
    - <u>Local</u>: HTTP ports for each chain's `RPCURL` can be found [here](https://docs.quai.network/node/node-overview#networking-and-conventions).
    - <u>Remote</u>: hosted RPC endpoints for each chain can be found [here](https://docs.quai.network/develop/networks#testnet).

### Configure and Deploy QRC20 and QRC721 Tokens

This repo has two pre-configured deployment scripts: `deployQRC20.js` and `deployQRC721.js`. These scripts will grab your deployment configurations in tandem with a network flag passed to the deploy command to automatically deploy your QRC20 or QRC721 contract to the network of your choice.

#### QRC20 configuration

Open the `deployQRC20.js` file and modify the `constructorArgs` object to specify the token details (token name, ticker, supply, etc). Then compile the contract via `npx hardhat compile` and deploy via `npx hardhat run scripts/deployQRC20.js`.

#### QRC721 configuration

Open the `deployQRC721.js` file and modify the `constructorArgs` object to specify the token details (token name, ticker, baseURI, etc). Then compile the contract via `npx hardhat compile` and deploy via `npx hardhat run scripts/deployQRC721.js`.

### Deploy

After configuring your deployment scripts, you'll need to compile the contracts.

```shell
npx hardhat compile
```

Depending on the contract you want to deploy, run the respective deployment script:

```shell
# Deploy QRC20 to paxos2
npx hardhat run scripts/deployQRC20.js --network paxos2

# Deploy QRC721 to hydra1
npx hardhat run scripts/deployQRC721.js --network hydra1
```

To deploy to a specific network, pass the `--network networkName` flag to the deploy command. Replace `networkName` with one of the options below. If you don't pass a network flag, the contract will be deployed to the `defaultNetwork` specified in your `hardhat.config.js`.

- `cyprus1`
- `cyprus2`
- `cyprus3`
- `paxos1`
- `paxos2`
- `paxos3`
- `hydra1`
- `hydra2`
- `hydra3`
