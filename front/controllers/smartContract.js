import {http} from './commun.js.js';

/* Smart Contract */
export async function getAllSc(network) {
  const response = await http.get('/smart-contract/' + network);
  return response;
}

export async function getSc(network, scAddress) {
  const response = await http.get('/smart-contract/' + network + '/' + scAddress)
  .catch(function (error) {return error;});
  return response;
}

export async function getScFunctions(network, scAddress) {
  const response = await http.get('/smart-contract/' + network + '/' + scAddress + '/available-functions');
  return response.data;
}

export async function importSmartContract(abi, network, name, address, description) {
  const response = await http.post("https://api.starton.io/v2/smart-contract/import-existing", {
    "abi": abi,
    "network": network,
    "name": name,
    "address": address,
    "description": description
  })
  .catch(function (error) {
    return error;
  });
  return response;
}

export async function callSmartContractFunction(network, address, fctName, params) {
  const res = await http.post("/smart-contract/" + network + "/" + address + "/call", {
    "functionName": fctName,
    "signerWallet": "0xB8c9627627a6F1F78CD2b9d172A2816529F313B8",
    "params": params
  })
  .catch(function (error) { return error; });
  return res;
}

export async function readSmartContractFunction(network, address, fctName, params) {
  const res = await http.post("/smart-contract/" + network + "/" + address + "/read", {
    "functionName": fctName,
    "params": params
  })
  .catch(function (error) { return error; });
  return res;
}

export async function deleteSmartContract(network, address) {
  const res = await http.delete("/smart-contract/" + network + "/" + address)
  .catch(function (error) { return error; });
  return res;
}

export async function deploySmartContract(abi, params, network, bytescode, name, signerWallet) {
  const res = await http.post("/smart-contract/from-bytecode", {
    "abi": abi,
    "params": params,
    "network": network,
    "bytecode": bytescode.toString(),
    "name": name,
    "signerWallet": signerWallet
  })
  .catch(function (error) { return error; });
  return res;
}


/* IPFS */

export async function uploadToIpfs(file) {
  const res = await http.post("/ipfs/upload", {
    "file": file
  })
  .catch(function (error) { return error; });
  return res;
}