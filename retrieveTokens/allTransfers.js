const { ethers } = require("ethers");

const INFURA_URL = "https://sepolia.infura.io/v3/e427baed8ae44e6ba79e542b53c0a524";
const userAddress = "0xBBe52729c820470fce82A959b8E983985F15528d";

const getAllTokenBalancesAndTransfers = async (userAddress) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);
    const network = await provider.getNetwork();
    console.log(`Connected to network: ${network.name} (chainId: ${network.chainId})\n`);

    // Fetch Ether balance
    const etherBalance = await provider.getBalance(userAddress);
    console.log(`ETH: ${ethers.utils.formatEther(etherBalance)}\n`);

    // Transfer event signature
    const TRANSFER_EVENT_SIGNATURE = ethers.utils.id("Transfer(address,address,uint256)");

    // Fetch incoming transactions (to the user address)
    const incomingLogs = await provider.getLogs({
      fromBlock: "earliest",
      toBlock: "latest",
      topics: [TRANSFER_EVENT_SIGNATURE, null, ethers.utils.hexZeroPad(userAddress, 32)],
    });

    // Fetch outgoing transactions (from the user address)
    const outgoingLogs = await provider.getLogs({
      fromBlock: "earliest",
      toBlock: "latest",
      topics: [TRANSFER_EVENT_SIGNATURE, ethers.utils.hexZeroPad(userAddress, 32)],
    });

    // Combine and sort logs by block number and transaction index
    const allLogs = [...incomingLogs, ...outgoingLogs].sort((a, b) => {
      if (a.blockNumber === b.blockNumber) {
        return a.transactionIndex - b.transactionIndex;
      }
      return a.blockNumber - b.blockNumber;
    });

    const ERC20_ABI = [
      "event Transfer(address indexed from, address indexed to, uint256 value)",
      "function balanceOf(address account) external view returns (uint256)",
      "function decimals() external view returns (uint8)",
      "function symbol() external view returns (string)",
    ];

    const iface = new ethers.utils.Interface(ERC20_ABI);

    for (let log of allLogs) {
      try {
        // Decode the Transfer event
        const parsedLog = iface.parseLog(log);

        const from = parsedLog.args.from;
        const to = parsedLog.args.to;
        const value = parsedLog.args.value;

        const contract = new ethers.Contract(log.address, ERC20_ABI, provider);
        const symbol = await contract.symbol();
        const decimals = await contract.decimals();

        // Fetch block timestamp for log
        const block = await provider.getBlock(log.blockNumber);
        const timestamp = new Date(block.timestamp * 1000).toISOString();

        console.log(`Timestamp: ${timestamp}`);
        console.log(`Token: ${symbol}`);
        console.log(`From: ${from}`);
        console.log(`To: ${to}`);
        console.log(`Value: ${ethers.utils.formatUnits(value, decimals)}\n`);
      } catch (err) {
        console.log(`Error decoding log for token at ${log.address}: ${err.message}`);
      }
    }
  } catch (error) {
    console.error("Error connecting to provider or fetching data:", error.message);
  }
};

getAllTokenBalancesAndTransfers(userAddress);
