const {ethers} = require("hardhat");
const {BigNumber} = require("ethers");

async function main() {
  const NFTFactory = await ethers.getContractFactory("NFTFactory");
  const nftFactory = await NFTFactory.deploy();

  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy("Test", "TST");

  const ERC20Factory = await ethers.getContractFactory("ERC20TokenFactory");
  const erc20Factory = await ERC20Factory.deploy();

  const TEN = BigNumber.from(10);
  const ERC20Token = await ethers.getContractFactory("ERC20Token");
  const erc20Token = await ERC20Token.deploy("Test", "TST", 18, TEN.pow(27));

  const DataVault = await ethers.getContractFactory("DataVault");
  const dataVault = await DataVault.deploy();

  await nft.deployed();
  await nftFactory.deployed();
  await erc20Factory.deployed();
  await erc20Token.deployed();
  await dataVault.deployed();

  console.log("NFTFactory deployed to:", nftFactory.address);
  console.log("NFT deployed to:", nft.address);
  console.log("ERC20Factory deployed to:", erc20Factory.address);
  console.log("ERC20Token deployed to:", erc20Token.address);
  console.log("DataVault deployed to:", dataVault.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
