// const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
// const { expect } = require("chai");

// describe("DAO", function () {

//     async function deployDaoFixture() {
//         const [daoMember1, daoMember2] = await ethers.getSigners()
//         const governanceTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
//         const minimumParticipationPercentage = 50; // 50%
//         const supportThresholdPercentage = 60; // 60%
//         const minimumDurationForProposal = 86400; // 1 day in seconds
//         const earlyExecution = true;
//         const canVoteChange = false;

//         // const daoMembers = [
//         //     ["0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", 100],
//         //     ["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", 200],
//         // ];
//         const daoMembers = [
//             { memberAddress: daoMember1.address, deposit: 100 },
//             { memberAddress: daoMember2.address, deposit: 200 }
//         ];
//         const isMultiSignDAO = false;
//         console.log("Deploying DAO with parameters:");
//         console.log("Governance Token Address:", governanceTokenAddress);
//         console.log("DAO Members:", daoMembers);
//         const DaoContract = await ethers.getContractFactory("DAO");
//         const dao = await DaoContract.deploy(governanceTokenAddress, minimumParticipationPercentage, supportThresholdPercentage, minimumDurationForProposal, earlyExecution, canVoteChange, daoMembers, isMultiSignDAO);
//         console.log("DAO Members:", await dao);

//         return { dao };
//     }
//     // deployDaoFixture()
//     it("should create a DAO", async function () {
//         const { dao } = await loadFixture(deployDaoFixture);
//         console.log(await dao.governanceTokenAddress(), "dao..........");
//         // expect(await dao.getProposalInfo(0)).to.equal([])

//     })

// });
