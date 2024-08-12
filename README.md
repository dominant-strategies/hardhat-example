## hardhat-example

`hardhat-example` provides a simple smart contract deployment framework using the Hardhat development kit on Quai Network using either **Solidity or SolidityX**.

### Solidity vs. SolidityX

You can deploy smart contracts to Quai Network using either regular Solidity or the Quai Network specific SolidityX. The primary difference between the two is that SolidityX supports additional [cross-chain features](https://docs.qu.ai/build/smart-contracts/opcode-additions). You can read more about the differences between Solidity and SolidityX [here](https://docs.qu.ai/build/smart-contracts/languages/overview).

### How do I choose which one to use?

**Solidity:**

- **Recommended for developers new to Quai Network**
- Single chain deployments without cross-chain functionality
- Easier to use, deploy, and test + compatible with existing Solidity tooling
- Supports any previously existing Solidity compiler version
- Can utilize pre-existing Solidity contract libraries like [`@openzeppelin/contracts`](https://www.npmjs.com/package/@openzeppelin/contracts).
- Recommended for most use cases

**SolidityX:**

- **Recommended for more advanced developers looking to experiment with cross-chain functionality**
- Enables cross-chain contract deployments
- Requires a different compiler and additional configuration (more difficult to configure)
- Not compatible with pre-existing Solidity contract libraries.
- Will be forward compatible with [dynamic scaling events](https://docs.qu.ai/learn/advanced-introduction/poem/infinite-execution-shards/dynamic-sharding)

### Start Developing

To get started with Solidity contract deployments, navigate to the `Solidity` directory and checkout the [Solidity directory README.md](./Solidity/README.md).

To get started with SolidityX contract deployments, navigate to the `SolidityX` directory and checkout the [SolidityX directory README.md](./SolidityX/README.md).
