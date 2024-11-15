// Import the web3 library
const { Web3 } = require('web3');

// Initialize a Web3 instance (you can use any provider, here we use HTTP for simplicity)
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// Function to encode the mintSupply function call
function encodeMintSupply(to, amount) {
    const functionAbi = {
        name: 'mintSupply',
        type: 'function',
        inputs: [
            { type: 'address', name: 'to' },
            { type: 'uint256', name: '_amount' },

        ]
    };

    const params = [to, amount.toString()];
    return web3.eth.abi.encodeFunctionCall(functionAbi, params);
}

// Function to encode the burnSupply function call
function encodeBurnSupply(from, amount) {
    const functionAbi = {
        name: 'burnSupply',
        type: 'function',
        inputs: [
            { type: 'address', name: 'from' },
            { type: 'uint256', name: '_amount' },
            {type:'bytes32', name:'id'}

        ]
    };

    const params = [from, amount.toString()];
    return web3.eth.abi.encodeFunctionCall(functionAbi, params);
}

// Function to encode the transfer function call
function encodeTransfer(recipient, amount) {
    const functionAbi = {
        name: 'transfer',
        type: 'function',
        inputs: [
            { type: 'address', name: 'recipient' },
            { type: 'uint256', name: 'amount' }
        ]
    };

    const params = [recipient, amount.toString()];
    return web3.eth.abi.encodeFunctionCall(functionAbi, params);
}

// Function to encode the stakeToken function call
function encodeStakeToken(amount) {
    const functionAbi = {
        name: 'stakeToken',
        type: 'function',
        inputs: [
            { type: 'uint256', name: '_amount' }
        ]
    };

    const params = [amount.toString()];
    return web3.eth.abi.encodeFunctionCall(functionAbi, params);
}

// Function to encode the setDaoAddress function call
function encodeAddDAOMembers(addresses,deposits) {
    const functionAbi = {
        name: 'addDAOMembers',
        type: 'function',
        inputs: [
            { type: 'address[]', name: 'addresses' },
            {type:'uint256[]',name:'deposits'}
        ]

    };

    const params = [addresses,deposits];
    return web3.eth.abi.encodeFunctionCall(functionAbi, params);
}
const addresses = [
    '0x1234567890abcdef1234567890abcdef12345678',
    '0xabcdef1234567890abcdef1234567890abcdef12',
    '0x7890abcdef1234567890abcdef1234567890abcd'
];

const deposits = [299,366,140]

// Example of using the encoding functions
const mintSupplyEncoded = encodeMintSupply('0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB', 900 );
// const burnSupplyEncoded = encodeBurnSupply('0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB', 900);
const transferEncoded = encodeTransfer('0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB', 900);
const stakeTokenEncoded = encodeStakeToken(900);
// const setDaoAddressEncoded = encodeAddDAOMembers(addresses,deposits);

// Example of creating the Action struct in the desired format
const actionMintSupply = [
    '0x10507a70B3562F4EE7Ad8824f052b146639505d4', // Address of the contract
    0, // Value in wei to send (usually 0 for function calls)
    mintSupplyEncoded // Encoded function data
];
// const actionBurnSupply = [
//     '0x5A094c57f313888d9e2543B846af8dD8D9810Ea7', // Address of the contract
//     0, // Value in wei to send (usually 0 for function calls)
//     burnSupplyEncoded // Encoded function data
// ];

// const actionAddDaoMemmbers = [
//     '0x1c6F480adcadae84f1ed94Ec23e599416393554f',
//     0,
//     setDaoAddressEncoded

// ]
// Log the action tuple array in the desired format
console.log("Action Tuple Array for Mint Supply:", JSON.stringify([actionMintSupply]));
// console.log("Action Tuple Array for Burn Supply:", JSON.stringify([actionBurnSupply]));
// console.log("Action Tuple for AddMembres",JSON.stringify([actionAddDaoMemmbers]));



// Repeat for other actions as needed
