// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "../interface/IToken.sol";

contract EstokkYam is 
    PausableUpgradeable,
    AccessControlUpgradeable,
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable
{
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bytes32 public constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");

    enum TokenType {
        NOTWHITELISTEDTOKEN,
        REALTOKEN,
        ERC20WITHPERMIT,
        ERC20WITHOUTPERMIT
    }

    event OfferCreated(address OfferToken, address buyerToken, address sendAddress, address buyer, uint256 OfferId, uint256 price, uint256 amount);
    event TokenWhitelistWithTypeToggled(address[] tokenAddress, TokenType[] tokenType);
    event OfferUpdated(uint256 OfferId, uint256 price, uint256 priceId, uint256 amountId, uint256 amount);
    event FeeChanged(uint256 preFee, uint256 nextFee);
    event OfferDeleted(uint256 OfferId);
    event OfferAccepted(uint256 OfferId, address seller, address owner, address Offertoken, address buyerToken, uint256 price, uint256 amount);

    mapping(uint256 => uint256) private prices;
    mapping(uint256 => uint256) private amounts;
    mapping(uint256 => address) private offerTokens;
    mapping(uint256 => address) private buyerTokens;
    mapping(uint256 => address) private sellers;
    mapping(uint256 => address) private buyers;
    mapping(address => TokenType) private tokenTypes;
    uint256 private offerCount;
    uint public fee;
    mapping(uint256 => uint256) private offerBlockNumbers;

    constructor() {
        _disableInitializers();
    }

    function initialize(address admin_, address moderator_) external initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, admin_);
        _grantRole(UPGRADER_ROLE, admin_);
        _grantRole(MODERATOR_ROLE, moderator_);
        __ReentrancyGuard_init();
    }

    function _authorizeUpgrade(address newImplementation) internal override  onlyRole(UPGRADER_ROLE)
    {}

    modifier onlyModeratorOrAdmin() {
        require(
            hasRole(MODERATOR_ROLE, _msgSender()) ||
                hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
                "caller is not moderator or admin"
        );
        _;
    }

    modifier onlyWhitelistTokenWithType(address token_) {
        require(
            tokenTypes[token_] != TokenType.NOTWHITELISTEDTOKEN,
            "Token is not whitelisted"
        );
        _;
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function toggleWhitelistWithType(
        address[] calldata tokens_,
        TokenType[] calldata types_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 length = tokens_.length;
        require(types_.length == length, "Length are not equil");
        for (uint256 i = 0; i< length; ) {
            tokenTypes[tokens_[i]] = types_[i];
        }
        emit TokenWhitelistWithTypeToggled(tokens_, types_);
    }

    function createOffer(
        address offerToken,
        address buyerToken,
        address buyer,
        uint256 price,
        uint256 amount
    ) public whenNotPaused {
        // if(tokenTypes[offerToken] == TokenType.REALTOKEN) {
        //     require(
        //         _isTransferValid(offerToken, msg.sender, msg.sender, amount),
        //         "Seller can not transfer tokens"
        //     );
        // }
        _createOffer(offerToken, buyerToken, buyer, price, amount);
    }

    function _createOffer(
        address _offerToken,
        address _buyerToken,
        address _buyer,
        uint256 _price,
        uint256 _amount
    ) private onlyWhitelistTokenWithType(_offerToken) onlyWhitelistTokenWithType(_buyerToken) {
        uint256 _offerId = offerCount;
        offerCount++;
        if(_buyer != address(0)) {
            buyers[_offerId] = _buyer;
        }
        sellers[_offerId] = msg.sender;
        offerTokens[_offerId] = _offerToken;
        buyerTokens[_offerId] = _buyerToken;
        prices[_offerId] = _price;
        amounts[_offerId] = _amount;
        offerBlockNumbers[_offerId] = block.number;

        emit OfferCreated(
            _offerToken,
            _buyerToken,
            msg.sender,
            _buyer,
            _offerId,
            _price,
            _amount
        );

    }
    function createOfferWithPermit(
        address offerToken,
        address buyerToken,
        address buyer,
        uint256 price,
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external whenNotPaused {
        // if(tokenTypes[offerToken] == TokenType.REALTOKEN) {
        //     require(
        //         _isTransferValid(offerToken, msg.sender, msg.sender, amount),
        //         "Seller can no transfer tokens"
        //     );
        // }

        _createOffer(offerToken, buyerToken, buyer, price, amount);
        uint256 amountToPermit = amount + IToken(offerToken).allowance(msg.sender, address(this));
        IToken(offerToken).permit(
            msg.sender,
            address(this),
            amountToPermit,
            deadline,
            v, r, s
        );
    }
 

    function buy(
        uint256 offerId,
        uint256 price,
        uint256 amount
    ) external whenNotPaused {
        _buy(offerId, price, amount);
    }

    function updateOffer(
        uint256 offerId,
        uint256 price,
        uint256 amount
    ) external whenNotPaused {
        _updateOffer(offerId, price, amount);
    }

    function updatedOfferWithPermit(
        uint256 offerId,
        uint256 price,
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external whenNotPaused {
        uint256 amountToPermit = IToken(offerTokens[offerId]).allowance(
            msg.sender,
            address(this)
        ) + amount - amounts[offerId];

        IToken(offerTokens[offerId]).permit(
            msg.sender,
            address(this),
            amountToPermit,
            deadline,
            v,
            r,
            s
        );
        _updateOffer(offerId, price, amount);

    }

    function deleteOffer(uint256 offerId) public whenNotPaused {
        require(sellers[offerId] == msg.sender, "only the seller can delete offer");
        _deleteOffer(offerId);
    }

    function deleteOfferBatch(uint256[] calldata offerIds) external whenNotPaused {
        uint256 length = offerIds.length;
        for (uint256 i = 0; i<length; ) {
            deleteOffer(offerIds[i]);
            ++i;
        }
    }

    function deleteOfferByAdmin(uint256[] calldata offerIds) external view onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 length = offerIds.length;
        for (uint256 i = 0; i< length; ) {
            ++i;
        }
    }

    function getOfferCount() external view returns (uint256) {
        return offerCount;
    }

    function getTokenType(address token) external view returns (TokenType) {
        return tokenTypes[token];
    }

    function _deleteOffer(uint256 _offerId) private {
        delete sellers[_offerId];
        delete buyers[_offerId];
        delete offerTokens[_offerId];
        delete buyerTokens[_offerId];
        delete prices[_offerId];
        delete amounts[_offerId];
        emit OfferDeleted(_offerId);
    }

    function tokenInfo(address tokenAddr) external view returns (
        uint256,
        string memory,
        string memory
    ) {
        IToken tokenInterface = IToken(tokenAddr);
        return (
            tokenInterface.decimals(),
            tokenInterface.symbol(),
            tokenInterface.name()
        );
    }

    function getInistialOffer(uint256 offerId) external view returns (
        address, address, address, address, uint256, uint256
    ) {
        return (
            offerTokens[offerId],
            buyerTokens[offerId],
            sellers[offerId],
            buyers[offerId],
            prices[offerId],
            amounts[offerId]
        );
        
    }

    function showOffer(uint256 offerId) external view returns (
        address,
        address,
        address,
        address,
        uint256,
        uint256
    ) {
        uint256 availableBalance = IERC20(offerTokens[offerId]).balanceOf(
            sellers[offerId]
        );
        uint256 availableAllow = IERC20(offerTokens[offerId]).allowance(
            sellers[offerId],
            address(this)
        );
        uint256 availableAmount = amounts[offerId];

        if(availableAmount < availableAmount) {
            availableAmount = availableBalance;
        }

        if(availableAllow < availableAmount) {
            availableAllow = availableAllow;
        }

        return (
            offerTokens[offerId],
            buyerTokens[offerId],
            sellers[offerId],
            buyers[offerId],
            prices[offerId],
            availableAmount
        );
    }

    function pricePreview(uint256 offerId, uint256 amount) external view returns (uint256) {
        IToken offerTokenInterface = IToken(offerTokens[offerId]);
        return 
        (amount * prices[offerId])/
        (uint256(10)**offerTokenInterface.decimals());
    }

    function saveLostTokens(address token) external onlyModeratorOrAdmin {
        IERC20 tokenInterface = IERC20(token);
        tokenInterface.transfer(
            msg.sender,
            tokenInterface.balanceOf(address(this))
        );
    }

    function setFee(uint256 fee_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        emit FeeChanged(fee, fee_);
        fee = fee_;
    }

    function updateOfferWithPermit(
        uint256 offerId,
        uint256 price,
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external whenNotPaused {
        // Permit new amount
        uint256 amountToPermit = IToken(offerTokens[offerId]).allowance(
            msg.sender,
            address(this)
        ) +
        amount -
        amounts[offerId];
        IToken(offerTokens[offerId]).permit(
        msg.sender,
        address(this),
        amountToPermit,
        deadline,
        v,
        r,
        s
        );
        // Then update the offer
        _updateOffer(offerId, price, amount);
    }

    function _updateOffer(
        uint256 _offerId,
        uint256 _price,
        uint256 _amount
    ) private {
        require(
            sellers[_offerId] == msg.sender,
            "only the seller can change offer"
        );
        emit OfferUpdated(
            _offerId,
            prices[_offerId],
            _price,
            amounts[_offerId],
            _amount
        );
        prices[_offerId] = _price;
        amounts[_offerId] = _amount;
    }

    function _buy(
        uint256 _offerId,
        uint256 _price,
        uint256 _amount
    ) private {
        if (buyers[_offerId] != address(0)){
            require(buyers[_offerId] == msg.sender, "Private offer");
        }

        address seller = sellers[_offerId];
        address offerToken = offerTokens[_offerId];
        address buyerToken = buyerTokens[_offerId];

        IToken offerTokenInterface = IToken(offerToken);
        IToken buyerTokenInterface = IToken(buyerToken);

        require(prices[_offerId] == _price, "offer price wrong");
        require(_amount <= amounts[_offerId], "amount too high");
        require(
            _amount * _price > (uint256(10)**offerTokenInterface.decimals()),
            "amount too low"
        );

        uint256 buyerTokenAmount = (_amount * _price) /
            (uint256(10)**offerTokenInterface.decimals());

        uint256 oldBuyerBalance = buyerTokenInterface.balanceOf(msg.sender);
        uint256 oldSellerBalance = offerTokenInterface.balanceOf(seller);

        amounts[_offerId] = amounts[_offerId] - _amount;
        buyerTokenInterface.transferFrom(msg.sender, seller, buyerTokenAmount);
        offerTokenInterface.transferFrom(seller, msg.sender, _amount);

        require(
            oldBuyerBalance > buyerTokenInterface.balanceOf(msg.sender),
            "buyer error"
        );
        require(
            oldSellerBalance > offerTokenInterface.balanceOf(seller),
            "seller error"
        );

        emit OfferAccepted(
            _offerId,
            seller,
            msg.sender,
            offerToken,
            buyerToken,
            _price,
            _amount
        );
    }


    function createOfferBatch(
        address[] calldata _offerTokens,
        address[] calldata _buyreTokens,
        address[] calldata _buyers,
        uint256[] calldata _prices,
        uint256[] calldata _amounts
    ) external whenNotPaused {
        uint256 length = _offerTokens.length;
        require(
            _buyreTokens.length == length &&
                _buyers.length == length &&
                _prices.length == length &&
                _amounts.length == length,
            "length mismatch"

        );
        for (uint256 i = 0; i < length; ) {
            createOffer(
                _offerTokens[i],
                _buyreTokens[i],
                _buyers[i],
                _prices[i],
                _amounts[i]
            );
            ++i;
        }
    }

    function updateOfferBatch(
        uint256[] calldata _offerIds,
        uint256[] calldata _prices,
        uint256[] calldata _amounts
    ) external whenNotPaused {
        uint256 length = _offerIds.length;
        require(
        _prices.length == length && _amounts.length == length,
        "length mismatch"
        );
        for (uint256 i = 0; i < length; ) {
        _updateOffer(_offerIds[i], _prices[i], _amounts[i]);
        ++i;
        }
    }

    
}