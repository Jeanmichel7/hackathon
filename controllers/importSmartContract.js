export let ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_details",
				"type": "string"
			}
		],
		"name": "addProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
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
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
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
		"name": "balanceOf",
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
		"name": "decimals",
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
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllProducts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "ID",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "details",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "hashCID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "reviewsCID",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "tokenPool",
						"type": "uint256"
					}
				],
				"internalType": "struct FaitfulToken.product[]",
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
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			}
		],
		"name": "getProduct",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "ID",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "details",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "hashCID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "reviewsCID",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "tokenPool",
						"type": "uint256"
					}
				],
				"internalType": "struct FaitfulToken.product",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "products",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "ID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "details",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hashCID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "reviewsCID",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "tokenPool",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			}
		],
		"name": "sendRewardFromPool",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_reviewsCID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_hashCID",
				"type": "string"
			}
		],
		"name": "setAllCID",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_hashCID",
				"type": "string"
			}
		],
		"name": "setHashCID",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_cost",
				"type": "uint256"
			}
		],
		"name": "setProductCost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
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
		"name": "total_products",
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
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
export let bytesCode = "6080604052620f42406007553480156200001857600080fd5b506040518060400160405280600c81526020017f4661697466756c546f6b656e00000000000000000000000000000000000000008152506040518060400160405280600481526020017f4646554c00000000000000000000000000000000000000000000000000000000815250620000a562000099620001c760201b60201c565b620001cf60201b60201c565b8160049080519060200190620000bd92919062000888565b508060059080519060200190620000d692919062000888565b505050620000ef33633b9aca006200029360201b60201c565b620001356040518060400160405280600d81526020017f5072656d696572206f626a6574000000000000000000000000000000000000008152506200040260201b60201c565b6200017b6040518060400160405280600e81526020017f4465757869656d65206f626a65740000000000000000000000000000000000008152506200040260201b60201c565b620001c16040518060400160405280600f81526020017f54726f697369656d65206f626a657400000000000000000000000000000000008152506200040260201b60201c565b62000e33565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141562000306576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002fd9062000b0c565b60405180910390fd5b6200031a600083836200059f60201b60201c565b80600360008282546200032e919062000b5c565b9250508190555080600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620003e2919062000b2e565b60405180910390a3620003fe60008383620005a460201b60201c565b5050565b6008815110156200044a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620004419062000aa6565b60405180910390fd5b6200045b33620005a960201b60201c565b6007541115620004a2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620004999062000aea565b60405180910390fd5b620004b73330600754620005f260201b60201c565b620004c162000919565b60065481600001818152505081816020018190525060075481608001818152505060066000815480929190620004f79062000bf9565b919050555060088190806001815401808255809150506001900390600052602060002090600502016000909190919091506000820151816000015560208201518160010190805190602001906200055092919062000888565b5060408201518160020190805190602001906200056f92919062000888565b5060608201518160030190805190602001906200058e92919062000888565b506080820151816004015550505050565b505050565b505050565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141562000665576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200065c9062000ac8565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415620006d8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620006cf9062000a62565b60405180910390fd5b620006eb8383836200059f60201b60201c565b6000600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101562000775576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200076c9062000a84565b60405180910390fd5b818103600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405162000867919062000b2e565b60405180910390a362000882848484620005a460201b60201c565b50505050565b828054620008969062000bc3565b90600052602060002090601f016020900481019282620008ba576000855562000906565b82601f10620008d557805160ff191683800117855562000906565b8280016001018555821562000906579182015b8281111562000905578251825591602001919060010190620008e8565b5b50905062000915919062000948565b5090565b6040518060a0016040528060008152602001606081526020016060815260200160608152602001600081525090565b5b808211156200096357600081600090555060010162000949565b5090565b60006200097660238362000b4b565b9150620009838262000ca5565b604082019050919050565b60006200099d60268362000b4b565b9150620009aa8262000cf4565b604082019050919050565b6000620009c460318362000b4b565b9150620009d18262000d43565b604082019050919050565b6000620009eb60258362000b4b565b9150620009f88262000d92565b604082019050919050565b600062000a1260158362000b4b565b915062000a1f8262000de1565b602082019050919050565b600062000a39601f8362000b4b565b915062000a468262000e0a565b602082019050919050565b62000a5c8162000bb9565b82525050565b6000602082019050818103600083015262000a7d8162000967565b9050919050565b6000602082019050818103600083015262000a9f816200098e565b9050919050565b6000602082019050818103600083015262000ac181620009b5565b9050919050565b6000602082019050818103600083015262000ae381620009dc565b9050919050565b6000602082019050818103600083015262000b058162000a03565b9050919050565b6000602082019050818103600083015262000b278162000a2a565b9050919050565b600060208201905062000b45600083018462000a51565b92915050565b600082825260208201905092915050565b600062000b698262000bb9565b915062000b768362000bb9565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111562000bae5762000bad62000c47565b5b828201905092915050565b6000819050919050565b6000600282049050600182168062000bdc57607f821691505b6020821081141562000bf35762000bf262000c76565b5b50919050565b600062000c068262000bb9565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141562000c3c5762000c3b62000c47565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b7f50726f64756374732064657461696c73206e65656420746f206265206174206c60008201527f6561737420382063686172616374657273000000000000000000000000000000602082015250565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f4e6f7420656e6f756768204646554c20546f6b656e0000000000000000000000600082015250565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b612ad28062000e436000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c80637acc0b20116100c3578063a9059cbb1161007c578063a9059cbb146103a6578063b7728c2e146103d6578063b9db15b4146103f2578063dd62ed3e14610422578063dfe00c5114610452578063f2fde38b1461046e5761014d565b80637acc0b20146102cc5780637efa6959146103005780638da5cb5b1461031e578063917151461461033c57806395d89b4114610358578063a457c2d7146103765761014d565b806323b872dd1161011557806323b872dd146101f8578063313ce5671461022857806339509351146102465780635ea5f73e1461027657806370a0823114610292578063715018a6146102c25761014d565b806302ee3a521461015257806306fdde0314610170578063095ea7b31461018e5780630c6f8e7f146101be57806318160ddd146101da575b600080fd5b61015a61048a565b60405161016791906120a0565b60405180910390f35b6101786106b3565b60405161018591906120dd565b60405180910390f35b6101a860048036038101906101a39190611ad3565b610745565b6040516101b591906120c2565b60405180910390f35b6101d860048036038101906101d39190611b89565b610768565b005b6101e26107f2565b6040516101ef91906122c1565b60405180910390f35b610212600480360381019061020d9190611a80565b6107fc565b60405161021f91906120c2565b60405180910390f35b61023061082b565b60405161023d9190612344565b60405180910390f35b610260600480360381019061025b9190611ad3565b610834565b60405161026d91906120c2565b60405180910390f35b610290600480360381019061028b9190611ad3565b61086b565b005b6102ac60048036038101906102a79190611a13565b6108fe565b6040516102b991906122c1565b60405180910390f35b6102ca610947565b005b6102e660048036038101906102e19190611b5c565b61095b565b6040516102f79594939291906122dc565b60405180910390f35b610308610b39565b60405161031591906122c1565b60405180910390f35b610326610b3f565b6040516103339190612085565b60405180910390f35b61035660048036038101906103519190611be5565b610b68565b005b610360610c71565b60405161036d91906120dd565b60405180910390f35b610390600480360381019061038b9190611ad3565b610d03565b60405161039d91906120c2565b60405180910390f35b6103c060048036038101906103bb9190611ad3565b610d7a565b6040516103cd91906120c2565b60405180910390f35b6103f060048036038101906103eb9190611b5c565b610d9d565b005b61040c60048036038101906104079190611b5c565b610daf565b604051610419919061229f565b60405180910390f35b61043c60048036038101906104379190611a40565b610fb5565b60405161044991906122c1565b60405180910390f35b61046c60048036038101906104679190611b13565b61103c565b005b61048860048036038101906104839190611a13565b6111b9565b005b60606008805480602002602001604051908101604052809291908181526020016000905b828210156106aa57838290600052602060002090600502016040518060a0016040529081600082015481526020016001820180546104eb9061256d565b80601f01602080910402602001604051908101604052809291908181526020018280546105179061256d565b80156105645780601f1061053957610100808354040283529160200191610564565b820191906000526020600020905b81548152906001019060200180831161054757829003601f168201915b5050505050815260200160028201805461057d9061256d565b80601f01602080910402602001604051908101604052809291908181526020018280546105a99061256d565b80156105f65780601f106105cb576101008083540402835291602001916105f6565b820191906000526020600020905b8154815290600101906020018083116105d957829003601f168201915b5050505050815260200160038201805461060f9061256d565b80601f016020809104026020016040519081016040528092919081815260200182805461063b9061256d565b80156106885780601f1061065d57610100808354040283529160200191610688565b820191906000526020600020905b81548152906001019060200180831161066b57829003601f168201915b50505050508152602001600482015481525050815260200190600101906104ae565b50505050905090565b6060600480546106c29061256d565b80601f01602080910402602001604051908101604052809291908181526020018280546106ee9061256d565b801561073b5780601f106107105761010080835404028352916020019161073b565b820191906000526020600020905b81548152906001019060200180831161071e57829003601f168201915b5050505050905090565b60008061075061123d565b905061075d818585611245565b600191505092915050565b610770611410565b602e8151146107b4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107ab906121bf565b60405180910390fd5b80600883815481106107c9576107c86126a6565b5b906000526020600020906005020160020190805190602001906107ed9291906118a7565b505050565b6000600354905090565b60008061080761123d565b905061081485828561148e565b61081f85858561151a565b60019150509392505050565b60006012905090565b60008061083f61123d565b90506108608185856108518589610fb5565b61085b919061241b565b611245565b600191505092915050565b610873611410565b600060088281548110610889576108886126a6565b5b906000526020600020906005020160040154116108a557600080fd5b60006108b082611795565b905080600883815481106108c7576108c66126a6565b5b906000526020600020906005020160040160008282546108e791906124a2565b925050819055506108f930848361151a565b505050565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b61094f611410565b61095960006117d9565b565b6008818154811061096b57600080fd5b90600052602060002090600502016000915090508060000154908060010180546109949061256d565b80601f01602080910402602001604051908101604052809291908181526020018280546109c09061256d565b8015610a0d5780601f106109e257610100808354040283529160200191610a0d565b820191906000526020600020905b8154815290600101906020018083116109f057829003601f168201915b505050505090806002018054610a229061256d565b80601f0160208091040260200160405190810160405280929190818152602001828054610a4e9061256d565b8015610a9b5780601f10610a7057610100808354040283529160200191610a9b565b820191906000526020600020905b815481529060010190602001808311610a7e57829003601f168201915b505050505090806003018054610ab09061256d565b80601f0160208091040260200160405190810160405280929190818152602001828054610adc9061256d565b8015610b295780601f10610afe57610100808354040283529160200191610b29565b820191906000526020600020905b815481529060010190602001808311610b0c57829003601f168201915b5050505050908060040154905085565b60065481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610b70611410565b602e825114610bb4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bab9061225f565b60405180910390fd5b602e815114610bf8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bef906121bf565b60405180910390fd5b8060088481548110610c0d57610c0c6126a6565b5b90600052602060002090600502016002019080519060200190610c319291906118a7565b508160088481548110610c4757610c466126a6565b5b90600052602060002090600502016003019080519060200190610c6b9291906118a7565b50505050565b606060058054610c809061256d565b80601f0160208091040260200160405190810160405280929190818152602001828054610cac9061256d565b8015610cf95780601f10610cce57610100808354040283529160200191610cf9565b820191906000526020600020905b815481529060010190602001808311610cdc57829003601f168201915b5050505050905090565b600080610d0e61123d565b90506000610d1c8286610fb5565b905083811015610d61576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d589061227f565b60405180910390fd5b610d6e8286868403611245565b60019250505092915050565b600080610d8561123d565b9050610d9281858561151a565b600191505092915050565b610da5611410565b8060078190555050565b610db761192d565b60088281548110610dcb57610dca6126a6565b5b90600052602060002090600502016040518060a001604052908160008201548152602001600182018054610dfe9061256d565b80601f0160208091040260200160405190810160405280929190818152602001828054610e2a9061256d565b8015610e775780601f10610e4c57610100808354040283529160200191610e77565b820191906000526020600020905b815481529060010190602001808311610e5a57829003601f168201915b50505050508152602001600282018054610e909061256d565b80601f0160208091040260200160405190810160405280929190818152602001828054610ebc9061256d565b8015610f095780601f10610ede57610100808354040283529160200191610f09565b820191906000526020600020905b815481529060010190602001808311610eec57829003601f168201915b50505050508152602001600382018054610f229061256d565b80601f0160208091040260200160405190810160405280929190818152602001828054610f4e9061256d565b8015610f9b5780601f10610f7057610100808354040283529160200191610f9b565b820191906000526020600020905b815481529060010190602001808311610f7e57829003601f168201915b505050505081526020016004820154815250509050919050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600881511015611081576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110789061219f565b60405180910390fd5b61108a336108fe565b60075411156110ce576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110c59061221f565b60405180910390fd5b6110db333060075461151a565b6110e361192d565b60065481600001818152505081816020018190525060075481608001818152505060066000815480929190611117906125d0565b9190505550600881908060018154018082558091505060019003906000526020600020906005020160009091909190915060008201518160000155602082015181600101908051906020019061116e9291906118a7565b50604082015181600201908051906020019061118b9291906118a7565b5060608201518160030190805190602001906111a89291906118a7565b506080820151816004015550505050565b6111c1611410565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611231576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112289061211f565b60405180910390fd5b61123a816117d9565b50565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156112b5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112ac9061223f565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611325576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161131c9061213f565b60405180910390fd5b80600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258360405161140391906122c1565b60405180910390a3505050565b61141861123d565b73ffffffffffffffffffffffffffffffffffffffff16611436610b3f565b73ffffffffffffffffffffffffffffffffffffffff161461148c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611483906121df565b60405180910390fd5b565b600061149a8484610fb5565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146115145781811015611506576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114fd9061215f565b60405180910390fd5b6115138484848403611245565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561158a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611581906121ff565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156115fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115f1906120ff565b60405180910390fd5b61160583838361189d565b6000600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101561168c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116839061217f565b60405180910390fd5b818103600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161177c91906122c1565b60405180910390a361178f8484846118a2565b50505050565b600080600883815481106117ac576117ab6126a6565b5b90600052602060002090600502016004015490506103e8816117ce9190612471565b905080915050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b505050565b505050565b8280546118b39061256d565b90600052602060002090601f0160209004810192826118d5576000855561191c565b82601f106118ee57805160ff191683800117855561191c565b8280016001018555821561191c579182015b8281111561191b578251825591602001919060010190611900565b5b509050611929919061195c565b5090565b6040518060a0016040528060008152602001606081526020016060815260200160608152602001600081525090565b5b8082111561197557600081600090555060010161195d565b5090565b600061198c61198784612384565b61235f565b9050828152602081018484840111156119a8576119a7612709565b5b6119b384828561252b565b509392505050565b6000813590506119ca81612a6e565b92915050565b600082601f8301126119e5576119e4612704565b5b81356119f5848260208601611979565b91505092915050565b600081359050611a0d81612a85565b92915050565b600060208284031215611a2957611a28612713565b5b6000611a37848285016119bb565b91505092915050565b60008060408385031215611a5757611a56612713565b5b6000611a65858286016119bb565b9250506020611a76858286016119bb565b9150509250929050565b600080600060608486031215611a9957611a98612713565b5b6000611aa7868287016119bb565b9350506020611ab8868287016119bb565b9250506040611ac9868287016119fe565b9150509250925092565b60008060408385031215611aea57611ae9612713565b5b6000611af8858286016119bb565b9250506020611b09858286016119fe565b9150509250929050565b600060208284031215611b2957611b28612713565b5b600082013567ffffffffffffffff811115611b4757611b4661270e565b5b611b53848285016119d0565b91505092915050565b600060208284031215611b7257611b71612713565b5b6000611b80848285016119fe565b91505092915050565b60008060408385031215611ba057611b9f612713565b5b6000611bae858286016119fe565b925050602083013567ffffffffffffffff811115611bcf57611bce61270e565b5b611bdb858286016119d0565b9150509250929050565b600080600060608486031215611bfe57611bfd612713565b5b6000611c0c868287016119fe565b935050602084013567ffffffffffffffff811115611c2d57611c2c61270e565b5b611c39868287016119d0565b925050604084013567ffffffffffffffff811115611c5a57611c5961270e565b5b611c66868287016119d0565b9150509250925092565b6000611c7c8383611f50565b905092915050565b611c8d816124d6565b82525050565b6000611c9e826123c5565b611ca881856123e8565b935083602082028501611cba856123b5565b8060005b85811015611cf65784840389528151611cd78582611c70565b9450611ce2836123db565b925060208a01995050600181019050611cbe565b50829750879550505050505092915050565b611d11816124e8565b82525050565b6000611d22826123d0565b611d2c81856123f9565b9350611d3c81856020860161253a565b611d4581612718565b840191505092915050565b6000611d5b826123d0565b611d65818561240a565b9350611d7581856020860161253a565b611d7e81612718565b840191505092915050565b6000611d9660238361240a565b9150611da182612729565b604082019050919050565b6000611db960268361240a565b9150611dc482612778565b604082019050919050565b6000611ddc60228361240a565b9150611de7826127c7565b604082019050919050565b6000611dff601d8361240a565b9150611e0a82612816565b602082019050919050565b6000611e2260268361240a565b9150611e2d8261283f565b604082019050919050565b6000611e4560318361240a565b9150611e508261288e565b604082019050919050565b6000611e6860118361240a565b9150611e73826128dd565b602082019050919050565b6000611e8b60208361240a565b9150611e9682612906565b602082019050919050565b6000611eae60258361240a565b9150611eb98261292f565b604082019050919050565b6000611ed160158361240a565b9150611edc8261297e565b602082019050919050565b6000611ef460248361240a565b9150611eff826129a7565b604082019050919050565b6000611f1760138361240a565b9150611f22826129f6565b602082019050919050565b6000611f3a60258361240a565b9150611f4582612a1f565b604082019050919050565b600060a083016000830151611f686000860182612058565b5060208301518482036020860152611f808282611d17565b91505060408301518482036040860152611f9a8282611d17565b91505060608301518482036060860152611fb48282611d17565b9150506080830151611fc96080860182612058565b508091505092915050565b600060a083016000830151611fec6000860182612058565b50602083015184820360208601526120048282611d17565b9150506040830151848203604086015261201e8282611d17565b915050606083015184820360608601526120388282611d17565b915050608083015161204d6080860182612058565b508091505092915050565b61206181612514565b82525050565b61207081612514565b82525050565b61207f8161251e565b82525050565b600060208201905061209a6000830184611c84565b92915050565b600060208201905081810360008301526120ba8184611c93565b905092915050565b60006020820190506120d76000830184611d08565b92915050565b600060208201905081810360008301526120f78184611d50565b905092915050565b6000602082019050818103600083015261211881611d89565b9050919050565b6000602082019050818103600083015261213881611dac565b9050919050565b6000602082019050818103600083015261215881611dcf565b9050919050565b6000602082019050818103600083015261217881611df2565b9050919050565b6000602082019050818103600083015261219881611e15565b9050919050565b600060208201905081810360008301526121b881611e38565b9050919050565b600060208201905081810360008301526121d881611e5b565b9050919050565b600060208201905081810360008301526121f881611e7e565b9050919050565b6000602082019050818103600083015261221881611ea1565b9050919050565b6000602082019050818103600083015261223881611ec4565b9050919050565b6000602082019050818103600083015261225881611ee7565b9050919050565b6000602082019050818103600083015261227881611f0a565b9050919050565b6000602082019050818103600083015261229881611f2d565b9050919050565b600060208201905081810360008301526122b98184611fd4565b905092915050565b60006020820190506122d66000830184612067565b92915050565b600060a0820190506122f16000830188612067565b81810360208301526123038187611d50565b905081810360408301526123178186611d50565b9050818103606083015261232b8185611d50565b905061233a6080830184612067565b9695505050505050565b60006020820190506123596000830184612076565b92915050565b600061236961237a565b9050612375828261259f565b919050565b6000604051905090565b600067ffffffffffffffff82111561239f5761239e6126d5565b5b6123a882612718565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600061242682612514565b915061243183612514565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561246657612465612619565b5b828201905092915050565b600061247c82612514565b915061248783612514565b92508261249757612496612648565b5b828204905092915050565b60006124ad82612514565b91506124b883612514565b9250828210156124cb576124ca612619565b5b828203905092915050565b60006124e1826124f4565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b82818337600083830152505050565b60005b8381101561255857808201518184015260208101905061253d565b83811115612567576000848401525b50505050565b6000600282049050600182168061258557607f821691505b6020821081141561259957612598612677565b5b50919050565b6125a882612718565b810181811067ffffffffffffffff821117156125c7576125c66126d5565b5b80604052505050565b60006125db82612514565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561260e5761260d612619565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b7f50726f64756374732064657461696c73206e65656420746f206265206174206c60008201527f6561737420382063686172616374657273000000000000000000000000000000602082015250565b7f42616420486173682066696c6520434944000000000000000000000000000000600082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f4e6f7420656e6f756768204646554c20546f6b656e0000000000000000000000600082015250565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f426164205265766965772066696c652043494400000000000000000000000000600082015250565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b612a77816124d6565b8114612a8257600080fd5b50565b612a8e81612514565b8114612a9957600080fd5b5056fea2646970667358221220563ca035dddf3a9ed9c914e82b329e3b89ddc16495d563a77a2a794203009dad64736f6c63430008070033";