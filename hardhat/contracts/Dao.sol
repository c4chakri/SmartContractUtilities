// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./Proposal.sol";
import "./GovernanceToken.sol";
import "./IDao.sol";

contract DAO is IDAO, ReentrancyGuard {
    address public immutable governanceTokenAddress;
    address public immutable DaoCreator;
    uint8 public minimumParticipationPercentage;
    uint8 public supportThresholdPercentage;
    uint256 public minimumDuration;
    bool public earlyExecution;
    bool public canVoteChange;
    bool public isMultiSignDAO;
    uint256 public proposalId;
    uint256 internal membersCount;

    mapping(address => uint256) public treasuryBalance;
    mapping(uint256 => ProposalInfo) public proposals;
    mapping(address => bool) public blacklisted;
    mapping(address => bool) public isDAOMember;

    modifier notBlacklisted(address account) {
        require(!blacklisted[account], "Address blacklisted");
        _;
    }

    modifier canInteractWithDAO(address account) {
        require(isDAOMember[account], "Not a DAO Member");
        require(!blacklisted[account], "Address blacklisted");
        _;
    }
    struct GovData {
        string name;
        string symbol;
        // uint256 initialSupply;
        address initialAddress;
        uint8 decimals;
        GovernanceToken.smartContractActions actions;
    }
    // Errors
    error DepositsMisMatch(uint256 expected, uint256 actual);

    constructor(
        address _governanceTokenAddress,
        uint8 _minimumParticipationPercentage,
        uint8 _supportThresholdPercentage,
        uint32 _minimumDurationForProposal,
        bool _earlyExecution,
        bool _canVoteChange,
        DAOMember[] memory _daoMembers,
        bool _isMultiSignDAO
    ) {
 
        
        governanceTokenAddress = _governanceTokenAddress;
        minimumParticipationPercentage = _minimumParticipationPercentage;
        supportThresholdPercentage = _supportThresholdPercentage;
        minimumDuration = _minimumDurationForProposal;
        earlyExecution = _earlyExecution;
        canVoteChange = _canVoteChange;
        isMultiSignDAO = _isMultiSignDAO;
        DaoCreator = msg.sender;
        addDAOMembers(_daoMembers);
    }

    function addDAOMembers(DAOMember[] memory members) public {
        require(_onlyDao(), "Add in Dao : Not a DAO Member");
        GovernanceToken _governanceToken = GovernanceToken(
            governanceTokenAddress
        );

        for (uint256 i = 0; i < members.length; i++) {
            ++membersCount;
            address memberAddress = members[i].memberAddress;
            uint256 deposit = members[i].deposit;

            require(
                !isDAOMember[memberAddress],
                "Add DAO Member Function: You already added"
            );

            isDAOMember[memberAddress] = true;
            bytes32 _id = keccak256("TOKEN_MINTER");
            _governanceToken.mintSupply(memberAddress, deposit, _id);
        }
    }

    function createProposal(
        string memory _title,
        string memory _description,
        uint32 _startTime,
        uint32 _duration,
        Proposal.Action[] memory _actions
    ) public canInteractWithDAO(msg.sender) returns (address) {
        ++proposalId;
        Proposal newProposal = new Proposal(
            address(this),
            msg.sender,
            _title,
            _description,
            _startTime,
            _duration,
            _actions,
            governanceTokenAddress,
            minimumParticipationPercentage,
            supportThresholdPercentage,
            earlyExecution
        );

        proposals[proposalId] = ProposalInfo({
            deployedProposalAddress: address(newProposal),
            creator: msg.sender,
            title: _title,
            id: proposalId
        });

        return proposals[proposalId].deployedProposalAddress;
    }

    function _onlyDao() private view notBlacklisted(msg.sender) returns (bool) {
        if (membersCount == 0) {
            return true;
        } else {
            return (isDAOMember[msg.sender]);
        }
    }

    function getProposalInfo(uint256 _proposalId)
        external
        view
        returns (ProposalInfo memory)
    {
        return proposals[_proposalId];
    }

    function getAllProposals() external view returns (ProposalInfo[] memory) {
        ProposalInfo[] memory proposalsArr = new ProposalInfo[](proposalId);
        for (uint256 i = 0; i < proposalId; i++) {
            ProposalInfo storage prop = proposals[i];
            proposalsArr[i] = prop;
        }
        return proposalsArr;
    }

    function depositToDAOTreasury(uint256 _amount)
        external
        payable
        canInteractWithDAO(msg.sender)
    {
        if (msg.value != _amount) {
            revert DepositsMisMatch({expected: _amount, actual: msg.value});
        }
        treasuryBalance[msg.sender] += msg.value;
    }

    function withdrawFromDAOTreasury(uint256 amount)
        external
        nonReentrant
        canInteractWithDAO(msg.sender)
    {
        require(amount > 0, "Enter a valid amount!");
        require(treasuryBalance[msg.sender] >= amount, "Insufficient balance!");
        treasuryBalance[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function getDAOTreasuryBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function setToBlacklist(address _account)
        external
        canInteractWithDAO(msg.sender)
    {
        blacklisted[_account] = true;
    }

    function setToUnBlacklist(address _account)
        external
        canInteractWithDAO(msg.sender)
    {
        blacklisted[_account] = false;
    }

    function canInteract(address _account)
        external
        view
        canInteractWithDAO(_account)
        returns (bool)
    {
        return true;
    }
}
