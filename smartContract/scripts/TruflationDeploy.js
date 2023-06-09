const hre = require("hardhat");

async function main() {
  const Truflation= await hre.ethers.getContractFactory("TruflationTester");
  const truflation = await Truflation.deploy("0x6888BdA6a975eCbACc3ba69CA2c80d7d7da5A344","d220e5e687884462909a03021385b7ae","50000000000000000","0x326C977E6efc84E512bB9C30f76E30c160eD06FB");
  await truflation.deployed();
  console.log("Truflation Tester deployed to:", truflation.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});