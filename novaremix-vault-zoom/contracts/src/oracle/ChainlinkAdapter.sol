// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.24;

/// @title ChainlinkAdapter — oracle boundary for isolated markets
/// @dev v0.4 uses adapter pattern; production feeds wired at deployment
interface AggregatorV3Interface {
    function latestRoundData()
        external
        view
        returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
}

contract ChainlinkAdapter {
    error StalePrice();
    error InvalidPrice();

    AggregatorV3Interface public immutable feed;
    uint256 public immutable maxStaleness;

    constructor(address feed_, uint256 maxStaleness_) {
        feed = AggregatorV3Interface(feed_);
        maxStaleness = maxStaleness_;
    }

    function latestPrice() external view returns (uint256 price, uint256 updatedAt) {
        (, int256 answer,, uint256 ts,) = feed.latestRoundData();
        if (block.timestamp - ts > maxStaleness) revert StalePrice();
        if (answer <= 0) revert InvalidPrice();
        price = uint256(answer);
        updatedAt = ts;
    }
}
