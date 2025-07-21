const VoterPanel = artifacts.require("VoterPanel");

module.exports = async function (deployer, network, accounts) {
  // Replace with  actual AdminPanel contract address
  const adminPanelAddress = "0xC3D8F9101AE21728962D9FE91f46c337E171a1EB";

  console.log(`Deploying VoterPanel with AdminPanel address: ${adminPanelAddress}`);

  await deployer.deploy(VoterPanel, adminPanelAddress);

  const voterPanelInstance = await VoterPanel.deployed();
  console.log("VoterPanel deployed successfully at address:", voterPanelInstance.address);
};
