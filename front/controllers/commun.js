import {getWalletNetworkBalance} from './wallet.js';
// import { ethers } from "ethers";

// export const getWalletBalance = async (req, res) => {
//     const {address} = req.params;
//     const balance = await getWalletNetworkBalance(address);
//     res.status(200).json({balance});
// }

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
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": '*'
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

export async function getBnbBalance(address) {
  let res = await getWalletNetworkBalance(address, "binance-testnet");
  if (res != false) {
    const bnbBallance = document.getElementById("header-bnb-balance");
    bnbBallance.innerHTML = `${parseFloat(res).toPrecision(5)} BNB`;
  }
}

export async function checkConnection() {
  if (localStorage.getItem('bnbBalance') != null) {
    let res = await getBnbBalance(localStorage.getItem('bnbBalance'));
    if (res != false)
      document.getElementById("connectButton").style.display = "none";
  }
}
