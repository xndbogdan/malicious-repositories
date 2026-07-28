// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.24;

/// @title IsolatedMarket — single-asset isolated lending pool
/// @dev v0.4 — collateral factors enforced per market; no cross-asset contagion
contract IsolatedMarket {
    error MarketPaused();
    error InsufficientLiquidity();
    error UnhealthyPosition();
    error NotLiquidatable();
    error Unauthorized();

    event Supply(address indexed user, uint256 amount);
    event Borrow(address indexed user, uint256 amount);
    event Repay(address indexed user, uint256 amount);
    event Liquidate(address indexed borrower, uint256 repaid, uint256 seized);
    event RouterSet(address indexed router);

    string public immutable id;
    address public immutable asset;
    address public pauseGuardian;
    address public supplyRouter;

    uint256 public totalSupply;
    uint256 public totalBorrow;
    uint256 public immutable collateralFactorBps;
    uint256 public immutable liquidationThresholdBps;
    uint256 public immutable reserveFactorBps;
    bool public paused;

    mapping(address => uint256) public supplyBalance;
    mapping(address => uint256) public borrowBalance;
    mapping(address => uint256) public collateralBalance;

    constructor(
        string memory id_,
        address asset_,
        address pauseGuardian_,
        uint256 collateralFactorBps_,
        uint256 liquidationThresholdBps_,
        uint256 reserveFactorBps_
    ) {
        id = id_;
        asset = asset_;
        pauseGuardian = pauseGuardian_;
        collateralFactorBps = collateralFactorBps_;
        liquidationThresholdBps = liquidationThresholdBps_;
        reserveFactorBps = reserveFactorBps_;
    }

    modifier whenNotPaused() {
        if (paused) revert MarketPaused();
        _;
    }

    function setSupplyRouter(address router_) external {
        require(msg.sender == pauseGuardian, "not guardian");
        require(supplyRouter == address(0) && router_ != address(0), "router set");
        supplyRouter = router_;
        emit RouterSet(router_);
    }

    function setPaused(bool value) external {
        require(msg.sender == pauseGuardian, "not guardian");
        paused = value;
    }

    function utilizationBps() public view returns (uint256) {
        if (totalSupply == 0) return 0;
        return (totalBorrow * 10_000) / totalSupply;
    }

    function borrowRateBps() public view returns (uint256) {
        uint256 u = utilizationBps();
        return 200 + (u * u) / 50_000;
    }

    function depositCollateral(address user, uint256 amount) external whenNotPaused {
        collateralBalance[user] += amount;
    }

    function supply(address user, uint256 amount) external whenNotPaused {
        if (msg.sender != supplyRouter) revert Unauthorized();
        supplyBalance[user] += amount;
        totalSupply += amount;
        emit Supply(user, amount);
    }

    function borrow(address user, uint256 amount) external whenNotPaused {
        if (amount + totalBorrow > totalSupply) revert InsufficientLiquidity();
        if (!_isHealthyForBorrow(user, amount)) revert UnhealthyPosition();
        borrowBalance[user] += amount;
        totalBorrow += amount;
        emit Borrow(user, amount);
    }

    function repay(address user, uint256 amount) external whenNotPaused {
        uint256 debt = borrowBalance[user];
        uint256 pay = amount > debt ? debt : amount;
        borrowBalance[user] -= pay;
        totalBorrow -= pay;
        emit Repay(user, pay);
    }

    function liquidate(address borrower, uint256 repayAmount) external whenNotPaused returns (uint256 seized) {
        if (_isHealthyForLiquidation(borrower)) revert NotLiquidatable();
        uint256 debt = borrowBalance[borrower];
        uint256 pay = repayAmount > debt ? debt : repayAmount;
        borrowBalance[borrower] -= pay;
        totalBorrow -= pay;
        seized = (pay * 105) / 100;
        collateralBalance[borrower] -= seized;
        emit Liquidate(borrower, pay, seized);
    }

    function _isHealthyForBorrow(address user, uint256 extraBorrow) internal view returns (bool) {
        uint256 collateral = collateralBalance[user];
        uint256 debt = borrowBalance[user] + extraBorrow;
        if (debt == 0) return true;
        uint256 maxDebt = (collateral * collateralFactorBps) / 10_000;
        return debt <= maxDebt;
    }

    function _isHealthyForLiquidation(address user) internal view returns (bool) {
        uint256 collateral = collateralBalance[user];
        uint256 debt = borrowBalance[user];
        if (debt == 0) return true;
        uint256 maxDebt = (collateral * liquidationThresholdBps) / 10_000;
        return debt <= maxDebt;
    }
}
