/* eslint-disable */
import web3 from './web3';

const abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_projectTitle",
				"type": "string"
			},
			{
				"name": "_projectDescription",
				"type": "string"
			},
			{
				"name": "_fundingGoal",
				"type": "uint256"
			},
			{
				"name": "_fundingCloseDate",
				"type": "uint256"
			},
			{
				"name": "_projectClosingDate",
				"type": "uint256"
			},
			{
				"name": "_projectHub",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "numberAcceptedVotes",
				"type": "int256"
			},
			{
				"indexed": false,
				"name": "numberRejectedVotes",
				"type": "int256"
			}
		],
		"name": "VoteGiven",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "optionTitle",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "optionDescription",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "optionAmountEther",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "optionAvailability",
				"type": "int256"
			},
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "CreatedBackingOption",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "requestTitle",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "requestDescription",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "valideUntil",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "CreatedRequest",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getContractState",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_optionTitle",
				"type": "string"
			},
			{
				"name": "_optionDescription",
				"type": "string"
			},
			{
				"name": "_optionAmountWei",
				"type": "uint256"
			},
			{
				"name": "_optionAvailability",
				"type": "int256"
			}
		],
		"name": "addBackingOption",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "closeAddingBackingOptionPeriode",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBackingOptionsCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getBackingOption",
		"outputs": [
			{
				"name": "optionTitle",
				"type": "string"
			},
			{
				"name": "optionDescription",
				"type": "string"
			},
			{
				"name": "optionsAmountEther",
				"type": "uint256"
			},
			{
				"name": "optionAvailablity",
				"type": "int256"
			},
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "backingOptionID",
				"type": "uint256"
			}
		],
		"name": "addInvestor",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getInvestorCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getPeekBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_requestTitle",
				"type": "string"
			},
			{
				"name": "_requestDescription",
				"type": "string"
			},
			{
				"name": "_valideUntil",
				"type": "uint256"
			},
			{
				"name": "_amountWei",
				"type": "uint256"
			}
		],
		"name": "addRequest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "isAccepted",
				"type": "bool"
			}
		],
		"name": "voteForCurrentRequest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "hasInvestorVotedForCurrentRequest",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCurrentRequest",
		"outputs": [
			{
				"name": "requestTitle",
				"type": "string"
			},
			{
				"name": "requestDescription",
				"type": "string"
			},
			{
				"name": "valideUntil",
				"type": "uint256"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "numberAcceptedVotes",
				"type": "int256"
			},
			{
				"name": "numberRejectedVotes",
				"type": "int256"
			},
			{
				"name": "wasPayed",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "requestPayout",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "requestPayback",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "contractWasRefunded",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "requestRefundRemainingFunds",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "contractWasPartiallyRefunded",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isUserInvestor",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

export default (address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};
