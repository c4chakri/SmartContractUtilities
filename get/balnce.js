const { ethers } = require('ethers');

// Function to get the token balance of an address
async function getTokenBalance(rpcUrl, contractAddress, walletAddress) {
    // Connect to the Ethereum network via the provided RPC URL
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    // ERC20 ABI - Only the `balanceOf` function is needed
    const erc20Abi = [
        "function balanceOf(address owner) view returns (uint256)"
    ];

    // Create a contract instance with the contract address, ABI, and provider
    const contract = new ethers.Contract(contractAddress, erc20Abi, provider);

    try {
        // Fetch the balance of the wallet address
        const balance = await contract.balanceOf(walletAddress);
        
        // Return the balance formatted as a human-readable string
        return ethers.formatUnits(balance, 18); // Assuming token has 18 decimals
    } catch (error) {
        console.error('Error fetching balance:', error);
        return null;
    }
}

// Example usage:
const rpcUrl = 'YOUR_RPC_URL_HERE';            // Replace with your RPC URL
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your ERC20 contract address
const walletAddress = 'WALLET_ADDRESS_TO_CHECK'; // Replace with the wallet address

getTokenBalance(rpcUrl, contractAddress, walletAddress)
    .then(balance => console.log(`Token Balance: ${balance}`))
    .catch(err => console.error(err));
