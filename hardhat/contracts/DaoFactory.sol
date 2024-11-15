// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Dao.sol";
import "./IDaoFactory.sol";
import "./GovernanceToken.sol";

contract DAOFactory is IDAOFactory {

    uint32 public daoId;
    mapping(uint32 => DAOInfo) public daos;

    function createDAO(
        string memory daoName,
        address governanceTokenAddress,
        uint8 minimumParticipationPercentage,
        uint8 supportThresholdPercentage,
        uint32 minimumDuration,
        bool earlyExecution,
        bool canVoteChange,
        DAO.DAOMember[] memory _daoMembers,
        bool isMultiSignDAO
    ) public returns (address) {
        DAO newDAO = new DAO(
            governanceTokenAddress,
            minimumParticipationPercentage,
            supportThresholdPercentage,
            minimumDuration,
            earlyExecution,
            canVoteChange,
            _daoMembers,
            isMultiSignDAO
        );

        appendToFactory(daoName, address(newDAO), governanceTokenAddress);
        daoId++;

        return address(newDAO);
    }

    function appendToFactory(
        string memory _name,
        address _dao,
        address _governance
    ) private returns (bool) {
        DAOInfo storage dao = daos[daoId];
        dao.name = _name;
        dao.daoAddress = _dao;
        dao.daoCreator = msg.sender;
        dao.governanceAddress = _governance;
        return true;
    }

    function getAllDaos() external view returns (DAOInfo[] memory) {
        uint32 currentDaoId = daoId;
        DAOInfo[] memory allDaos = new DAOInfo[](currentDaoId);

        for (uint32 i = 0; i < currentDaoId; ) {
            allDaos[i] = daos[i];
            unchecked {
                i++;
            }
        }

        return allDaos;
    }
}
