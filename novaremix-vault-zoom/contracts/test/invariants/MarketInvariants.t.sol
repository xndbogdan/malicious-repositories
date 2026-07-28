// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {IsolatedMarket} from "../src/core/IsolatedMarket.sol";

/// @notice Invariant targets for August audit sprint
contract MarketInvariantsTest is Test {
    IsolatedMarket market;
    address user = address(0xBEEF);

    function setUp() public {
        market = new IsolatedMarket("eth-core", address(0xA), address(this), 8200, 8600, 1200);
        market.supply(user, 10_000 ether);
    }

    function invariant_totalBorrow_lte_totalSupply() public view {
        assertLe(market.totalBorrow(), market.totalSupply());
    }

    function invariant_utilization_never_exceeds_100pct() public view {
        assertLe(market.utilizationBps(), 10_000);
    }
}
