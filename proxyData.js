const { ethers } = require("ethers");

// ABI of the 'initialize' function
const initializeAbi = ["function initialize(uint256 _initialValue)"];

// Interface to encode the initialize function
const iface = new ethers.Interface(initializeAbi);

// Encode the function call with initial value as argument
const _initialValue = 900; // Replace with the initial value you want to pass
const _data = iface.encodeFunctionData("initialize", [_initialValue]);

console.log("Encoded _data for proxy deployment:", _data);
