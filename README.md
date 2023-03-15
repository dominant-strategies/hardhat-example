## hardhat-example

`hardhat-example` provides a simple smart contract deployment framework using the Hardhat development kit on Quai Network.

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a sample script that deploys that contract.

## Getting Started

* Copy `.env.dist` to `.env`.
```
$ cp .env.dist .env
```
* Define network variables inside of the `.env` file.
    * The local HTTP port for each chain's `LOCAL_URL` can be found [here](https://docs.quai.network/develop/installation).
    * The `GARDER_URL` and `COLOSSEUM_URL` can be either a local (similar to above) or remote node endpoint.
    * `PRIVATE_KEY` is the private key of the account you wish to deploy from.
* Set your default network inside the `hardhat.config.js` file. This will configure the deployment network in the `scripts/deploy.js` file.
* Replace `Greeter.sol` with your own contract.
* Update `scripts/deploy.js` with your contract(s) info.
* Replace `test/test.js` with your own tests.

### Dependencies

* [Hardhat](https://hardhat.org/) Development Toolkit 
* [nodejs](https://nodejs.org/en/)
* npm packages
    * `@nomicfoundation/hardhat-toolbox`
    * `@quais`
    * `ethers`
    * `dotenv`

### Prerequisites

* An instance of a Quai Network Full Node and Manager

### Using Hardhat

Hardhat has a number of useful CLI commands.  Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/deploy.js
npx hardhat help
```

### 

Running this project:

`npm install`
`npx hardhat compile`
`

## Authors

[Juuddi](https://github.com/Juuddi)
