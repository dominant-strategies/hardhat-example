// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TestERC721 is ERC721URIStorage, Ownable {
  using Strings for uint256;
  string private baseTokenURI;
  uint256 private mintedTokens;
  uint256 private maxTokens;

  /**
  * @dev Constructor sets msg.sender as contract owner.
  * @dev Sets the base token URI.
  * 
  * @param name Name of the token.
  * @param symbol Symbol of the token.
  * @param baseTokenURI_ Base token URI.
  */
  constructor(string memory name, string memory symbol, string memory baseTokenURI_, uint256 maxTokens_) ERC721(name, symbol) Ownable(msg.sender) {
      baseTokenURI = baseTokenURI_;
      mintedTokens = 1;
      maxTokens = maxTokens_;
  }

  /**
  * @dev Mints tokens to the specified address.
  * @dev Modifier onlyOwner restricts the minting function to the contract owner.
  * @dev Restricts the number of tokens that can be minted to 1000.
  * 
  * @param to Address to which tokens are to be minted.
  */
  function mint(address to) public onlyOwner {
      require(mintedTokens < maxTokens, "All tokens have been minted");
      _safeMint(to, mintedTokens);
      mintedTokens++;
  }

  /**
     * @dev Override required by ERC721URIStorage to return the token URI.
     * Adds ".json" to the end of the token ID to match the expected format of the tokenURI.
     * Reverts if token does not exist.
     * 
     * @param tokenId The token ID to return the URI for.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(tokenId <= maxTokens, "Token ID out of range.");
        require(ownerOf(tokenId) != address(0), "Nonexistent token.");
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : "";
    }

  /**
  * @dev Returns the base token URI.
  */
  function _baseURI() internal view virtual override returns (string memory) {
      return baseTokenURI;
  }

  /**
  * @dev Returns the collection size.
  */
  function _maxTokens() public view returns (uint256) {
      return maxTokens;
  }
}