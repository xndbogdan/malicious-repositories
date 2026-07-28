// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.24;

import {IsolatedMarket} from "./IsolatedMarket.sol";
import {ZendaroxVault} from "./ZendaroxVault.sol";

/// @title YieldRouter — weighted allocator across isolated markets
/// @notice v0.4 internal QA — production routing logic under audit prep
contract YieldRouter {
    error InvalidWeight();
    error MarketAlreadyRegistered();

    event Rebalance(uint256 totalRouted, uint256 timestamp);
    event StrategyUpdated(bytes32 indexed id, address market, uint256 weightBps);

    ZendaroxVault public immutable vault;
    address public admin;

    struct Strategy {
        IsolatedMarket market;
        uint256 weightBps;
        bool active;
    }

    Strategy[] public strategies;
    mapping(bytes32 => uint256) public strategyIndex;

    constructor(address vault_) {
        vault = ZendaroxVault(vault_);
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "not admin");
        _;
    }

    function registerMarket(bytes32 id, address market, uint256 weightBps) external onlyAdmin {
        if (weightBps == 0 || weightBps > 10_000) revert InvalidWeight();
        if (strategyIndex[id] != 0) revert MarketAlreadyRegistered();
        strategies.push(Strategy({market: IsolatedMarket(market), weightBps: weightBps, active: true}));
        strategyIndex[id] = strategies.length;
        emit StrategyUpdated(id, market, weightBps);
    }

    function totalWeightBps() public view returns (uint256 total) {
        for (uint256 i = 0; i < strategies.length; i++) {
            if (strategies[i].active) total += strategies[i].weightBps;
        }
    }

    function routeDeposit(uint256 amount) external returns (uint256 routed) {
        require(msg.sender == address(vault), "only vault");
        uint256 totalW = totalWeightBps();
        require(totalW > 0, "no strategies");

        for (uint256 i = 0; i < strategies.length; i++) {
            Strategy storage s = strategies[i];
            if (!s.active) continue;
            uint256 slice = (amount * s.weightBps) / totalW;
            s.market.supply(address(vault), slice);
            routed += slice;
        }
        vault.syncAssets(vault.totalAssetsCache() + routed);
        emit Rebalance(routed, block.timestamp);
    }

    function weightedApyBps() external view returns (uint256 apy) {
        uint256 totalW = totalWeightBps();
        if (totalW == 0) return 0;
        for (uint256 i = 0; i < strategies.length; i++) {
            Strategy storage s = strategies[i];
            if (!s.active) continue;
            apy += (s.market.borrowRateBps() * s.weightBps) / totalW;
        }
    }
}
