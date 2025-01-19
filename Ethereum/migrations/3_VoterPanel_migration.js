const VoterPanel = artifacts.require("VoterPanel");

module.exports = async function (deployer, network, accounts) {
  // Replace with your actual AdminPanel contract address
  const adminPanelAddress = "0x5020DCe39340e3792040F0a59e002F956416AF58";

  console.log(`Deploying VoterPanel with AdminPanel address: ${adminPanelAddress}`);

  await deployer.deploy(VoterPanel, adminPanelAddress);

  const voterPanelInstance = await VoterPanel.deployed();
  console.log("VoterPanel deployed successfully at address:", voterPanelInstance.address);
};
