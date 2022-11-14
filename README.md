## hardhat-example

`hardhat-example` provides a simple smart contract deployment framework using the Hardhat development kit on Quai Network.

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a sample script that deploys that contract.

## Getting Started

* Define network variables inside of a new `process.env` file.
    * The local HTTP port for each chain's `ROPSTEN_URL` can be found [here](https://docs.quai.network/develop/installation).
    * The `RPC_URL` can be either a local (similar to above) or remote node endpoint.
    * `PRIVATE_KEY` is the private key of the account you wish to deploy from.
* Set your default network inside the `hardhat.config.js` file.
* Replace `Greeter.sol` with your own contract.
* Update `scripts/deploy.js` with your contract(s) info.
* Replace `test/test.js` with your own tests.

### Dependencies

* [Hardhat](https://hardhat.org/) Development Toolkit 
* [nodejs](https://nodejs.org/en/)
* npm packages
    * `@nomiclabs/hardhat-ethers`
    * `@nomiclabs/hardhat-waffle`
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

## Authors

[Juuddi](https://github.com/Juuddi)
