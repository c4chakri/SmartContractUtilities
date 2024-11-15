const { ethers } = require('ethers');

// Function to encode the `updateDaoSettings` function call
async function encodeUpdateDaoSettings() {
    // Define the contract's ABI fragment for the `updateDaoSettings` function
    
    const abiFragment = [
        "function updateDaoSettings((string name, bytes data) _daoParams)"
    ];
    // Create the interface for the function
    const iface = new ethers.utils.Interface(abiFragment);

    // Define the parameters to pass to the function
    const daoParams = {
        name: 'NewDAONameupdated',  // New DAO name
        data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes('NewDAOData my daytaalfhvadhflkascsad fkjfhaskdf asdflasdfkjlas dfsjahfvkj asfkjasfdhsfkj hasdfkjhasdf')) // New DAO data as bytes
    };

    // Encode the function call
    const encodedData = iface.encodeFunctionData('updateDaoSettings', [daoParams]);

    // Return the encoded data for further use
    return encodedData;
}

// Call the function to encode and create the action
encodeUpdateDaoSettings().then((encodedData) => {
    // Example of creating the Action struct in the desired format
    const action = [
        '0x2F8c027fDa4d2437a3546241d710831951aF4003', // Address of the contract
        0, // Value in wei to send (usually 0 for function calls)
        encodedData // Encoded function data
    ];

    // Log the action tuple array in the desired format
    console.log("Action Tuple Array:", JSON.stringify([action]));
});


