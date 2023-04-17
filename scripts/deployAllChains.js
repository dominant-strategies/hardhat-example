const fs = require("fs");
const { exec } = require("child_process");

// Define the different chains you want to deploy to
const chains = [
  "Cyprus1",
  "Cyprus2",
  "Cyprus3",
  "Paxos1",
  "Paxos2",
  "Paxos3",
  "Hydra1",
  "Hydra2",
  "Hydra3",
];

// Path to your rpc.js file
const rpcFile = "./rpc.js";

// Function to update the rpc.js file with the new chain
function updateRpcFile(chain) {
  // Read the original rpc.js content
  const rpcContent = fs.readFileSync(rpcFile, "utf-8");

  // Replace the defaultChain value
  const updatedRpcContent = rpcContent.replace(
    /defaultChain:\s*["'].*["']/,
    `defaultChain: "${chain}"`
  );

  // Write the updated content back to rpc.js
  fs.writeFileSync(rpcFile, updatedRpcContent);
}

// Function to deploy using your deploy.js script
function deployContract() {
  return new Promise((resolve, reject) => {
    exec("node scripts/deploy.js", (error, stdout) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
      }
      console.log(`${stdout}`);
      resolve();
    });
  });
}

(async () => {
  for (const chain of chains) {
    console.log("=====================================");
    console.log(`Deploying to: ${chain}`);
    updateRpcFile(chain);
    await deployContract();
  }
})();
