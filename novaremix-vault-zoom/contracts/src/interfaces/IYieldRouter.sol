// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.24;

interface IYieldRouter {
    function routeDeposit(uint256 amount) external returns (uint256 routed);
}
