const { ethers } = require("ethers");

// Test with Infura Mainnet URL
const provider = new ethers.providers.JsonRpcProvider(
   `https://mainnet.infura.io/v3/your-infura-project-id`
);

provider.getBlockNumber()
    .then((blockNumber) => {
        console.log("Current Block Number:", blockNumber);
    })
    .catch((error) => {
        console.error("Error connecting to Infura:", error);
    });

//test 
