// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {ZendaroxVault} from "../src/core/ZendaroxVault.sol";
import {IsolatedMarket} from "../src/core/IsolatedMarket.sol";
import {YieldRouter} from "../src/core/YieldRouter.sol";

contract ZendaroxVaultTest is Test {
    ZendaroxVault vault;
    YieldRouter router;
    IsolatedMarket ethMarket;
    IsolatedMarket usdcMarket;

    address constant ASSET = address(0xA);
    address admin = address(this);

    function setUp() public {
        vault = new ZendaroxVault(ASSET, address(0), admin);
        router = new YieldRouter(address(vault));
        vault.setRouter(address(router));

        ethMarket = new IsolatedMarket("eth-core", ASSET, admin, 8200, 8600, 1200);
        usdcMarket = new IsolatedMarket("usdc-stable", ASSET, admin, 9000, 9300, 1000);

        ethMarket.setSupplyRouter(address(router));
        usdcMarket.setSupplyRouter(address(router));

        router.registerMarket("eth-core", address(ethMarket), 6000);
        router.registerMarket("usdc-stable", address(usdcMarket), 4000);
    }

    function test_deposit_routes_to_markets() public {
        uint256 shares = vault.deposit(1000 ether, admin);
        assertEq(shares, 1000 ether);
        assertEq(vault.totalAssets(), 1000 ether);
        assertEq(ethMarket.supplyBalance(address(vault)), 600 ether);
        assertEq(usdcMarket.supplyBalance(address(vault)), 400 ether);
    }

    function test_router_total_weight() public view {
        assertEq(router.totalWeightBps(), 10_000);
    }

    function test_market_utilization_curve() public {
        ethMarket.supply(address(vault), 1000 ether);
        ethMarket.depositCollateral(admin, 2000 ether);
        ethMarket.borrow(admin, 400 ether);
        assertEq(ethMarket.utilizationBps(), 4000);
        assertGt(ethMarket.borrowRateBps(), 200);
    }

    function test_liquidate_reverts_when_healthy() public {
        ethMarket.supply(address(vault), 1000 ether);
        ethMarket.depositCollateral(admin, 2000 ether);
        ethMarket.borrow(admin, 400 ether);
        vm.expectRevert(IsolatedMarket.NotLiquidatable.selector);
        ethMarket.liquidate(admin, 1 ether);
    }

    function test_supply_reverts_without_router() public {
        vm.expectRevert(IsolatedMarket.Unauthorized.selector);
        ethMarket.supply(admin, 1 ether);
    }

    function test_pause_blocks_deposit() public {
        vault.setPaused(true);
        vm.expectRevert(ZendaroxVault.Paused.selector);
        vault.deposit(1 ether, admin);
    }

    function testFuzz_deposit_withdraw_roundtrip(uint128 amount) public {
        amount = uint128(bound(amount, 1, 1e24));
        vault.deposit(amount, admin);
        uint256 shares = vault.balanceOf(admin);
        uint256 assets = vault.convertToAssets(shares);
        vault.withdraw(assets, admin, admin);
        assertEq(vault.balanceOf(admin), 0);
    }
}
