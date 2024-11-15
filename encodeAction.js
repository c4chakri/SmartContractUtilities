// Import the web3 library
const { Web3 } = require('web3');

// Initialize a Web3 instance (you can use any provider, here we use HTTP for simplicity)
const web3 = new Web3(new Web3.providers.HttpProvider('https://mobius-besu-rpc.gov-cloud.ai/'));

// Function to encode the function call
function encodeFunctionCall() {
    // Define the function signature and parameters
    const functionAbi = {
        name: 'mintSupply',
        type: 'function',
        inputs: [
            {
                type: 'address',
                name: 'to'
            },
            {
                type: 'uint256',
                name: '_amount'
            }

        ]
    };
    // npm install --save-dev "hardhat@^2.22.10" "@nomicfoundation/hardhat-toolbox@^5.0.0"
    // Define the parameters to pass to the function
    const params = [
        '0xcd801F16F87841444040b2F2A93bb9235053e00c', // recipient address
        900 // amount (as a string)
    ];

    // Encode the function call
    const encodedData = web3.eth.abi.encodeFunctionCall(functionAbi, params);

    // Log the encoded data
    // console.log("Encoded Data:", encodedData);

    // Return the encoded data for further use
    return encodedData;
}

// Call the function to encode and get the encoded data
const encodedData = encodeFunctionCall();

// Example of creating the Action struct in the desired format
const action = [
    '0xF19F8de75B96e1065c83756a120Ca505b35A298c', // Address of the contract
    0, // Value in wei to send (usually 0 for function calls)
    encodedData // Encoded function data
];

// Log the action tuple array in the desired format
console.log("Action Tuple Array:", JSON.stringify([action]));





