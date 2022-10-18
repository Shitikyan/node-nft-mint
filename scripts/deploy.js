const {ethers} = require("hardhat");

async function main() {

  const DataVault = await ethers.getContractFactory("DataVault");
  const dataVault = await DataVault.deploy();

  await dataVault.deployed();

  console.log("DataVault deployed to:", dataVault.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
