const ConvertLib = artifacts.require('ConvertLib');
const MetaCoin = artifacts.require('MetaCoin');

const deploy = (deployer) => {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
};

export default deploy;