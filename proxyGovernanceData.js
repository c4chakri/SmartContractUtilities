const { ethers } = require("ethers");

// ABI of the 'initialize' function with multiple parameters
const initializeAbi = [
  "function initialize(string name, string symbol, address _initialAddress, uint8 decimals, tuple(bool,bool,bool,bool,bool,bool) smartContractActions)"
];

// Interface to encode the initialize function
const iface = new ethers.Interface(initializeAbi);

// Define the values for the parameters
const name = "Mobius GoVernance";
const symbol = "MGTMMMM";
const initialAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";  // Replace with actual address
const decimals = 10;

// Define the smartContractActions struct
const actions = {
    canStake: true,
    canBurn: true,
    canMint: true,
    canPause: true,
    canTransfer: true,
    canChangeOwner: true
};

// Encode the function call with the parameters
const _data = iface.encodeFunctionData("initialize", [
  name,
  symbol,
  initialAddress,
  decimals,
  [actions.canStake, actions.canBurn, actions.canMint, actions.canPause, actions.canTransfer, actions.canChangeOwner]
]);

console.log("Encoded _data for proxy deployment:", _data);
//0x42768bf9cC008dDba553357453BA936f3f0017D9