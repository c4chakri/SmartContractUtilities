// Import ethers.js library
const { ethers } = require('ethers');

// Replace with your Sepolia RPC URL
const sepoliaRpcUrl = 'https://data-seed-prebsc-1-s1.bnbchain.org:8545';

// Create a provider connected to Sepolia network
const provider = new ethers.providers.JsonRpcProvider(sepoliaRpcUrl);

// Replace with the transaction hash you want to query
const txHash = '0xf61f2143b08491dcbc4c24e90bb4aa71ccadcd5be0623d5eea88bfed6e0a2bc2';

async function getTransactionTimestamp(txHash) {
  try {
    // Fetch the transaction details using its hash
    const tx = await provider.getTransaction(txHash);

    if (!tx) {
      console.log("Transaction not found");
      return;
    }

    // Fetch the block details using the block number from the transaction
    const block = await provider.getBlock(tx.blockNumber);

    // Get the timestamp from the block
    const timestamp = block.timestamp;

    // Convert timestamp to a readable date
    const date = new Date(timestamp * 1000);
    console.log(`Transaction Timestamp: ${date}`);
  } catch (error) {
    console.error('Error fetching transaction timestamp:', error);
  }
}

// Call the function with the transaction hash
getTransactionTimestamp(txHash);
