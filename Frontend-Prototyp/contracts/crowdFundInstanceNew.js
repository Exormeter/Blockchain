/* eslint-disable */
import web3 from './web3';

const address = '0x14a9d0ceee2ac3132830daf7a0ecb90cfa203240';
const abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "projectIndex",
				"type": "uint256"
			}
		],
		"name": "getProjects",
		"outputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "projectAdress",
				"type": "address"
			},
			{
				"name": "projectName",
				"type": "string"
			},
			{
				"name": "projectDescription",
				"type": "string"
			},
			{
				"name": "goal",
				"type": "uint256"
			},
			{
				"name": "fundigCloseDate",
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
				"name": "projectName",
				"type": "string"
			},
			{
				"name": "projectDescription",
				"type": "string"
			},
			{
				"name": "fundingGoal",
				"type": "uint256"
			},
			{
				"name": "fundingCloseDate",
				"type": "uint256"
			}
		],
		"name": "addNewProject",
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
		"inputs": [],
		"name": "getProjectCount",
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
		"name": "getProjectCountForInvestor",
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
				"name": "projectIndex",
				"type": "uint256"
			}
		],
		"name": "getProjectByInvestorForIndex",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			},
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
		"name": "getProjectCountForFounder",
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
				"name": "investor",
				"type": "address"
			},
			{
				"name": "_projectAddress",
				"type": "address"
			},
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_projectName",
				"type": "string"
			},
			{
				"name": "_projectDescription",
				"type": "string"
			},
			{
				"name": "_goal",
				"type": "uint256"
			},
			{
				"name": "_fundingCloseDate",
				"type": "uint256"
			}
		],
		"name": "addProjectToInvestor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "projectIndex",
				"type": "uint256"
			}
		],
		"name": "getProjectByFounderForIndex",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			},
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
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

const instance = new web3.eth.Contract(abi, address);

export default instance;
