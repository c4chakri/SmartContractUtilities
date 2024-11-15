const { ethers } = require("ethers");

// Define the types of the arguments for the initialize function
const argTypes = ["address"];

// Define the actual value for the initialize function
const argValues = ["0x744ffD0001f411D781B6df6B828C76d32B65076E"];

// ABI encode the arguments for the initialize function
const encodedArgs = ethers.defaultAbiCoder.encodedArgs(argTypes, argValues);

console.log("Encoded Initialize Function Arguments:", encodedArgs);
