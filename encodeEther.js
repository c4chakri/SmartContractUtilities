// Import ethers from ethers.js
const { ethers } = require('ethers');

// Initialize a provider (using HTTP provider for this example)

// Function to encode the function call using ethers.js
async function encodeFunctionCall() {
    // Define the contract's ABI fragment for the `mintSupply` function
    // const abiFragment = [
    //     {
    //         name: 'mintSupply',
    //         type: 'function',
    //         inputs: [
    //             {
    //                 type: 'address',
    //                 name: 'to'
    //             },
    //             {
    //                 type: 'uint256',
    //                 name: '_amount'
    //             }
    //         ]
    //     }
    // ];
    const abiFragment = [
        "function mintSupply(address to, uint256 _amount)"
    ];

    // Define the contract interface using the ABI fragment
    const iface = new ethers.utils.Interface(abiFragment);

    // Define the parameters to pass to the function
    const params = [
        '0xcd801F16F87841444040b2F2A93bb9235053e00c', // recipient address
        900 // amount
    ];

    // Encode the function call
    const encodedData = iface.encodeFunctionData('mintSupply', params);

    // Return the encoded data for further use
    return encodedData;
}

// Call the function to encode and get the encoded data
encodeFunctionCall().then((encodedData) => {
    // Example of creating the Action struct in the desired format
    const action = [
        '0xF19F8de75B96e1065c83756a120Ca505b35A298c', // Address of the contract
        0, // Value in wei to send (usually 0 for function calls)
        encodedData // Encoded function data
    ];

    // Log the action tuple array in the desired format
    console.log("Action Tuple Array:", JSON.stringify([action]));
});
