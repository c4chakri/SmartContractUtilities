const ethers = require('ethers');

/**
 * Encodes constructor arguments for a smart contract deployment.
 * 
 * @param {Array} abi - The ABI of the smart contract.
 * @param {Array} constructorParams - The parameters for the constructor.
 * @returns {string} - The encoded constructor arguments data.
 */
function encodeConstructorArgs(abi, constructorParams) {
    // Find the constructor in the ABI
    const constructorAbi = abi.find(item => item.type === 'constructor');
    
    if (!constructorAbi) {
        if (constructorParams.length > 0) {
            throw new Error('ABI does not contain a constructor but parameters were provided.');
        }
        return '0x'; // No constructor, no arguments
    }
    
    // Create an ethers.js Interface for encoding
    const iface = new ethers.utils.Interface(abi);
    
    // Encode the constructor parameters
    return iface.encodeDeploy(constructorParams);
}

// Example Usage:
const exampleAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "daoManagementAddress",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					}
				],
				"internalType": "struct IDAO.DaoSettings",
				"name": "_daoParams",
				"type": "tuple"
			},
			{
				"internalType": "address",
				"name": "_governanceToken",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "symbol",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "councilAddress",
						"type": "address"
					}
				],
				"internalType": "struct IDAO.GovernanceTokenParams",
				"name": "_GovernanceTokenParams",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint8",
						"name": "minimumParticipationPercentage",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "supportThresholdPercentage",
						"type": "uint8"
					},
					{
						"internalType": "uint32",
						"name": "minimumDurationForProposal",
						"type": "uint32"
					},
					{
						"internalType": "bool",
						"name": "earlyExecution",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "canVoteChange",
						"type": "bool"
					}
				],
				"internalType": "struct IDAO.GovernanceSettings",
				"name": "_governanceSettings",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "memberAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "deposit",
						"type": "uint256"
					}
				],
				"internalType": "struct IDAO.DAOMember[]",
				"name": "_daoMembers",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "bool",
						"name": "isTokenBasedProposal",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "MinimumRequirement",
						"type": "uint256"
					}
				],
				"internalType": "struct IDAO.ProposalCreationSettings",
				"name": "_proposalCreationParams",
				"type": "tuple"
			},
			{
				"internalType": "bool",
				"name": "_isMultiSignDAO",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "DAOBlacklistedAddress",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DAOInsufficientAllowanceGovernanceToken",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DAOInsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DAOInvalidAmount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DAONotADaoMember",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DAOUnAuthorizedInteraction",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "expected",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "actual",
				"type": "uint256"
			}
		],
		"name": "DepositsMisMatch",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotAFreshGovernanceToken",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ReentrancyGuardReentrantCall",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "DaoCreator",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_daoSettings",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_proposalCreationSettings",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isTokenBasedProposal",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "MinimumRequirement",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "memberAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "deposit",
						"type": "uint256"
					}
				],
				"internalType": "struct IDAO.DAOMember[]",
				"name": "members",
				"type": "tuple[]"
			}
		],
		"name": "addDAOMembers",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "blacklisted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "canInteract",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "proposalAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_proposerAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_actionId",
				"type": "uint8"
			}
		],
		"name": "configureProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "depositToDAOTreasury",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "depositTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "governanceSettings",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "minimumParticipationPercentage",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "supportThresholdPercentage",
				"type": "uint8"
			},
			{
				"internalType": "uint32",
				"name": "minimumDurationForProposal",
				"type": "uint32"
			},
			{
				"internalType": "bool",
				"name": "earlyExecution",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "canVoteChange",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "governanceToken",
		"outputs": [
			{
				"internalType": "contract GovernanceToken",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isDAOMember",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isMultiSignDAO",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isProposal",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "membersCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "proposalId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposals",
		"outputs": [
			{
				"internalType": "address",
				"name": "deployedProposalAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "memberAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "deposit",
						"type": "uint256"
					}
				],
				"internalType": "struct IDAO.DAOMember[]",
				"name": "members",
				"type": "tuple[]"
			}
		],
		"name": "removeDAOMembers",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "tokenDeposited",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "treasuryBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					}
				],
				"internalType": "struct IDAO.DaoSettings",
				"name": "_daoParams",
				"type": "tuple"
			}
		],
		"name": "updateDaoSettings",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint8",
						"name": "minimumParticipationPercentage",
						"type": "uint8"
					},
					{
						"internalType": "uint8",
						"name": "supportThresholdPercentage",
						"type": "uint8"
					},
					{
						"internalType": "uint32",
						"name": "minimumDurationForProposal",
						"type": "uint32"
					},
					{
						"internalType": "bool",
						"name": "earlyExecution",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "canVoteChange",
						"type": "bool"
					}
				],
				"internalType": "struct IDAO.GovernanceSettings",
				"name": "_newSettings",
				"type": "tuple"
			}
		],
		"name": "updateGovernanceSettings",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "bool",
						"name": "isTokenBasedProposal",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "MinimumRequirement",
						"type": "uint256"
					}
				],
				"internalType": "struct IDAO.ProposalCreationSettings",
				"name": "_proposalCreationParams",
				"type": "tuple"
			}
		],
		"name": "updateProposalMemberSettings",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdrawFromDAOTreasury",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const exampleParams = [
    "0x2eD3f15578Bf85962FE960D8f7A82E409414Ee01",
    ["cake", "0x68656c6c6f20776f726c64"],
    "0x0000000000000000000000000000000000000000",
    ["govName1", "govSymbol", "0x744ffD0001f411D781B6df6B828C76d32B65076E"],
    [45, 75, 86400, true, false],
    [
      ["0x744ffD0001f411D781B6df6B828C76d32B65076E", 500],
      ["0x10C01177B6F7DC0C31eDe50aa38A91B74ce0F081", 202],
      ["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73", 203]
    ],
    [false, 0],
    true
  ];
  
try {
    const encodedData = encodeConstructorArgs(exampleAbi, exampleParams);
    console.log('Encoded Constructor Arguments:', encodedData);
    const orginalData = "0x0000000000000000000000002ed3f15578bf85962fe960d8f7a82e409414ee0100000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000260000000000000000000000000000000000000000000000000000000000000002d000000000000000000000000000000000000000000000000000000000000004b000000000000000000000000000000000000000000000000000000000001518000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000463616b6500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b68656c6c6f20776f726c64000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000744ffd0001f411d781b6df6b828c76d32b65076e0000000000000000000000000000000000000000000000000000000000000008676f764e616d65310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009676f7653796d626f6c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003000000000000000000000000744ffd0001f411d781b6df6b828c76d32b65076e00000000000000000000000000000000000000000000000000000000000001f400000000000000000000000010c01177b6f7dc0c31ede50aa38a91b74ce0f08100000000000000000000000000000000000000000000000000000000000000ca000000000000000000000000fe3b557e8fb62b89f4916b721be55ceb828dbd7300000000000000000000000000000000000000000000000000000000000000cb"
    console.log('Original Data:', String(orginalData) == encodedData);
    
} catch (err) {
    console.error('Error:', err.message);
}
