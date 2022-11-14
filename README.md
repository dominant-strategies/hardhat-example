## hardhat-example

`hardhat-example` provides a simple smart contract deployment framework using the Hardhat development kit on Quai Network.

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a sample script that deploys that contract.

## Getting Started

* Set your default network inside the `hardhat.config.js` file.
* Define the `PRIVATE_KEY`, `RPC_URL`, and `ROPSTEN_URL` variables inside of `process.env` file.
* In the `.gitignore` file, change `.env` to `process.env` to hide your private key and deployment endpoint.

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
node scripts/sample-script.js
npx hardhat help
```

## Authors

[Juuddi](https://github.com/Juuddi)
