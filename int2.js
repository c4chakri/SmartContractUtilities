const { ethers } = require('ethers');
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "addresses",
				"type": "address[]"
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
				"name": "_creator",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_duration",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					},
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					}
				],
				"internalType": "struct IDAO.Action[]",
				"name": "_actions",
				"type": "tuple[]"
			}
		],
		"name": "createProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
    
	{
		"inputs": [],
		"name": "depositToDAOTreasury",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_proposalId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_executor",
				"type": "address"
			}
		],
		"name": "executeProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_governanceTokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "_minimumParticipationPercentage",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_supportThresholdPercentage",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "_minimumDurationForProposal",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_earlyExecution",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_canVoteChange",
				"type": "bool"
			},
			{
				"internalType": "address[]",
				"name": "_daoMembers",
				"type": "address[]"
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_proposalId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_voteType",
				"type": "uint256"
			}
		],
		"name": "updateVotes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_proposalId",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_voteType",
				"type": "uint8"
			}
		],
		"name": "voteOnProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
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
				"name": "account",
				"type": "address"
			}
		],
		"name": "_getVotingUnits",
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
		"inputs": [],
		"name": "canVoteChange",
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
		"name": "earlyExecution",
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
		"name": "getAllProposals",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "creatorAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "proposalTitle",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "proposalDescription",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "yesVotes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "noVotes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "abstainVotes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "executed",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "approved",
						"type": "bool"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "to",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "value",
								"type": "uint256"
							},
							{
								"internalType": "bytes",
								"name": "data",
								"type": "bytes"
							}
						],
						"internalType": "struct IDAO.Action[]",
						"name": "actions",
						"type": "tuple[]"
					}
				],
				"internalType": "struct IDAO.Proposal[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getDAOMemberTreasuryBalance",
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
		"name": "getDAOTreasuryBalance",
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
				"name": "_proposalId",
				"type": "uint256"
			}
		],
		"name": "getProposal",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "creatorAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "proposalTitle",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "proposalDescription",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "yesVotes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "noVotes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "abstainVotes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "executed",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "approved",
						"type": "bool"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "to",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "value",
								"type": "uint256"
							},
							{
								"internalType": "bytes",
								"name": "data",
								"type": "bytes"
							}
						],
						"internalType": "struct IDAO.Action[]",
						"name": "actions",
						"type": "tuple[]"
					}
				],
				"internalType": "struct IDAO.Proposal",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "governanceTokenAddress",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_proposalId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "hasUserVoted",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasVoted",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "isApproved",
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
		"inputs": [],
		"name": "minimumDuration",
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
		"name": "minimumParticipationPercentage",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
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
				"name": "creatorAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "proposalTitle",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "proposalDescription",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "yesVotes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "noVotes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "abstainVotes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "executed",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "supportThresholdPercentage",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
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
	}
]
const providerURL = 'https://sepolia-rollup.arbitrum.io/rpc';
const contractAddress = '0x6B34d5017AFC16CC2dfbB921546B7Ac93c2124ae';

// Initialize provider and contract
const provider = new ethers.JsonRpcProvider(providerURL); // Replace with your provider URL
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Create a function to test gas estimation
async function testCreateProposal() {
    try {
        // Define parameters
        const creator = '0x744ffD0001f411D781B6df6B828C76d32B65076E';
        const title = 'Test Proposal';
        const description = 'This is a test proposal';
        const duration = 3600; // Example duration (in seconds)
        const actions = [
            {
              to: "0x82b243917e556fEF3b6eb432B7C5Ddd20e0a42A0", // Replace with the target address
              value: ethers.parseUnits("0", "ether"), // Example value (1 ETH)
              data: "0xe742806a000000000000000000000000874934568a7803cd6573b2d0e60a886a8680e95a0000000000000000000000000000000000000000000000000000000000000384" // Example data (empty)
            }
            // Add more actions as needed
          ];
        // Estimate gas
        const gasEstimate = await contract.createProposal(creator, title, description, duration, actions);
        console.log('Estimated Gas:', gasEstimate.toString());

        // Execute the function
        const tx = await contract.createProposal(creator, title, description, duration, actions);
        console.log('Transaction Hash:', tx.hash);

        // Wait for the transaction to be mined
        await tx.wait();
        console.log('Transaction Mined');
    } catch (error) {
        console.error('Error:', error);
    }
}

testCreateProposal();
