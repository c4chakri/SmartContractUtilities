const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("DAOFactory", function () {

    async function deployDaoFactoryFixture() {
        const DaoFactoryContract = await ethers.getContractFactory("DAOFactory");
        const daoFactory = await DaoFactoryContract.deploy();
        return { daoFactory };
    }

    describe("Deployment", function () {

        it("should test initial DAOs", async function () {
            const { daoFactory } = await loadFixture(deployDaoFactoryFixture);
            expect(await daoFactory.daoId()).to.equal(0);
        });

        it("should create a DAO", async function () {
            const { daoFactory } = await loadFixture(deployDaoFactoryFixture);

            const [daoMember1, daoMember2] = await ethers.getSigners();
            const daoName = "My New DAO";
            const governanceTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
            const minimumParticipationPercentage = 20; // 20%
            const supportThresholdPercentage = 50; // 50%
            const minimumDuration = 86400; // 24 hours in seconds
            const earlyExecution = true;
            const canVoteChange = false;

            const daoMembers = [
                { memberAddress: daoMember1.address, deposit: 100 },
                { memberAddress: daoMember2.address, deposit: 200 }
            ];
            const isMultiSignDAO = false;

            const tx = await daoFactory.createDAO(
                daoName,
                governanceTokenAddress,
                minimumParticipationPercentage,
                supportThresholdPercentage,
                minimumDuration,
                earlyExecution,
                canVoteChange,
                daoMembers,
                isMultiSignDAO
            );

            const receipt = await tx.wait();
            const daoAddress = receipt.events[0].args[0]; // Adjust based on actual event emitted

            const DaoContract = await ethers.getContractFactory("DAO");
            const dao = DaoContract.attach(daoAddress);

            expect(await dao.governanceTokenAddress()).to.equal(governanceTokenAddress);
        });
        it("should all daos s", async function () {
            const { daoFactory } = await loadFixture(deployDaoFactoryFixture);
            console.log(await daoFactory.daos(0))
          
        });

    });
});
