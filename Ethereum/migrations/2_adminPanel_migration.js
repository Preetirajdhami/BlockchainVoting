const adminPanel = artifacts.require("adminPanel");

module.exports = function (deployer) {
  deployer.deploy(adminPanel);
};
