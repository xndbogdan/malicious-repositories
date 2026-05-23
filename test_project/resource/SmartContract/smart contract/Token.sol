// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract Token is ERC20, ERC20Permit {
    
    uint8 private _decimals;
    event remainToken(address msgSemder, uint256 amount);
    constructor(string memory _name, string memory _symboly, uint256 _initialSupply, uint8 decimalValues) ERC20(_name, _symboly) ERC20Permit(_name) {
        _decimals = decimalValues;
        _mint(msg.sender, _initialSupply*10**decimalValues);
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    function burn(address account, uint256 amount) public {
        _burn(account, amount*10**_decimals);
    }

    function balanceOf(address account) public override  view returns (uint256) {
        return super.balanceOf(account);
    }

    function mint (address account, uint256 amount) public {
        _mint(account, amount*10**_decimals);
    } 

}
