// Import ethers from ethers.js
const { ethers } = require('ethers');

// Function to encode the function call for `updateDaoSettings`
async function encodeUpdateDaoSettings() {
    // Define the contract's ABI fragment for the `updateDaoSettings` function
    const abiFragment = [
        "function updateDaoSettings((string name, bytes data) _daoParams)"
    ];

    // Define the contract interface using the ABI fragment
    const iface = new ethers.utils.Interface(abiFragment);

    // Define the parameters for the `DaoSettings` struct
    const daoParams = {
        name: 'NewDAOName',  // New DAO name
        data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes('NewDAOData')) // New DAO data as bytes
    };

    // Encode the function call with the struct (tuple) as parameter
    const encodedData = iface.encodeFunctionData('updateDaoSettings', [daoParams]);

    // Return the encoded data for further use
    return encodedData;
}

// Call the function to encode and get the encoded data
encodeUpdateDaoSettings().then((encodedData) => {
    // Example of creating the Action struct in the desired format
    const action = [
        '0x358AA13c52544ECCEF6B0ADD0f801012ADAD5eE3', // Address of the contract
        0, // Value in wei to send (usually 0 for function calls)
        encodedData // Encoded function data
    ];

    // Log the action tuple array in the desired format
    console.log("Action Tuple Array:", JSON.stringify([action]));
});
