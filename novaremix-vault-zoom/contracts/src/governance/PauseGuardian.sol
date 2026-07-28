// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.24;

/// @title PauseGuardian — circuit breaker for vault + markets
contract PauseGuardian {
    address public owner;
    address public pendingOwner;

    mapping(address => bool) public pausers;

    event PauserUpdated(address indexed account, bool allowed);
    event OwnershipTransferStarted(address indexed pending);
    event OwnershipTransferred(address indexed previous, address indexed next);

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor(address owner_) {
        owner = owner_;
        pausers[owner_] = true;
    }

    function setPauser(address account, bool allowed) external onlyOwner {
        pausers[account] = allowed;
        emit PauserUpdated(account, allowed);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        pendingOwner = newOwner;
        emit OwnershipTransferStarted(newOwner);
    }

    function acceptOwnership() external {
        require(msg.sender == pendingOwner, "not pending");
        emit OwnershipTransferred(owner, pendingOwner);
        owner = pendingOwner;
        pendingOwner = address(0);
    }
}
