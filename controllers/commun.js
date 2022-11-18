import {getWalletNetworkBalance} from './wallet.js';

// const Web3 = require('web3');


// const Web3 = require('web3');

// const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");





export let networks = [
  // "ethereum-mainnet",
  "ethereum-goerli",
  "ethereum-ropsten",
  // "binance-mainnet",
  "binance-testnet",
  // "avalanche-mainnet",
  "avalanche-fuji",
  // "polygon-mainnet",
  "polygon-mumbai"
];

export const http = axios.create({
  baseURL: "https://api.starton.io/v2",
  headers: {
      "x-api-key": 'a9Wp0e1aqMX8pmxvrNFImYwh1Pe3xU7u',
      "Content-Type": "application/json"
  },
})

export async function smartContractTemplate () {
  const response = await http.get('/smart-contract-template');
  return response.data;
}

/* Gas */
export async function gasOnGoerli() {
  const response = await http.get('/gas-price/ethereum-goerli');
  return response.data;
}


export async function getEthBalance(address) {
  let res = await getWalletNetworkBalance(address, "ethereum-goerli");
  // console.log(res, "type : ", typeof(res));
  const ethBallance = document.getElementById("eth-balance");
  ethBallance.innerHTML = `${parseFloat(res).toPrecision(5)} Eth`;
}