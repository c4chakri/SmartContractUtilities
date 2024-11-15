// Import ethers from ethers.js
const { ethers } = require('ethers');

// Function to encode the function call using ethers.js
async function encodeUpdateGovernanceSettings() {
    // Define the contract's ABI fragment for the `updateGovernanceSettings` function
    const abiFragment = [
        "function updateGovernanceSettings((uint8 minimumParticipationPercentage, uint8 supportThresholdPercentage, uint32 minimumDurationForProposal, bool earlyExecution, bool canVoteChange) _governanceSettings)"
    ];

    // Define the contract interface using the ABI fragment
    const iface = new ethers.utils.Interface(abiFragment);

    // Define the parameters for the `GovernanceSettings` struct
    const governanceSettings = {
        minimumParticipationPercentage: 20,   // 20%
        supportThresholdPercentage: 30,       // 60%
        minimumDurationForProposal: 86400,    // 1 day in seconds
        earlyExecution: true,                 // Early execution enabled
        canVoteChange: false                  // Can vote change disabled
    };

    // Encode the function call with the struct (tuple) as parameter
    const encodedData = iface.encodeFunctionData('updateGovernanceSettings', [governanceSettings]);

    // Return the encoded data for further use
    return encodedData;
}

// Call the function to encode and get the encoded data
encodeUpdateGovernanceSettings().then((encodedData) => {
    // Example of creating the Action struct in the desired format
    const action = [
        '0x2F8c027fDa4d2437a3546241d710831951aF4003', // Address of the contract
        0, // Value in wei to send (usually 0 for function calls)
        encodedData // Encoded function data
    ];

    // Log the action tuple array in the desired format
    console.log("Action Tuple Array:", JSON.stringify([action]));
});
