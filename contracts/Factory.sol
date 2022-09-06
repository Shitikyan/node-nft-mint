// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./NFT.sol";

contract Factory {

    event LogCreatedNFT(address nft);

    constructor() { }

    function createContract(string memory name, string memory symbol, string memory baseURI) public returns(address) {
        NFT nft = new NFT(name, symbol, baseURI);
        emit LogCreatedNFT(address(nft));
        return address(nft);
    }

}