const ethers = require("ethers");

async function encodeWithdrawTokens(daoAddr, token, to, amount) {
    // ABI of the DAO contract containing the `withdrawTokens` function
    const daoABI = [
        "function withdrawTokens(address _token, address _to, uint256 _amount)"
    ];

    // Create an interface from the ABI
    const daoInterface = new ethers.utils.Interface(daoABI);

    // Encode the function data for `withdrawTokens`
    const encodedData = daoInterface.encodeFunctionData("withdrawTokens", [token, to, amount]);

    const action = [
        daoAddr, // Address of the contract
        0, // Value in wei to send (usually 0 for function calls)
        encodedData // Encoded function data
    ]

    return ([action]);
}

const daoAddr = '0xBBe52729c820470fce82A959b8E983985F15528d';
const token = '0xd3DaD7357aA920171Fc9cBD8Fe639F9b950D234B';
const to = '0x10C01177B6F7DC0C31eDe50aa38A91B74ce0F081';
const amount = ethers.utils.parseEther('1');

encodeWithdrawTokens(daoAddr, token, to, amount).then((action) => {
    // Example of creating the Action struct in the desired format
    console.log('====================================');
    console.log("Action Tuple Array:", JSON.stringify(action));
    console.log('====================================');
})
module.exports = { encodeWithdrawTokens };