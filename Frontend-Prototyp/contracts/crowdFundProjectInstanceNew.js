/* eslint-disable */
import web3 from './web3';

const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "backingOptionID",
				"type": "int256"
			}
		],
		"name": "addInvestor",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
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
		"constant": false,
		"inputs": [],
		"name": "requestPayout",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
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
				"name": "_optionAmountEther",
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
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "addRequest",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
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
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "int256"
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
				"name": "_projectHub",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
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
	}
];

export default (address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};
