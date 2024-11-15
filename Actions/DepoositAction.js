const ethers = require("ethers");

function createWithdrawAction(daoContractAddress, _to, amount) {
    const abi = [
        "function withdrawTokens(address _to, uint256 _amount)"
    ];

    const iface = new ethers.Interface(abi);
    // Use BigInt conversion if required for the amount
    const withdrawTokensEncoded = iface.encodeFunctionData("withdrawTokens", [_to, amount.toString()]);

    const actionWithdrawTokens = [
        daoContractAddress,
        0,
        withdrawTokensEncoded
    ];

    // Log and return JSON string
    console.log("actionWithdrawTokens:", actionWithdrawTokens);
    return ([[actionWithdrawTokens]]);
}
// Example usage
createWithdrawAction("0x9AA401319CE569EDC070f81A37ec34E973143FEC", "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", BigInt(1));

