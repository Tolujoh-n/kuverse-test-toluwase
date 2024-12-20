const MintableNFT = artifacts.require("MintableNFT");

module.exports = function (deployer) {
  deployer.deploy(MintableNFT);
};
