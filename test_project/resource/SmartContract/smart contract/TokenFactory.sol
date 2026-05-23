// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Token.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interface/IToken.sol";

contract TokenFactory {

    address[] public TokenList;
    uint8 public decimal;

    event TokenCreated(address indexed tokenAddress, string tokenName, string tokenSymbol);
    event getBalances(uint256 balances);

    function createToken(string memory _name, string memory _symbol, uint256 _initialSupply, uint8 _decimals, uint _salt) public returns (address) {
        decimal = _decimals;
        Token newToken = new Token{
            salt: bytes32(_salt)
        }(_name, _symbol, _initialSupply, _decimals);
        newToken.transfer(msg.sender, _initialSupply*10**_decimals);
        TokenList.push(address(newToken));
        emit TokenCreated(address(newToken), newToken.name(), newToken.symbol()); 
        return address(newToken);
    }

    function burnToken(uint256 amount, address tokenAddress) public returns(uint256) {
        IToken token = IToken(tokenAddress);
        uint256 balanceBeforeBurn = token.balanceOf(msg.sender);
        require(balanceBeforeBurn >= amount, "Insufficiant balance");
        token.burn(msg.sender, amount);
        uint256 remainingBalance = token.balanceOf(msg.sender);
        emit getBalances(remainingBalance);
        return remainingBalance;
    }

    function getTokenList() public view  returns (address[] memory) {
        return TokenList;
    }

    function getBalance(address tokenAddress) public view returns (uint256) {
        IToken token = IToken(tokenAddress);
        uint256 balances = token.balanceOf(msg.sender)/10**decimal;
        return balances;
    }

    function getAddress(bytes memory bytecode, uint _salt) public view returns (address) {
        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff), address(this), _salt, keccak256(bytecode)
          )
        );
        return address (uint160(uint(hash)));
    }

    function deploy(bytes memory bytecode, uint salt) public returns(address) {
        address addr;
        assembly {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }

        return addr;
    }


    function getBytecode(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 decimals
        ) public pure returns (bytes memory) {
        bytes memory bytecode = type(Token).creationCode;
        return bytecode = abi.encodePacked(bytecode, abi.encode(name, symbol, initialSupply, decimals));
    }

    function deployToken(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 decimals,
        uint salt
    ) public {
        bytes memory bytecode = type(Token).creationCode;
        bytecode = abi.encodePacked(bytecode, abi.encode(name, symbol, initialSupply, decimals));
        deploy(bytecode, salt);
    }

}