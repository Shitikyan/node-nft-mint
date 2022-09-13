// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./NFT.sol";

contract Factory {

    event LogCreatedNFT(address nft);

    mapping(bytes32 => address[]) internal _userContracts;

    constructor() { }

    function createContract(string memory token, string memory name, string memory symbol, string memory baseURI) public returns(address) {
        NFT nft = new NFT(name, symbol, baseURI);

        _userContracts[stringToBytes32(token)].push(address(nft));
        emit LogCreatedNFT(address(nft));
        return address(nft);
    }

    function getUserContracts(string memory token) public view returns(address[] memory){
        return _userContracts[stringToBytes32(token)];
    }

    function stringToBytes32(string memory source) internal view returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

}