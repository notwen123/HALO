import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // 1. Deploy AgentIdentity (ERC-8004)
  const AgentIdentity = await ethers.getContractFactory("AgentIdentity");
  const agentIdentity = await AgentIdentity.deploy();
  await agentIdentity.waitForDeployment();
  const agentIdentityAddress = await agentIdentity.getAddress();
  console.log("AgentIdentity deployed to:", agentIdentityAddress);

  // 2. Deploy GuardianRegistry
  const GuardianRegistry = await ethers.getContractFactory("GuardianRegistry");
  const registry = await GuardianRegistry.deploy(agentIdentityAddress);
  await registry.waitForDeployment();
  const registryAddress = await registry.getAddress();
  console.log("GuardianRegistry deployed to:", registryAddress);

  // 3. Deploy MockYieldStrategy
  const MockYieldStrategy = await ethers.getContractFactory("MockYieldStrategy");
  const strategy = await MockYieldStrategy.deploy();
  await strategy.waitForDeployment();
  const strategyAddress = await strategy.getAddress();
  console.log("MockYieldStrategy deployed to:", strategyAddress);

  // 4. Deploy GuardianVault (for the deployer as a first user)
  const GuardianVault = await ethers.getContractFactory("GuardianVault");
  const vault = await GuardianVault.deploy(deployer.address, registryAddress);
  await vault.waitForDeployment();
  const vaultAddress = await vault.getAddress();
  console.log("Initial GuardianVault deployed to:", vaultAddress);

  console.log("\nSummary of Addresses:");
  console.log("---------------------");
  console.log(`AgentIdentity: ${agentIdentityAddress}`);
  console.log(`GuardianRegistry: ${registryAddress}`);
  console.log(`MockYieldStrategy: ${strategyAddress}`);
  console.log(`GuardianVault: ${vaultAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
