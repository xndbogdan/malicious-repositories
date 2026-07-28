// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.24;

import {IYieldRouter} from "../interfaces/IYieldRouter.sol";

/// @title ZendaroxVault — share-based entry vault (ERC-4626-compatible accounting)
/// @notice v0.4 internal QA — deposits route through YieldRouter into isolated markets
contract ZendaroxVault {
    error Paused();
    error ZeroAddress();
    error ZeroAmount();
    error RouterNotSet();

    event Deposit(address indexed caller, address indexed owner, uint256 assets, uint256 shares);
    event Withdraw(
        address indexed caller, address indexed receiver, address indexed owner, uint256 assets, uint256 shares
    );
    event RouterSet(address indexed router);

    string public constant name = "Zendarox Vault Share";
    string public constant symbol = "zdrVault";
    uint8 public constant decimals = 18;

    address public asset;
    address public router;
    address public pauseGuardian;
    bool public paused;

    uint256 public totalAssetsCache;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    modifier whenNotPaused() {
        if (paused) revert Paused();
        _;
    }

    constructor(address asset_, address router_, address pauseGuardian_) {
        if (asset_ == address(0) || pauseGuardian_ == address(0)) revert ZeroAddress();
        asset = asset_;
        router = router_;
        pauseGuardian = pauseGuardian_;
    }

    function setRouter(address router_) external {
        require(router == address(0) && router_ != address(0), "router set");
        router = router_;
        emit RouterSet(router_);
    }

    function setPaused(bool value) external {
        require(msg.sender == pauseGuardian, "not guardian");
        paused = value;
    }

    /// @notice Router-only asset sync after capital is allocated to markets
    function syncAssets(uint256 newTotal) external {
        require(msg.sender == router, "not router");
        totalAssetsCache = newTotal;
    }

    function totalAssets() external view returns (uint256) {
        return totalAssetsCache;
    }

    function deposit(uint256 assets, address receiver) external whenNotPaused returns (uint256 shares) {
        if (assets == 0) revert ZeroAmount();
        if (router == address(0)) revert RouterNotSet();
        shares = convertToShares(assets);
        _mint(receiver, shares);
        IYieldRouter(router).routeDeposit(assets);
        emit Deposit(msg.sender, receiver, assets, shares);
    }

    function withdraw(uint256 assets, address receiver, address owner) external whenNotPaused returns (uint256 shares) {
        if (assets == 0) revert ZeroAmount();
        shares = convertToShares(assets);
        if (msg.sender != owner) {
            uint256 allowed = allowance[owner][msg.sender];
            require(allowed >= shares, "allowance");
            allowance[owner][msg.sender] = allowed - shares;
        }
        _burn(owner, shares);
        totalAssetsCache -= assets;
        emit Withdraw(msg.sender, receiver, owner, assets, shares);
    }

    function convertToShares(uint256 assets) public view returns (uint256) {
        if (totalSupply == 0) return assets;
        require(totalAssetsCache > 0, "empty assets");
        return (assets * totalSupply) / totalAssetsCache;
    }

    function convertToAssets(uint256 shares) public view returns (uint256) {
        if (totalSupply == 0) return shares;
        return (shares * totalAssetsCache) / totalSupply;
    }

    function _mint(address to, uint256 amount) internal {
        balanceOf[to] += amount;
        totalSupply += amount;
    }

    function _burn(address from, uint256 amount) internal {
        balanceOf[from] -= amount;
        totalSupply -= amount;
    }
}
