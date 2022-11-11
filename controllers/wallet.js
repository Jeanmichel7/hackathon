import {http} from './commun.js';

/* Wallet */ 
export async function getWallet() {
    const response = await http.get('/wallet/');
    return response.data;

}

export async function getWalletId() {
  try {
    const response = await http.get('/wallet/' + address);
    console.log("res getWalletId : ", response.data);
  } catch (error) {
    console.error(error);
  }
}

export async function getWalletBalance(address) {
    const response = await http.get('/wallet/' + address + '/balance');
    return response.data;
}

export async function getWalletNetworkBalance(address, network) {
  const res = await http.get('/wallet/' + address + '/' + network + '/balance');
  // console.log("res getWalletNetworkBalance : ", response.data.balance.formatted);
  return res.data.balance.formatted;
}

