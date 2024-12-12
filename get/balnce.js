const { ethers } = require('ethers');

async function getTokenBalance(rpcUrl, contractAddress, walletAddress) {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl, {
        name: 'sepolia',
        chainId: 11155111
    });

    const erc20Abi = [
        "function balanceOf(address owner) view returns (uint256)",
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function decimals() view returns (uint8)",
        "function totalSupply() view returns (uint256)"
    ];

    const contract = new ethers.Contract(contractAddress, erc20Abi, provider);

    try {
        const network = await provider.getNetwork();
        console.log('Connected to network:', network.name, network.chainId);

        const name = await contract.name();
        const symbol = await contract.symbol();
        const decimals = await contract.decimals();
        const totalSupply = await contract.totalSupply();

        console.table({
            name,
            symbol,
            decimals,
            totalSupply: ethers.utils.formatUnits(totalSupply, decimals)
        });

        const balance = await contract.balanceOf(walletAddress);

        return ethers.utils.formatUnits(balance);
    } catch (error) {
        console.error('Error fetching balance:', error);
        return null;
    }
}


const rpcUrl = 'https://sepolia.infura.io/v3/e427baed8ae44e6ba79e542b53c0a524';
const contractAddress = '0x28a9BBCB900e4bE4541761E66681f0704e7aB5Ad';
const walletAddress = '0x8974775bF9Ed9cac57D7cFc40f35c78eFda9Af5d';

getTokenBalance(rpcUrl, contractAddress, walletAddress)
    .then(balance => console.log(`Token Balance: ${balance}`))
    .catch(err => console.error(err));
