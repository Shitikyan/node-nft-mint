// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20Token is ERC20, Ownable {
    uint8 internal _decimals;
    uint256 internal _max_supply;
    uint256 internal _total_supply = 0;

    constructor(string memory name, string memory symbol, uint8 dec, uint256 supply) ERC20(name, symbol) {
        _decimals = dec;
        _max_supply = supply;
        _transferOwnership(tx.origin);
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function burn(address account, uint256 amount) public {
        require(msg.sender == account || allowance(account, msg.sender) > amount, "The caller is not the owner or does not have sufficient allowance");

        if(msg.sender != account) {
            _spendAllowance(account, msg.sender, amount);
        }

        _burn(account, amount);
        _total_supply -= amount;
    }

    function mint(address account, uint256 amount) public onlyOwner {
        require(_total_supply + amount <= _max_supply, "Max supply cannot be reached.");
        _mint(account, amount);
        _total_supply += amount;
    }

    function getTotalSupply() public view returns(uint256) {
        return _total_supply;
    }

}
