// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";

interface IToken is IERC20, IERC20Permit {
    function burn(address account, uint256 amount) external ;
    function mint(address account, uint256 amount) external ;
    function balanceOf(address account) external view returns (uint256);
    function decimals() external view returns (uint8) ;
    function name() external view returns (string memory);
    function symbol() external view  returns (string memory);

}