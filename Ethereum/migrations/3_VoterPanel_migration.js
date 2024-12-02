const VoterPanel = artifacts.require("VoterPanel");

module.exports = async function (deployer, network, accounts) {
  // Replace with your actual AdminPanel contract address
  const adminPanelAddress = "0x69806386563273bcF9A2E1852c15a8B4C7070Fe2";

  console.log(`Deploying VoterPanel with AdminPanel address: ${adminPanelAddress}`);

  await deployer.deploy(VoterPanel, adminPanelAddress);

  const voterPanelInstance = await VoterPanel.deployed();
  console.log("VoterPanel deployed successfully at address:", voterPanelInstance.address);
};
