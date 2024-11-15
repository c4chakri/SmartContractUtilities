// Import ethers from ethers.js
const { ethers } = require('ethers');

// Function to encode the function call for `updateProposalMemberSettings`
async function encodeUpdateProposalMemberSettings() {
    // Define the contract's ABI fragment for the `updateProposalMemberSettings` function
    const abiFragment = [
        "function updateProposalMemberSettings((bool isTokenBasedProposal, uint256 MinimumRequirement) _proposalCreationParams) public view"
    ];

    // Define the contract interface using the ABI fragment
    const iface = new ethers.utils.Interface(abiFragment);

    // Define the parameters for the `ProposalCreationSettings` struct
    const proposalCreationParams = {
        isTokenBasedProposal: true,   // Example: true means token-based proposal
        MinimumRequirement: 50      // Example: 1000 as minimum requirement
    };

    // Encode the function call with the struct as a tuple
    const encodedData = iface.encodeFunctionData('updateProposalMemberSettings', [proposalCreationParams]);

    // Return the encoded data for further use
    return encodedData;
}

// Call the function to encode and get the encoded data
encodeUpdateProposalMemberSettings().then((encodedData) => {
    // Example of creating the Action struct in the desired format
    const action = [
        '0x2F8c027fDa4d2437a3546241d710831951aF4003', // Address of the contract
        0, // Value in wei to send (usually 0 for function calls)
        encodedData // Encoded function data
    ];

    // Log the action tuple array in the desired format
    console.log("Action Tuple Array:", JSON.stringify([action]));
});
