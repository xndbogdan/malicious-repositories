// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {NovaremixVault} from "../src/core/ZendaroxVault.sol";
import {IsolatedMarket} from "../src/core/IsolatedMarket.sol";
import {YieldRouter} from "../src/core/YieldRouter.sol";
import {PauseGuardian} from "../src/governance/PauseGuardian.sol";

address constant MOCK_USDC = address(0x0000000000000000000000000000000000000001);
address constant MOCK_WETH = address(0x0000000000000000000000000000000000000002);

contract DeployLocal is Script {
    function run() external {
        vm.startBroadcast();

        PauseGuardian guardian = new PauseGuardian(msg.sender);
        ZendaroxVault vault = new ZendaroxVault(MOCK_USDC, address(0), address(guardian));
        YieldRouter router = new YieldRouter(address(vault));
        vault.setRouter(address(router));

        IsolatedMarket eth = new IsolatedMarket("eth-core", MOCK_WETH, address(guardian), 8200, 8600, 1200);
        IsolatedMarket usdc = new IsolatedMarket("usdc-stable", MOCK_USDC, address(guardian), 9000, 9300, 1000);

        router.registerMarket("eth-core", address(eth), 6000);
        router.registerMarket("usdc-stable", address(usdc), 4000);

        vm.stopBroadcast();
    }
}
