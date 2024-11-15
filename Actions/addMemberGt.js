const { ethers } = require('ethers');

// Function to encode the `addDAOMembers` function call
async function encodeAddDAOMembers() {
    // Define the ABI fragment for the `addDAOMembers` function
    const abiFragment = [
        "function addDAOMembers((address memberAddress, uint256 deposit)[] members) external"
    ];

    // Define the contract interface using the ABI fragment
    const iface = new ethers.utils.Interface(abiFragment);

    // Define the parameters for the `DAOMember` struct array
    const members = [
        {
            memberAddress: '0x744ffD0001f411D781B6df6B828C76d32B65076E',  // Example member address 1
            deposit: ethers.utils.parseEther("1.0")  // Example deposit 1 (1 Ether)
        }
       
    ];

    // Encode the function call with the array of structs as a parameter
    const encodedData = iface.encodeFunctionData('addDAOMembers', [members]);

    // Return the encoded data for further use
    return encodedData;
}

// Call the function to encode and get the encoded data
encodeAddDAOMembers().then((encodedData) => {
    // Example of creating the Action struct in the desired format
    const action = [
        '0x2F8c027fDa4d2437a3546241d710831951aF4003', // Address of the contract
        0, // Value in wei to send (usually 0 for function calls)
        encodedData // Encoded function data
    ];

    // Log the action tuple array in the desired format
    console.log("Action Tuple Array:", JSON.stringify([action]));
});
