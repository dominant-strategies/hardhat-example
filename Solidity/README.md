## Solidity

The `Solidity` folder of `hardhat-example` provides an example hardhat configuration for deploying Solidity based contracts to Quai Network.

## Dependencies

- [Hardhat](https://www.npmjs.com/package/hardhat): Development toolkit
- [Nodejs](https://nodejs.org/en/): Javascript runtime engine
- [`@nomicfoundation/hardhat-toolbox`](https://www.npmjs.com/package/@nomicfoundation/hardhat-toolbox): Hardhat utils
- [`quais`](https://www.npmjs.com/package/quais) and [`quais-polling`](https://www.npmjs.com/package/quais-polling): Javascript SDK for interacting with Quai Network
- [`dotenv`](https://www.npmjs.com/package/dotenv): A zero-dependency module that securely loads environment variables.

## Run and Deploy

### Install Dependencies

Before installing dependencies, make sure you're inside of the `Solidity` directory.

Install package dependencies

```shell
npm i
```

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
      - **Preset to 9000 for testnet deployments.**
      - <u>Testnet</u>: `9000`
      - <u>Local</u>: `1337`
      - <u>Devnet</u>: `12000`
  - RPC Endpoints
    - **RPC endpoints are default configured for existing Quai RPC endpoints.**
    - <u>Remote</u>: hosted RPC endpoints for each chain can be found [here](https://qu.ai/docs/develop/networks/#testnet).
    - <u>Local</u>: HTTP ports for each chain's `RPCURL` can be found [here](https://qu.ai/docs/develop/networks/#private-networks).
  - Token Arguments
    - Constructor arguments passed to the deployment scripts for ERC20 and ERC721 tokens.
    - Modify the `arguments` directory to specify your token details (token name, ticker, supply, baseURI, etc).

### Configure and Deploy ERC20 and ERC721 Tokens

This repo has two pre-configured deployment scripts: `deployERC20.js` and `deployERC721.js`. These scripts will grab your deployment configurations in tandem with a network flag passed to the deploy command to automatically deploy your ERC20 or ERC721 contract to the network of your choice.

#### ERC20 configuration

Open the `deployERC20.js` file and modify the `constructorArgs` object to specify the token details (token name, ticker, supply, etc). Then compile the contract via `npx hardhat compile` and deploy via `npx hardhat run scripts/deployERC20.js`.

#### ERC721 configuration

Open the `deployERC721.js` file and modify the `constructorArgs` object to specify the token details (token name, ticker, baseURI, etc). Then compile the contract via `npx hardhat compile` and deploy via `npx hardhat run scripts/deployERC721.js`.

### Deploy

After configuring your deployment scripts, you'll need to compile the contracts.

```shell
npx hardhat compile
```

Depending on the contract you want to deploy, run the respective deployment script:

```shell
# Deploy ERC20 to paxos1
npx hardhat run scripts/deployERC20.js --network paxos1

# Deploy ERC721 to hydra2
npx hardhat run scripts/deployERC721.js --network hydra2
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

### Verify Contract

After the contract is deployed, you can verify the deployed contract using the command

```shell
# Verify ERC20
npx hardhat verify --constructor-args "arguments/argumentERC20.js" --contract "contracts/ERC20.sol:ERC20" --network paxos2 DEPLOYED_CONTRACT_ADDRESS

# Verify ERC721
npx hardhat verify --constructor-args "arguments/argumentERC721.js" --contract "contracts/ER721.sol:ERC721" --network paxos2 DEPLOYED_CONTRACT_ADDRESS
```

Replace `DEPLOYED_CONTRACT_ADDRESS` with contract address you got from the deployment process.
