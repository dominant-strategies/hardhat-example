## Solidity

The `Solidity` folder of `hardhat-example` provides an example hardhat configuration for deploying Solidity based contracts to Quai Network.

## Dependencies

- [Hardhat](https://www.npmjs.com/package/hardhat): Development toolkit
- [Nodejs](https://nodejs.org/en/): Javascript runtime engine
- [`@nomicfoundation/hardhat-toolbox`](https://www.npmjs.com/package/@nomicfoundation/hardhat-toolbox): Hardhat utils
- [`quais`](https://www.npmjs.com/package/quais): Javascript SDK for interacting with Quai Network
- [`dotenv`](https://www.npmjs.com/package/dotenv): A zero-dependency module that securely loads environment variables.
- [`@openzeppelin/contracts`](https://www.npmjs.com/package/@openzeppelin/contracts): Smart contract library

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
      - **Preset to 9000 for testnet and devnet deployments.**
      - <u>Testnet and Devnet</u>: `9000`
      - <u>Local</u>: `1337`
  - RPC Endpoints
    - **The RPC_URL variable defaults to the hosted Quai Network RPC URL.**
    - Information for configuring RPC connections via Quais SDK providers can be found [here](https://docs.qu.ai/sdk/static/provider#remote-node-provider).
  - Token Arguments
    - Constructor arguments passed to the deployment scripts for ERC20 and ERC721 tokens.
    - Modify the `arguments` directory to specify your token details (token name, ticker, supply, baseURI, etc).

### Configure and Deploy ERC20 and ERC721 Tokens

This repo has two pre-configured deployment scripts: `deployERC20.js` and `deployERC721.js`. These scripts will grab your deployment configurations in tandem with a network flag passed to the deploy command to automatically deploy your ERC20 or ERC721 contract to the network of your choice.

#### ERC20 Configuration

The `deployERC20.js` file pulls contract configurations from your `.env` file at the root of the repository. To modify your arguments passed to the contract constructor, open the `.env` file and find the `ERC20` section. Any changes you make to the `.env` file will be reflected in the `deployERC20.js` file.

```env
ERC20_NAME=""
ERC20_SYMBOL=""
ERC20_INITIAL_SUPPLY=
```

#### ERC721 Configuration

The `deployERC721.js` file pulls contract configurations from your `.env` file at the root of the repository. To modify your arguments passed to the contract constructor, open the `.env` file and find the `ERC721` section. Any changes you make to the `.env` file will be reflected in the `deployERC721.js` file.

```env
ERC721_NAME=""
ERC721_SYMBOL=""
ERC721_BASE_URI=""
ERC721_MAX_TOKENS=
```

### Deploy

After configuring your deployment scripts, you'll need to compile the contracts.

```shell
npx hardhat compile
```

Depending on the contract you want to deploy, run the respective deployment script:

```shell
# Deploy ERC20 to cyprus1
npx hardhat run scripts/deployERC20.js --network cyprus1

# Deploy ERC721 to cyprus2
npx hardhat run scripts/deployERC721.js --network cyprus2
```

To deploy to a specific network, pass the `--network networkName` flag to the deploy command. Replace `networkName` with one of the options below. If you don't pass a network flag, the contract will be deployed to the `defaultNetwork` specified in your `hardhat.config.js`.

- `cyprus1`
- `cyprus2`

### Verify Contract

**Contract verification via hardhat is still under development. These commands may not work as expected.**

After the contract is deployed, you can verify the deployed contract using the command

```shell
# Verify ERC20
npx hardhat verify --constructor-args "arguments/argumentERC20.js" --contract "contracts/ERC20.sol:ERC20" --network cyprus1 DEPLOYED_CONTRACT_ADDRESS

# Verify ERC721
npx hardhat verify --constructor-args "arguments/argumentERC721.js" --contract "contracts/ER721.sol:ERC721" --network cyprus1 DEPLOYED_CONTRACT_ADDRESS
```

Replace `DEPLOYED_CONTRACT_ADDRESS` with contract address you got from the deployment process.
