const { ethers } = require("ethers");

const INFURA_URL = "https://sepolia.infura.io/v3/e427baed8ae44e6ba79e542b53c0a524";
const userAddress = "0xBBe52729c820470fce82A959b8E983985F15528d";

const getAllTokenBalances = async (userAddress) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);
    const network = await provider.getNetwork();
    console.log(`Connected to network: ${network.name} (chainId: ${network.chainId})\n`);

    // Fetch and display Ether balance
    const etherBalance = await provider.getBalance(userAddress);
    console.log(`ETH: ${ethers.utils.formatEther(etherBalance)}\n`);

    // Fetch logs for the user's address
    const TRANSFER_EVENT_SIGNATURE = ethers.utils.id("Transfer(address,address,uint256)");
    const logs = await provider.getLogs({
      fromBlock: "earliest",
      toBlock: "latest",
      topics: [TRANSFER_EVENT_SIGNATURE, null, ethers.utils.hexZeroPad(userAddress, 32)],
    });

    const tokenAddresses = new Set();
    logs.forEach((log) => tokenAddresses.add(log.address));

    const ERC20_ABI = [
      "function balanceOf(address account) external view returns (uint256)",
      "function decimals() external view returns (uint8)",
      "function symbol() external view returns (string)",
    ];

    for (let tokenAddress of tokenAddresses) {
      try {
        const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
        const balance = await contract.balanceOf(userAddress);
        if (balance.gt(0)) {
          const decimals = await contract.decimals();
          const symbol = await contract.symbol();
          console.log(`${symbol}: ${ethers.utils.formatUnits(balance, decimals)}`);
        }
      } catch (err) {
        console.log(`Error fetching data for token at ${tokenAddress}: ${err.message}`);
      }
    }
  } catch (error) {
    console.error("Error connecting to provider or fetching data:", error.message);
  }
};

getAllTokenBalances(userAddress);
