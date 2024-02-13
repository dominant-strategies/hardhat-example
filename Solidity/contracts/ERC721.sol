// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TestERC721 is ERC721, Ownable {
  using Strings for uint256;
  string private baseTokenURI;
  uint256 private mintedTokens;

  /**
  * @dev Constructor sets msg.sender as contract owner.
  * @dev Sets the base token URI.
  * 
  * @param name Name of the token.
  * @param symbol Symbol of the token.
  * @param baseTokenURI_ Base token URI.
  */
  constructor(string memory name, string memory symbol, string memory baseTokenURI_) ERC721(name, symbol) Ownable(msg.sender) {
      baseTokenURI = baseTokenURI_;
      mintedTokens = 0;
  }

  /**
  * @dev Mints tokens to the specified address.
  * @dev Modifier onlyOwner restricts the minting function to the contract owner.
  * @dev Restricts the number of tokens that can be minted to 1000.
  * 
  * @param to Address to which tokens are to be minted.
  */
  function mint(address to) public onlyOwner {
      require(mintedTokens < 1000, "All tokens have been minted");
      _safeMint(to, mintedTokens);
      mintedTokens++;
  }

  /**
  * @dev Sets the base token URI.
  */
  function _baseURI() internal view virtual override returns (string memory) {
      return baseTokenURI;
  }
}