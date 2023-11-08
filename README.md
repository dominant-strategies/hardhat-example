## hardhat-example

`hardhat-example` provides a simple smart contract deployment framework using the Hardhat development kit on Quai Network.

This project demonstrates a basic Hardhat use case. It comes with a few sample contracts, and a script that deploys a contract.

## Dependencies

- [quai-hardhat](https://github.com/dominant-strategies/quai-hardhat) development toolkit
- [SolidityX](https://github.com/dominant-strategies/SolidityX)
- [nodejs](https://nodejs.org/en/)
- `@nomicfoundation/hardhat-toolbox`
- `quais` and `quais-polling`
- `dotenv`
- `child-process` if you intend to use the `deployAllChains.js` script

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

### Alternate Configurations

The `deployAllChains.js` script has been included as a simple method of automating deployments across all chains within Quai Network. It utilizes the `child-process` package to run the `deploy.js` script for each chain.

You can specify which chains you'd like to multi-deploy to by modifying the `deployAllChains.js` script. Contract and deployment specific configuration should be done in the `deploy.js` script.

You can run the multi-deploy script using:

```shell
npx hardhat run scripts/deployAllChains.js
```

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
