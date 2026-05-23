// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Token.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interface/IToken.sol";

contract BridgeToken {

    event BurnToken(address sender, address tokenAddress, uint amount, bytes signature);
    event MintToken(address sender, address tokenAddress, uint amount, bytes signature);

    function burn(
        address tokenAddress, 
        uint amount, 
        bytes calldata signature,
        bytes32 messageHash
        ) external {

        IToken token = IToken(tokenAddress);

        uint256 balanceBeforeBurn = token.balanceOf(msg.sender);
        
        require(recoverSigner(messageHash, signature) == msg.sender, "Invalid signer");
        require(balanceBeforeBurn >= amount, "Insufficiant balance");
        
        token.burn(msg.sender, amount);

        emit BurnToken(msg.sender, tokenAddress, amount, signature);
    }

    function mint(
        address tokenAddress, 
        uint amount, 
        bytes calldata signature,
        bytes32 messageHash       
        ) external {

        require(recoverSigner(messageHash, signature) == msg.sender, "Invalid singer");

        IToken token = IToken(tokenAddress);
        token.mint(msg.sender, amount);

        emit MintToken(msg.sender, tokenAddress, amount, signature);
    }

    function recoverSigner(bytes32 messageHash, bytes memory signature) public pure returns (address) {


        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := byte(0, mload(add(signature, 96)))
        }

        if (v < 27) {
            v += 27;
        }

        address signer =  ecrecover(messageHash, v, r, s);
        return signer;
    }
        
}