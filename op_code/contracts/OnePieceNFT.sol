// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OnePieceNFT is ERC721URIStorage, Ownable {
    mapping(uint256 => address) public s_requestIdToSender; // a mapping from requestId to the address that made that request
    mapping(address => uint256) public s_addressToCharacter; // a mapping to map address to the house they got
    mapping(address => bool) public hasMinted; // a mapping to track if an address has already minted an NFT
    mapping(address => string) public s_addressToName; //a mapping to associate names with addresses


    uint256 private s_tokenCounter;

    string[] internal characterTokenURIs = [
        "https://scarlet-live-iguana-759.mypinata.cloud/ipfs/QmNp4sHf4ccqPpqMBUCSG1CpFwFR4D6kgHesxc1mLs75am",
        "https://scarlet-live-iguana-759.mypinata.cloud/ipfs/QmPHaFt55PeidgCuXe2kaeRYmLaBUPE1Y7Kg4tDyzapZHy",
        "https://scarlet-live-iguana-759.mypinata.cloud/ipfs/QmP9pC9JuUpKcnjUk8GBXEWVTGvK3FTjXL91Q3MJ2rhA16",
        "https://scarlet-live-iguana-759.mypinata.cloud/ipfs/QmSnNXo5hxrFnpbyBeb7jY7jhkm5eyknaCXtr8muk31AHK"
    ]; // [Gryffindor, Hufflepuff, Ravenclaw, Slytherin]

    event NftMinted(uint256 house, address minter, string name);

    constructor() Ownable(msg.sender) ERC721("One Piece NFT", "OPT") {
        s_tokenCounter = 0;
    }

    // Read-only function to check whether a user has minted an NFT
    function hasMintedNFT(address _user) public view returns (bool) {
        return hasMinted[_user];
    }

    // Read-only function to get the house index mapped to the user
    function getHouseIndex(address _user) public view returns (uint256) {
        return s_addressToCharacter[_user];
    }

    //Function to mint NFT according to the house index
    function mintNFT(address recipient, uint256 character, string memory name) external onlyOwner {
        require(!hasMinted[recipient], "You have already minted your house NFT"); // Ensure the address has not minted before

        uint256 tokenId = s_tokenCounter;
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, characterTokenURIs[character]);

        s_addressToCharacter[recipient] = character; //map house to address
        s_addressToName[recipient] = name; // map name to address

        s_tokenCounter += 1;
        hasMinted[recipient] = true; // Mark the address as having minted an NFT

        emit NftMinted(character, recipient, name);
    }

}