const {ethers} = require("hardhat");

async function main() {
  const Factory = await ethers.getContractFactory("Factory");
  const factory = await Factory.deploy();

  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy("Test", "TST");

  await nft.deployed();
  await factory.deployed();

  console.log("Factory deployed to:", factory.address);
  console.log("NFT deployed to:", nft.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
