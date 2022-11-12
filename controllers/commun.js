import {getWalletNetworkBalance} from './wallet.js';

export const http = axios.create({
  baseURL: "https://api.starton.io/v2",
  headers: {
      "x-api-key": 'a9Wp0e1aqMX8pmxvrNFImYwh1Pe3xU7u',
      "Content-Type": "application/json"
  },
})

export async function getAllData(address) {

  const response = await http.get('/wallet/' + address + '/balance');
  return response.data;
}

/* Gas */
export async function gasOnMatic() {
  try {
    const response = await http.get('/gas-price/' + network);
    console.log("res gasOnMatic : ", response.data);
  }
  catch (error) {
    console.error(error);
  }
}
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