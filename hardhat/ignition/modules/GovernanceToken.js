const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GovernanceTokenModule", (m) => {


    const name = "My Governance Token";
    const symbol = "MGT";
    const initialAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const decimals = 18;

    const actions = [true, true, true, true, true, true];

    const GovernanceToken = m.contract("GovernanceToken", [name, symbol, initialAddress, decimals, actions])


    return { GovernanceToken };
});
//0x5FbDB2315678afecb367f032d93F642f64180aa3