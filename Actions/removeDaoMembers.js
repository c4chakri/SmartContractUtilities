const {ethers} = require("ethers")
async function createRemoveDAOMembersAction(daoAddr, members) {
    // Define the ABI fragment for the `removeDAOMembers` function
    const abiFragment = [
        "function removeDAOMembers((address memberAddress, uint256 deposit)[] members) external"
    ];

    // Create the interface for the function
    const iface = new ethers.utils.Interface(abiFragment);

    // Encode the function call with the array of structs as a parameter
    const encodedData = iface.encodeFunctionData('removeDAOMembers', [members]);

    // Create the Action tuple array
    const action = [
        daoAddr, // Address of the DAO contract
        0,       // Value in wei to send (usually 0 for function calls)
        encodedData // Encoded function data
    ];

    // Return the action tuple array
    return [action];
}
let daoAddr = '0xac143676Dd3A6213763436c4cd9ebE0C7b924997'
let members = [
    {
        memberAddress: '0x10C01177B6F7DC0C31eDe50aa38A91B74ce0F081',  // Example member address 1
        deposit: "200"  // Example deposit 1 (1 Ether)
    }
    
]

createRemoveDAOMembersAction(daoAddr, members).then((action) => {
    // Example of creating the Action struct in the desired format
    console.log('====================================');
    console.log("Action Tuple Array:", JSON.stringify(action));
    console.log('====================================');
})