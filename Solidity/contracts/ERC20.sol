// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestERC20 is ERC20, Ownable {
  /**
  * @dev Constructor sets msg.sender as contract owner.
  * @dev Constructor mints initial supply of tokens to contract owner.
  * 
  * @param name Name of the token.
  * @param symbol Symbol of the token.
  * @param initialSupply Initial supply of the token.
  */
  constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) Ownable(msg.sender) {
    _mint(msg.sender, initialSupply);
  }

  /**
  * @dev Mints tokens to the specified address.
  * @dev Modifier onlyOwner restricts the minting function to the contract owner.
  *
  * @param to Address to which tokens are to be minted.
  * @param amount Amount of tokens to be minted.
  */
  function mint(address to, uint256 amount) public onlyOwner {
      _mint(to, amount);
  }
}