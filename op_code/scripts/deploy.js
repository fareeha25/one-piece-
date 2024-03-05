const { ethers } = require("hardhat");

async function main() {
  // Deploying OnePieceNFT contract
  const OnePieceNFT = await ethers.getContractFactory("OnePieceNFT");
  console.log("Deploying OnePieceNFT...");
  const onePieceNFT = await OnePieceNFT.deploy();
  // await onePieceNFT.deployed();
  console.log("OnePieceNFT deployed to:", onePieceNFT.address);

  // Deploying OnePiecePersonalityDapp contract
  const OnePiecePersonalityDapp = await ethers.getContractFactory(
    "OnePiecePersonalityDapp"
  );
  console.log("Deploying OnePiecePersonalityDapp...");
  const onePiecePersonalityDapp = await OnePiecePersonalityDapp.deploy(
    onePieceNFT.address, // _nftContract
    vrfCoordinatorV2Address, SubId, keyHash, callbackGasLimit);
  // await onePiecePersonalityDapp.deployed();
  console.log(
    "OnePiecePersonalityDapp deployed to:",
    onePiecePersonalityDapp.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });