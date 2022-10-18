// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC20Token.sol";

contract ERC20TokenFactory {

    event LogCreatedNFT(address nft);

    mapping(bytes32 => address[]) internal _userContracts;

    constructor() { }

    function createContract(string memory token, string memory name, string memory symbol, uint8 dec, uint256 max_supply) public returns(address) {
        ERC20Token new_contract = new ERC20Token(name, symbol, dec, max_supply);

        _userContracts[stringToBytes32(token)].push(address(new_contract));
        emit LogCreatedNFT(address(new_contract));
        return address(new_contract);
    }

    function getUserContracts(string memory token) public view returns(address[] memory){
        return _userContracts[stringToBytes32(token)];
    }

    function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

}