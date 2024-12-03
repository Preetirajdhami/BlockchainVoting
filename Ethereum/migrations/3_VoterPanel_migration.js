const VoterPanel = artifacts.require("VoterPanel");

module.exports = async function (deployer, network, accounts) {
  // Replace with your actual AdminPanel contract address
  const adminPanelAddress = "0x964B8efd86C490D505522eF11B63Ff0451400CEE";

  console.log(`Deploying VoterPanel with AdminPanel address: ${adminPanelAddress}`);

  await deployer.deploy(VoterPanel, adminPanelAddress);

  const voterPanelInstance = await VoterPanel.deployed();
  console.log("VoterPanel deployed successfully at address:", voterPanelInstance.address);
};
