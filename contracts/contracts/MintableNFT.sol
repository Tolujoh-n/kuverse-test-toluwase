// Solidity Smart Contract
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMinter is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    // Store additional metadata
    mapping(uint256 => string) public tokenTitles;

    constructor() ERC721("NFTMinter", "NFTM") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function mintNFT(string memory _tokenURI, string memory _title) public {
        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        tokenTitles[newItemId] = _title;

        tokenCounter += 1;
    }

    // fetch token title
    function getTokenTitle(uint256 tokenId) public view returns (string memory) {
        return tokenTitles[tokenId];
    }
}
